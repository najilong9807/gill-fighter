// 메뉴 · 도움말 화면: 처음부터 버튼이 앱에선 안 보이는지, 새 도움말 문단 번역
const {open}=require('./lib.js');const fs=require('fs');const LG=process.argv[2]||'ko';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.newsSeen='1.1.30';
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();
const {b,p,errs}=await open({w:393,h:852,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(2000);await hide();await p.click('#tab-city');await p.waitForTimeout(3500);
const f=p.frames().find(x=>x.url().includes('city.html'));
await f.evaluate(()=>document.getElementById('bMenu').click());await p.waitForTimeout(400);
console.log('메뉴',await f.evaluate(()=>[...document.querySelectorAll('#panel [data-m]')].map(b=>b.dataset.m).join(',')));
await f.evaluate(()=>document.querySelector('#panel [data-m=help]').click());await p.waitForTimeout(400);
console.log('도움말 끝',await f.evaluate(()=>document.getElementById('panel').innerText.slice(-420).replace(/\n+/g,' / ')));
await p.screenshot({path:__dirname+'/help_'+LG+'.png'});
console.log('번역 빠짐',JSON.stringify(await f.evaluate(()=>Object.values(window.__i18nMiss||{}).map(v=>(v.match(/[가-힣][가-힣 ]*/g)||[]).join('|')).slice(0,8))));
console.log('errs',errs);await b.close()})();
