import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
STEER=open('botsim.py').read().split('BOT="""')[1].split('function one(')[0].replace('(function(cfg){var out=[];','')
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':402,'height':874});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':5000,'owned':['tuna'],'pick':'tuna'}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel='tuna';startRun('single');P.fx.ghost=999;1")
  ev("(function(){"+STEER+"for(var n=0;n<30*90;n++){steer();update(1/30);P.fx.ghost=999;if(n%30==0)draw()}})();1")
  live=lambda: ev("(function(){var n=0;for(var k in SPRITES)if(SPRITES[k]&&SPRITES[k]._live)n++;return n})()")
  print('live in play',live())
  ev("endRun(false,true);1");pg.wait_for_timeout(6000);print('after end',live())
  ev("toHome();1");pg.wait_for_timeout(500);print('after home',live(),ev("JSON.stringify([fish.length,state,page,coveredNow(performance.now())])"),ev("JSON.stringify(CR.bc.slice(-3))"))
  pg.wait_for_timeout(7000);print('home+7s',live(),ev("JSON.stringify(Object.keys(SPRITES).filter(function(k){return SPRITES[k]._live}).slice(0,8))"));ev("campOpen(1);1");pg.wait_for_timeout(800);print('camp',live(),ev("JSON.stringify(CR.bc.slice(-3))"))
  print(errs)
