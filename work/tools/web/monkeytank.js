// 수족관 막 누르기: 수족관 탭에서 버튼 · 화면 · 꾹 누르기 · 끌기를 무작위 250번
const {open}=require('./lib.js');const fs=require('fs');const SEED=+process.argv[2]||1,LG=process.argv[3]||'ko';
let rs=SEED;function rnd(){rs=(rs*1103515245+12345)&0x7fffffff;return rs/0x7fffffff}
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';seed.lang=LG;seed.aby=seed.aby||{};seed.aby.aff={anchovy:{n:70,d:'',c:0}};
const {b,p,errs}=await open({w:393,h:852,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(fs.readFileSync(__dirname+'/bigtown.json','utf8'))});sessionStorage.s=1}`});
await p.context().addInitScript(()=>{window.__E=[];addEventListener('error',e=>window.__E.push(String(e.message).slice(0,140)))});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-tank');await p.waitForTimeout(1500);await p.evaluate(()=>{try{__tkPost.spawn()}catch(e){}});
let n=0;for(let i=0;i<250;i++){const r=rnd();
 try{const onTank=await p.evaluate(()=>!document.getElementById('tank')||!document.getElementById('tank').hidden);
  if(r<.08){try{await p.evaluate(()=>{try{__tkPost.spawn()}catch(e){}})}catch(e){}}
  if(r<.05){await p.click(['#tab-tank','#tab-home','#tab-city','#tab-tank'][Math.floor(rnd()*4)]);await p.waitForTimeout(500);continue}
  if(r<.45){await p.evaluate(k=>{const bs=[...document.querySelectorAll('button,.aq-f,.aq-time')].filter(b=>b.offsetParent!==null||getComputedStyle(b).position==='fixed').filter(b=>{const q=b.getBoundingClientRect();return q.width>0&&q.height>0&&q.top>=0&&q.top<852&&!b.disabled&&!/reset|del|wipe|load|restore|buy|purchase/i.test(b.id+' '+b.className)});if(bs.length){window.confirm=()=>false;window.prompt=()=>null;bs[Math.floor(k*bs.length)].click()}},rnd());n++}
  else{const x=20+rnd()*350,y=150+rnd()*560;if(rnd()<.4){await p.mouse.move(x,y);await p.mouse.down();await p.waitForTimeout(rnd()<.5?600:120);await p.mouse.move(x+rnd()*160-80,y+rnd()*160-80,{steps:5});await p.mouse.up()}else await p.mouse.click(x,y)}
  await p.waitForTimeout(80)}catch(e){if(!/detached|Target closed|Execution context|intercepts|not visible|Timeout/.test(e.message))console.log('test',e.message.slice(0,80))}}
const fe=await p.evaluate(()=>window.__E);console.log(LG,SEED,'버튼',n,'오류',JSON.stringify(fe),JSON.stringify(errs.slice(0,3)));await b.close()})();
