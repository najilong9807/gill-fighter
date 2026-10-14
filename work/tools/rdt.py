import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lang in ['ko','en']:
    pg=b.new_page(viewport={'width':402,'height':874},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':5000,'owned':['tuna'],'pick':'tuna','hwAtt':{'y':2026,'n':7,'d':'x'}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lang);pg.wait_for_timeout(3000)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('home');1");pg.wait_for_timeout(1500)
    print(lang,'start',ev("JSON.stringify([rdSingle(),rdAll(),$('playBtn').classList.contains('rdot'),$('playDot')&&$('playDot').hidden])"),ev("$('banner').hidden?'':$('banner').textContent"))
    # make survival achievement claimable: give a survival chest ready by clearing ch1
    ev("var O=svChS(1);O.best=420;O.clear=1;persist();1");pg.wait_for_timeout(1500)
    print(' after sv clear',ev("JSON.stringify([rdSingle(),$('playBtn').classList.contains('rdot')])"),ev("$('banner').hidden?'':$('banner').textContent"))
    pg.screenshot(path='rd_home_%s.png'%lang)
    ev("showTab('tank');1");pg.wait_for_timeout(1200);print(' tank playDot visible',ev("!$('playDot').hidden"));pg.screenshot(path='rd_tank_%s.png'%lang)
    print(' errs',errs);pg.close()
