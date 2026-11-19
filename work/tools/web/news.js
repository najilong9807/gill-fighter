// 1.1.31 로 올렸을 때 게임 안 소식에 마을 두 줄이 나오는지 (work/_v31.html = APP_VER 만 1.1.31 로 바꾼 임시본)
const {open}=require('./lib.js');const fs=require('fs');const LG=process.argv[2]||'ko';
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.lang=LG;seed.newsSeen='1.1.29';delete seed.newsMute;seed.nick='테스트물고기';
const {b,p,errs}=await open({w:393,h:852,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(3000);
await p.evaluate(()=>{const n=document.getElementById('nickFirst');if(n)n.hidden=true;document.body.classList.remove('ovOpen')});
await p.waitForTimeout(6000);
const t=await p.evaluate(()=>[...document.querySelectorAll('.overlay')].filter(o=>!o.hidden).map(o=>o.id+': '+o.innerText).join(' ## ')||'(창 없음)');
console.log(t.replace(/\n+/g,' / ').slice(0,900));await p.screenshot({path:__dirname+'/news_'+LG+'.png'});
console.log('errs',errs);await b.close()})();
