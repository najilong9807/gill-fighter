const {open}=require('./lib.js');const fs=require('fs');
(async()=>{const seed=JSON.parse(fs.readFileSync(__dirname+'/seed.json','utf8'));seed.newsSeen='1.1.30';seed.tkHoldT=1;seed.xmTree={f:[{k:'p_pearl',u:.5,v:.4,s:1},{k:'r_santa',u:.4,v:.6,s:1},{k:'star',u:.5,v:.05,s:1},{k:'red',u:.6,v:.7,s:1}],inv:{p_pearl:2,g_gold:1}};
const {b,p,errs}=await open({w:393,h:852,dpr:2,init:`if(!sessionStorage.s){localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))});sessionStorage.s=1}`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.overlay').forEach(o=>{o.hidden=true});document.body.classList.remove('ovOpen')});
await hide();await p.waitForTimeout(1500);await hide();await p.click('#tab-tank');await p.waitForTimeout(4000);await hide();await p.screenshot({path:__dirname+'/tree.png'});console.log('errs',errs);await b.close()})();
