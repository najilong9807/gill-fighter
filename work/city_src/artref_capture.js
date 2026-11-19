// 21일 그림용 기준 그림: 지금 코드 그림을 투명 PNG 로 (같은 각도 · 같은 땅 크기 참고용)
const {open}=require('./lib.js');const fs=require('fs');const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';
const {b,p,errs}=await open({w:393,h:852,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-city');await p.waitForTimeout(3000);
const f=p.frames().find(x=>x.url().includes('city.html'));
const J=[['hall',[1,5,10,15,20,25]],['pump',[1]],['quarry',[1]],['farm',[1]],['crab',[1]],['factory',[1]],['store',[1]],['turtle',[1]],['diner',[1]],['sew',[1]],['school',[1]],['kiln',[1]],['pearl',[1]],['train',[1]],['clinic',[1]],['fire',[1]],['police',[1]],['aqua',[1]],['port',[1]],['palace',[1]],
 ['zR0',[1,2,3,4,5]],['zC0',[1,2,3,4,5]],['zI0',[1,2,3,4,5]],['d_coral',[1]],['d_kelp',[1]],['d_bench',[1]],['d_lamp',[1]],['d_fount',[1]],['d_statue',[1]],['d_whale',[1]],['d_shipw',[1]],['d_xtree',[1]],['d_snow',[1]],['d_ice',[1]],['d_seal',[1]],['d_jlan',[1]],['d_balloon',[1]],['d_stage',[1]]];
const q=await b.newPage();let n=0;
for(const [k,ls] of J)for(const L of ls){let r;try{r=await f.evaluate(([k,L])=>window.__cityArt.ref(k,L),[k,L])}catch(e){console.log('없음',k,e.message.slice(0,60));continue}
  await q.setContent('<html><body style="margin:0;background:transparent">'+r.svg+'</body></html>');const el=await q.$('svg');await el.screenshot({path:OUT+'/'+k+'_'+L+'.png',omitBackground:true});n++}
console.log('그림',n,'errs',errs);await b.close()})();
