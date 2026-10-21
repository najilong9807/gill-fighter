import sys,json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
MIN=int(sys.argv[1]) if len(sys.argv)>1 else 9;PAGE=sys.argv[2] if len(sys.argv)>2 else 't2e.html';HW=sys.argv[3] if len(sys.argv)>3 else '1'
FN=['drawFish','drawFishDeco','accFront','accGeom','svDrawUnder','svDrawOver','svDrawHud','svFxDrawUnder','svFxDrawOver','svInkDraw','svIceDraw','svBeamDraw','svExDraw','svDnDraw','svDarkDraw','svAreaDraw','svGasDraw','svMineDraw','svAuraDraw','svBiteDraw','svEvDraw','svComboDraw','svGpDraw','svBudDraw','svMuzDraw','svW2Draw','svW3Draw','drawFar','hwPlayBg','hwWorldFx','hwTint','svUpdate','svEnemies','svGasStep','svJuiceStep','svFxStep','glow','drawWavy','spriteAnim']
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files']);pg=b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
  pg.route(lambda u:'supabase' in u or 'google' in u or 'gvt1' in u, lambda r:r.abort());pg.goto(D+PAGE+'?lang=ko&build=release&hw='+HW);pg.wait_for_timeout(3000)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});sel='clownfish';svStart(8,true);1")
  pg.wait_for_timeout(800)
  for m in range(MIN):
    ev("for(var k=0;k<3600;k++){if(state!=='play'){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});state='play'}joy={id:1,ox:200,oy:400,x:200+Math.cos(k/40)*90,y:400+Math.sin(k/55)*70};P.fx.ghost=99;update(1/60)}1")
  r=ev("""(function(FN){var T={},C={};FN.forEach(function(n){var f=window[n];if(typeof f!=='function'){try{f=eval(n)}catch(e){return}}if(typeof f!=='function')return;var w=function(){var a=performance.now();try{return f.apply(this,arguments)}finally{T[n]=(T[n]||0)+performance.now()-a;C[n]=(C[n]||0)+1}};try{eval(n+'=w')}catch(e){}});
    for(var q0=0;q0<10;q0++)draw();T={};C={};var N=90,a=performance.now();for(var j=0;j<N;j++)draw();var dt=(performance.now()-a)/N;var a2=performance.now();for(j=0;j<N;j++){update(1/60);if(state!=='play')state='play'}var ut=(performance.now()-a2)/N;
    var out={t:Math.round(SV.t),en:SV.en.length,sh:SV.sh.length,lod:SV.lod?1:0,lres:LRES?1:0,dpr:dpr,draw:+dt.toFixed(2),update:+ut.toFixed(2),fn:{}};Object.keys(T).forEach(function(k){out.fn[k]=[+(T[k]/N).toFixed(2),Math.round(C[k]/N)]});return out})""".replace('(function(FN)','(function(FN)')+"(%s)"%json.dumps(FN))
  fn=sorted(r['fn'].items(),key=lambda kv:-kv[1][0]);r.pop('fn');print(json.dumps(r));print('\n'.join('%-14s %6.2fms/frame x%d'%(k,v[0],v[1]) for k,v in fn[:22]))
