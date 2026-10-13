from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':375,'height':812},device_scale_factor=3)
    pg.route(lambda u:'supabase' in u, lambda r:r.abort());pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});sel='clownfish';svStart(3,true);1")
    pg.wait_for_timeout(800)
    for m in range(9):
        ev("for(var k=0;k<3600;k++){if(state!=='play'){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});state='play'}joy={id:1,ox:200,oy:400,x:200+Math.cos(k/40)*90,y:400+Math.sin(k/55)*70};P.fx.ghost=99;update(1/60)}1")
        r=ev("(function(){var a=performance.now();for(var i=0;i<30;i++)update(1/60);var b=performance.now();for(var j=0;j<30;j++)draw();var c=performance.now();return [Math.round(SV.t),+((b-a)/30).toFixed(2),+((c-b)/30).toFixed(2),SV.en.length,(SV.orbs||SV.gems||[]).length,Object.keys(SV.w).map(function(k){return k+SV.w[k].lv}).join(','),save.lite?1:0]})()")
        print('t,update ms,draw ms,enemies,orbs,weapons',r,flush=True)
    b.close()
