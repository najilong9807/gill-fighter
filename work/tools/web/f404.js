const {open}=require('./lib.js');const fs=require('fs');
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';
const {b,c,p}=await open({w:393,h:852,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});localStorage.setItem('gfcity.v1',${JSON.stringify(fs.readFileSync(__dirname+'/bigtown.json','utf8'))});sessionStorage.s=1}`});
const bad=new Set();c.on('requestfinished',async r=>{try{const s=(await r.response()).status();if(s>=400)bad.add(s+' '+r.url().slice(0,120))}catch(e){}});c.on('requestfailed',r=>bad.add('FAIL '+r.url().slice(0,120)));
await p.goto('http://app.local/index.html');await p.waitForTimeout(5000);await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true})});
for(const t of ['#tab-tank','#tab-city','#tab-home']){await p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});await p.click(t);await p.waitForTimeout(3000)}
console.log([...bad].join('\n'));await b.close()})();
