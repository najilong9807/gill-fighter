from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--enable-precise-memory-info','--js-flags=--expose-gc']);pg=b.new_page(viewport={'width':390,'height':844})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]));pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});HS().lv=5;buildTank();showTab('tank');1")
    SN="(function(){window.gc&&gc();return {t:Math.round(t),rip:TK_RIP.length,abyfx:ABY.fx.length,pops:tankPops.length,tank:tank.length,heap:Math.round(performance.memory.usedJSHeapSize/1048576),vis:!!ABY.vis,ov:[].filter.call(document.querySelectorAll('.overlay'),function(o){return !o.hidden}).length,dom:document.getElementsByTagName('*').length}})()"
    print('0',ev(SN))
    for blk in range(12):  # 블록당 10분(게임 시간)
        ev("""(function(){for(var k=0;k<36000;k++){update(1/60);if(k%180===0){try{coralTap()}catch(e){}}if(k%600===0){var f=tank[(k/600|0)%tank.length];try{tankTap(f.x,f.y)}catch(e){}}if(k%3000===0){try{var o=AB();o.vis={};var D=DS();D.placed=[{k:'anem',x:.3,y:.8,s:1,f:0},{k:'coralo',x:.5,y:.8,s:1,f:0}];var g=guestReady();if(g){guestSpawn(g)}}catch(e){}}if(k%3001===0&&ABY.vis){try{guestMeet()}catch(e){}}if(k%9000===0){try{feedTick&&0}catch(e){}}if(k%60===0)draw()}document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});document.querySelectorAll('.coach').forEach(function(x){x.remove()});return 1})()""")
        print((blk+1)*10,'min',ev(SN),flush=True)
    print('errs',errs[:5]);b.close()
