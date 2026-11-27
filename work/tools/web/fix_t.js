// 1.1.35 치우고 · 길 잇고 짓기: node fix_t.js <lang> [new|big]
const {open}=require('./lib.js');const fs=require('fs');const OUT=__dirname+'/fixt';fs.mkdirSync(OUT,{recursive:true});
const LG=process.argv[2]||'ko',MODE=process.argv[3]||'new';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.pearls=87000;seed.gems=900;
const city=MODE==='big'?fs.readFileSync(__dirname+'/bigtown.json','utf8'):null;
const {b,p,errs}=await open({w:393,h:852,init:`window.__GF_TEST=1;if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});${city?`localStorage.setItem('gfcity.v1',${JSON.stringify(city)});`:''}sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen');const bn=document.getElementById('banner');if(bn)bn.hidden=true});
await p.click('#tab-city');await p.waitForTimeout(3500);
const f=p.frames().find(x=>x.url().includes('city.html'));const ev=s=>f.evaluate(src=>window.__cv(src),s);const shot=t=>p.screenshot({path:OUT+'/'+LG+MODE+'_'+t+'.png'});
await ev(`(function(){var x=document.getElementById('proSkip');if(x)x.click();var y=document.getElementById('sAll');if(y)closePanel()})()`);
const K=MODE==='new'?'pump':'quarry';
await ev(`(function(){openBuild(CATOF['${K}']);ghostAt('${K}')})()`);
// 땅 안에서 도로 없고 바위 있는 자리 찾기(도로에서 3~8칸)
const pos=await ev(`(function(){var k='${K}',s=sz(k),best=null;for(var x=0;x<N;x++)for(var y=0;y<N;y++){var w=siteWhy(k,x,y);if(w!=='바위 · 덤불을 먼저 치워요'&&w!=='도로에 붙여 지어야 해요')continue;var hasT=false;for(var i=0;i<s;i++)for(var j=0;j<s;j++)if(G.ter[(x+i)+','+(y+j)])hasT=true;if(!hasT)continue;var p=null;try{GH.x=x;GH.y=y;placeBar();p=GH.fix}catch(e){}if(p&&p.road.length>=3&&p.road.length<=8){best={x:x,y:y,road:p.road.length,clr:p.clr.length,cost:p.cost};return best}}return best})()`);
console.log('자리',JSON.stringify(pos));
if(pos){await ev(`(function(){focus({k:'${K}',x:${pos.x},y:${pos.y}});GH.x=${pos.x};GH.y=${pos.y};placeBar()})()`);await p.waitForTimeout(500);await shot('ghost');
const st=await ev(`({txt:document.querySelector('#place small').textContent,ok:!document.getElementById('pOk').disabled,pearl:WAL.get('pearl'),roads:Object.keys(G.road).length,ter:Object.keys(G.ter).length,n:G.b.length,res:JSON.stringify(G.res)})`);console.log('전',JSON.stringify(st));
await ev(`document.getElementById('pOk').click()`);await p.waitForTimeout(600);await shot('built');
const st2=await ev(`(function(){var b=G.b[G.b.length-1];return {k:b.k,job:!!b.job,site:siteRoad(b),pearl:WAL.get('pearl'),roads:Object.keys(G.road).length,ter:Object.keys(G.ter).length,n:G.b.length,res:JSON.stringify(G.res)}})()`);console.log('후',JSON.stringify(st2));
await ev(`doUndo()`);await p.waitForTimeout(300);
const st3=await ev(`({pearl:WAL.get('pearl'),roads:Object.keys(G.road).length,ter:Object.keys(G.ter).length,n:G.b.length})`);console.log('되돌림',JSON.stringify(st3));}
console.log('번역 빠짐',JSON.stringify(await ev(`Object.keys(window.__i18nMiss||{}).slice(0,20)`)));
console.log('errs',errs);await b.close()})();
