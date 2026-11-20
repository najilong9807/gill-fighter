// 39차 깊이: 탁한 물 · 정책 · 사건 — node depth.js <lang>
const {open}=require('./lib.js');const fs=require('fs');const OUT=__dirname+'/depth';fs.mkdirSync(OUT,{recursive:true});const LG=process.argv[2]||'ko';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;
const city=fs.readFileSync(__dirname+'/bigtown.json','utf8');
const {b,p,errs}=await open({init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(city)});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await p.click('#tab-city');await p.waitForTimeout(5000);
const f=p.frames().find(x=>x.url().includes('city.html'));const D=(s)=>f.evaluate(s);const shot=n=>p.screenshot({path:OUT+'/'+LG+'_'+n+'.png'});
console.log('murk tiles',await D(()=>__depth.murk()),'cs',JSON.stringify(await D(()=>__depth.cs())));
const top=await D(()=>__depth.top());console.log('most murky home',JSON.stringify(top));
await f.click('#bBuild');await p.waitForTimeout(400);await f.click('.pills [data-c=base]');await p.waitForTimeout(400);await shot('base');await f.click('#tX');
for(let i=0;i<4;i++){await f.click('#bView');await p.waitForTimeout(150)}await p.waitForTimeout(600);await shot('map');await f.click('#bView');
await f.click('#bMenu');await p.waitForTimeout(300);await shot('menu');await f.click('[data-m="pol"]');await p.waitForTimeout(300);await shot('pol');
await f.click('[data-p="fest"]');await p.waitForTimeout(300);await shot('pol2');console.log('pol',await D(()=>__depth.pol()));
await p.waitForTimeout(2500);console.log('cs after fest',JSON.stringify(await D(()=>__depth.cs())));
console.log('inc vent',await D(()=>__depth.inc(true,'vent')),'inc shark',await D(()=>__depth.inc(true,'shark')),'tide',await D(()=>__depth.inc(true,'tide')));
await f.evaluate(()=>document.querySelector('#pX')&&document.querySelector('#pX').click());await p.waitForTimeout(800);await shot('inc_map');
await D(()=>__depth.openInc());await p.waitForTimeout(300);await shot('inc_panel');
const pe0=await D(()=>+document.getElementById('hP').textContent.replace(/[^0-9]/g,''));await f.click('#iFix').catch(()=>{});await p.waitForTimeout(300);
console.log('after fix',await D(()=>__depth.inc()),'pearl',pe0,'->',await D(()=>+document.getElementById('hP').textContent.replace(/[^0-9]/g,'')));
if(top){console.log('filter: murk',top.m,'->',await D(`__depth.addF(${top.x+1},${top.y})`),'home now',await D(`__depth.murk(${top.x},${top.y})`))}
await f.click('#bMenu');await p.waitForTimeout(300);await f.click('[data-m="life"]');await p.waitForTimeout(300);await shot('life');
fs.writeFileSync(OUT+'/miss_'+LG+'.json',JSON.stringify(await D(()=>window.__i18nMiss||{})));
console.log('errs',errs.length,errs.slice(0,5));await b.close()})();
