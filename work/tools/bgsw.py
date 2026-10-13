import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(1500)
  own=pg.evaluate("c=>__ev(c)","JSON.stringify(SPECIES.slice(0,40).map(function(L){return L.id}))")
  sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'owned':json.loads(own),'pick':'anchovy'}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('home');1");pg.wait_for_timeout(500)
  for t in ['dex','shop','home']:
    try: ev("showTab('%s');1"%t)
    except Exception as e: print('tab',t,e)
    pg.wait_for_timeout(800)
  ev("fpOpen();1");pg.wait_for_timeout(500)
  print('fpk cards',ev("$('fpkG').children.length"),'cvimg',ev("Object.keys(CVIMG).length"))
  ev("$('fpk').hidden=true;1");pg.wait_for_timeout(200);print('after close',ev("$('fpkG').children.length"))
  print('sweep',ev("bgSweep()"),'cvimg',ev("Object.keys(CVIMG).length"))
  ev("fpOpen();1");pg.wait_for_timeout(400);print('reopen',ev("$('fpkG').children.length"))
  ev("$('fpk').hidden=true;showTab('dex');1");pg.wait_for_timeout(800);print('dex imgs ok',ev("document.querySelectorAll('img.cvimg').length"))
  print('errs',errs)
