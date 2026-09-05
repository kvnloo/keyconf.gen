export type Category = 'case' | 'pcb' | 'plate' | 'switch' | 'keycaps' | 'stabilizers';
export type Part = { id: string; name: string; brand: string; category: Category; detail: string; source: string; family: string; evidence: 'documented' | 'unknown'; };
export const catalog:Part[]=[
{id:'tofu-case',name:'Tofu60 Redux',brand:'KBDfans',category:'case',detail:'60% · tray mount · aluminum case',source:'https://kbdfans.com/products/tofu60-redux-case',family:'tofu60',evidence:'documented'},
{id:'bakeneko-case',name:'Bakeneko60',brand:'CannonKeys',category:'case',detail:'60% · O-ring mount · kit',source:'https://docs.cannonkeys.com/bakeneko/',family:'bakeneko60',evidence:'documented'},
{id:'redux-pcb',name:'Redux 60 RGB ANSI PCB',brand:'KBDfans',category:'pcb',detail:'Named compatible PCB for the Redux plate',source:'https://kbdfans.com/products/tofu60-redux-plate',family:'tofu60',evidence:'documented'},
{id:'anc-pcb',name:'AN-C V2',brand:'CannonKeys',category:'pcb',detail:'Solder PCB · Bakeneko60 build guide',source:'https://docs.cannonkeys.com/bakeneko/',family:'bakeneko60',evidence:'documented'},
{id:'redux-plate',name:'Tofu60 Redux plate',brand:'KBDfans',category:'plate',detail:'60% ANSI · explicit stabilizer exclusions',source:'https://kbdfans.com/products/tofu60-redux-plate',family:'tofu60',evidence:'documented'},
{id:'bakeneko-plate',name:'Bakeneko60 kit plate',brand:'CannonKeys',category:'plate',detail:'Designed for the Bakeneko60 O-ring mount',source:'https://docs.cannonkeys.com/bakeneko/',family:'bakeneko60',evidence:'documented'},
{id:'mx-switch',name:'MX mechanical switch',brand:'Specification',category:'switch',detail:'Choose a product to verify pins and clearances',source:'https://www.keychron.com/products/keychron-q1-max-qmk-via-wireless-custom-mechanical-keyboard',family:'mx',evidence:'unknown'},
{id:'he-switch',name:'Dual-rail Magnetic Orange',brand:'Gateron',category:'switch',detail:'Hall-effect · requires a matching magnetic PCB',source:'https://www.gateron.com/u_file/2506/10/file/GATERONDual-railMagneticOrangeSwitchSPEC-KS-20U-005KS-20UO10B045NW-X14.pdf',family:'he',evidence:'documented'},
{id:'cherry-caps',name:'Cherry-profile keycap kit',brand:'Specification',category:'keycaps',detail:'Exact kit inventory and row coverage unverified',source:'https://www.gmk-electronic-design.de/fileadmin/user_upload/faq/Guidelines_for_Custom_GMK_Keycap_Set_14.pdf',family:'mx',evidence:'unknown'},
{id:'clip-stabs',name:'Cherry-style clip-in stabilizers',brand:'Specification',category:'stabilizers',detail:'4 × 2u + 1 × 6.25u for Bakeneko60',source:'https://docs.cannonkeys.com/bakeneko/',family:'clip',evidence:'documented'},
{id:'durock-stabs',name:'Durock screw-in stabilizers',brand:'Durock',category:'stabilizers',detail:'Excluded by the Redux plate; interferes with Bakeneko mount',source:'https://kbdfans.com/products/tofu60-redux-plate',family:'screw',evidence:'documented'}
];
export const categories:Category[]=['case','pcb','plate','switch','keycaps','stabilizers'];
export type Selection=Record<Category,string>;
export const initialSelection:Selection={case:'tofu-case',pcb:'redux-pcb',plate:'redux-plate',switch:'mx-switch',keycaps:'cherry-caps',stabilizers:'clip-stabs'};
export type FitCheck={status:'documented'|'incompatible'|'unknown';title:string;detail:string;source:string};
export function checkBuild(selection:Selection,parts:Part[],layout:string):FitCheck[]{
 const find=(category:Category)=>parts.find(p=>p.id===selection[category] && p.category===category);
 const c=find('case'),pcb=find('pcb'),plate=find('plate'),sw=find('switch'),stabs=find('stabilizers');const result:FitCheck[]=[];
 if(layout!=='60')result.push({status:'unknown',title:'Layout is a visual study',detail:'This seed catalog covers 60% parts. Select 60% to check those assemblies.',source:'https://docs.qmk.fm/reference_info_json'});
 if(c&&pcb&&plate && c.evidence==='documented'&&pcb.evidence==='documented'&&plate.evidence==='documented'){
 const same=c.family===pcb.family&&c.family===plate.family;
 result.push({status:same&&layout==='60'?'documented':'unknown',title:same?'Case, PCB & plate family':'Mixed component families',detail:same?'Manufacturer documentation names these parts in the same ecosystem. Variant and revision still need checking.':'A shared percentage does not establish mounting, outline, or connector fit.',source:plate.source});
 }else result.push({status:'unknown',title:'Assembly fit needs review',detail:'Imported parts have not been checked against manufacturer mechanical specifications.',source:c?.source??''});
 if(sw?.family==='he'&&pcb && ['tofu60','bakeneko60'].includes(pcb.family))result.push({status:'incompatible',title:'Magnetic switch / mechanical PCB',detail:'Hall-effect switches need a compatible sensor PCB. These mechanical PCBs do not provide it.',source:sw.source});
 else result.push({status:'unknown',title:'Switch & keycap coverage',detail:'Verify the exact switch, pin count, stem, keycap kit widths, and sculpted rows before buying.',source:sw?.source??''});
 if(stabs?.family==='screw'&&(plate?.id==='redux-plate'||c?.family==='bakeneko60'))result.push({status:'incompatible',title:'Stabilizer interference',detail:plate?.id==='redux-plate'?'KBDfans explicitly excludes Durock screw-in stabilizers from this plate.':'Screw-in stabilizers interfere with the Bakeneko O-ring mount.',source:plate?.id==='redux-plate'?plate.source:c?.source??''});
 else result.push({status:'unknown',title:'Stabilizer fit & quantity',detail:'Confirm the exact stabilizer model and spacebar. Mount type alone is not proof of clearance.',source:stabs?.source??''});
 return result;
}
