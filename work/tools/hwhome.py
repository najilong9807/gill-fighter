from playwright.sync_api import sync_playwright
import json,sys
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
OLD=json.dumps({"pearls":100,"gems":5,"owned":["anchovy","dumbo"],"pick":"dumbo","best":{"anchovy":500},"runs":7,"newsSeen":"1.1.10"})
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2);pg=ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(OLD))
    pg.goto(D+'t_mp.html?lang=ko');pg.wait_for_timeout(7000)
    print('news',pg.evaluate("__ev('[!$(\"news\").hidden,save.thx1111,save.pearls]')"))
    pg.click('#newsOk');pg.wait_for_timeout(5000)
    print('ov',pg.evaluate("__ev('[page,state,Array.prototype.filter.call(document.querySelectorAll(\".overlay\"),function(o){return !o.hidden}).map(function(o){return o.id}),!!document.getElementById(\"intro\"),save.newsSeen,APP_VER]')"))
    print('thx',pg.evaluate("__ev('[!!$(\"thx\")&&!$(\"thx\").hidden,save.thx1111,save.pearls]')"))
    pg.screenshot(path='thx.png')
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){if(o.id!=='thx')o.hidden=true})");pg.wait_for_timeout(3500);print('thx2',pg.evaluate("__ev('[!!$(\"thx\")&&!$(\"thx\").hidden]')"));pg.click('#thxOk');pg.wait_for_timeout(800)
    print('after',pg.evaluate("__ev('[$(\"thx\").hidden,save.thx1111,save.pearls]')"))
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true})")
    pg.wait_for_timeout(2500);pg.screenshot(path='hwhome.png')
    ctx.close()
    # new user: no thx
    ctx=b.new_context(viewport={'width':390,'height':844});pg=ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(D+'t_mp.html?lang=ko');pg.wait_for_timeout(5000)
    print('newuser',pg.evaluate("__ev('[save.thx1111,!!document.getElementById(\"thx\")]')"))
    ctx.close();b.close()
print('errs',errs[:5])
