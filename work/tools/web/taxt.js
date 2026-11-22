const {open}=require('./lib.js');const fs=require('fs');
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.31';seed.lang=process.argv[2]||'ko';
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();
const {b,p,errs}=await open({w:393,h:852,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-city');await p.waitForTimeout(5000);await hide();
const f=p.frames().find(x=>x.url().includes('city.html'));const T=s=>f.evaluate(s);
console.log('base',JSON.stringify(await T(()=>window.__tax.cs())));
for(const r of [[15,9,9],[3,9,9],[9,15,15]]){await f.evaluate(r=>window.__tax.set(r[0],r[1],r[2]),r);await p.waitForTimeout(3500);console.log(r.join('/'),JSON.stringify(await T(()=>window.__tax.cs())))}
await T(()=>window.__tax.set(12,10,6));await p.waitForTimeout(2000);await T(()=>window.__tax.open());await p.waitForTimeout(800);await p.screenshot({path:__dirname+'/tax_'+(process.argv[2]||'ko')+'.png'});
const ko=await f.evaluate(()=>document.getElementById('panel').innerText.split('\n').filter(l=>/[가-힣]/.test(l)));console.log('ko-left',process.argv[2]||'ko',ko.length);
// 메뉴에 세율 버튼
console.log('errs',errs);await b.close()})();
