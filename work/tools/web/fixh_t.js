// 집도 치우고 · 길 잇고 짓기: node fixh_t.js
const {open}=require('./lib.js');const fs=require('fs');
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));const city=fs.readFileSync(__dirname+'/bigtown.json','utf8');
const {b,p,errs}=await open({w:393,h:852,init:`window.__GF_TEST=1;if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(city)});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true})});await p.click('#tab-city');await p.waitForTimeout(3500);
const f=p.frames().find(x=>x.url().includes('city.html'));const ev=s=>f.evaluate(src=>window.__cv(src),s);
await ev(`(function(){var y=document.getElementById('sAll');if(y)closePanel();houseAt('R')})()`);
const r=await ev(`(function(){var k=GH.k;for(var x=0;x<N;x++)for(var y=0;y<N;y++){var w=siteWhy(k,x,y);if((w==='바위 · 덤불을 먼저 치워요'||w==='도로에 붙여 지어야 해요')&&O2[x+','+y]){GH.x=x;GH.y=y;placeBar();if(GH.fix){var n0=G.b.length,pe=WAL.get('pearl'),t=document.querySelector('#place small').textContent;document.getElementById('pOk').click();var nb=G.b[n0];return {t:t,built:G.b.length-n0,k:nb&&nb.k,site:nb&&siteRoad(nb),spent:pe-WAL.get('pearl'),cost:5}}}}return 'none'})()`);
console.log(JSON.stringify(r),'errs',errs);await b.close()})();
