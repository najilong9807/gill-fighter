// 물고기 이야기 안 읽은 장 → 시간 알약 · 물고기 친구 버튼 점, 이야기 열면 사라짐
const {open}=require('./lib.js');const fs=require('fs');
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';seed.tkHoldT=1;seed.aby=seed.aby||{};seed.aby.aff={anchovy:{n:20,d:'',c:0,sl:1}};
const {b,p,errs}=await open({w:393,h:852,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-tank');await p.waitForTimeout(2500);await hide();
const q=()=>p.evaluate(()=>[...document.querySelectorAll('.aq-time')].map(e=>e.classList.contains('aqs-dot')).join(','));console.log('알약 점',await q());
await p.screenshot({path:__dirname+'/dot1.png',clip:{x:0,y:0,width:393,height:160}});
await p.evaluate(()=>{const t=[...document.querySelectorAll('.aq-time')].find(e=>e.offsetParent);if(t)t.click()});await p.waitForTimeout(1800);
console.log('친구 버튼 점',await p.evaluate(()=>{const b=document.querySelector('#aqNow .aq-fr');return b&&b.classList.contains('aqs-dot')}));
await p.evaluate(()=>{const b=document.querySelector('#aqNow .aq-fr');if(b)b.click()});await p.waitForTimeout(500);await p.evaluate(()=>{const r=document.querySelector('#aqFr .aq-f');if(r)r.click()});await p.waitForTimeout(500);
await hide();await p.waitForTimeout(1800);console.log('읽은 뒤 알약 점',await q());console.log('errs',errs);await b.close()})();
