from playwright.sync_api import sync_playwright
import json,sys
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
L=sys.argv[1] if len(sys.argv)>1 else 'ko'
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
    pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
    pg.goto(D+'t2e.html?lang='+L);pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("save.onb=1;save.runs=40;save.pearls=5000;save.newsSeen=APP_VER;HS().lv=3;AB().tap=598;DS().placed.push({k:'anem',x:.3,y:.72,s:1,f:0},{k:'coralo',x:.62,y:.72,s:1,f:0});persist();document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('tank');1")
    pg.wait_for_timeout(1200)
    print('coral',ev("var c=coralPos();tankCam=clamp(c.x-viewW()*.35,0,camMax());JSON.stringify([c,coralSt(),houseRate()])"))
    pg.wait_for_timeout(500);pg.screenshot(path='aby1.png')
    # tap coral 3 times -> stage up to 4
    print(ev("var c=coralPos();for(var i=0;i<3;i++)tankTap(c.x,c.y-c.h*.5);JSON.stringify([AB().tap,coralSt(),save.pearls,AB().dp])"))
    pg.wait_for_timeout(400);pg.screenshot(path='aby2.png')
    pg.wait_for_timeout(3500)
    print('guest',ev("JSON.stringify(ABY.vis?[ABY.vis.G.k,ABY.vis.L.id,ABY.vis.x|0,ABY.vis.y|0]:null)"))
    ev("if(ABY.vis){ABY.vis.x=tankCam+viewW()*.6;ABY.vis.y=ch*.4;ABY.vis.tx=ABY.vis.x;ABY.vis.ty=ABY.vis.y}1");pg.wait_for_timeout(600);pg.screenshot(path='aby3.png')
    print('meet',ev("var v=ABY.vis;v&&tankTap(v.x,v.y);JSON.stringify([AB().vis,save.owned.indexOf('moorish'),save.pearls])"))
    pg.wait_for_timeout(300)
    # pet fish
    print('pet',ev("var f=tank[0];tankCam=clamp(f.x-viewW()/2,0,camMax());for(var i=0;i<6;i++)tankTap(f.x,f.y);JSON.stringify([f.L.id,AB().aff[f.L.id],sel])"))
    pg.wait_for_timeout(250);pg.screenshot(path='aby4.png')
    ev("houseOpen();1");pg.wait_for_timeout(400);pg.screenshot(path='aby5.png')
    ev("houseClose();guestBook();1");pg.wait_for_timeout(400);pg.screenshot(path='aby6.png')
    ev("$('abyBook').hidden=true;HS().acc=0;HS().at=Date.now()-5*3600e3;AB().hid=Date.now()-3600e3;showTab('home');awayCheck();1");pg.wait_for_timeout(500);pg.screenshot(path='aby7.png')
    print('away',ev("JSON.stringify([!$('abyAway').hidden,houseN(),save.pearls])"))
    ev("$('awAd').click();1");pg.wait_for_timeout(7000)
    print('away2',ev("JSON.stringify([$('abyAway').hidden,houseN(),save.pearls])"))
    b.close()
print('errs',errs)
