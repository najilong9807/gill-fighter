# 자동 조종 봇으로 싱글을 여러 판 돌려 생존 시간 · 크기 · 진주 · 보스 결과를 잰다 (밸런스 점검용)
import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
CFG=json.loads(sys.argv[1]) # {fish,lv,hw,runs,cap,runsDone}
BOT="""(function(cfg){var out=[];
function steer(){var eatR=eatRatio(),best=null,bd=1e9,fx=0,fy=0,R=viewR();
 for(var i=0;i<fish.length;i++){var f=fish[i],dx=f.x-P.x,dy=f.y-P.y,d=Math.hypot(dx,dy)-f.s-P.s;if(d>R*1.2)continue;
  var dang=f.s>=P.s*dangerThr(f),ed=f.s<=P.s*(f.bot?eatThr(f):eatR);
  if(dang&&d<P.s*10+f.s*4){var w=(P.s*10+f.s*4-d)/(P.s*10+f.s*4);fx-=dx/Math.hypot(dx,dy)*w*4;fy-=dy/Math.hypot(dx,dy)*w*4}
  else if(ed){var sc=d/Math.max(.3,f.s/P.s);if(sc<bd){bd=sc;best=f}}
  else if(f.hwb||(!dang&&!ed)){ /* 큰데 위험하지 않은 것: 몸통 물기 시도 */ if(d<bd*0.8){bd=d*1.2;best={x:f.x-Math.cos(f.ang)*f.s*.8,y:f.y-Math.sin(f.ang)*f.s*.8}}}}
 for(var j=0;j<plank.length&&j<60;j++){var p=plank[j];if(!p.candy)continue;var d2=Math.hypot(p.x-P.x,p.y-P.y);if(d2<R&&d2<bd){bd=d2;best=p}}
 var tx=0,ty=0;if(best){var dx=best.x-P.x,dy=best.y-P.y,l=Math.hypot(dx,dy)||1;tx=dx/l;ty=dy/l}else{ty=.6;tx=Math.sin(P.time*.3)}
 if(DPZ.gull&&!DPZ.gull.hit){var g=DPZ.gull,gdx=P.x-g.x,gdy=P.y-g.y,gd=Math.hypot(gdx,gdy)||1;if(gd<g.r*1.6){fx+=gdx/gd*3;fy+=Math.abs(gdy/gd)*3+2}}
 tx+=fx;ty+=fy;if(P.y<H*.02)ty=Math.abs(ty)+.3;var l2=Math.hypot(tx,ty)||1;joy={x:tx/l2*56,y:ty/l2*56,ox:0,oy:0,pad:false}}
function one(){var p0=save.pearls;save.pick=cfg.fish;if(cfg.lv){save.lv=save.lv||{};save.lv[cfg.fish]=cfg.lv}
 document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun(cfg.mode||'single');var drops={},killer=null;(function(){var v=P.s;Object.defineProperty(P,'s',{configurable:true,get:function(){return v},set:function(nv){if(nv<v*0.995&&state==='play'){var st=(new Error().stack||'').split(String.fromCharCode(10)).slice(2,4).map(function(x){x=x.trim();var a=x.split(' ')[1]||'?',p=x.split(':');return a+'@'+p[p.length-2]}).join('<');var k=st.slice(0,90);var o=drops[k]||(drops[k]={n:0,loss:0});o.n++;o.loss+=(v-nv)/v}v=nv}})})();var endRunK=endRun;endRun=function(w,q,by){if(by)killer={fish:by.look&&by.look.id,ratio:+(by.s/P.s).toFixed(2),bot:!!by.bot,hwb:!!by.hwb,t:Math.round(P.time),y:+(P.y/H).toFixed(2)};return endRunK.apply(this,arguments)};var dt=1/30,n=0,bossSeen=0,maxS=0,depth=0,deathBy='';
 while(state==='play'&&!P.dead&&n<cfg.cap*30){steer();try{update(dt)}catch(e){out.push({err:String(e).slice(0,120)});break}n++;if(HWB.f)bossSeen=1;maxS=Math.max(maxS,P.s);depth=Math.max(depth,P.y/H)}
 var nan=!isFinite(P.s)||!isFinite(P.x)||!isFinite(P.y);var r={fish:cfg.fish,lv:cfg.lv,t:Math.round(P.time),cm:+cmRel(P.s).toFixed(1),maxCm:+cmRel(maxS).toFixed(1),capCm:P.look.cap,nan:nan,fishN:fish.length,fx:fxs.length,eaten:P.eaten,nib:P.nibbles|0,full:!!P.full,deep:+depth.toFixed(2),boss:bossSeen,bossDown:HWB.done?1:0,candy:P.candyN|0,bonus:P.bonus|0,dead:!!P.dead||state!=='play'};
 if(state==='play'&&!P.dead){try{endRun(false,true)}catch(e){}}
 r.pearls=save.pearls-p0;r.killer=killer;var dk=Object.keys(drops).sort(function(a,b){return drops[b].loss-drops[a].loss}).slice(0,4);r.drops=dk.map(function(k){return k+' n'+drops[k].n+' loss'+drops[k].loss.toFixed(2)});endRun=endRunK;delete P.s;r.score=P.score|0;joy=null;out.push(r)}
for(var k=0;k<cfg.runs;k++)one();return out})"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':CFG.get('runsDone',12),'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':100000,'gems':500,'owned':[CFG['fish'],'anchovy'],'pick':CFG['fish'],'hwAtt':{'y':2026,'n':7,'d':'x'},'lv':{CFG['fish']:CFG.get('lv',1)}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=%d'%CFG.get('hw',1));pg.wait_for_timeout(3000)
  pg.evaluate("c=>__ev(c)","document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});MUS&&MUS.stop&&MUS.stop();1")
  res=pg.evaluate("a=>__ev(a[0])(a[1])",[BOT,CFG])
  for r in res:print(json.dumps(r,ensure_ascii=False))
  print('errs',errs[:3])
