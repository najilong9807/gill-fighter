// 심해 생존 후반 꺼짐 재현: 무기 5개 최고 단계 + 무적, N초 돌리며 10초마다 힙 · 개체 수
const {open}=require('./lib.js');const fs=require('fs');const CH=+process.argv[2]||8,DUR=+process.argv[3]||420,HARD=process.argv[4]==='hard';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';
const {b,p,errs}=await open({w:393,h:852,dpr:3,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});sessionStorage.s=1}`});
await p.goto('http://app.local/_sv.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(1500);await hide();
const r0=await p.evaluate(([CH,HARD])=>{const T=window.__T;T.ev("var s=svSave();s.ch=s.ch||{};for(var i=1;i<=30;i++){s.ch[i]=s.ch[i]||{};s.ch[i].clear=Math.max(1,s.ch[i].clear|0)}"+(HARD?";s.hard=s.hard||{};s.hard["+CH+"]=1":""));T.svStart(CH);return {st:T.st,surv:!!(T.P&&T.P.surv),hard:T.SV.hard,ch:T.SV.chN}},[CH,HARD]);console.log('시작',JSON.stringify(r0));
await p.waitForTimeout(1500);
await p.evaluate(()=>{const T=window.__T,S=T.SV;const ks=Object.keys(T.SV_W).slice(0,T.SV_SLOT);S.w={};ks.forEach(k=>S.w[k]={lv:T.SV_WMAX,cd:.2});Object.keys(T.SV_P).slice(0,T.SV_SLOT).forEach(k=>S.pv[k]=T.SV_PMAX);
  setInterval(()=>{try{S.inv=5;S.hp=S.maxHp;if(T.st==='pause'){const u=document.getElementById('svUpList');const c=u&&!document.getElementById('svUp').hidden&&u.querySelector('button.svc');if(c&&c.click){c.click()}if(T.st==='pause'){window.__PZ=(window.__PZ||0)+1;[...document.querySelectorAll('.overlay,[role=dialog]')].filter(o=>!o.hidden&&getComputedStyle(o).display!=='none').forEach(o=>{(window.__PO=window.__PO||{})[o.id]=1;o.hidden=true});T.ev('resumeRun()')}}}catch(e){}},300)});
await p.addInitScript(()=>{});const cdp=await p.context().newCDPSession(p);await cdp.send('Performance.enable');
await p.evaluate(()=>{const oc=document.createElement.bind(document);window.__CV=[];document.createElement=function(t,o){const e=oc(t,o);if(String(t).toLowerCase()==='canvas')window.__CV.push(new WeakRef(e));return e}});
const t0=Date.now();let last=0;
while((Date.now()-t0)/1000<DUR+30){await p.waitForTimeout(10000);
  const m=await p.evaluate(()=>{const T=window.__T,S=T.SV,o={t:Math.round(S.t||0),heap:Math.round(performance.memory.usedJSHeapSize/1e6),st:T.st,dead:!!(T.P&&T.P.dead)};for(const k in S)if(Array.isArray(S[k])&&S[k].length>20)o[k]=S[k].length;try{o.fish=T.ev('typeof fish!=="undefined"&&fish?fish.length:-1');o.parts=T.ev('typeof parts!=="undefined"&&parts?parts.length:-1');o.pops=T.ev('typeof pops!=="undefined"&&pops?pops.length:-1')}catch(e){}return o});
  const pm=(await cdp.send('Performance.getMetrics')).metrics;const g=n=>Math.round((pm.find(x=>x.name===n)||{}).value/1e6);m.jsh=g('JSHeapUsedSize');m.dom=Math.round((pm.find(x=>x.name==='Nodes')||{}).value);
  const cv=await p.evaluate(()=>{let n=0,px=0;window.__CV.forEach(r=>{const c=r.deref();if(c){n++;px+=c.width*c.height}});return {n,mp:Math.round(px/1e6),pz:window.__PZ||0,po:Object.keys(window.__PO||{}).join(',')}});Object.assign(m,cv);console.log(JSON.stringify(m));if(m.t>=DUR||m.dead)break}
console.log('errs',JSON.stringify(errs.slice(0,5)));await b.close()})();
