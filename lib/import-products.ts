export type ImportedProduct={name:string;brand:string;url:string;sku:string;price:string;currency:string;availability:string;};
export type ImportResult={products:ImportedProduct[];method:string;source:string;observedAt:string;coverage:string;};
function record(x:unknown):x is Record<string,unknown>{return typeof x==='object'&&x!==null&&!Array.isArray(x);}
function string(x:unknown){return typeof x==='string'?x:typeof x==='number'?String(x):'';}
function safeLink(value:unknown,base:string){try{const u=new URL(string(value)||base,base);return u.protocol==='https:'?u.href:base;}catch{return base;}}
export function parseStructuredProducts(html:string,source:string):ImportedProduct[]{
 const products:ImportedProduct[]=[];const visited=new Set<string>();
 function walk(value:unknown,depth=0){if(depth>12||products.length>=80)return;if(Array.isArray(value)){value.forEach(v=>walk(v,depth+1));return;}if(!record(value))return;
 const type=value['@type'];if(type==='Product'||Array.isArray(type)&&type.includes('Product')){
 const name=string(value.name).trim();if(name){const offers=Array.isArray(value.offers)?value.offers:[value.offers];const offer=offers.find(record);const brand=record(value.brand)?string(value.brand.name):string(value.brand);const url=safeLink(value.url??offer?.url,source);const sku=string(value.sku);const key=sku+'|'+url+'|'+name;if(!visited.has(key)){visited.add(key);products.push({name:name.slice(0,300),brand:brand.slice(0,150),url,sku,price:string(offer?.price??offer?.lowPrice),currency:string(offer?.priceCurrency),availability:string(offer?.availability).split('/').pop()??''});}}
 }
 for(const [key,v] of Object.entries(value))if(['@graph','mainEntity','itemListElement','item','hasVariant','isVariantOf','subjectOf'].includes(key))walk(v,depth+1);
 }
 const script=/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;let match:RegExpExecArray|null;
 while((match=script.exec(html))!==null){if(!/type\s*=\s*["']application\/ld\+json["']/i.test(match[1]))continue;try{walk(JSON.parse(match[2]));}catch{continue;}}
 return products;
}
export function publicUrl(input:string):URL{
 const u=new URL(input);const host=u.hostname.toLowerCase();if(u.protocol!=='https:'||u.username||u.password||u.port&&u.port!=='443'||!host.includes('.')||/^[\d.]+$/.test(host)||host.includes(':')||host.endsWith('.local')||host.endsWith('.localhost')||host.endsWith('.internal'))throw new Error('Use a public HTTPS product or store URL.');u.hash='';return u;
}
export function isPublicAddress(ip:string){
 if(ip.includes(':')){const p=ip.toLowerCase();return !p.startsWith('fc')&&!p.startsWith('fd')&&!p.startsWith('fe8')&&!p.startsWith('fe9')&&!p.startsWith('fea')&&!p.startsWith('feb')&&!p.startsWith('ff')&&!p.startsWith('::')&&p!=='::1'&&/^[23]/.test(p);}
 const n=ip.split('.').map(Number);if(n.length!==4||n.some(x=>!Number.isInteger(x)||x<0||x>255))return false;
 return !(n[0]===0||n[0]===10||n[0]===127||n[0]>=224||n[0]===169&&n[1]===254||n[0]===172&&n[1]>=16&&n[1]<=31||n[0]===192&&(n[1]===168||n[1]===0)||n[0]===100&&n[1]>=64&&n[1]<=127||n[0]===198&&(n[1]===18||n[1]===19));
}
async function verifyHost(u:URL){
 const answers=await Promise.all(['A','AAAA'].map(async type=>{const r=await fetch('https://cloudflare-dns.com/dns-query?name='+encodeURIComponent(u.hostname)+'&type='+type,{headers:{accept:'application/dns-json'},signal:AbortSignal.timeout(5000)});if(!r.ok)throw new Error('Could not verify the store address.');const json:unknown=await r.json();if(!record(json))return [];const a=json.Answer;if(!Array.isArray(a))return [];return a.filter(record).filter(x=>x.type===1||x.type===28).map(x=>string(x.data));}));
 const ips=answers.flat();if(!ips.length||ips.some(ip=>!isPublicAddress(ip)))throw new Error('This address is not a public store.');
}
async function fetchPublic(u:URL,init:RequestInit={},redirects=0):Promise<Response>{
 await verifyHost(u);const r=await fetch(u,{...init,redirect:'manual',signal:AbortSignal.timeout(12000),headers:{'User-Agent':'KeyconfCatalogPreview/0.1',...init.headers}});
 if(r.status>=300&&r.status<400){const location=r.headers.get('location');if(!location||redirects>=3)throw new Error('The store redirected too many times.');return fetchPublic(publicUrl(new URL(location,u).href),{},redirects+1);}
 if(!r.ok)throw new Error('The store returned HTTP '+r.status+'. Try a public product page or a JSON-LD export.');return r;
}
async function boundedText(r:Response){
 if(Number(r.headers.get('content-length'))>2_000_000)throw new Error('The page is too large to preview.');if(!r.body)return '';const reader=r.body.getReader();const decoder=new TextDecoder();let bytes=0,text='';
 try{while(true){const chunk=await reader.read();if(chunk.done)break;bytes+=chunk.value.byteLength;if(bytes>2_000_000)throw new Error('The page is too large to preview.');text+=decoder.decode(chunk.value,{stream:true});}return text+decoder.decode();}finally{await reader.cancel();}
}
export async function importWebsite(input:string):Promise<ImportResult>{
 const u=publicUrl(input);const response=await fetchPublic(u);const html=await boundedText(response);const products=parseStructuredProducts(html,u.href);
 if(products.length)return {products,source:u.href,observedAt:new Date().toISOString(),method:'Product structured data',coverage:'Products found on this page only. Prices and availability are snapshots; compatibility needs review.'};
 if(/cdn\.shopify\.com|Shopify\.shop/i.test(html)){
 const query='{ products(first: 40) { nodes { title vendor onlineStoreUrl variants(first: 1) { nodes { sku price { amount currencyCode } availableForSale } } } pageInfo { hasNextPage } } }';
 const r=await fetchPublic(new URL('/api/2026-07/graphql.json',u),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query})});const json:unknown=JSON.parse(await boundedText(r));
 if(record(json)&&record(json.data)&&record(json.data.products)&&Array.isArray(json.data.products.nodes)){
 const found:ImportedProduct[]=[];for(const item of json.data.products.nodes){if(!record(item)||typeof item.title!=='string')continue;const variants=record(item.variants)&&Array.isArray(item.variants.nodes)?item.variants.nodes:[];const v=variants.find(record);const price=record(v?.price)?v.price:{};found.push({name:item.title,brand:string(item.vendor),url:safeLink(item.onlineStoreUrl,u.href),sku:string(v?.sku),price:string(price.amount),currency:string(price.currencyCode),availability:v?.availableForSale===true?'Available':v?.availableForSale===false?'Unavailable':''});}
 if(found.length)return {products:found,source:u.href,observedAt:new Date().toISOString(),method:'Shopify Storefront API',coverage:'Up to 40 products, first variant of each. This is a catalog preview, not a complete variant import.'};
 }
 }
 throw new Error('No readable product data found. This site may need a dedicated importer. Try a specific product URL, or paste its JSON-LD below.');
}
