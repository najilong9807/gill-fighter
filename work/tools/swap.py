from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
OLD=json.dumps({"pearls":900,"gems":5,"owned":["anchovy","dumbo"],"pick":"dumbo","best":{"anchovy":500},"runs":7,"newsSeen":"1.1.11","thx1111":2})
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2);pg=ctx.new_page()
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(OLD))
    pg.goto(D+'t_mp.html?lang=ko');pg.wait_for_timeout(4000)
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true})")
    pg.click('#playBtn');pg.wait_for_timeout(2500)
    pg.evaluate("__ev('P.s=1;')") 
    pg.wait_for_timeout(200)
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});document.getElementById('over').hidden=false")
    pg.wait_for_timeout(2500)
    el=pg.query_selector('#swapBtn');print('vis',el.is_visible() if el else None)
    pg.screenshot(path='swap.png')
    ctx.close();b.close()
