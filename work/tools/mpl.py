import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LINT=open('walk2.py').read().split('LINT=r"""')[1].split('"""')[0]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lang in ['ko','en','ja']:
    pg=b.new_page(viewport={'width':320,'height':568},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':50,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'owned':['anchovy','tuna','shark'],'pick':'tuna','best':{'tuna':300},'top':{'score':5}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release'%lang);pg.add_style_tag(path='gfonts.css');pg.add_style_tag(content=':root{--sat:47px;--sab:34px}');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel='tuna';curSrv=SERVERS[0];NET.room='';startRun('multi');1");pg.wait_for_timeout(1500)
    ev("for(var k=0;k<90;k++)update(1/30);1");pg.wait_for_timeout(500);r0=ev(LINT);print("play",json.dumps({k:v for k,v in r0.items() if v},ensure_ascii=False)[:400])
    pg.screenshot(path='mp_play_%s.png'%lang)
    ev("endRun(false);1");pg.wait_for_timeout(3000)
    pg.screenshot(path='mp_res_%s.png'%lang);r=ev(LINT);print(lang,json.dumps({k:v for k,v in r.items() if v},ensure_ascii=False)[:500],errs[:2])
    pg.close()
