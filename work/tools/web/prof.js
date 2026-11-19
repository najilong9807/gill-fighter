// 마을 그리기 프로파일: CDP Profiler 로 4초 → 함수별 자기 시간 상위
const {open}=require('./lib.js');const fs=require('fs');
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();
const {b,c,p,errs}=await open({w:393,h:852,dpr:3,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(2000);await hide();await p.click('#tab-city');await p.waitForTimeout(4000);
const f=p.frames().find(x=>x.url().includes('city.html'));await f.evaluate(()=>{const x=document.getElementById('pX');if(x)x.click();window.__city.cam.z=0.75});
const s=await c.newCDPSession(p);await s.send('Profiler.enable');await s.send('Profiler.setSamplingInterval',{interval:200});await s.send('Profiler.start');
await p.waitForTimeout(4000);const {profile}=await s.send('Profiler.stop');
const self={},byId={};profile.nodes.forEach(n=>byId[n.id]=n);const dt=profile.timeDeltas,smp=profile.samples;
for(let i=0;i<smp.length;i++){const n=byId[smp[i]];const k=(n.callFrame.functionName||'(anon)')+(n.callFrame.url.includes('city')?' [city]':n.callFrame.url?' [main]':'');self[k]=(self[k]||0)+(dt[i]||0)}
const tot=Object.values(self).reduce((a,b)=>a+b,0);Object.entries(self).sort((a,b)=>b[1]-a[1]).slice(0,22).forEach(([k,v])=>console.log((v/tot*100).toFixed(1)+'%',k));
await b.close()})();
