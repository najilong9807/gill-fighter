// 마을 처음 들어온 사람: 프롤로그 → 첫 할 일 몇 단계 화면
const {open}=require('./lib.js');const fs=require('fs');const LG=process.argv[2]||'ko';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.newsSeen='1.1.30';
const {b,p,errs}=await open({w:393,h:852,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.removeItem('gfcity.v1');sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-city');await p.waitForTimeout(3000);
const f=p.frames().find(x=>x.url().includes('city.html'));
for(let i=0;i<9;i++){await p.screenshot({path:__dirname+'/first_'+LG+i+'.png'});
  const t=await f.evaluate(()=>{const vis=e=>e&&!e.hidden&&e.offsetWidth>0;const pro=document.getElementById('pro');const cands=[...document.querySelectorAll('#pro button, #panel button.main, #panel button')].filter(vis);const bt=cands[0];const txt=(vis(pro)?pro.innerText:document.getElementById('panel')&&vis(document.getElementById('panel'))?document.getElementById('panel').innerText:(document.getElementById('goal')||{}).innerText||'').replace(/\s+/g,' ').slice(0,200);if(bt)bt.click();return (bt?'['+bt.innerText.trim()+'] ':'(버튼 없음) ')+txt});
  console.log(i,t);await p.waitForTimeout(900)}
console.log('errs',errs);await b.close()})();
