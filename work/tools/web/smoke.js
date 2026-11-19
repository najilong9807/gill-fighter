// 홈 → 싱글 한 판 잠깐 → 홈 → 수족관 → 도감 → 상점, 오류만 봄
const {open}=require('./lib.js');const fs=require('fs');
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));
const {b,p,errs}=await open({w:393,h:852,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(3000);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(2500);await hide();
await p.click('#playBtn').catch(e=>console.log('play',e.message.slice(0,60)));await p.waitForTimeout(4000);
await p.mouse.move(200,400);await p.mouse.down();await p.mouse.move(260,380,{steps:10});await p.waitForTimeout(1500);await p.mouse.up();
for(const t of ['#tab-home','#tab-tank','#tab-dex','#tab-sea','#tab-tank']){await hide();await p.click(t).catch(e=>console.log(t,e.message.slice(0,60)));await p.waitForTimeout(1200)}
console.log('errs',errs);await b.close()})();
