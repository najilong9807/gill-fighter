import json,time
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
now=time.time()*1000
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  def run(label,sv,expect):
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:120]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(600)
    base={'onb':1,'tut':1,'newsSeen':'1.1.14','newsMute':'1.1.14','thx1111':2,'owned':['anchovy'],'pick':'anchovy'};base.update(sv)
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(base)))
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(4500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('home');1")
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});document.getElementById('playBtn').click();1");ov=''
    for _ in range(30):
      pg.wait_for_timeout(200);ov=ev("['modePick','camp'].filter(function(i){return !document.getElementById(i).hidden}).join(',')")
      if ov:break
    ids=ev("dmEnsure().ids.join(',')")
    ok='OK' if expect in ov else 'FAIL'
    print(ok,label,'->',ov,'| missions',ids,'| errs',errs[:2]);pg.close()
  run('new day0 runs1',{'nfOpen':1,'runs':1,'firstAt':now-3600e3},'camp')
  run('new day0 runs1 (arena day)',{'nfOpen':1,'runs':1,'firstAt':now-3600e3,'dm':None},'camp')
  run('new runs9',{'nfOpen':1,'runs':9,'firstAt':now-3600e3},'modePick')
  run('new day3',{'nfOpen':1,'runs':2,'firstAt':now-3*864e5},'modePick')
  run('new has camp star',{'nfOpen':1,'runs':2,'firstAt':now-3600e3,'camp':{'s':{'1':2}}},'modePick')
  run('upgrader no firstAt, runs7',{'runs':7},'modePick')
  run('old user',{'runs':80,'firstAt':now-40*864e5},'modePick')
