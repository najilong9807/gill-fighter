from playwright.sync_api import sync_playwright
import json,time
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
RUN="""(function(n){for(var k=0;k<n;k++){if(state!=='play')return 'stop';joy={id:1,ox:200,oy:400,x:200+Math.cos(SV.t/1.3)*90,y:400+Math.sin(SV.t/1.7)*70};P.fx.ghost=99;update(1/60)}return 'ok'})"""
MEAS="(function(){var a=performance.now();for(var i=0;i<60;i++)update(1/60);return [Math.round(SV.t||0),+((performance.now()-a)/60).toFixed(2),SV.en.length,Object.keys(SV.w).map(function(k){return k+SV.w[k].lv}).join(','),SV.lv,Math.round(performance.memory?performance.memory.usedJSHeapSize/1048576:0)]})()"
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--enable-precise-memory-info']);pg=b.new_page(viewport={'width':375,'height':812})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:160]));pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});sel='clownfish';svStart(3,true);1")
    pg.wait_for_timeout(1000);nextm=60;picks=0;t0=time.time()
    while time.time()-t0<540:
        r=pg.evaluate("a=>__ev(%s)(a)"%json.dumps(RUN),600)
        if r=='stop':
            st=ev("[state,!$('svUp').hidden,[].filter.call(document.querySelectorAll('.overlay'),function(o){return !o.hidden}).map(function(o){return o.id}).join(',')]")
            if st[1]:
                pg.wait_for_timeout(500);pg.click('#svUpList .svc');picks+=1;pg.wait_for_timeout(400)
            elif st[0]=='over': print('over',st);break
            else:
                ev("document.querySelectorAll('.overlay').forEach(function(o){if(o.id!=='svUp')o.hidden=true});if(state==='pause')resumeRun();1");pg.wait_for_timeout(300)
                if ev("state")!='play': print('stuck',st);break
        t=ev("SV.t||0")
        if t>=nextm:
            print('t,upd ms,enemies,weapons,lv,heap',ev(MEAS),'picks',picks,flush=True);nextm+=60
        if t>=600:break
    print('errs',errs[:5]);b.close()
