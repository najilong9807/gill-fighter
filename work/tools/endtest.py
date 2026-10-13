import sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
F=sys.argv[1] if len(sys.argv)>1 else 't2e.html'
modes=[('normal','1'),('inf','3,true'),('daily','1,false,true'),('rush','1,false,false,true'),('trial','1,false,false,false,0'),('week','1,false,false,true,null,true'),('hard','2')]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    for name,args in modes:
      for how in ['die','win']:
        pg=b.new_page(viewport={'width':375,'height':667});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        pg.goto(D+F+'?lang=ko&build=release');pg.wait_for_timeout(1500)
        ev=lambda c: pg.evaluate("c=>__ev(c)",c)
        ev("localStorage.clear();try{$('onb').hidden=true}catch(x){};save.onb=1;save.sv={};var S=svSave();S.guide=1;S.plays=9;S.hard={2:1};for(var c=1;c<9;c++){svChS(c).clear=1};save.owned=SPECIES.map(function(L){return L.id});sel='anchovy';svStart(%s)"%args)
        pg.wait_for_timeout(500)
        ev("for(var k=0;k<90;k++){if(!$('svUp').hidden){var c=$('svUpList').querySelector('.svc');c&&c.click()}if(!$('svBox').hidden)svBoxDone();update(1/30)}")
        if how=='die':
            ev("SV.hp=1;SV.inv=0;SV.bgd=0;svPlayerHit(1)")
            pg.wait_for_timeout(300)
            ev("if(!$('svRev').hidden)svReviveNo()")
        else:
            ev("SV.won=true;SV.winT=.05;for(var k=0;k<40;k++){if(!$('svUp').hidden){var c=$('svUpList').querySelector('.svc');c&&c.click()}if(!$('svBox').hidden)svBoxDone();update(1/30)}")
        pg.wait_for_timeout(2500)
        r=ev("JSON.stringify({st:state,res:$('svRes')&&!$('svRes').hidden,ov:[...document.querySelectorAll('.overlay')].filter(function(o){return !o.hidden&&getComputedStyle(o).display!=='none'}).map(function(o){return o.id})})")
        print(name,how,r,errs[:2],flush=True);pg.close()
    b.close()
