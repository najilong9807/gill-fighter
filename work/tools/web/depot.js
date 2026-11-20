// 택배 거북 조건(38차): 거북 배달소가 있어야 나옴 — node depot.js
const {open}=require('./lib.js');const fs=require('fs');
async function run(name,mod){const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';seed.tkHoldT=1;
 const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));mod(city);
 const {b,p,errs}=await open({init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
 await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
 await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});await p.click('#tab-tank');await p.waitForTimeout(1500);
 const s=await p.evaluate(()=>__tkPost.st());console.log(name,'hall',s.hl,'depot',s.dp,'errs',errs.length);await b.close()}
(async()=>{
 await run('큰 마을',c=>{});
 await run('배달소 없음 · 산호궁 5',c=>{c.b=c.b.filter(x=>x.k!=='turtle');c.b.forEach(x=>{if(x.k==='hall')x.lv=5})});
 await run('배달소 짓는 중(lv0)',c=>{c.b.forEach(x=>{if(x.k==='turtle')x.lv=0})});
 await run('마을 없음',c=>{c.b=[]});
})();
