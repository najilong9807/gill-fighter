const {open}=require('./lib.js');const fs=require('fs');
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.31';
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();
const {b,p,errs}=await open({w:393,h:852,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-city');await p.waitForTimeout(4000);
await hide();await p.waitForTimeout(500);const f=p.frames().find(x=>x.url().includes('city.html'));
await f.evaluate(()=>{document.querySelectorAll('.ov,.modal,#pX').forEach(x=>{try{if(x.id==='pX')x.click()}catch(e){}})});
const shots=(process.argv[2]||'hall:0.8,hall:0.5,quarry:1.0').split(',');
for(const s of shots){const [k,z]=s.split(':');await f.evaluate(([k,z])=>window.__cityArt.focus(k,+z),[k,z]);await p.waitForTimeout(2500);await p.screenshot({path:__dirname+'/as_'+k+'_'+z+'.png'})}
console.log('errs',errs);await b.close()})();
