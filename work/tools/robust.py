from playwright.sync_api import sync_playwright
P0='/tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
import sys,json
f=sys.argv[1]
base="try{$('onb').hidden=true}catch(x){};try{$('news').hidden=true}catch(x){};save.onb=1;save.runs=9;document.querySelectorAll('.coach').forEach(function(x){x.remove()});document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1"
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    def page():
        pg=b.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]));pg.goto('file://'+P0+f+'?lang=ko&build=release');pg.wait_for_timeout(1800);return pg,errs
    ev=lambda pg,c: pg.evaluate("c=>__ev(c)",c)
    # 1 single crash recovery commits records
    pg,errs=page();ev(pg,base);ev(pg,"save.top={};save.board=[];dmEnsure();save.dm.ids=['solo','eat','pearl'];save.dm.v={};sel='anchovy';startRun('single');1");pg.wait_for_timeout(300)
    ev(pg,"P.fx.ghost=999;for(var k=0;k<700;k++)update(1/30);P.eaten=9;runSnap();state='home';1")
    r=ev(pg,"var g=runRecover();JSON.stringify({g:g,top:save.top,board:save.board.length,wk:save.wk&&save.wk.single,pend:!!RES_PEND,dm:save.dm&&save.dm.v})");print('single-recover',r,errs);pg.close()
    # 2 resume then die: board single entry, missions not doubled
    pg,errs=page();ev(pg,base);ev(pg,"save.top={};save.board=[];dmEnsure();save.dm.ids=['solo','eat','pearl'];save.dm.v={};sel='anchovy';startRun('single');1");pg.wait_for_timeout(300)
    ev(pg,"P.fx.ghost=999;for(var k=0;k<700;k++)update(1/30);P.eaten=9;runSnap();state='home';fish.length=0;1")
    ev(pg,"runRecover();var e0=JSON.stringify(save.dm.v);window.__e0=e0;runResume(RES_PEND);1");pg.wait_for_timeout(300)
    r=ev(pg,"P.eaten+=3;endRun(false,false,null);JSON.stringify({st:state,board:save.board.length,dm0:JSON.parse(window.__e0),dm:save.dm.v})");print('resume-end',r,errs);pg.close()
    # 3 continue double count
    pg,errs=page();ev(pg,base);ev(pg,"save.board=[];dmEnsure();save.dm.ids=['solo','eat','pearl'];save.dm.v={};sel='anchovy';startRun('single');1");pg.wait_for_timeout(300)
    r=ev(pg,"P.fx.ghost=999;for(var k=0;k<700;k++)update(1/30);P.eaten=5;endRun(false,false,null);var a=JSON.stringify(save.dm.v);continueRun(true);P.eaten=8;P.time+=5;endRun(false,false,null);JSON.stringify({a:JSON.parse(a),b:save.dm.v,board:save.board.length})");print('continue',r,errs);pg.close()
    # 4 survival crash recovery
    pg,errs=page();ev(pg,base);ev(pg,"var S=svSave();S.guide=1;S.gasTip=5;S.ch={};var p0=save.pearls;window.__p0=p0;sel='anchovy';svStart(1);1");pg.wait_for_timeout(400)
    ev(pg,"SV.inv=999;for(var k=0;k<1500;k++){update(1/30);if(!$('svUp').hidden){$('svUp').hidden=true;state='play'}}runSnap();state='home';P.surv=false;1")
    r=ev(pg,"var g=runRecover();JSON.stringify({g:g,best:svChS(1).best,pearlsGain:save.pearls-window.__p0})");print('surv-recover',r,errs);pg.close()
    # 5 camp soft-lock & retry
    pg,errs=page();ev(pg,base);r=ev(pg,"var e=EN();e.n=0;persist();$('campRes').hidden=false;state='over';campStart(1);JSON.stringify({campRes:!$('campRes').hidden,rt:typeof NE_RT,sheet:!$('sheet')||!$('sheet').hidden})");print('camp-0energy',r,errs)
    r=ev(pg,"save.gems=999;var bt=document.getElementById('en-refill')||[...document.querySelectorAll('button')].find(function(x){return /에너지 가득/.test(x.textContent)});bt&&bt.click();JSON.stringify({st:state,camp:!!P.camp})");print('camp-refill',r,errs);pg.close()
    # 6 survival 0 energy refill starts survival
    pg,errs=page();ev(pg,base);r=ev(pg,"var S=svSave();S.guide=1;var e=EN();e.n=0;persist();save.gems=999;svStart(1);var bt=document.getElementById('en-refill')||[...document.querySelectorAll('button')].find(function(x){return /에너지 가득/.test(x.textContent)});bt&&bt.click();JSON.stringify({st:state,surv:!!P.surv})");print('surv-refill',r,errs);pg.close()
    b.close()
