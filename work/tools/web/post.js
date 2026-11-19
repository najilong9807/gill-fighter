// 마을 택배 거북: 수족관에서 나타남 → 누르면 진주
const {open}=require('./lib.js');const fs=require('fs');const LG=process.argv[2]||'ko',W=+process.argv[3]||393,H=+process.argv[4]||852;
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.newsSeen='1.1.30';seed.tkHoldT=1;
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));
const {b,p,errs}=await open({w:W,h:H,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-tank');await p.waitForTimeout(2000);await hide();
console.log('상태',JSON.stringify(await p.evaluate(()=>__tkPost.st())));
await p.evaluate(()=>__tkPost.spawn());await p.waitForTimeout(3500);
const sc=await p.evaluate(()=>__tkPost.sc());console.log('화면 위치',JSON.stringify(sc));await p.screenshot({path:__dirname+'/post_'+LG+W+'.png'});
const pe0=await p.evaluate(()=>JSON.parse(localStorage.getItem('fishproto.save2')).pearls);
if(sc)await p.mouse.click(sc.x,sc.y);await p.waitForTimeout(700);await p.screenshot({path:__dirname+'/post2_'+LG+W+'.png'});
await p.waitForTimeout(800);const pe1=await p.evaluate(()=>JSON.parse(localStorage.getItem('fishproto.save2')).pearls);
console.log('진주',pe0,'→',pe1,'상태',JSON.stringify(await p.evaluate(()=>{const s=__tkPost.st();return {po:!!s.po&&s.po.out,s:s.s}})),'배너',await p.evaluate(()=>{const b=document.getElementById('banner');return b?b.innerText.replace(/\s+/g,' '):''}));
console.log('errs',errs);await b.close()})();
