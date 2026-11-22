// 공통: work/ 폴더를 http://app.local/ 로 가짜 서버처럼 열기(바깥 요청은 막음)
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT='/home/claude/gill-fighter/work';
const MT={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.mp3':'audio/mpeg','.webp':'image/webp','.jpg':'image/jpeg'};
async function open(opt={}){
  const b=await chromium.launch();
  const c=await b.newContext({viewport:{width:opt.w||393,height:opt.h||852},deviceScaleFactor:opt.dpr||1,hasTouch:true,isMobile:true,locale:opt.locale||'ko-KR'});
  await c.route('**/*',r=>{const u=new URL(r.request().url());
    if(u.hostname==='app.local'){let f=path.join(ROOT,decodeURIComponent(u.pathname));if(!fs.existsSync(f))f=path.join(ROOT,'..',decodeURIComponent(u.pathname));if(fs.existsSync(f)&&fs.statSync(f).isFile()){let body=fs.readFileSync(f);if(path.extname(f)==='.html'){let t=body.toString('utf8');if(t.indexOf('name="viewport"')<0)t=('<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">')+t;body=Buffer.from(t,'utf8')}return r.fulfill({status:200,contentType:MT[path.extname(f)]||'application/octet-stream',body})}return r.fulfill({status:404,body:''})}
    if(u.protocol==='data:')return r.continue();return r.abort()});
  /* 1.1.30 은 마을을 꺼 둠(GF_TOWN_OFF) → 시험에선 늘 켬 */
  await c.addInitScript("try{Object.defineProperty(window,'GF_TOWN_OFF',{get:function(){return 0},set:function(){}})}catch(e){}");
  if(opt.init)await c.addInitScript(opt.init);
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  return {b,c,p,errs};
}
module.exports={open,ROOT};
