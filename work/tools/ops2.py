from playwright.sync_api import sync_playwright
import sys,json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
INST="""(function(){var P=CanvasRenderingContext2D.prototype,st=window.__ops={di:0,area:0,fill:0,stroke:0,fr:0,big:{}};var od=P.drawImage;P.drawImage=function(im){if(this.canvas.id==='cv'||this.canvas===document.querySelector('canvas')){st.di++;var a=arguments,w,h;if(a.length>=9){w=a[7];h=a[8]}else if(a.length>=5){w=a[3];h=a[4]}else{w=im.width;h=im.height}var tr=this.getTransform(),ar=Math.abs(w*h*tr.a*tr.d);st.area+=ar;var k=((new Error().stack.split('\\n')[2]||'').trim().match(/at (\\S+)/)||[])[1]||'?';st.big[k]=(st.big[k]||0)+ar}return od.apply(this,arguments)};
var of=P.fill;P.fill=function(){st.fill++;return of.apply(this,arguments)};var os=P.stroke;P.stroke=function(){st.stroke++;return os.apply(this,arguments)};
(function f(){st.fr++;requestAnimationFrame(f)})()})();1"""
SC={
 'home':"showTab('home');1",
 'tank':"var H=HS();H.lv=4;showTab('tank');tankZ=1;1",
 'tankfx':"var S=AS();save.owned.forEach(function(id,i){if(i%3==0)S.eq[id]={head:'crown',fx:['fire','hearts','neon','orbitgems'][i%4]}});var H=HS();H.lv=5;showTab('tank');tankZ=1;1",
 'play':"document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('solo');1",
 'surv':"document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});svStart(0);1",
}
s=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=3)
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
    pg.evaluate("c=>__ev(c)","document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.hwAttAuto=today();save.owned=SPECIES.slice(0,40).map(function(x){return x.id});persist();toHome();1")
    pg.wait_for_timeout(400);pg.evaluate("c=>__ev(c)",SC[s]);pg.wait_for_timeout(2500)
    pg.evaluate("c=>__ev(c)",INST);pg.wait_for_timeout(3000)
    r=pg.evaluate("c=>__ev(c)","var o=__ops,cv=document.querySelector('canvas');JSON.stringify({fr:o.fr,di:Math.round(o.di/o.fr),fill:Math.round(o.fill/o.fr),stroke:Math.round(o.stroke/o.fr),areaScreens:+(o.area/o.fr/(cv.width*cv.height)).toFixed(2),cv:[cv.width,cv.height],big:Object.keys(o.big).map(function(k){return [+(o.big[k]/o.fr/(cv.width*cv.height)).toFixed(2),k]}).sort(function(a,b){return b[0]-a[0]}).slice(0,10)})")
    print(s,r);b.close()
