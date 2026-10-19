import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=0');pg.wait_for_timeout(500)
  sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.14','newsMute':'1.1.14','thx1111':2,'owned':['anchovy'],'pick':'anchovy','en':{'n':99,'t':0},'camp':{'s':{str(n):3 for n in range(1,70)},'ch':9}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=0');pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});CAMP.cur=campFloor(65);CAMP.pend=true;startRun('single');1");pg.wait_for_timeout(1500)
  # freeze game, add column manually at known place, then step frames
  ev("VOLC.cols.length=0;volcColAdd(2.2,9,.26,.8);VOLC.next=99;1")
  pg.wait_for_timeout(1500);pg.screenshot(path='colw.png')
  pg.wait_for_timeout(1100);pg.screenshot(path='colf.png')
  print('errs',errs)
