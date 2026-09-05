import { importWebsite } from '../../../lib/import-products';
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Use the importer from this site.'},{status:403});
 if(Number(request.headers.get('content-length'))>4096)return Response.json({error:'Request is too large.'},{status:413});
 try{const text=await request.text();if(text.length>4096)throw new Error('Request is too large.');const data:unknown=JSON.parse(text);if(typeof data!=='object'||data===null||!('url' in data)||typeof data.url!=='string'||data.url.length>2048)throw new Error('Enter a product or store URL.');return Response.json(await importWebsite(data.url));}
 catch(e){return Response.json({error:e instanceof Error?e.message:'The website could not be imported.'},{status:422});}
}
