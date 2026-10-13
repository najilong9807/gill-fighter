from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
OLD=json.dumps({"pearls":90000,"gems":500,"owned":["anchovy","clownfish","dumbo"],"pick":"dumbo","best":{"anchovy":500},"runs":60,"newsSeen":"1.1.11","thx1111":2,"bgm":True,"bgm115":1})
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files','--enable-precise-memory-info','--autoplay-policy=no-user-gesture-required'])
    pg=b.new_page(viewport={'width':390,'height':844})
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(OLD))
    pg.goto(D+'t_mp.html?lang=ko');pg.wait_for_timeout(3000);pg.mouse.click(200,300)
    def m(tag):
        r=pg.evaluate("()=>[Math.round(performance.memory.usedJSHeapSize/1e6),performance.getEntriesByType('resource').filter(function(e){return /svart\\/(ac_|fx_|bg_hw|hw_)/.test(e.name)}).length]")
        print(tag,'heapMB',r[0],'hwImgs',r[1])
    m('home')
    pg.evaluate("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});__ev(`showTab('shop')`)");pg.wait_for_timeout(2500);m('shop')
    pg.evaluate("__ev(`showTab('tank')`)");pg.wait_for_timeout(2500);m('tank')
    pg.wait_for_timeout(20000);m('after bgm')
    print(pg.evaluate("__ev('CR.bc.join(\" \")')"))
    b.close()
