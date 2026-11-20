// 40차 주민 눌러 보기 — node people.js <lang>
const {open}=require('./lib.js');const fs=require('fs');const OUT=__dirname+'/depth';fs.mkdirSync(OUT,{recursive:true});const LG=process.argv[2]||'ko';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;const city=fs.readFileSync(__dirname+'/bigtown.json','utf8');
const {b,p,errs}=await open({init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(city)});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await p.click('#tab-city');await p.waitForTimeout(9000);const f=p.frames().find(x=>x.url().includes('city.html'));const D=s=>f.evaluate(s);
console.log('walkers',await D(()=>__people.n()));
// 실제로 화면을 눌러 봄
let hit=false;for(let k=0;k<20&&!hit;k++){const q=await D(()=>__people.pos());if(q&&q.x>20&&q.x<370&&q.y>200&&q.y<620){const fr=await f.frameElement();const bb=await fr.boundingBox();await p.mouse.click(bb.x+q.x,bb.y+q.y);await p.waitForTimeout(400);hit=await D(()=>!!document.querySelector('#panel .say')&&!document.getElementById('panel').hidden)}else await p.waitForTimeout(700)}
console.log('tap hit',hit);if(!hit)console.log('open',await D(()=>__people.open()));await p.waitForTimeout(300);
console.log('panel',await D(()=>document.getElementById('panel').innerText.replace(/\n+/g,' / ')));await p.screenshot({path:OUT+'/'+LG+'_people.png'});
fs.writeFileSync(OUT+'/miss_p_'+LG+'.json',JSON.stringify(await D(()=>window.__i18nMiss||{})));console.log('errs',errs.length,errs.slice(0,3));await b.close()})();
