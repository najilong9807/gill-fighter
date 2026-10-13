from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(1500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    def st(n): print(n,ev("JSON.stringify({st:state,tut:TUT.on,step:TUT.step,eat:P.eaten,nb:P.nibbles,box:!$('tutBox').hidden,txt:$('tutBox').innerText.replace(/\\n/g,' | '),dead:P.dead,s:Math.round(P.s)})"))
    for i in range(12):
        pg.wait_for_timeout(1000)
        if ev("state==='play'?1:0"): break
    st('start');pg.screenshot(path='tut0.png')
    pg.wait_for_timeout(5000);st('s1');pg.screenshot(path='tut1.png')
    for k in range(3):
        ev("var f=null,bd=1e9;for(var i=0;i<fish.length;i++){var q=fish[i];if(q.s<P.s*.9){var d=Math.hypot(q.x-P.x,q.y-P.y);if(d<bd){bd=d;f=q}}}if(f){var m=mouthOf(P.x,P.y,P.s,P.ang,P.look);P.x+=f.x-m[0];P.y+=f.y-m[1];P.vx=P.vy=0}1");pg.wait_for_timeout(600)
    pg.wait_for_timeout(600);st('s2');pg.screenshot(path='tut2.png')
    # put big fish mouth on player (invuln test)
    for k in range(5):
        ev("var f=TUT.big;if(f){var m=mouthOf(f.x,f.y,f.s,f.ang,f.look);P.x=m[0];P.y=m[1]}1");pg.wait_for_timeout(300)
    st('afterTouch')
    ev('TUT.t=7;1');pg.wait_for_timeout(800);st('s3');pg.screenshot(path='tut3.png')
    ev("var f=TUT.big;if(f)nibble(f,[P.x,P.y]);1");pg.wait_for_timeout(500);st('s4');pg.screenshot(path='tut4.png')
    ev('TUT.t=5;1');pg.wait_for_timeout(800);st('end')
    ev("var f=null;for(var i=0;i<fish.length;i++){if(fish[i].s>P.s*1.3){f=fish[i];break}}if(f){var m=mouthOf(f.x,f.y,f.s,f.ang,f.look);P.x=m[0];P.y=m[1]}1");pg.wait_for_timeout(800);st('afterEndTouch')
    print('errs',errs,'save.tut',ev("save.tut"),ev("save.onb"))
