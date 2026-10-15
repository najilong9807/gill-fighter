from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--enable-gpu-rasterization']);pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=1)
    pg.route(lambda u:'supabase' in u, lambda r:r.abort());pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});sel='clownfish';svStart(8,true);1")
    pg.wait_for_timeout(800)
    for m in range(11):
        ev("for(var k=0;k<3600;k++){if(state!=='play'){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});state='play'}joy={id:1,ox:200,oy:400,x:200+Math.cos(k/40)*90,y:400+Math.sin(k/55)*70};P.fx.ghost=99;update(1/60)}1")
        r=ev("""(function(){function T(f){var a=performance.now();for(var j=0;j<20;j++)f();return +((performance.now()-a)/20).toFixed(2)}
        var full=T(draw);var keep=SV.en;var vis=0,R=viewR?viewR():600;keep.forEach(function(e){if(Math.abs(e.x-P.x)<R*1.2&&Math.abs(e.y-P.y)<R*1.6)vis++});SV.en=[];var none=T(draw);SV.en=keep;
        var u=T(function(){update(1/60)});return [Math.round(SV.t),full,none,u,keep.length,vis]})()""")
        print('t draw draw_noEnemies update enemies visible',r,flush=True)
    b.close()
