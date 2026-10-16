# '최대치' 시뮬레이션: 물고기 89종 전부 · 레벨 10 · 연구 전부 · 소품 40개 · 집 5단계 · 산호 끝단계 · 꾸미기 장착
# 각 장면에서 update()+draw() 한 프레임에 드는 JS 시간(ms)을 직접 재고(rAF와 무관), 메모리 · 오류 · 숫자 깨짐(NaN)을 본다
from playwright.sync_api import sync_playwright
import json,sys
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
VW,VH=(int(sys.argv[1]),int(sys.argv[2])) if len(sys.argv)>2 else (390,844)
MAX="""(function(){save.onb=1;save.tut=1;save.runs=500;save.newsSeen=APP_VER;save.pearls=9999999;save.gems=99999;
save.owned=SPECIES.map(function(L){return L.id});save.lv={};save.owned.forEach(function(id){save.lv[id]=LV_MAX});
save.research={};['cd','grow','hunt','light','magnet','pearl','scale','school','speed','start'].forEach(function(k){save.research[k]=RS_COST.length});
var d=DS();d.placed=[];var ks=DECOR.filter(function(x){return x.id!=='chest'}).map(function(x){return x.id});for(var i=0;i<DECO_MAX;i++)d.placed.push({k:ks[i%ks.length],x:.02+.96*i/DECO_MAX,y:.62+.3*((i*37)%10)/10,s:1,f:i%2});d.out=[];
var H=HS();H.lv=5;var o=AB();o.tap=2600;o.st=6;save.owned.forEach(function(id,k){o.aff[id]={n:100,d:'',c:0}});
var A=AS();A.own=ACC.map(function(a){return a.id});['head','face','back','trail'].forEach(function(sl){var a=ACC.filter(function(x){return x.slot===sl})[0];if(a)A.eq[sl]=a.id});
persist();buildTank();return [save.owned.length,d.placed.length,A.own.length]})()"""
COST="""(function(n,upd){var t0=performance.now(),i;for(i=0;i<n;i++){if(upd)update(1/60);draw()}var dt=(performance.now()-t0)/n;
var bad=[P.s,P.x,P.y,cam.x,cam.y,zoom].some(function(v){return !isFinite(v)});return {ms:+dt.toFixed(2),fish:fish.length,pl:plank.length,fx:fxs.length,tx:texts.length,heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576):0,nan:bad,s:Math.round(P.s),state:state}})"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--enable-precise-memory-info'])
    pg=b.new_page(viewport={'width':VW,'height':VH},device_scale_factor=3);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    pg.goto(D+'t2e_old.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    cost=lambda n,u:pg.evaluate("a=>__ev(%s)(a[0],a[1])"%json.dumps(COST),[n,u])
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1")
    print('max save',ev(MAX))
    H="document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});"
    ev(H+"showTab('home');1");pg.wait_for_timeout(500);print('home        ',cost(120,False))
    ev(H+"showTab('tank');1");pg.wait_for_timeout(800);print('tank 89+40  ',cost(120,False),'tank fish',ev("tank.length"))
    ev("setZoom(ZMIN());1");print('tank zoomout',cost(120,False))
    # 가장 큰 물고기로 싱글: 최대 크기의 3배까지 키운 뒤 3분 진행
    big=ev("SPECIES.slice().sort(function(a,b){return b.cap-a.cap})[0].id")
    ev(H+"sel='%s';startRun('single');P.fx.ghost=99999;1"%big);pg.wait_for_timeout(500)
    print('single start',big,cost(60,True))
    ev("var k=0;while(P.s<P.capS*3&&k<1500){__eat(2);k++}1");print('single grown',cost(60,True),'cap',ev("Math.round(P.capS)"))
    for m in range(3):
        ev("for(var k=0;k<3600;k++){joy={id:1,ox:200,oy:400,x:200+Math.cos(k/40)*90,y:400+Math.sin(k/55)*70};update(1/60)}1")
        print('single +%dmin'%(m+1),cost(60,True))
    print('single gain',ev("runGain(false)"))
    ev("endRun(false,false,null);"+H+"toHome();1")
    # 대전(봇) 최대 물고기
    ev(H+"sel='%s';curSrv=SERVERS[0];NET.room='';startRun('multi');P.fx.ghost=99999;1"%big);pg.wait_for_timeout(1500)
    ev("var k=0;while(P.s<P.capS*2&&k<3000){__eat(5);k++}1")
    for m in range(2):
        ev("for(var k=0;k<3600;k++){joy={id:1,ox:200,oy:400,x:200+Math.cos(k/40)*90,y:400+Math.sin(k/55)*70};update(1/60)}1")
        print('arena +%dmin'%(m+1),cost(60,True))
    ev("endRun(false,false,null);"+H+"toHome();1")
    # 심해 생존: 마지막 챕터, 무기 최대치까지
    ev(H+"sel='%s';svStart(8);1"%big);pg.wait_for_timeout(1000)
    for m in range(8):
        ev("for(var k=0;k<3600;k++){if(state!=='play'){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});state='play'}joy={id:1,ox:200,oy:400,x:200+Math.cos(k/40)*90,y:400+Math.sin(k/55)*70};P.fx.ghost=99;update(1/60)}1")
        print('surv ch8 +%dmin'%(m+1),cost(30,True),ev("[SV.lv,Object.keys(SV.w).length,Math.round(SV.t||0)]"))
    print('errs',errs[:6])
    b.close()
