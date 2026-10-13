# CPU 4배 느리게(오래된 폰 흉내) 놓고 화면별 프레임 간격을 잰다: 할로윈 켜짐/꺼짐 비교
from playwright.sync_api import sync_playwright
import json,sys
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
MEAS="""new Promise(function(res){var ts=[],t0=performance.now();function f(t){ts.push(t);if(t-t0<5000)requestAnimationFrame(f);else{var d=[];for(var i=1;i<ts.length;i++)d.push(ts[i]-ts[i-1]);d.sort(function(a,b){return a-b});var avg=d.reduce(function(a,b){return a+b},0)/d.length;res([Math.round(1000/avg),Math.round(d[Math.floor(d.length*.95)]),d.filter(function(x){return x>50}).length])}}requestAnimationFrame(f)})"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    for hw in ('1','0'):
        pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=3);pg.route(lambda u:'supabase' in u, lambda r:r.abort())
        pg.goto(D+'t2e.html?lang=ko&build=release&hw='+hw);pg.wait_for_timeout(2500)
        cdp=pg.context.new_cdp_session(pg);cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
        ev=lambda c:pg.evaluate("c=>__ev(c)",c)
        ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.slice(0,40).map(function(x){return x.id});HS().lv=3;persist();1")
        res={}
        for name,js in [('home',"showTab('home');1"),('tank',"showTab('tank');1"),('single',"sel=save.owned[5];startRun('single');P.fx.ghost=9999;window.__drive&&__drive();1"),('surv',"endRun(false,false,null);document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});toHome();sel=save.owned[5];svStart(1);1")]:
            ev(js);pg.wait_for_timeout(1200);res[name]=pg.evaluate(MEAS)
        print('hw='+hw,'[fps, p95 ms, frames>50ms]',json.dumps(res),flush=True);pg.close()
    b.close()
