from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--enable-gpu-rasterization']);pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=1)
    pg.route(lambda u:'supabase' in u, lambda r:r.abort());pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});sel='clownfish';svStart(8,true);1")
    pg.wait_for_timeout(800)
    for m in range(9):
        ev("for(var k=0;k<3600;k++){if(state!=='play'){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});state='play'}joy={id:1,ox:200,oy:400,x:200+Math.cos(k/40)*90,y:400+Math.sin(k/55)*70};P.fx.ghost=99;update(1/60)}1")
        r=ev("""(function(){var C=CanvasRenderingContext2D.prototype,cnt={},orig={};['drawImage','fill','stroke','fillText','strokeText','arc','save','restore','createRadialGradient','createLinearGradient','clip'].forEach(function(k){orig[k]=C[k];C[k]=function(){cnt[k]=(cnt[k]||0)+1;return orig[k].apply(this,arguments)}});
 var sb=0,od=Object.getOwnPropertyDescriptor(C,'shadowBlur');Object.defineProperty(C,'shadowBlur',{set:function(v){if(v>0)sb++;od.set.call(this,v)},get:function(){return od.get.call(this)},configurable:true});
 var fl=0,of=Object.getOwnPropertyDescriptor(C,'filter');if(of)Object.defineProperty(C,'filter',{set:function(v){if(v&&v!=='none')fl++;of.set.call(this,v)},get:function(){return of.get.call(this)},configurable:true});
 draw();for(var k in orig)C[k]=orig[k];Object.defineProperty(C,'shadowBlur',od);if(of)Object.defineProperty(C,'filter',of);
 cnt.shadow=sb;cnt.filter=fl;return JSON.stringify([Math.round(SV.t),SV.en.length,cnt])})()""")
        print(r,flush=True)
    b.close()
