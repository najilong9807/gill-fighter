from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
OLD=json.dumps({"pearls":900000,"gems":500,"owned":["anchovy","dumbo","clownfish"],"pick":"dumbo","best":{"anchovy":500},"runs":7,"newsSeen":"1.1.11","thx1111":2,"tankBgs":["reef","hwship"],"tankBg":"hwship"})
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2);pg=ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(OLD))
    pg.goto(D+'t_mp.html?lang=ko');pg.wait_for_timeout(4500)
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true})")
    pg.evaluate("__ev(`showTab('tank')`)");pg.wait_for_timeout(3000);pg.screenshot(path='bg_tank.png')
    pg.evaluate("__ev(`showTab('home')`)");pg.wait_for_timeout(2000);pg.screenshot(path='bg_home.png')
    print(pg.evaluate("__ev(`[typeof hwBgmOn,hwBgmOn(),TB().id,BGM_LIST.length]`)"))
    ctx.close();b.close()
print('errs',errs[:5])
