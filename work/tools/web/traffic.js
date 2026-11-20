// 41차 교통 — node traffic.js <lang>
const {open}=require('./lib.js');const fs=require('fs');const OUT=__dirname+'/depth';fs.mkdirSync(OUT,{recursive:true});const LG=process.argv[2]||'ko';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;const city=fs.readFileSync(__dirname+'/bigtown.json','utf8');
const {b,p,errs}=await open({init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(city)});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await p.click('#tab-city');await p.waitForTimeout(4000);const f=p.frames().find(x=>x.url().includes('city.html'));const D=s=>f.evaluate(s);const shot=n=>p.screenshot({path:OUT+'/'+LG+'_'+n+'.png'});
console.log('stat',JSON.stringify(await D(()=>__traf.stat())),'cs',JSON.stringify(await D(()=>__depth.cs())));
await f.click('#bBuild');await p.waitForTimeout(300);await f.click('.pills [data-c=road]');await p.waitForTimeout(300);await shot('roadtab');
await f.click('[data-tool=rup]');await p.waitForTimeout(800);await shot('rup');
// 화면 가운데를 끌어 칠함
const fr=await f.frameElement();const bb=await fr.boundingBox();const st0=await D(()=>JSON.stringify(__traf.stat()));
await p.mouse.move(bb.x+150,bb.y+430);await p.mouse.down();for(let i=0;i<12;i++){await p.mouse.move(bb.x+150+i*10,bb.y+430+i*5);await p.waitForTimeout(30)}await p.mouse.up();await p.waitForTimeout(2500);
console.log('after paint',await D(()=>JSON.stringify(__traf.stat())),'was',st0);await shot('rup2');
await f.click('#tDone');await p.waitForTimeout(300);
console.log('paint all jam→gravel',await D(()=>__traf.paint(2)),JSON.stringify(await D(()=>__traf.stat())));
console.log('bus',JSON.stringify(await D(()=>__traf.bus(20,20))));
await f.click('#bBuild');await p.waitForTimeout(300);await f.click('.pills [data-c=base]');await p.waitForTimeout(300);await f.evaluate(()=>{const c=document.querySelector('.cards');c.scrollLeft=c.scrollWidth});await shot('busbase');await f.click('#tX');
fs.writeFileSync(OUT+'/miss_t_'+LG+'.json',JSON.stringify(await D(()=>window.__i18nMiss||{})));console.log('errs',errs.length,errs.slice(0,3));await b.close()})();
