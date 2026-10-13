from playwright.sync_api import sync_playwright
P0='/tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
import sys
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    for f in sys.argv[1:]:
        pg=b.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        pg.goto('file://'+P0+f+'?lang=ko&build=release');pg.wait_for_timeout(2000)
        ev=lambda c: pg.evaluate("c=>__ev(c)",c)
        ev("try{$('onb').hidden=true}catch(x){};save.onb=1;save.runs=9;save.top={};save.board=[];save.wk=null;document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});sel='anchovy';startRun('single');1");pg.wait_for_timeout(500)
        ev("P.fx=P.fx||{};P.fx.ghost=999;for(var k=0;k<300;k++){update(1/30)}P.eaten=7;1")
        ev("pauseRun();$('quitBtn').click();1");pg.wait_for_timeout(500)
        print(f,ev("JSON.stringify({st:state,top:save.top,board:(save.board||[]).length,wk:save.wk,share:!$('oShare').hidden})"),errs)
        pg.close()
    b.close()
