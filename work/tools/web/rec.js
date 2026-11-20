// 🏆 마을 기록 창 · 받기 · 마을 이름: node rec.js <lang> [w h]
const {open}=require('./lib.js');const fs=require('fs');const OUT=__dirname+'/rec';fs.mkdirSync(OUT,{recursive:true});
const LG=process.argv[2]||'ko',W=+process.argv[3]||393,H=+process.argv[4]||852;
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;
const city=fs.readFileSync(__dirname+'/bigtown.json','utf8');
const {b,p,errs}=await open({w:W,h:H,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(city)});sessionStorage.s=1}`});
p.on('dialog',d=>{console.log('dialog:',d.message());d.accept(LG==='ko'?'늑구마을':'Gulp Bay Town Long')});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await p.click('#tab-city');await p.waitForTimeout(3500);
const f=p.frames().find(x=>x.url().includes('city.html'));
console.log('rc',await f.evaluate(()=>window.__rc()));
console.log('dot',await f.evaluate(()=>{const e=document.querySelector('#bMenu .rcd');return e&&!e.hidden}));
const gem0=await f.evaluate(()=>+document.getElementById('hG').textContent.replace(/[^0-9]/g,''));
await f.click('#bMenu');await p.waitForTimeout(500);await p.screenshot({path:OUT+'/'+LG+'_menu.png'});
await f.click('[data-m="rec"]');await p.waitForTimeout(500);await p.screenshot({path:OUT+'/'+LG+'_rec.png'});
let n=0;for(let i=0;i<40;i++){const bt=await f.$('[data-r]:not([disabled])');if(!bt)break;await bt.click();n++;await p.waitForTimeout(120)}
console.log('claimed',n,'gem +',(await f.evaluate(()=>+document.getElementById('hG').textContent.replace(/[^0-9]/g,'')))-gem0,'toast',await f.evaluate(()=>document.getElementById('toast').textContent));
await p.screenshot({path:OUT+'/'+LG+'_rec2.png'});
await f.click('#rcEd');await p.waitForTimeout(500);await p.screenshot({path:OUT+'/'+LG+'_name.png'});

console.log('name',await f.evaluate(()=>window.__rcGate()));await p.waitForTimeout(800);await p.screenshot({path:OUT+'/'+LG+'_gate.png'});
console.log('miss',await f.evaluate(()=>Object.keys(window.__i18nMiss||{}).filter(k=>/도장|기록|이름|다녀|쓰다듬|모으기|되기|만들기|배달하기/.test(k))));
console.log('errs',errs.length,errs.slice(0,5));await b.close()})();
