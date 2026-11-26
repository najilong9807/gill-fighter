// 앱스토어 미리보기 영상(886x1920, 30fps, 약 29.5초): node pv/make.js <lang> → pv/out/preview_<lang>.mp4
const {openPV}=require('./lib2.js');const fs=require('fs');const CLK=require('./clock.js');const RICH=require('./rich.js');const {execSync}=require('child_process');
const LG=process.argv[2]||'ko';const CAP=JSON.parse(fs.readFileSync(__dirname+'/caps.json','utf8'))[LG];const FPS=30;
const FB='/tools/web/fonts/node_modules/@fontsource/';
const FONT={ko:["black-han-sans/400.css","'Black Han Sans'",400],ja:[null,"'Noto Sans CJK JP'",900],zhs:[null,"'Noto Sans CJK SC'",900],zht:[null,"'Noto Sans CJK TC'",900],
 ar:["noto-sans-arabic/900.css","'Noto Sans Arabic'",900],he:["noto-sans-hebrew/900.css","'Noto Sans Hebrew'",900],th:["noto-sans-thai/900.css","'Noto Sans Thai'",900],hi:["noto-sans-devanagari/900.css","'Noto Sans Devanagari'",900]}[LG]||["noto-sans/900.css","'Noto Sans'",900];
const RTL=LG==='ar'||LG==='he';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/../seed.json','utf8'));seed.lang=LG;seed.newsSeen='1.1.33';seed.newsMute=1;seed.cur132=0;
const city=JSON.parse(fs.readFileSync(__dirname+'/../bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();
const {b,c,p,errs}=await openPV({w:443,h:960,dpr:2,init:CLK+`;if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(3500);
const ev=s=>p.evaluate(s=>__ev(s),s);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{if(o.id!=='pvCap')o.hidden=true});document.body.classList.remove('ovOpen');['banner','toast'].forEach(i=>{const e=document.getElementById(i);if(e)e.style.display='none'})});
await hide();console.log(await ev(RICH));
await ev(`(function(){var ids=SPECIES.map(function(s){return s.id});save.owned=ids.filter(function(_,i){return i%6===0});save.tkc={clean:Date.now()+864e5*30,str:3,last:'',n:3};save.c1=save.c1||{};persist();return save.owned.length})()`);
// 자막 칸
await p.evaluate(([FB,F,RTL])=>{const st=document.createElement('style');let css='';if(F[0])css+='@import url('+FB+F[0]+');';
 css+=`#pvCap{position:fixed;left:0;right:0;top:112px;z-index:2147483647;display:flex;flex-direction:column;align-items:center;pointer-events:none;direction:${RTL?'rtl':'ltr'}}
 #pvCap b{display:block;max-width:410px;text-align:center;font-family:${F[1]},'Noto Sans',sans-serif;font-weight:${F[2]};font-size:35px;line-height:1.18;color:#FFE65A;-webkit-text-stroke:8px #14284A;paint-order:stroke fill;filter:drop-shadow(0 4px 0 rgba(0,0,0,.35));letter-spacing:-.3px}
 #pvCap i{font-style:normal;font-family:'Noto Sans',sans-serif;font-weight:900;font-size:19px;color:#fff;background:#FF4D6D;border:3px solid #14284A;border-radius:14px;padding:1px 12px;margin-bottom:6px}`;
 st.textContent=css;document.head.appendChild(st);const d=document.createElement('div');d.id='pvCap';document.body.appendChild(d)},[FB,FONT,RTL]);
await p.waitForTimeout(1500);
const cap=(t,isNew)=>p.evaluate(([t,n])=>{const d=document.getElementById('pvCap');d.innerHTML=(n?'<i>NEW</i>':'')+'<b></b>';d.querySelector('b').textContent=t},[t,!!isNew]);
const frames=()=>p.frames().filter(f=>f!==p.mainFrame());
const adv=async(ms)=>{await p.evaluate(ms=>__adv(ms),ms);for(const f of frames())await f.evaluate(ms=>window.__adv&&window.__adv(ms),ms).catch(()=>{})};
const setAuto=async v=>{await p.evaluate(v=>__auto(v),v);for(const f of frames())await f.evaluate(v=>window.__auto&&window.__auto(v),v).catch(()=>{})};
const cdp=await c.newCDPSession(p);const D=__dirname+'/fr_'+LG;fs.rmSync(D,{recursive:true,force:true});fs.mkdirSync(D);let N=0;
const rec=async(n,each)=>{for(let i=0;i<n;i++){if(each)await each(i);await adv(1000/FPS);const r=await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:93,clip:{x:0,y:0,width:443,height:960,scale:2}});fs.writeFileSync(D+'/'+String(N++).padStart(5,'0')+'.jpg',Buffer.from(r.data,'base64'))}};
const warm=async n=>{for(let i=0;i<n;i++)await adv(1000/FPS)};
const PILOT=`window.__pre=function(){if(state!=='play')return;if(P.surv){var a=t*.9;joy={id:-7,ox:0,oy:0,x:Math.cos(a)*50,y:Math.sin(a)*35};return}var best=null,bd=1e9,ax=0,ay=0;for(var i=0;i<fish.length;i++){var f=fish[i],dx=f.x-P.x,dy=f.y-P.y,d=Math.hypot(dx,dy)+1;if(f.s>P.s*1.05){if(d<P.s*6+f.s*2){ax-=dx/d*3;ay-=dy/d*3}}else if(f.s<P.s*.92&&d<bd){bd=d;best=f}}if(best){ax+=(best.x-P.x)/bd;ay+=(best.y-P.y)/bd}else{ax=1}var m=Math.hypot(ax,ay)||1;joy={id:-7,ox:0,oy:0,x:ax/m*56,y:ay/m*56}}`;
await ev(PILOT);await setAuto(false);
// 1) 싱글: 작게 태어나 → 쑥쑥
await ev("showTab('home')");await ev("startRun('single');P.revives=9;P.fx.ghost=99;state");await hide();await warm(6);
await cap(CAP[0]);await rec(126);await ev("P.k.grow*=3.5");await cap(CAP[1]);await rec(124);
// 2) 심해 생존
await ev("endRun(false,true)");await warm(10);await hide();await ev("showTab('home')");await ev("svStart(1)");await warm(170);await hide();
await cap(CAP[2]);await rec(120,async i=>{if(i%15==0)await hide()});
// 3) 심해 탐험 지도
await ev("endRun(false,true)");await warm(10);await hide();await ev("showTab('home')");await ev("campOpen(7)");await warm(20);
await cap(CAP[3]);await rec(105);
// 4) 실시간 대전
await hide();await ev("startRun('multi');P.fx.ghost=99;state");await warm(45);await hide();
await cap(CAP[4]);await rec(105,async i=>{if(i%15==0)await hide()});
await ev("endRun(false,true)");await warm(10);await hide();await ev("showTab('home')");await warm(10);
// 5) 마을(NEW)
await setAuto(true);await p.click('#tab-city',{timeout:8000});await p.waitForTimeout(4500);await hide();
let cf=p.frames().find(x=>x.url().includes('city.html'));
await cf.evaluate(()=>{const x=document.getElementById('pX');if(x)x.click();window.__cityArt.focus('hall',0.9);['toast','goal'].forEach(i=>{const t=document.getElementById(i);if(t)t.style.display='none'});[...document.querySelectorAll('body *')].forEach(e=>{const r=e.getBoundingClientRect();if(r.top>40&&r.top<130&&r.width>300&&r.height>30&&r.height<120&&getComputedStyle(e).position!=='static')e.style.visibility='hidden'})});await p.waitForTimeout(2500);await hide();
await setAuto(false);await cap(CAP[5],true);await rec(135);
// 6) 물고기 꾸미기(상점)
await setAuto(true);await hide();await ev("showTab('sea');try{seaJump('secDeco',0)}catch(e){}");await p.waitForTimeout(1500);await p.evaluate(()=>{['banner','toast'].forEach(i=>{const e=document.getElementById(i);if(e)e.style.display='none'})});await setAuto(false);
await cap('');await rec(75);
// 7) 나만의 수족관
await setAuto(true);await ev("showTab('tank')");await p.waitForTimeout(1800);await hide();await setAuto(false);
await cap(CAP[7]);await rec(90);
console.log('frames',N,'errs',errs.length,errs.slice(0,3));await b.close();
fs.mkdirSync(__dirname+'/out',{recursive:true});
execSync(`ffmpeg -v error -y -framerate ${FPS} -i ${D}/%05d.jpg -f lavfi -i anullsrc=r=44100:cl=stereo -map 0:v -map 1:a -c:v libx264 -preset veryfast -crf 17 -profile:v high -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -shortest -movflags +faststart ${__dirname}/out/preview_${LG}.mp4`);
fs.rmSync(D,{recursive:true,force:true});console.log('ok',LG)})();
