// 스토어 7번째 후보: 마을 화면 찍기 + 제목 틀 씌우기 (지금 그림 · 21일 그림 바꾼 뒤 다시 돌릴 것)
const {open}=require('./lib.js');const fs=require('fs');const {chromium}=require('playwright');
const CAP={ko:['바닷속 물고기 마을<br>내 손으로 지어요','길 · 구역 · 건물 · 주민 주문까지, 아가미시티'],en:['Build your own<br>undersea fish town','Roads, zones, buildings and orders in Gill City'],ja:['海の中の魚の町を<br>自分の手で作ろう','道・区域・建物・住民の注文まで、エラシティ']};
(async()=>{for(const LG of ['ko','en','ja']){const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.newsSeen='1.1.30';
const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();
const {b,p}=await open({w:393,h:852,dpr:3,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen');const bn=document.getElementById('banner');if(bn)bn.style.display='none'});
await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-city');await p.waitForTimeout(4000);await hide();
const f=p.frames().find(x=>x.url().includes('city.html'));await f.evaluate(()=>{const x=document.getElementById('pX');if(x)x.click();window.__cityArt.focus('hall',0.95);const t=document.getElementById('toast');if(t)t.style.display='none'});await p.waitForTimeout(2500);await hide();
await p.screenshot({path:__dirname+'/town_raw_'+LG+'.png'});await b.close();
const W=1320,H=2868,capH=Math.round(H*.205);
const css=fs.readFileSync(__dirname+'/fonts/node_modules/@fontsource/black-han-sans/index.css','utf8').replace(/url\(\.\//g,'url(file://'+__dirname+'/fonts/node_modules/@fontsource/black-han-sans/')+fs.readFileSync(__dirname+'/fonts/node_modules/@fontsource/jua/index.css','utf8').replace(/url\(\.\//g,'url(file://'+__dirname+'/fonts/node_modules/@fontsource/jua/');
const html=`<html><head><style>${css}body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:linear-gradient(170deg,#0E3A5C 0%,#1F8F86 100%);font-family:'Black Han Sans',sans-serif}
.cap{position:absolute;left:0;right:0;top:0;height:${capH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff}
h1{margin:0;font-size:${LG==='ja'?104:118}px;line-height:1.12;font-weight:400;text-shadow:0 8px 0 rgba(0,0,0,.28)}p{margin:28px 0 0;font-family:Jua,sans-serif;font-size:50px;color:#FFE7A8}
.ph{position:absolute;left:50%;top:${capH}px;transform:translateX(-50%);height:${H-capH-90}px;border-radius:70px;border:10px solid #fff;box-shadow:0 24px 60px rgba(0,0,0,.35);overflow:hidden}.ph img{height:100%;display:block}
.bub{position:absolute;border-radius:50%;background:rgba(255,255,255,.12)}</style></head><body><div class="bub" style="left:60px;top:90px;width:60px;height:60px"></div><div class="bub" style="right:90px;top:320px;width:36px;height:36px"></div>
<div class="cap"><h1>${CAP[LG][0]}</h1><p>${CAP[LG][1]}</p></div><div class="ph"><img src="file://${__dirname}/town_raw_${LG}.png"></div></body></html>`;
fs.writeFileSync(__dirname+'/town_shot.html',html);const br=await chromium.launch({args:['--allow-file-access-from-files']});const pg=await br.newPage({viewport:{width:W,height:H}});await pg.goto('file://'+__dirname+'/town_shot.html');await pg.waitForTimeout(1200);
await pg.screenshot({path:__dirname+'/69_'+LG+'_7.jpg',type:'jpeg',quality:92});await br.close();console.log('ok',LG)}})();
