// 1.1.31 다국어: 폰 언어로 켜서 여러 화면 찍고, 화면에 남은 한글 · 영어 낱말을 모음 — node langscan.js <폰 locale> [저장 lang]
const {open}=require('./lib.js');const fs=require('fs');const OUT=__dirname+'/lang';fs.mkdirSync(OUT,{recursive:true});
const LOC=process.argv[2]||'zh-TW',SL=process.argv[3]||'';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));delete seed.lang;if(SL)seed.lang=SL;seed.newsSeen='1.1.29';delete seed.newsMute;
const city=fs.readFileSync(__dirname+'/bigtown.json','utf8');
const {b,p,errs}=await open({locale:LOC,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(city)});sessionStorage.s=1}`});
const tag=LOC+(SL?'_'+SL:'');const shot=n=>p.screenshot({path:OUT+'/'+tag+'_'+n+'.png'});
await p.goto('http://app.local/index.html');await p.waitForTimeout(3500);
const info=await p.evaluate(()=>({lc:window.GF_LC,lang:document.documentElement.lang,lp:window.GF_LP,trx:window.GF_TRX?Object.keys(GF_TRX).length:0}));console.log('info',JSON.stringify(info));
const texts={};async function grab(n){const t=await p.evaluate(()=>{const o=[];const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let x;while(x=w.nextNode()){const e=x.parentElement;if(!e||e.closest('[hidden]')||e.closest('script,style'))continue;const r=e.getBoundingClientRect();if(!r.width||!r.height)continue;const s=getComputedStyle(e);if(s.visibility==='hidden'||s.display==='none'||+s.opacity===0)continue;const v=x.nodeValue.trim();if(v)o.push(v)}return o});texts[n]=t}
await shot('0news');await grab('news');
await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});await p.waitForTimeout(600);await shot('1home');await grab('home');
for(const [n,sel] of [['tank','#tab-tank'],['dex','#tab-dex'],['shop','#tab-sea'],['home','#tab-home']]){try{await p.click(sel,{timeout:2000});await p.waitForTimeout(1500);await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{if(o.id!=='settings')o.hidden=true})});await shot('2'+n);await grab(n)}catch(e){console.log('skip',n)}}
try{await p.evaluate(()=>{const b=document.getElementById('setBtn');b&&b.click()});await p.waitForTimeout(800);await shot('3settings');await grab('settings');await p.evaluate(()=>{const l=document.querySelector('.langseg');if(l)l.scrollIntoView()});await p.waitForTimeout(300);await shot('3lang')}catch(e){console.log('skip settings')}
await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
try{await p.click('#tab-city',{timeout:2000});await p.waitForTimeout(4500);await shot('4city');const f=p.frames().find(x=>x.url().includes('city.html'));console.log('city lang',await f.evaluate(()=>window.CITY_LANG));
 await f.click('#bMenu');await p.waitForTimeout(400);await shot('5citymenu');await f.click('[data-m="help"]');await p.waitForTimeout(400);await shot('6cityhelp');
 const ct=await f.evaluate(()=>document.body.innerText);texts.city=ct.split('\n');fs.writeFileSync(OUT+'/'+tag+'_citymiss.json',JSON.stringify(await f.evaluate(()=>window.__i18nMiss||{})))}catch(e){console.log('city err',e.message)}
const H=/[가-힣]/,E=/\b[A-Za-z]{4,}\b/;const rep={};for(const k in texts){const a=texts[k].filter(s=>H.test(s));const e=texts[k].filter(s=>!H.test(s)&&E.test(s)&&!/Gill|Lv|HP|OK|cm|Solo|Arena/.test(s));rep[k]={hangul:a.slice(0,15),latin:e.slice(0,25)}}
fs.writeFileSync(OUT+'/'+tag+'_left.json',JSON.stringify(rep,null,1));for(const k in rep)console.log(k,'한글',rep[k].hangul.length,'영어',rep[k].latin.length,JSON.stringify(rep[k].hangul.slice(0,4)),JSON.stringify(rep[k].latin.slice(0,6)));
console.log('errs',errs.length,errs.slice(0,3));await b.close()})();
