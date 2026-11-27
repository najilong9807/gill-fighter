const {openPV}=require('./lib2.js');const fs=require('fs');
const LGS=['ko','en','ja','es','vi','ar','ca','cs','da','de','el','fi','fr','he','hi','hr','hu','id','it','ms','nl','no','pl','pt','ro','ru','sk','sv','th','tr','uk','zhs','zht'];
const K=['싱글','심해 생존','심해 탐험','대전','실시간 대전','마을','아가미시티','수족관','내 수족관','꾸미기','물고기 꾸미기','상점'];
(async()=>{const out={};const seed=JSON.parse(fs.readFileSync(__dirname+'/../seed.json','utf8'));seed.newsSeen='1.1.33';
for(const lg of LGS){seed.lang=lg;const {b,p}=await openPV({w:443,h:960,init:`localStorage.setItem('fishproto.save2',${JSON.stringify(JSON.stringify(seed))})`});
await p.goto('http://app.local/index.html');await p.waitForTimeout(2500);
out[lg]=await p.evaluate(K=>__ev('['+K.map(k=>"T("+JSON.stringify(k)+")").join(',')+'].concat([LANG,SUBL])'),K);console.log(lg,JSON.stringify(out[lg]));await b.close()}
fs.writeFileSync(__dirname+'/terms.json',JSON.stringify(out,null,1))})();
