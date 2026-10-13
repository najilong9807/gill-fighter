from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page()
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(1500)
  r=pg.evaluate("c=>__ev(c)","JSON.stringify(SPECIES.map(function(L){var o={id:L.id,cap:L.cap,price:L.price||0,g:gradeOf(L).name};['growth','speed','turn','eatBase','pearlMult','startS','depthBonus','light','kind','ratio','sizeK','spd','agil','biteR','home'].forEach(function(k){if(L[k]!==undefined)o[k]=L[k]});return o}))")
  open('stats.json','w').write(r)
  print(pg.evaluate("c=>__ev(c)","Object.keys(byId('manta')).join(',')"))
