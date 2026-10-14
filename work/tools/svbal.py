# 심해 생존 밸런스: 피하기 봇(무적 없음)으로 챕터별 버틴 시간·클리어 측정
import json,sys,time
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
CFG=json.loads(sys.argv[1]) # {ch,mode:'n'|'hard'|'inf',runs,fish,cap}
RUN="""(function(n){for(var k=0;k<n;k++){if(state!=='play')return 'stop';
 var fx=0,fy=0,R=viewR();for(var i=0;i<SV.en.length;i++){var e=SV.en[i];var dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||1;var rr=(e.s||10)*3+P.s*6;if(d<R*.9){var w=Math.max(0,(R*.9-d)/(R*.9));w=w*w*(e.E&&e.E.boss?3:1);fx+=dx/d*w;fy+=dy/d*w}}
 for(var j=0;j<SV.eb.length;j++){var b=SV.eb[j];var dx2=P.x-b.x,dy2=P.y-b.y,d2=Math.hypot(dx2,dy2)||1;if(d2<R*.35){fx+=dx2/d2*2*(1-d2/(R*.35));fy+=dy2/d2*2*(1-d2/(R*.35))}}
 var a=SV.t*.6;fx+=Math.cos(a)*.35;fy+=Math.sin(a)*.35;var l=Math.hypot(fx,fy)||1;joy={id:1,ox:200,oy:400,x:200+fx/l*90,y:400+fy/l*90};update(1/60)}return 'ok'})"""
out=[]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for r in range(CFG.get('runs',2)):
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ch=CFG['ch'];md=CFG.get('mode','n')
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=60;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});sel='%s';save.pick=sel;for(var n=1;n<=8;n++){var O=svChS(n);O.best=420;O.clear=1}var S=svSave();S.hard=S.hard||{};%s;MUS&&MUS.stop&&MUS.stop();svStart(%d,%s);1"%(CFG.get('fish','shark'),"S.hard[%d]=1"%ch if md=='hard' else "S.hard={}",ch,'true' if md=='inf' else 'false'))
    pg.wait_for_timeout(800);picks=0;t0=time.time();res=None
    while time.time()-t0<CFG.get('wall',420):
      rr=pg.evaluate("a=>__ev(%s)(a)"%json.dumps(RUN),600)
      if rr=='stop':
        st=ev("[state,!!($('svUp')&&!$('svUp').hidden),!!($('svRv')&&!$('svRv').hidden)]")
        if st[1]: ev("var c=document.querySelector('#svUpList .svc');c&&c.click();1");picks+=1;pg.wait_for_timeout(150);continue
        if st[0]=='over' or st[0]=='home': res=st;break
        ev("try{svReviveNo()}catch(e){};document.querySelectorAll('.overlay').forEach(function(o){if(o.id!=='svUp'&&o.id!=='svRes')o.hidden=true});if(state==='pause')resumeRun();1");pg.wait_for_timeout(200)
        if ev("state")!='play': res=[ev('state')];break
      if ev("SV.t||0")>=CFG.get('cap',440): break
    info=ev("JSON.stringify({t:Math.round(SV.t||0),won:!!SV.won,hard:!!SV.hard,inf:!!SV.inf,lv:SV.lv,kills:SV.kills,boss:SV.bossN||0,en:SV.en.length,w:Object.keys(SV.w).length})")
    print(json.dumps(dict(CFG,run=r,picks=picks,end=res,**json.loads(info)),ensure_ascii=False),'errs',errs[:2],flush=True);pg.close()
