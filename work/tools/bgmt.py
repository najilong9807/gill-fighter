from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
OLD=json.dumps({"pearls":900,"owned":["anchovy"],"pick":"anchovy","best":{"anchovy":500},"runs":7,"newsSeen":"1.1.11","thx1111":2,"bgm":True,"bgm115":1,"bgmPick":"party"})
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--autoplay-policy=no-user-gesture-required'])
    pg=b.new_page(viewport={'width':390,'height':844});pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(OLD))
    pg.goto(D+'t_mp.html?lang=ko');pg.wait_for_timeout(3000)
    pg.mouse.click(200,300);pg.wait_for_timeout(15000)
    print('home',pg.evaluate("__ev('[MUS&&MUS.cur,CR.bc.join(\" \")]')"))
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true})");pg.evaluate("__ev(`try{startGame('single')}catch(e){}`)");pg.wait_for_timeout(5000)
    print('play',pg.evaluate("__ev('[state,mode,MUS.cur]')"))
    pg.evaluate("__ev(`MUS.pick('lagoon')`)");pg.wait_for_timeout(9000)
    print('picked',pg.evaluate("__ev('[MUS.cur,save.bgmPick,save.bgmPickHw]')"))
    b.close()
print('errs',errs[:3])
