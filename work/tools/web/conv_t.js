// 1.1.35 마을 편리성 시험: node conv_t.js <lang> [w h]
const {open}=require('./lib.js');const fs=require('fs');const OUT=__dirname+'/conv';fs.mkdirSync(OUT,{recursive:true});
const LG=process.argv[2]||'ko',W=+process.argv[3]||393,H=+process.argv[4]||852;
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.pearls=87000;seed.gems=900;
const city=fs.readFileSync(__dirname+'/bigtown.json','utf8');
const {b,p,errs}=await open({w:W,h:H,init:`window.__GF_TEST=1;if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(city)});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen');const bn=document.getElementById('banner');if(bn)bn.hidden=true});
await p.click('#tab-city');await p.waitForTimeout(3500);
const f=p.frames().find(x=>x.url().includes('city.html'));const ev=s=>f.evaluate(src=>window.__cv(src),s);const shot=n=>p.screenshot({path:OUT+'/'+LG+W+'_'+n+'.png'});
await ev(`(function(){var x=document.getElementById("sAll");if(x)closePanel()})()`);
// ① 같은 재료 한 번에
const r1=await ev(`(()=>{const cnt=k=>G.b.filter(b=>bufReady(b)===k).length;const by={};G.b.forEach(b=>{const k=bufReady(b);if(k)by[k]=(by[k]||0)+1});
  const k=Object.keys(by).sort((a,b)=>by[b]-by[a])[0];if(!k)return 'no bubbles';const before=cnt(k),res0=G.res[k];
  const q=BUBS.find(q=>bufReady(q.b)===k);if(!q)return 'no BUBS for '+k;tap(q.x,q.y);return {k,before,after:cnt(k),others:Object.keys(by).filter(x=>x!==k).map(x=>x+':'+by[x]+'→'+cnt(x)).join(' '),gain:(G.res[k]||0)-(res0||0)}})()`);
console.log('① 거두기',JSON.stringify(r1));
// ② ◀ ▶
await ev(`(()=>{const q=G.b.filter(b=>b.k==='quarry');return q.length})()`).then(n=>console.log('quarry 채 수',n));
const two=await ev(`(()=>{const ks={};G.b.forEach(b=>{if(!isZ(b.k)&&!isD(b.k))ks[b.k]=(ks[b.k]||0)+1});return Object.keys(ks).filter(k=>ks[k]>1)})()`);console.log('여러 채 건물',two);
let k2=two[0];
if(!k2){await ev(`(()=>{const q=G.b.find(b=>b.k==='quarry');const c=JSON.parse(JSON.stringify(q));c.id=G.nid++;c.x+=0;c.y+=0;c.lv=3;c.job=null;G.b.push(c);return 1})()`);k2='quarry'}
const r2=await ev(`(()=>{const L=G.b.filter(b=>b.k==='${k2}');SEL=L[0];openPanel(L[0]);const nav=document.querySelector('.bnav');const t0=nav&&nav.textContent;nav&&nav.querySelector('[data-v="1"]').click();const t1=document.querySelector('.bnav')&&document.querySelector('.bnav').textContent;const lv=document.querySelector('#panel h2').textContent;return {t0,t1,lv,sel:SEL===L[1]}})()`);
console.log('② 옆 채',JSON.stringify(r2));await shot('nav');await ev('closePanel()');
// ③ 모두 배달
const r3=await ev(`(()=>{G.ord.forEach(o=>{if(o.it)for(const k in o.it)G.res[k]=Math.max(G.res[k]||0,o.it[k]*3)});orderPanel();const b=document.getElementById('oAll');const t=b&&b.textContent,n0=ordReady();if(b)b.click();return {btn:t,n0,after:ordReady()}})()`);
console.log('③ 모두 배달',JSON.stringify(r3));await shot('ord');await ev('closePanel()');
// ④ 🦀 칩
await ev(`(()=>{const q=G.b.find(b=>b.k==='store'&&!b.job);if(q&&!canStart(q.k,q.lv+1).length)startJob(q,q.lv+1);hud()})()`);
await f.click('#crabs');await p.waitForTimeout(400);
const r4=await ev(`(()=>({h:document.querySelector('#panel h2').textContent,li:[...document.querySelectorAll('.crew li')].map(x=>x.textContent).slice(0,10),why:(document.querySelector('#panel .why')||{}).textContent}))()`);
console.log('④ 일꾼',JSON.stringify(r4,null,0));await shot('crew');
const first=await ev(`(()=>{const li=document.querySelector('.crew li.go')||document.querySelector('.crew li');if(!li)return null;li.click();return document.querySelector('#panel h2').textContent})()`);console.log('④ 눌러 이동',first);await shot('crew_go');
const r5=await ev(`(function(){for(var k in G.res)G.res[k]=0;window.__crewPanel();return (document.querySelector('#panel .why')||{}).textContent})()`);console.log('④ 없을 때',r5);await shot('crew_none');
console.log('번역 빠짐',JSON.stringify(await ev(`Object.keys(window.__i18nMiss||{}).slice(0,20)`)));
console.log('errs',errs);await b.close()})();
