// 40차 숨샘 · 큰 숨탑: 산소 범위가 넓어지는지 · 기반 탭 · 창 — node o2.js <lang>
const {open}=require('./lib.js');const fs=require('fs');const OUT=__dirname+'/depth';fs.mkdirSync(OUT,{recursive:true});const LG=process.argv[2]||'ko';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;const city=fs.readFileSync(__dirname+'/bigtown.json','utf8');
const {b,p,errs}=await open({init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(city)});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await p.click('#tab-city');await p.waitForTimeout(4000);const f=p.frames().find(x=>x.url().includes('city.html'));const D=s=>f.evaluate(s);
const h0=await D(()=>__depth.homes());console.log('before noO2',h0.noO2,'/',h0.n);
const h=await D(()=>{var t=__depth.top();return t});
console.log('add towers');await D(()=>{__depth.addF(12,24,'d_o2b');__depth.addF(18,18,'d_o2b');__depth.addF(10,30,'d_o2')});
const h1=await D(()=>__depth.homes());console.log('after noO2',h1.noO2,'/',h1.n);
await f.click('#bBuild');await p.waitForTimeout(400);await f.click('.pills [data-c=base]');await p.waitForTimeout(400);
await f.evaluate(()=>{const c=document.querySelector('.cards');c.scrollLeft=c.scrollWidth});await p.waitForTimeout(300);await p.screenshot({path:OUT+'/'+LG+'_o2base.png'});
console.log('cards',await D(()=>[...document.querySelectorAll('.cards .card b')].map(x=>x.textContent).join(' | ')));
await f.click('#tX');for(let i=0;i<1;i++)await f.click('#bView');await p.waitForTimeout(600);await p.screenshot({path:OUT+'/'+LG+'_o2map.png'});
fs.writeFileSync(OUT+'/miss_o2_'+LG+'.json',JSON.stringify(await D(()=>window.__i18nMiss||{})));console.log('errs',errs.length,errs.slice(0,3));await b.close()})();
