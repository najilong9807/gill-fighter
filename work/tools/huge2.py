import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
  for m in [8,30,100]:
    pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':50,'onb':1,'tut':1,'newsSeen':'1.1.13','newsMute':'1.1.13','introDay':'x','owned':['anchovy'],'pick':'anchovy'}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.add_style_tag(path='gfonts.css');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("window.requestAnimationFrame=function(){return 0};document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel='anchovy';curSrv=SERVERS[0];NET.room='';startRun('multi');P.fx.ghost=999;for(var k=0;k<60;k++)update(1/30);P.time=30;1")
    ev("var S=P.s*%d;netState({i:'q',n:'큰상대',l:'%s',s:S,x:P.x+S*.95+P.s*5,f:(P.y)/H,vx:0,vy:0,a:Math.PI,k:0});for(var k=0;k<5;k++)update(1/30);draw();1"%(m,sys.argv[1] if len(sys.argv)>1 else 'footballfish'))
    pg.screenshot(path='h2_%d.png'%m);pg.close()
