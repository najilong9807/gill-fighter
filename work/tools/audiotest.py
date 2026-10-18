import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
F=sys.argv[1] if len(sys.argv)>1 else 't2e.html'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required'])
  pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':20,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'9','newsMute':'9','thx1111':2,'bgm':True,'sfx':True}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+F+'?lang=ko&hw=0');pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1")
  pg.mouse.click(200,400);pg.wait_for_timeout(500)
  # count audio starts
  ev("window.__starts=0;var P0=AudioBufferSourceNode.prototype.start;AudioBufferSourceNode.prototype.start=function(at){window.__starts++;window.__lastAt=at;window.__lastNow=this.context.currentTime;return P0.apply(this,arguments)};1")
  pg.wait_for_timeout(9000)
  st=lambda: ev("({state:MUS.ac&&MUS.ac.state,now:MUS.ac&&+MUS.ac.currentTime.toFixed(2),next:+(MUS.next||0).toFixed(2),sfxT:+(MUS.sfxT||0).toFixed(2),starts:window.__starts})")
  print('before',st())
  ev("MUS.sfx('eat');1");print('after sfx',st())
  # simulate iOS: resume failed on return -> bad -> rebuild on next touch
  ev("MUS.bad=1;1");pg.mouse.click(200,400);pg.wait_for_timeout(1500)
  a=st();print('after rebuild',a)
  ev("window.__starts=0;MUS.sfx('eat');1");pg.wait_for_timeout(100)
  c=st();print('sfx after rebuild',c,'lastAt-now',ev("window.__lastAt!=null?+(window.__lastAt-window.__lastNow).toFixed(2):null"))
  pg.wait_for_timeout(2500);d=st();print('2.5s later',d)
  ok=(c['starts']>0) and (d['next']-d['now']<1.5)
  print('RESULT', 'OK' if ok else 'SILENT', 'errs',errs)
