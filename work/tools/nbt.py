import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lg in ['ko','en']:
    pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':0,'onb':1,'tut':1,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'owned':['anchovy'],'pick':'anchovy'}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release'%lg);pg.add_style_tag(path='gfonts.css');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});modePickOpen();1");pg.wait_for_timeout(500)
    print(lg,'badge parent',ev("var r=$('mpRecNew');r?[r.parentNode.id,r.hidden,r.textContent,$('mpCamp').classList.contains('first'),$('mpRec').classList.contains('first')]:null"))
    pg.screenshot(path='nb_mp_%s.png'%lg)
    res=[]
    for run in range(5):
      ev("$('modePick').hidden=true;document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel='anchovy';startRun('single');1");pg.wait_for_timeout(300)
      ev("P.time=5;endRun(false,false,null);1");pg.wait_for_timeout(1400)
      a=ev("[save.runs,state,save.nbC]")
      if a[1]=='play':
        ev("P.fx.ghost=0;P.time=9;endRun(false,false,null);1");pg.wait_for_timeout(1400);a.append(ev("state"))
      res.append(a)
      ev("if(state==='play')endRun(false,true);1");pg.wait_for_timeout(300)
    print(lg,res,errs[:2])
    pg.close()
