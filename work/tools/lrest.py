from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=3)
    e=[];pg.on('pageerror',lambda x:e.append(str(x)[:200]))
    pg.route(lambda u:'supabase' in u, lambda r:r.abort());pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});sel='clownfish';svStart(8,true);1")
    pg.wait_for_timeout(800);print('start',ev("[dpr,cv.width,SV.en.length,LRES]"))
    for m in range(7):
        ev("for(var k=0;k<3600;k++){if(state!=='play'){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});state='play'}joy={id:1,ox:200,oy:400,x:200+Math.cos(k/40)*90,y:400+Math.sin(k/55)*70};P.fx.ghost=99;update(1/60)}draw();1")
        print(ev("[Math.round(SV.t),SV.en.length,dpr,cv.width,LRES]"))
    pg.wait_for_timeout(500);pg.screenshot(path='lres_play.png')
    ev("svEnd&&0;SV.en.length=0;draw();1");print('few',ev("[dpr,cv.width,LRES]"))
    ev("endRun(false);1");pg.wait_for_timeout(1500);ev("draw();1");print('end',ev("[state,dpr,cv.width,LRES]"),e)
