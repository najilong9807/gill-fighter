// 짓기 흐름 둘러보기: node bflow.js <new|big> 
const {open}=require('./lib.js');const fs=require('fs');const OUT=__dirname+'/bflow_'+(process.env.RUN||'a');fs.mkdirSync(OUT,{recursive:true});
const MODE=process.argv[2]||'big';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang='ko';seed.pearls=87000;seed.gems=900;
const city=MODE==='big'?fs.readFileSync(__dirname+'/bigtown.json','utf8'):null;
const {b,p,errs}=await open({w:393,h:852,init:`window.__GF_TEST=1;if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});${city?`localStorage.setItem('gfcity.v1',${JSON.stringify(city)});`:''}sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen');const bn=document.getElementById('banner');if(bn)bn.hidden=true});
await p.click('#tab-city');await p.waitForTimeout(3500);
const f=p.frames().find(x=>x.url().includes('city.html'));const ev=s=>f.evaluate(src=>window.__cv(src),s);let n=0;const shot=async t=>{await p.waitForTimeout(500);await p.screenshot({path:OUT+'/'+MODE+'_'+(++n)+'_'+t+'.png'})};
await ev(`(function(){var x=document.getElementById('sAll');if(x)closePanel()})()`);
await shot('start');
console.log(JSON.stringify(await ev(`({hall:hallLv(),res:G.res,pearl:WAL.get('pearl'),b:G.b.length,roads:Object.keys(G.road).length,ter:Object.keys(G.ter).length})`)));
for(const it of process.argv.slice(3)){await ev(it);await shot('step')}
console.log('errs',errs);await b.close()})();
