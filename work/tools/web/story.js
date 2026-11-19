// 물고기 이야기: 수족관 → 지금 수족관 → 물고기 친구 → 멸치 → 이야기
const {open}=require('./lib.js');const fs=require('fs');const LG=process.argv[2]||'ko';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.newsSeen='1.1.30';seed.aby=seed.aby||{};seed.aby.aff={anchovy:{n:+(process.env.N||66),d:'',c:0,tp:4}};seed.tkHoldT=1;
const {b,p,errs}=await open({w:393,h:852,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(2000);await hide();await p.click('#tab-tank');await p.waitForTimeout(2000);await hide();
await p.evaluate(()=>{const t=document.querySelector('.aq-time');if(t)t.click()});await p.waitForTimeout(500);
await p.evaluate(()=>{const b=document.querySelector('#aqNow .aq-fr');if(b)b.click()});await p.waitForTimeout(500);
console.log('목록',await p.evaluate(()=>{const e=document.getElementById('aqFr');return e&&!e.hidden?e.querySelector('.aq-body').innerText.replace(/\n+/g,' / ').slice(0,300):'없음'}));
await p.screenshot({path:__dirname+'/story_list_'+LG+'.png'});
await p.evaluate(()=>{const r=document.querySelector('#aqFr .aq-f');if(r)r.click()});await p.waitForTimeout(500);
console.log('이야기',await p.evaluate(()=>{const e=document.getElementById('aqStory');return e&&!e.hidden?e.innerText.replace(/\n+/g,' / ').slice(0,900):'없음'}));
await p.screenshot({path:__dirname+'/story_'+LG+'.png'});
console.log('errs',errs);await b.close()})();
