import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lang in ['ko','ja']:
    pg=b.new_page(viewport={'width':360,'height':760},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'owned':['anchovy'],'pick':'anchovy','hwAtt':{'y':2026,'n':7,'d':'x'}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%lang);pg.wait_for_timeout(2500)
    pg.evaluate("c=>__ev(c)","document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});HM().v={candy:4};dmOpen();$('daily').hidden=false;1");pg.wait_for_timeout(700)
    pg.screenshot(path='dmhw_%s.png'%lang);print(lang,errs)
    pg.click('#dmHw');pg.wait_for_timeout(500);print(pg.evaluate("()=>[document.getElementById('daily').hidden,document.getElementById('hwEv').hidden]"))
