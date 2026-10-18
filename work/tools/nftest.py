import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  def run(sv,label,act=None):
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:80]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(800)
    if sv is not None:
      sv=dict({'owned':['anchovy'],'pick':'anchovy','thx1111':2,'newsSeen':'1.1.14','newsMute':'1.1.14'},**sv);pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    if act: ev(act);pg.wait_for_timeout(300)
    q=ev("(save.crashQ||[]).filter(function(x){return x.kind==='nb'}).map(function(x){return x.ev||('run'+x.n)})")
    print(label,q,'errs',errs[:2]);pg.close()
  run(None,'fresh install')
  run({'runs':0,'firstAt':1,'nfOpen':1},'tutorial end',"if(TUT&&!TUT.on){TUT.on=1};tutEnd(true);1")
  import time
  run({'runs':3,'firstAt':int(time.time()*1000)-2*864e5,'nfOpen':1,'nfTut':1,'onb':1,'tut':1},'day2 return')
  run({'runs':3,'firstAt':int(time.time()*1000)-2*864e5,'nfOpen':1,'nfTut':1,'nfRet':1,'onb':1,'tut':1},'day2 again (no dup)')
  run({'runs':30,'firstAt':int(time.time()*1000)-30*864e5,'onb':1,'tut':1},'old user (none)')
