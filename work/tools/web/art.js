const {open}=require('./lib.js');const fs=require('fs');
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();
const {b,p,errs}=await open({w:393,h:852,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(2000);await hide();await p.click('#tab-city');await p.waitForTimeout(3500);
const f=p.frames().find(x=>x.url().includes('city.html'));
await f.evaluate(()=>{const x=document.getElementById('pX');if(x)x.click()});

console.log(await f.evaluate(()=>window.__cityArt.focus('quarry',1.1)));await p.waitForTimeout(1200);
await p.screenshot({path:__dirname+'/art_q.png'});
console.log(await f.evaluate(()=>window.__cityArt.focus('pump',1.1)));await p.waitForTimeout(1200);
await p.screenshot({path:__dirname+'/art_p.png'});
console.log('errs',errs);await b.close()})();
