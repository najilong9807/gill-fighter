import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
CASES=[('ko',320,568),('en',320,568),('ja',390,844),('en',844,390)]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lang,w,h in CASES:
    pg=b.new_page(viewport={'width':w,'height':h},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'owned':['anchovy'],'pick':'anchovy','hwAtt':{'y':2026,'n':7,'d':'x'},'hwCandy':92,'hwcGot':[0],'hwm':{'d':'X','v':{},'got':{}}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lang);pg.wait_for_timeout(2600)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});HM().v={candy:2,boss:1,solo:3};HM().got={solo:1};persist();showTab('home');1")
    pg.wait_for_timeout(1200);tag='%s_%dx%d'%(lang,w,h)
    pg.screenshot(path='d_home_%s.png'%tag)
    print(tag,'bar',ev("var b=$('hwBar');JSON.stringify([b.hidden,b.querySelector('span').textContent,b.querySelector('span').style.fontSize,b.querySelector('span').scrollWidth>b.querySelector('span').clientWidth+1])"))
    ev("hwEvOpen();1");pg.wait_for_timeout(900);pg.screenshot(path='d_ev_%s.png'%tag)
    print(tag,'ov',ev("var p=document.querySelector('.hwe-panel');var r=p.getBoundingClientRect();var bad=[].filter.call(p.querySelectorAll('b,small,em,button,h1,h3,p'),function(e){return e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).textOverflow!=='ellipsis'}).map(function(e){return e.tagName+':'+e.textContent.slice(0,20)});JSON.stringify([Math.round(r.top),Math.round(r.bottom),innerHeight,p.scrollHeight>p.clientHeight,bad])"))
    print(tag,errs)
    pg.close()
