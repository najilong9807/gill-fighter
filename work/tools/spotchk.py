import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844});pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=0');pg.wait_for_timeout(500)
  sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.14','newsMute':'1.1.14','thx1111':2,'owned':['anchovy'],'pick':'anchovy','en':{'n':99,'t':0}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=0');pg.wait_for_timeout(2500)
  r=pg.evaluate("c=>__ev(c)","""(function(){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('single');update(1/30);var out={};
   [1,3,8].forEach(function(m){var s0=P.s;P.s=s0*m;for(var u=0;u<150;u++){fish.length=0;update(1/30)}var hw=cw/2/zoom,hh=ch/2/zoom,st={on:0,ui:0,near:0,n:0};
     [['big',(P.s*1.6+50*scaleOf(P.s))*1.5+P.s,.22,.55,(P.s*1.6+50*scaleOf(P.s))*.6],['vent',(P.s*2.2+70*scaleOf(P.s))*1.35+P.s,.08,.3,(P.s*2.2+70*scaleOf(P.s))*.85]].forEach(function(c){
       for(var i=0;i<300;i++){var sp=c[0]==='vent'?volcVentSpot(P.s*1.6+50*scaleOf(P.s)):volcSpot(c[2],c[3],c[1],c[4]),ux=(sp.x-cam.x)/hw,uy=(sp.y-cam.y)/hh;st.n++;if(Math.abs(ux)<=1&&Math.abs(uy)<=1)st.on++;if(uy>.6)st.ui++;var dd=Math.hypot(sp.x-P.x,sp.y-P.y);if(dd<c[1])st.near++;var rr=P.s*1.6+50*scaleOf(P.s);if(c[0]==='vent'){var vy=sp.y-P.y;if(Math.abs(vy)<rr+P.s*.5&&Math.abs(sp.x-P.x)<rr*.8+P.s*.5)st.vInside=(st.vInside||0)+1;if((sp.y+rr-cam.y)/hh>.65)st.vUI=(st.vUI||0)+1;if((sp.y-rr-cam.y)/hh<-.65)st.vHUD=(st.vHUD||0)+1;if(sp.y<P.y)st.vUp=(st.vUp||0)+1}else if(dd<rr+P.s*.6)st.bInside=(st.bInside||0)+1}});
     st.zoom=+zoom.toFixed(3);st.minDscr=+(((P.s*2.2+70*scaleOf(P.s))*1.35+P.s)/hh).toFixed(2);out['x'+m]=st;P.s=s0});endRun(false,true);return out})()""")
  print(r)
