import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lang in ['ko']:
    pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'owned':['anchovy'],'pick':'anchovy'}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lang);pg.wait_for_timeout(2500)
    pg.evaluate("c=>__ev(c)","document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('sea');1")
    pg.wait_for_timeout(1500)
    pg.evaluate("()=>{var s=document.getElementById('goodsAcc');s.scrollIntoView({block:'start'});window.scrollBy(0,-260)}")
    pg.wait_for_timeout(4000)
    pg.screenshot(path='shop_%s.png'%lang)
    print(lang,pg.evaluate("()=>[].map.call(document.querySelectorAll('#goodsAcc .good'),g=>{var b=g.querySelector('b');var i=g.querySelector('.ico img');return b.textContent+'|'+b.style.fontSize+'|'+(i?i.naturalWidth+'/'+i.src.length:'-')}).join(' ; ')"),errs)
    pg.close()
