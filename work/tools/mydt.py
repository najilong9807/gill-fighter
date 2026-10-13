import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lang,w,h in [('ko',390,844),('en',320,640)]:
    pg=b.new_page(viewport={'width':w,'height':h},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':5000,'owned':['anchovy','clownfish'],'pick':'anchovy','hwAtt':{'y':2026,'n':7,'d':'x'},
        'decor':{'v':2,'placed':[{'k':'jacko','x':.3,'y':.8,'s':1,'f':0},{'k':'jacko','x':.5,'y':.8,'s':1,'f':0},{'k':'cauldron','x':.6,'y':.8,'s':1,'f':0}],'inv':{'cauldron':2,'pumpkinhouse':1,'chest':1}}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lang);pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('tank');1");pg.wait_for_timeout(1500)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});decoStart();1");pg.wait_for_timeout(800)
    print(lang,'btn',ev("var b=$('ddMine');JSON.stringify([!!b,b&&b.hidden,b&&b.textContent])"))
    pg.screenshot(path='myd_drawer_%s.png'%lang)
    pg.click('#ddMine');pg.wait_for_timeout(600);pg.screenshot(path='myd_%s.png'%lang)
    cnt=lambda: ev("JSON.stringify(mydCounts())")
    print(' start',cnt())
    pg.click('#mydGrid .myd-c:has-text("%s") .myd-b.in'%('' if True else ''),timeout=3000) if False else None
    ev("var bs=[].slice.call(document.querySelectorAll('#mydGrid .myd-c'));bs[0].querySelector('.myd-b.out').click();1");print(' after out',cnt())
    ev("var bs=[].slice.call(document.querySelectorAll('#mydGrid .myd-c'));bs.forEach(function(c){var x=c.querySelector('.myd-b.in');if(!x.disabled)x.click()});1");print(' after in',cnt(),ev("DS().placed.length"))
    ev("$('mydAll').click();1");print(' after all',cnt(),ev("DS().placed.length"))
    ev("MYD.f='inv';mydRender();1");pg.wait_for_timeout(300);pg.screenshot(path='myd2_%s.png'%lang)
    print(' errs',errs)
    pg.close()
