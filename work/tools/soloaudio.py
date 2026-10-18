import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
F=sys.argv[1]; HW=sys.argv[2] if len(sys.argv)>2 else '0'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required'])
  pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:80]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':20,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'9','newsMute':'9','thx1111':2,'bgm':True,'sfx':True}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+F+'?lang=ko&hw='+HW);pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1")
  pg.mouse.click(200,400);pg.wait_for_timeout(300)
  print('home state',ev("[state,MUS.ac&&MUS.ac.state]"), 'errs so far',len(errs))
  e0=len(errs)
  ev("startRun('single');1");pg.wait_for_timeout(6000)
  r=ev("({state:state,cur:MUS.cur,now:+MUS.ac.currentTime.toFixed(2),next:+MUS.next.toFixed(2),hw:hwBgmOn()})")
  print('solo',r,'new errs',len(errs)-e0, sorted(set(errs[e0:]))[:3])
  print('MUSIC', 'OK' if abs(r['next']-r['now'])<1 else 'STUCK')
