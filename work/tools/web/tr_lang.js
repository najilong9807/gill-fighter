const {open}=require('./lib.js');const fs=require('fs');
(async()=>{for(const lang of (process.argv[2]||'en,de,ja').split(',')){const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.31';seed.lang=lang;
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();
const {b,p,errs}=await open({w:393,h:852,dpr:1,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-city');await p.waitForTimeout(4000);await hide();
const f=p.frames().find(x=>x.url().includes('city.html'));const out=[];
for(const c of ['road','zone','base']){await f.evaluate(()=>{const b=document.getElementById('bBuild');if(b)b.click()});await p.waitForTimeout(400);await f.evaluate((c)=>{const q=document.querySelector('#tray .pills [data-c='+c+']');if(q)q.click()},c);await p.waitForTimeout(500);
  const t=await f.evaluate(()=>document.getElementById('tray').innerText);const ko=t.split('\n').filter(l=>/[가-힣]/.test(l));out.push(c+': '+(ko.length?'한글 남음 → '+ko.join(' | '):'OK'));
  if(c==='road')out.push('  '+t.split('\n').filter(l=>/🚋/.test(l)).join(' / '));if(c==='base')out.push('  '+t.split('\n').filter((l,i,a)=>/🚋|tram|Tram|トラム|Straßenbahn/i.test(l)).slice(0,3).join(' / '));
  await f.evaluate(()=>{const b=document.getElementById('bBuild');if(b)b.click()});await p.waitForTimeout(300)}
console.log(lang,out.join('\n'),'errs',errs.length);await b.close()}})();
