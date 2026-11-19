// 큰 마을 성능: 마을 탭에서 10초 동안 프레임 간격 재기(헤드리스라 실제 폰보다 느릴 수 있음 — 비교용)
const {open}=require('./lib.js');const fs=require('fs');
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();
const {b,p,errs}=await open({w:393,h:852,dpr:3,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(2000);await hide();await p.click('#tab-city');await p.waitForTimeout(4000);
const f=p.frames().find(x=>x.url().includes('city.html'));
await f.evaluate(()=>{const x=document.getElementById('pX');if(x)x.click()});
for(const z of [.75,.4]){await f.evaluate(z=>{window.__city.cam.z=z},z);await p.waitForTimeout(800);
const r=await f.evaluate(()=>new Promise(res=>{const ts=[];let last=performance.now();function fr(t){ts.push(t-last);last=t;if(ts.length<240)requestAnimationFrame(fr);else res(ts)}requestAnimationFrame(fr)}));
r.sort((a,b)=>a-b);const avg=r.reduce((a,b)=>a+b,0)/r.length;console.log('줌',z,'평균',avg.toFixed(1),'ms · 중간',r[120].toFixed(1),'· 느린 5%',r[228].toFixed(1),'· 최악',r[239].toFixed(1))}
// 메인 게임 홈 비교
await p.click('#tab-home');await p.waitForTimeout(1500);
const r2=await p.evaluate(()=>new Promise(res=>{const ts=[];let last=performance.now();function fr(t){ts.push(t-last);last=t;if(ts.length<240)requestAnimationFrame(fr);else res(ts)}requestAnimationFrame(fr)}));r2.sort((a,b)=>a-b);
console.log('홈 비교 평균',(r2.reduce((a,b)=>a+b,0)/r2.length).toFixed(1),'느린 5%',r2[228].toFixed(1));
console.log('errs',errs);await b.close()})();
