// 마을 · 수족관 막 누르기: 버튼 · 화면을 무작위로 300번 눌러 JS 오류를 찾음
const {open}=require('./lib.js');const fs=require('fs');const SEED=+process.argv[2]||1,BIG=process.argv[3]!=='new';
let rs=SEED;function rnd(){rs=(rs*1103515245+12345)&0x7fffffff;return rs/0x7fffffff}
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';seed.cityIn=1;
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();
const {b,p,errs}=await open({w:393,h:852,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});${BIG?`localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});`:''}localStorage.setItem('gfcity.gift','{"n":2}');sessionStorage.s=1}`});
await p.context().addInitScript(()=>{window.__E=[];addEventListener('error',e=>window.__E.push(String(e.message).slice(0,140)))});const ferr=[];p.on('console',m=>{if(m.type()==='error')ferr.push(m.text().slice(0,120))});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(2000);await hide();
let n=0;for(let i=0;i<300;i++){const r=rnd();
  try{if(r<.08){const t=['#tab-city','#tab-tank','#tab-home','#tab-city','#tab-city'][Math.floor(rnd()*5)];await p.evaluate(s=>{const e=document.querySelector(s);if(e)e.click()},t);await p.waitForTimeout(700);continue}
  const f=p.frames().find(x=>x.url().includes('city.html'));
  if(f&&r<.6){await f.evaluate(k=>{const bs=[...document.querySelectorAll('button')].filter(b=>b.offsetParent&&!b.disabled&&!/reset/.test(b.dataset.m||''));if(bs.length){const b=bs[Math.floor(k*bs.length)];window.confirm=()=>false;b.click()}},rnd());n++}
  else{const x=20+rnd()*350,y=120+rnd()*600;if(rnd()<.3){await p.mouse.move(x,y);await p.mouse.down();await p.waitForTimeout(rnd()<.3?600:80);await p.mouse.move(x+rnd()*120-60,y+rnd()*120-60,{steps:4});await p.mouse.up()}else await p.mouse.click(x,y)}
  await p.waitForTimeout(60)}catch(e){if(!/detached|Target closed|Execution context/.test(e.message))console.log('test',e.message.slice(0,80))}}
let fe=[];for(const fr of p.frames()){try{fe=fe.concat(await fr.evaluate(()=>window.__E||[]))}catch(e){}}console.log('프레임 오류',JSON.stringify(fe));console.log('눌러 본 버튼',n,'errs',JSON.stringify(errs),'콘솔',JSON.stringify(ferr.slice(0,5)));await b.close()})();
