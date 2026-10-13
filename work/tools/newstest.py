from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
errs=[]
OLD=json.dumps({"pearls":100,"gems":5,"owned":["anchovy"],"pick":"anchovy","best":{"anchovy":500},"theme":"reef","themes":["reef"],"items":{},"use":{},"bgm":True,"runs":7,"mp":{"games":2,"wins":0,"top3":0,"trophy":0,"best":3}})
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    for case,lang in (('new','ko'),('old','ko'),('old','en')):
        ctx=b.new_context(viewport={'width':390,'height':844});pg=ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)))
        if case=='old': pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(OLD))
        pg.add_init_script("window.__hp=[];window.Capacitor={isNativePlatform:function(){return true},Plugins:{Haptics:{impact:function(o){__hp.push(o.style);return Promise.resolve()},notification:function(o){__hp.push('N:'+o.type);return Promise.resolve()}}}}")
        pg.goto(D+'t_mp.html?lang='+lang);pg.wait_for_timeout(2600)
        pg.evaluate("var o=document.getElementById('onb');o&&!o.hidden&&document.getElementById('onbSkip').click()")
        pg.wait_for_timeout(4500)
        r=pg.evaluate("__ev('[save.bgm,save.bgm115,save.newsSeen,!$(\"news\").hidden,$(\"news\").innerText.replace(/\\\\n+/g,\" | \")]')")
        print(case,lang,r)
        if case=='old' and lang=='ko':
            pg.screenshot(path='news.png')
            pg.click('#newsOk');pg.wait_for_timeout(300)
            pg.click('#playBtn');pg.wait_for_timeout(300);pg.click('#mpRec');pg.wait_for_timeout(1200)
            print('hapt',pg.evaluate("__ev(`(function(){for(var i=0;i<fish.length;i++){if(fish[i].s<=P.s*eatRatio()){consume(fish[i],i);break}}buzz(70);return __hp})()`)"))
        ctx.close()
    b.close()
print('errs',errs[:4])
