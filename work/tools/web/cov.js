// 본게임 안 마을 탭으로 큰 마을을 열고 여러 창을 찍으며 글 넘침 · 잘림을 찾음
// node cov.js <폭> <높이> <언어> [찍을것 접두어]
const {open}=require('./lib.js');const fs=require('fs');const OUT=__dirname+'/cov';fs.mkdirSync(OUT,{recursive:true});
const W=+process.argv[2]||393,H=+process.argv[3]||852,LG=process.argv[4]||'ko';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.pearls=87000;seed.gems=900;
const city=fs.readFileSync(__dirname+'/bigtown.json','utf8');
const {b,p,errs}=await open({w:W,h:H,dpr:1,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(city)});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await p.click('#tab-city');await p.waitForTimeout(3500);
const f=p.frames().find(x=>x.url().includes('city.html'));
const pre=OUT+'/'+LG+W+'_';const probs=[];
async function check(name){await p.waitForTimeout(450);await p.screenshot({path:pre+name+'.png'});
  const r=await f.evaluate(()=>{const o=[],vw=innerWidth,vh=innerHeight;document.querySelectorAll('body *').forEach(e=>{if(!e.offsetParent&&getComputedStyle(e).position!=='fixed')return;if(e.closest('[hidden]'))return;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none')return;
      const own=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!own)return;const t=e.textContent.trim().slice(0,40);
      if(e.scrollWidth>e.clientWidth+2&&cs.overflowX!=='auto'&&cs.overflowX!=='scroll')o.push('넘침 '+t+' ('+e.scrollWidth+'>'+e.clientWidth+')');
      const rc=e.getBoundingClientRect();if(rc.width&&(rc.right>vw+1||rc.left<-1))o.push('화면밖 '+t+' ['+Math.round(rc.left)+'~'+Math.round(rc.right)+']');
      if(/[가-힣]/.test(t)&&document.documentElement.lang!=='ko')o.push('한글 '+t)});return [...new Set(o)].slice(0,12)});
  if(r.length)probs.push(name+': '+r.join(' | '))}
const ev=(s)=>f.evaluate(s);
await check('main');
for(const c of ['zone','prod','trade','pub','deco']){await ev(`(()=>{document.getElementById('bBuild').click()})()`);await p.waitForTimeout(300);await ev(`(()=>{const b=[...document.querySelectorAll('#tray [data-c],#tray [data-cat],#tray .cats button')].find(x=>(x.dataset.c||x.dataset.cat||'')==='${c}');if(b)b.click()})()`);await check('build_'+c);await ev(`document.getElementById('bBuild').click()`)}
await ev(`document.getElementById('bOrd').click()`);await check('orders');await ev(`(()=>{const x=document.getElementById('pX');if(x)x.click()})()`);
await ev(`document.getElementById('bStore').click()`);await check('store');await ev(`(()=>{const x=document.getElementById('pX');if(x)x.click()})()`);
await ev(`document.getElementById('bMenu').click()`);await check('menu');await ev(`(()=>{const x=document.getElementById('pX');if(x)x.click()})()`);
await ev(`window.__city.sel('hall')`);await check('hall');await ev(`(()=>{const x=document.getElementById('pX');if(x)x.click()})()`);
await ev(`window.__city.sel('port')`);await check('port');await ev(`(()=>{const x=document.getElementById('pX');if(x)x.click()})()`);
await ev(`window.__city.sel('quarry')`);await check('quarry');await ev(`(()=>{const x=document.getElementById('pX');if(x)x.click()})()`);
await ev(`document.getElementById('bEvt').click()`);await check('evt');await ev(`(()=>{const x=document.getElementById('pX');if(x)x.click()})()`);
console.log('번역 빠짐',JSON.stringify(await ev(`Object.keys(window.__i18nMiss||{}).slice(0,20)`)));
await ev(`window.__city.sel('aqua')`);await check('aqua');
try{await ev(`(()=>{const b=document.getElementById('pAqua');if(b)setTimeout(()=>b.click(),50);return !!b})()`)}catch(e){}await p.waitForTimeout(800);
console.log('수족관 버튼 → 탭',await p.evaluate(()=>({ov:!!document.getElementById('cityOv'),tank:!document.getElementById('tankUI').hidden})));
console.log(probs.join('\n')||'문제 없음');console.log('errs',errs);await b.close()})();
