import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'owned':['anchovy'],'pick':'anchovy','hwAtt':{'y':2026,'n':7,'d':'x'}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('single');P.inv=999;1")
  log=[]
  for step in range(12):
    r=ev("""(function(){P.time+=20;for(var i=0;i<3;i++)hwbTick();if(HWB.f){HWB.f.x=P.x+viewR()*1.5;HWB.f.chase=0}return JSON.stringify([Math.round(P.time),!!HWB.f,HWB.n,Math.round(HWB.next),HWB.done])})()""")
    log.append(r)
  print('\n'.join(log));print(errs)
