import json,sys
from playwright.sync_api import sync_playwright
from PIL import Image
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
TAG=sys.argv[1]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=1);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(300)
  sv={'runs':30,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.14','newsMute':'1.1.14','thx1111':2,'mpWinTip':1,'hwAtt':{'y':2026,'n':7,'d':'x'},'hwGift':2026,'hwSeen':2026,'owned':['clownfish','anchovy'],'pick':'clownfish','mp':{'games':5}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(4500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1");pg.wait_for_timeout(800)
  pg.screenshot(path=TAG+'_home.png')
  ims=[]
  for m in ['single','multi']:
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});NET.room='';startRun('%s');P.fx.ghost=99999;1"%m);pg.wait_for_timeout(2500)
    pg.screenshot(path=TAG+'_%s_a.png'%m)
    ev("P.s*=1.5;1");pg.wait_for_timeout(1200);pg.screenshot(path=TAG+'_%s_b.png'%m)
    ev("endRun(false,true);1");pg.wait_for_timeout(500)
  c=Image.new('RGB',(390*5+40,844),'white')
  for i,n in enumerate(['home','single_a','single_b','multi_a','multi_b']):c.paste(Image.open(TAG+'_'+n+'.png'),(i*400,0))
  c=c.resize((c.width//2,c.height//2));c.save(TAG+'_all.png');print('errs',errs)
