from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page()
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(1500)
  print(pg.evaluate("c=>__ev(c)","JSON.stringify({dec:DECOR.map(function(D){return D.id+':'+D.name+':'+D.w+(D.hw?':hw':'')}),bg:TANK_BGS.map(function(B){return B.id+':'+B.name}),tw:TWW(),ch:ch,max:DECO_MAX})"))
