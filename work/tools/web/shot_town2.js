// 1.1.31 스토어 7번째(마을) 스크린샷: 아이폰 6.9형 · 6.5형 · 아이패드 13형 × 한 · 영 · 일 → store/shots_1131/<형>_<언어>_7.jpg
// 다른 6장과 같은 보라 바탕 · 연보라 테두리. 먼저 `mkdir fonts && cd fonts && npm i @fontsource/black-han-sans @fontsource/jua`
const {open}=require('./lib.js');const fs=require('fs');const {chromium}=require('playwright');
const OUT='/home/claude/gill-fighter/store/shots_1131';fs.mkdirSync(OUT,{recursive:true});
const CAP={ko:['바닷속 물고기 마을<br>내 손으로 지어요','길 · 구역 · 건물 · 주민 주문까지, 아가미시티'],en:['Build your own<br>undersea fish town','Roads, zones, buildings and orders in Gill City'],ja:['海の中の魚の町を<br>自分の手で作ろう','道・区域・建物・住民の注文まで、エラシティ']};
const SIZES=[{k:'69',W:1320,H:2868,raw:'ph'},{k:'65',W:1284,H:2778,raw:'ph'},{k:'ipad13',W:2064,H:2752,raw:'pad'}];
const RAW={ph:{w:393,h:852,dpr:3},pad:{w:1024,h:1366,dpr:2}};
async function raw(LG,kind){const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.newsSeen='1.1.31';
  const city=JSON.parse(fs.readFileSync(__dirname+'/bigtown.json','utf8'));city.t=Date.now();city.tick=Date.now();const R=RAW[kind];
  const {b,p,errs}=await open({w:R.w,h:R.h,dpr:R.dpr,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(JSON.stringify(city))});sessionStorage.s=1}`});
  await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
  const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen');const bn=document.getElementById('banner');if(bn)bn.style.display='none'});
  await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-city');await p.waitForTimeout(4500);await hide();
  const f=p.frames().find(x=>x.url().includes('city.html'));await f.evaluate(()=>{const x=document.getElementById('pX');if(x)x.click();window.__cityArt.focus('hall',0.95);const t=document.getElementById('toast');if(t)t.style.display='none'});await p.waitForTimeout(3000);await hide();
  const fn=__dirname+'/town_raw_'+kind+'_'+LG+'.png';await p.screenshot({path:fn});await b.close();if(errs.length)console.log('ERR',LG,kind,errs.slice(0,3));return fn}
(async()=>{const css=['black-han-sans','jua'].map(n=>fs.readFileSync(__dirname+'/fonts/node_modules/@fontsource/'+n+'/index.css','utf8').replace(/url\(\.\//g,'url(file://'+__dirname+'/fonts/node_modules/@fontsource/'+n+'/')).join('');
  const br=await chromium.launch({args:['--allow-file-access-from-files']});
  for(const LG of ['ko','en','ja']){const rp={ph:await raw(LG,'ph'),pad:await raw(LG,'pad')};
    for(const S of SIZES){const {W,H}=S,pad=S.raw==='pad',capH=Math.round(H*(pad?.2:.205)),u=W/1320;
      const h1=Math.round((LG==='ja'?104:118)*(pad?1.15:u)),p1=Math.round(50*(pad?1.15:u));
      const html=`<html><head><style>${css}body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:linear-gradient(180deg,#2B1C5F 0%,#49307F 50%,#653C9A 100%);font-family:'Black Han Sans',sans-serif}
.cap{position:absolute;left:0;right:0;top:0;height:${capH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff}
h1{margin:0;font-size:${h1}px;line-height:1.12;font-weight:400;text-shadow:0 8px 0 rgba(0,0,0,.25)}p{margin:${Math.round(28*u)}px 0 0;font-family:Jua,sans-serif;font-size:${p1}px;color:#FFE7A8}
.ph{position:absolute;left:50%;top:${capH}px;transform:translateX(-50%);height:${H-capH-Math.round(90*u)}px;border-radius:${Math.round(70*u)}px;border:${Math.round(10*u)}px solid #EFE7FF;box-shadow:0 24px 60px rgba(0,0,0,.35);overflow:hidden}.ph img{height:100%;display:block}
.bub{position:absolute;border-radius:50%;background:rgba(255,255,255,.12)}</style></head><body><div class="bub" style="left:${60*u}px;top:${90*u}px;width:${60*u}px;height:${60*u}px"></div><div class="bub" style="right:${90*u}px;top:${320*u}px;width:${36*u}px;height:${36*u}px"></div>
<div class="cap"><h1>${CAP[LG][0]}</h1><p>${CAP[LG][1]}</p></div><div class="ph"><img src="file://${rp[S.raw]}"></div></body></html>`;
      fs.writeFileSync(__dirname+'/town_shot.html',html);const pg=await br.newPage({viewport:{width:W,height:H}});await pg.goto('file://'+__dirname+'/town_shot.html');await pg.waitForTimeout(1000);
      await pg.screenshot({path:OUT+'/'+S.k+'_'+LG+'_7.jpg',type:'jpeg',quality:92});await pg.close();console.log('ok',S.k,LG)}}
  await br.close()})();
