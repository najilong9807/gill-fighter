# 긴 플레이 + 화면 왕복으로 메모리 · 프레임 오류 · 숫자 깨짐 점검 (그리기 포함)
import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--enable-precise-memory-info','--js-flags=--expose-gc','--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':40,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':90000,'gems':900,'owned':['anchovy','whaleshark','manta','octopus','hammerhead'],'pick':'whaleshark','hwAtt':{'y':2026,'n':7,'d':'x'},'lv':{'whaleshark':10,'manta':10}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(3000)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  SN="(function(){window.gc&&gc();return JSON.stringify({heap:Math.round(performance.memory.usedJSHeapSize/1048576),fish:fish.length,fx:fxs.length,txt:texts.length,rings:rings.length,fe:(typeof CR!=='undefined'?CR.fe|0:-1),nan:!isFinite(P.s)||!isFinite(P.x),st:state,cvimg:Object.keys(CVIMG).length})})()"
  print('start',ev(SN))
  for fid in ['whaleshark','manta','hammerhead']:
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel='%s';save.pick=sel;try{EN().n=ENERGY.max}catch(e){};startRun('single');P.fx.ghost=1e9;1"%fid)
    for blk in range(8):  # 1분씩 8분
      r=ev("""(function(){var e=0;for(var k=0;k<1800&&state==='play';k++){joy={x:Math.cos(k/90)*56,y:Math.sin(k/130)*40+10,ox:0,oy:0,pad:false};try{update(1/30);if(k%2===0)draw()}catch(x){e++;if(e<3)console.log(String(x))}if(P.cd<=0&&k%20===0)try{useSkill()}catch(x){}}return e})()""")
      if blk%4==3: print(fid,(blk+1),'min errs',r,ev(SN),flush=True)
    ev("try{endRun(false,true)}catch(e){};1")
  # 화면 왕복
  for i in range(40):
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});['home','sea','tank','dex','home'].forEach(function(t){try{showTab(t)}catch(e){}});try{fpOpen();$('fpk').hidden=true;hwEvOpen();$('hwEv').hidden=true;decoStart();mydOpen();$('myDeco').hidden=true;decoEnd()}catch(e){};1")
    if i%10==9:
      for k in range(3): ev("(function(){for(var k=0;k<60;k++){try{update(1/30);draw()}catch(e){}}})();1")
      print('screens',i+1,ev(SN),flush=True)
  print('errs',errs[:6]);b.close()
