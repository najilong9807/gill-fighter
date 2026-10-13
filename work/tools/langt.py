from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
S=json.dumps({"pearls":900,"owned":["anchovy"],"pick":"anchovy","best":{"anchovy":500},"runs":30,"newsSeen":"1.1.11","newsMute":"1.1.11","thx1111":2,"lang":"ko","onb":1,"tut":1})
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    ctx=b.new_context(viewport={'width':390,'height':844},locale='en-US');pg=ctx.new_page()
    pg.add_init_script("if(!sessionStorage.getItem('x')){localStorage.setItem('fishproto.save2',%s);sessionStorage.setItem('x',1)}"%json.dumps(S))
    pg.goto(D+'t_mp.html');pg.wait_for_timeout(3500)
    print('before',pg.evaluate("__ev('LANG')"))
    pg.evaluate("__ev(`setLang('en')`)");pg.wait_for_timeout(4000)
    print('after',pg.evaluate("__ev('[LANG,save.lang]')"))
    pg.evaluate("__ev(`setLang('ja')`)");pg.wait_for_timeout(4000)
    print('after2',pg.evaluate("__ev('[LANG,save.lang]')"))
    ctx.close()
    ctx=b.new_context(viewport={'width':390,'height':844},locale='ja-JP');pg=ctx.new_page();pg.goto(D+'t_mp.html');pg.wait_for_timeout(3000)
    print('fresh ja device',pg.evaluate("__ev('LANG')"))
    ctx.close();b.close()
