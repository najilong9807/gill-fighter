const {open,ROOT}=require(process.env.PV_WWW?'./lib_www.js':'../lib.js');const fs=require('fs');
const A='var joy=null,keys={},t=0,hudT=0,hintT=0,shake=0,trail=[];';
async function openPV(o){const r=await open(o);
  const html=fs.readFileSync(ROOT+'/index.html','utf8').replace(A,A+'window.__ev=function(s){return eval(s)};');
  await r.c.route('http://app.local/index.html',x=>x.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));return r}
module.exports={openPV};
