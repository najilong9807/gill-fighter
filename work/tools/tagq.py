import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':320,'height':568},device_scale_factor=2)
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':123456,'gems':321,'owned':['shark','anchovy'],'pick':'shark'}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ja&build=release&hw=1');pg.wait_for_timeout(2600)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('sea');1");pg.wait_for_timeout(800)
  print(ev("var g=document.querySelector('#goodsAcc .good.hw, #goodsAcc .good');g.outerHTML.replace(/src=\"[^\"]*\"/g,'').slice(0,1200)"))
