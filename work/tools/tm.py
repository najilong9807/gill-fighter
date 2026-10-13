from playwright.sync_api import sync_playwright
import sys
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
SC={'play':"document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('solo');1",'surv':"document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});svStart(0);1",'tank':"var H=HS();H.lv=4;showTab('tank');1"}
INST="""(function(){window.__tm={};function wrap(name){var f=eval(name);if(typeof f!=='function')return;var g=function(){var t0=performance.now();try{return f.apply(this,arguments)}finally{__tm[name]=(__tm[name]||0)+performance.now()-t0}};eval(name+'=g')}
['wobble','decorLayer','drawProp','hwTint','hwPlayFx','hwWorldFx','drawFishDeco','draw','drawHome','drawFar','drawWavy','update'].forEach(function(n){try{wrap(n)}catch(e){}});window.__fr=0;(function f(){__fr++;requestAnimationFrame(f)})()})();1"""
s=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=3)
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
    pg.evaluate("c=>__ev(c)","document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.hwAttAuto=today();save.owned=SPECIES.slice(0,40).map(function(x){return x.id});persist();toHome();1")
    pg.wait_for_timeout(400);pg.evaluate("c=>__ev(c)",SC[s]);pg.wait_for_timeout(2000)
    pg.evaluate("c=>__ev(c)",INST);pg.wait_for_timeout(4000)
    print(s,pg.evaluate("c=>__ev(c)","JSON.stringify(Object.keys(__tm).map(function(k){return [k,+(__tm[k]/__fr).toFixed(2)]}).sort(function(a,b){return b[1]-a[1]}))+' fr '+__fr"));b.close()
