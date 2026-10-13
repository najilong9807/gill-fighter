from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files']);pg=b.new_page()
  fails=[];pg.on('requestfailed',lambda r:fails.append(r.url[-50:]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
  pg.evaluate("c=>__ev(c)","Object.keys(HW2H).forEach(function(k){hwAcs(HW2H[k][0])});1");pg.wait_for_timeout(3000)
  print(pg.evaluate("c=>__ev(c)","JSON.stringify(Object.keys(HWACS).map(function(k){return k+':'+HWACS[k].naturalWidth}))"))
  print(fails[:5])
