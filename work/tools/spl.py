from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page()
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(1500)
  r=pg.evaluate("c=>__ev(c)","JSON.stringify(SPECIES.map(function(L){return [L.id,L.sk,L.price||0,L.gem?1:0,L.cap,gradeOf(L).name,L.cd,L.name]}))")
  open('species.json','w').write(r);print(len(json.loads(r)))
