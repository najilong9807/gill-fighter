from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
errs=[]
def save(extra):
    o={"pearls":900,"gems":50,"owned":["anchovy","dumbo"],"pick":"dumbo","best":{"anchovy":500},"runs":30,"thx1111":2,"onb":1,"tut":1};o.update(extra);return json.dumps(o)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    # news: second launch should show again, mute stops it
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2);pg=ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.add_init_script("if(!sessionStorage.getItem('x')){localStorage.setItem('fishproto.save2',%s);sessionStorage.setItem('x',1)}"%json.dumps(save({"newsSeen":"1.1.11"})))
    pg.goto(D+'t_mp.html?lang=ko');pg.wait_for_timeout(4000);pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){if(o.id!=='news')o.hidden=true})");pg.wait_for_timeout(2500)
    print('launch2 news shown',pg.evaluate("__ev('[!$(\"news\").hidden,save.newsSeen,save.newsMute,NEWS_SESS,page,state,Array.prototype.filter.call(document.querySelectorAll(\".overlay\"),function(o){return !o.hidden}).map(function(o){return o.id}),CR.bc.join(\" \")]')"))
    pg.screenshot(path='news2.png')
    pg.click('#newsMute');pg.wait_for_timeout(500)
    print('muted',pg.evaluate("__ev('save.newsMute')"))
    pg.reload();pg.wait_for_timeout(4000);pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){if(o.id!=='news')o.hidden=true})");pg.wait_for_timeout(2500)
    print('launch3 news shown',pg.evaluate("__ev('!$(\"news\").hidden')"))
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true})")
    pg.evaluate("__ev(`showTab('tank')`)");pg.wait_for_timeout(2500);pg.screenshot(path='tank_hw.png')
    pg.evaluate("__ev(`showTab('home')`)");pg.wait_for_timeout(800)
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});__ev('startRun(\\'single\\')')");pg.wait_for_timeout(5000);print('st',pg.evaluate("__ev('[state,mode,MUS.cur]')"));pg.screenshot(path='play_hw.png')
    ctx.close();b.close()
print('errs',errs[:4])
