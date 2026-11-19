// 본게임 → 마을: 싱글 22초 → 그만 → 결과 창에 '마을 재료 상자' 줄 → 마을 탭 → 상자 받기 / 새 물고기 이사
const {open}=require('./lib.js');const fs=require('fs');const LG=process.argv[2]||'ko';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.newsSeen='1.1.30';seed.cityIn=1;
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.kf={anchovy:1};// 새 물고기 시험: 멸치만 아는 상태
seed.owned=Array.from(new Set((seed.owned||[]).concat(['goldfish'])));
const {b,p,errs}=await open({w:393,h:852,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{if(o.id!=='over')o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(2500);await hide();
await p.click('#playBtn');await p.waitForTimeout(800);await p.click('#mpRec').catch(e=>console.log('mode',e.message.slice(0,40)));await p.waitForTimeout(1500);console.log('state',await p.evaluate(()=>document.getElementById('hud')&&!document.getElementById('hud').hidden));
await p.mouse.move(200,420);await p.mouse.down();for(let i=0;i<30;i++){await p.mouse.move(200+Math.sin(i)*60,420+Math.cos(i)*60,{steps:5});await p.waitForTimeout(950)}await p.mouse.up();
await p.evaluate(()=>document.getElementById('pauseBtn').click());await p.waitForTimeout(300);await p.evaluate(()=>document.getElementById('quitBtn').click());await Promise.resolve(0).catch(e=>console.log('pause',e.message.slice(0,50)));await p.waitForTimeout(400);await p.waitForTimeout(1500);
await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.offsetParent&&/결과 보기|result/i.test(x.textContent));if(b)b.click()});await p.waitForTimeout(1500);console.log('결과',await p.evaluate(()=>{const r=document.getElementById('oRec');return r?r.innerText.replace(/\n+/g,' | '):'-'}),'상자',await p.evaluate(()=>localStorage.getItem('gfcity.gift')));
await p.screenshot({path:__dirname+'/crate_over_'+LG+'.png'});
await p.evaluate(()=>document.getElementById('tab-home').click());await p.waitForTimeout(800);await hide();
console.log('마을 점',await p.evaluate(()=>!document.getElementById('cityDot').hidden));
await p.click('#tab-city');await p.waitForTimeout(4500);
const f=p.frames().find(x=>x.url().includes('city.html'));
console.log('알림',await f.evaluate(()=>{const e=document.getElementById('giftN');return e&&!e.hidden?e.innerText:'없음'}),'토스트',await f.evaluate(()=>document.getElementById('toast').textContent));
await p.screenshot({path:__dirname+'/crate_city_'+LG+'.png'});
const r0=await f.evaluate(()=>JSON.parse(localStorage.getItem('gfcity.v1')).res);
await f.evaluate(()=>document.getElementById('giftN').click());await p.waitForTimeout(800);
console.log('받은 뒤 토스트',await f.evaluate(()=>document.getElementById('toast').textContent));
await f.evaluate(()=>window.GF_CITY_SAVE&&window.GF_CITY_SAVE());const r1=await f.evaluate(()=>JSON.parse(localStorage.getItem('gfcity.v1')).res);
console.log('재료',JSON.stringify(r0),'→',JSON.stringify(r1),'상자',await p.evaluate(()=>localStorage.getItem('gfcity.gift')),'kf',await f.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem('gfcity.v1')).kf||{}).join(',')));
await p.screenshot({path:__dirname+'/crate_open_'+LG+'.png'});
console.log('번역 빠짐',JSON.stringify(await f.evaluate(()=>Object.keys(window.__i18nMiss||{}).slice(0,10))));
console.log('errs',errs);await b.close()})();
