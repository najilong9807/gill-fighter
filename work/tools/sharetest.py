from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
INIT="""window.__AL=[];window.Capacitor={isNativePlatform:function(){return true},getPlatform:function(){return 'ios'},Plugins:{
App:{addListener:function(n,f){__AL.push([n,f]);return Promise.resolve({remove:function(){}})}},
Share:{share:function(o){window.__sh=(window.__sh|0)+1;__AL.forEach(function(a){if(a[0]==='appStateChange')a[1]({isActive:false})});return new Promise(function(res){setTimeout(function(){__AL.forEach(function(a){if(a[0]==='appStateChange')a[1]({isActive:true})});res({})},1500)})}},
Filesystem:{writeFile:function(){return Promise.resolve({uri:'file:///x.jpg'})}}}}"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':393,'height':852})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]));pg.add_init_script(INIT);pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});toHome();sel='clownfish';svStart(1);for(var k=0;k<3600*2;k++){if(state!=='play'){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});state='play'}P.fx.ghost=99;update(1/60)}SV.hp=0;SV.adRev=1;P.fx.ghost=0;1")
    pg.wait_for_timeout(500);ev("endRun(false,false,null);1");pg.wait_for_timeout(1500)
    print('result',ev("[state,svOvOpen(),!!$('svShare').offsetParent,$('svShare').hidden]"))
    ev("$('svShare').click();1")
    for i in range(10):
        pg.wait_for_timeout(700);print(round(i*.7,1),ev("[state,svOvOpen(),window.__sh|0,CR.bc.slice(-3).join(' ')]"))
    print('errs',errs);b.close()
