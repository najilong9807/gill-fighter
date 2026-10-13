import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'owned':['anchovy'],'pick':'anchovy','hwAtt':{'y':2026,'n':7,'d':'x'}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=en&build=release&hw=1');pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('single');1");pg.wait_for_timeout(1200)
  ev("P.time=58;HWB.next=50;1");pg.wait_for_timeout(1500)
  ev("HWB.f.x=P.x+P.s*5;HWB.f.y=P.y;1");pg.wait_for_timeout(300);pg.screenshot(path='d2_boss_en.png')
  ev("var f=HWB.f;f.nb=1;f.s=P.s*.5;consume(f,fish.indexOf(f));P.time=70;1");pg.wait_for_timeout(1000)
  ev("endRun(false,false,null);1");pg.wait_for_timeout(1800);pg.screenshot(path='d2_res_en.png')
  print('res',ev("var o=[].filter.call(document.querySelectorAll('.overlay'),function(e){return !e.hidden});o.map(function(e){return e.id+':'+e.innerText.replace(/\\n/g,' | ').slice(0,400)}).join(' ## ')"))
  print('mis',ev("JSON.stringify(HM().v)"))
  # 다른 모드에서 보스 안 나오는지
  for m in ["startRun('multi')","startRun('surv')"]:
    try:
      ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});"+m+";1");pg.wait_for_timeout(1200)
      ev("P.time=80;HWB.next=0;1");pg.wait_for_timeout(1200)
      print(m,ev("JSON.stringify([mode,!!P.surv,!!HWB.f,fish.filter(function(f){return f.hwb}).length])"))
      ev("try{endRun(false,true)}catch(e){};1");pg.wait_for_timeout(800)
    except Exception as e: print(m,'ERR',str(e)[:150])
  print(errs)
