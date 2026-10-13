from playwright.sync_api import sync_playwright
import json,sys
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
OLD=json.dumps({"pearls":5000,"gems":50,"owned":["anchovy","clownfish","dumbo","bluetang","puffer"],"pick":"dumbo","best":{"anchovy":500},"runs":60,"newsSeen":"1.1.11","thx1111":2})
pre=sys.argv[1] if len(sys.argv)>1 else 'ui'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2);pg=ctx.new_page()
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(OLD))
    pg.goto(D+'t_mp.html?lang=ko');pg.wait_for_timeout(4000)
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true})")
    pg.evaluate("__ev(`showTab('dex')`)");pg.wait_for_timeout(1500);pg.screenshot(path=pre+'_dex.png')
    pg.evaluate("__ev(`achOpen()`)");pg.wait_for_timeout(1200);pg.screenshot(path=pre+'_ach.png')
    pg.evaluate("__ev(`ACH_TAB='ach';achRender()`)");pg.wait_for_timeout(600);pg.screenshot(path=pre+'_ach2.png')
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});__ev(`showTab('home')`)");pg.wait_for_timeout(800)
    pg.evaluate("__ev(`dmOpen()`)")
    pg.wait_for_timeout(1200);pg.screenshot(path=pre+'_miss.png')
    ctx.close();b.close()
