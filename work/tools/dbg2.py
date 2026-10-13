import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844});fails=[];pg.on('requestfailed',lambda r:fails.append(r.url[-60:]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'owned':['anchovy'],'pick':'anchovy'}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(3000)
  print(pg.evaluate("c=>__ev(c)","JSON.stringify(Object.keys(HWACS).slice(0,40).map(function(k){var o=HWACS[k];return k+':'+o.complete+':'+o.naturalWidth}))"))
  print(pg.evaluate("c=>__ev(c)","var e=accIcon(accById('hw_witch'));[e.tagName,typeof hw2Preload,Object.keys(HWACS).length,String(accIcon).slice(0,200)].join(' | ')"))
  pg.wait_for_timeout(1500)
  print(pg.evaluate("c=>__ev(c)","JSON.stringify(Object.keys(HWACS).map(function(k){var o=HWACS[k];return k+':'+o.complete+':'+o.naturalWidth}))"))
  print([f for f in fails if 'svart' in f][:5])
