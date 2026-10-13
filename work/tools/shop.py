from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
OLD=json.dumps({"pearls":90000,"gems":500,"owned":["anchovy","clownfish","dumbo"],"pick":"dumbo","best":{"anchovy":500},"runs":60,"newsSeen":"1.1.11","thx1111":2})
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2);pg=ctx.new_page()
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(OLD))
    pg.goto(D+'t_mp.html?lang=ko');pg.wait_for_timeout(3500)
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});__ev(`showTab('sea')`)");pg.wait_for_timeout(1500)
    pg.evaluate("var e=[].slice.call(document.querySelectorAll('button,a')).find(function(x){return /꾸미기/.test(x.textContent)&&x.offsetParent});e&&e.click()");pg.wait_for_timeout(2500)
    pg.screenshot(path='shop.png')
    ctx.close();b.close()
