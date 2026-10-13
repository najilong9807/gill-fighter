# 생명주기 감사: 루프·타이머·리스너·소켓·오디오가 반복 행동 뒤에 쌓이는지 단계별로 센다
from playwright.sync_api import sync_playwright
import json,sys,time
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
F=sys.argv[1] if len(sys.argv)>1 else 't2e.html'
HOOK=r"""(function(){var W=window;W.__A={raf:new Set(),iv:new Set(),to:0,ws:0,wsOpen:0,ac:0,lis:{},err:[]};
var r0=W.requestAnimationFrame.bind(W),c0=W.cancelAnimationFrame.bind(W);
W.requestAnimationFrame=function(f){var id=r0(function(t){__A.raf.delete(id);f(t)});__A.raf.add(id);return id};
W.cancelAnimationFrame=function(id){__A.raf.delete(id);return c0(id)};
var si=W.setInterval.bind(W),ci=W.clearInterval.bind(W);W.setInterval=function(){var id=si.apply(null,arguments);__A.iv.add(id);return id};W.clearInterval=function(id){__A.iv.delete(id);return ci(id)};
var st=W.setTimeout.bind(W),ct=W.clearTimeout.bind(W),pend=new Set();W.setTimeout=function(f,ms){var a=[].slice.call(arguments,2),id=st(function(){pend.delete(id);if(typeof f==='function')f.apply(null,a)},ms);pend.add(id);return id};W.clearTimeout=function(id){pend.delete(id);return ct(id)};__A.pend=pend;
var WS=W.WebSocket;W.WebSocket=function(u,p){var s=p?new WS(u,p):new WS(u);__A.ws++;__A.wsOpen++;var done=false;s.addEventListener('close',function(){if(!done){done=true;__A.wsOpen--}});s.addEventListener('error',function(){});return s};W.WebSocket.prototype=WS.prototype;W.WebSocket.OPEN=1;W.WebSocket.CONNECTING=0;W.WebSocket.CLOSED=3;W.WebSocket.CLOSING=2;
['AudioContext','webkitAudioContext'].forEach(function(k){var C=W[k];if(!C)return;W[k]=function(){__A.ac++;return new C()};W[k].prototype=C.prototype});
[W,document].forEach(function(T,ti){var a=T.addEventListener.bind(T),r=T.removeEventListener.bind(T);T.addEventListener=function(t,f,o){var k=(ti?'d:':'w:')+t;__A.lis[k]=(__A.lis[k]||0)+1;return a(t,f,o)};T.removeEventListener=function(t,f,o){var k=(ti?'d:':'w:')+t;__A.lis[k]=(__A.lis[k]||0)-1;return r(t,f,o)}});
W.__L={};W.Capacitor={isNativePlatform:function(){return true},getPlatform:function(){return 'ios'},Plugins:{AdMob:{addListener:function(n,f){(__L[n]=__L[n]||[]).push(f);return Promise.resolve({remove:function(){}})},initialize:function(){return Promise.resolve()},
 prepareRewardVideoAd:function(){return W.__adPrep==='fail'?Promise.reject(new Error('nofill')):Promise.resolve()},showRewardVideoAd:function(){W.__shown=(W.__shown|0)+1;return new Promise(function(){})}}}};
W.__fire=function(n){(__L[n]||[]).forEach(function(f){try{f({})}catch(e){}})};})()"""
SNAP="""(function(){var L=__A.lis,ls=0;for(var k in L)ls+=L[k];return {raf:__A.raf.size,iv:__A.iv.size,to:__A.pend.size,ws:__A.ws,wsOpen:__A.wsOpen,ac:__A.ac,lis:ls,cv:(window.CR||{}).cv,heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576):0}})()"""
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--autoplay-policy=no-user-gesture-required','--enable-precise-memory-info','--js-flags=--expose-gc'])
    pg=b.new_page(viewport={'width':402,'height':874});pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.add_init_script(HOOK)
    pg.goto(D+F+'?lang=ko&build=release');pg.wait_for_timeout(3000)
    ev=lambda c: pg.evaluate("c=>__ev(c)",c)
    js=lambda c: pg.evaluate(c)
    def snap(tag,extra=''):
        try: js("window.gc&&gc()")
        except Exception: pass
        s=js(SNAP);x=ev(extra) if extra else ''
        print(tag.ljust(26),json.dumps(s),x,flush=True);return s
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=9;save.newsSeen=APP_VER;save.owned=SPECIES.map(function(L){return L.id});sel='clownfish';1")
    pg.mouse.click(200,450);pg.wait_for_timeout(500)
    snap('0 home')
    HIDE="document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});"
    # A 싱글 시작→먹힘→다시 하기 20번
    for i in range(20):
        ev(HIDE+"toHome();sel='clownfish';startRun('single');P.fx.ghost=0;1");pg.wait_for_timeout(250)
        ev("for(var k=0;k<30;k++)update(1/30);endRun(false,false,null);1");pg.wait_for_timeout(150)
        if i%2: ev("$('againBtn').click();1");pg.wait_for_timeout(200);ev("if(state==='play')endRun(false,false,null);1")
    ev(HIDE+"toHome();1");pg.wait_for_timeout(1500);a=snap('A single x20')
    # B 일시정지·재개 20번, 그 뒤 게임 시간 흐름
    ev(HIDE+"sel='clownfish';startRun('single');P.fx.ghost=9999;1");pg.wait_for_timeout(400)
    for i in range(20): ev("pauseRun();resumeRun();1")
    t0=ev("P.time");time.sleep(5);t1=ev("P.time")
    snap('B pause x20','["game sec per 5s wall",+(P.time-%f).toFixed(2)]'%t0)
    ev("endRun(false,false,null);"+HIDE+"toHome();1")
    # C 대전 시작→끝→다시 들어가기 20번 (서버 연결은 막혀 있어 재연결 시도도 같이 봄)
    for i in range(20):
        ev(HIDE+"toHome();curSrv=SERVERS[0];NET.room='';startRun('multi');P.fx.ghost=9999;1");pg.wait_for_timeout(700)
        ev("endRun(false,false,null);1");pg.wait_for_timeout(300)
    ev(HIDE+"toHome();1");pg.wait_for_timeout(2500);snap('C arena x20','[NET.live,!!NET.ws,!!NET.hb]')
    # D 광고: 성공 / 닫기(보상 없음) / 못 불러옴 / 보상 신호 두 번 / 광고 중 백그라운드
    res=[]
    for case in ['ok','dismiss','fail','dup','bg']:
        js("window.__adPrep=%s"%('"fail"' if case=='fail' else 'null'))
        ev("window.__cb=[];showRewarded(function(ok){__cb.push(ok)});1");pg.wait_for_timeout(700)
        if case=='ok': js("__fire('onRewardedVideoAdReward');__fire('onRewardedVideoAdDismissed')")
        elif case=='dismiss': js("__fire('onRewardedVideoAdDismissed')")
        elif case=='dup': js("__fire('onRewardedVideoAdReward');__fire('onRewardedVideoAdReward');__fire('onRewardedVideoAdDismissed');__fire('onRewardedVideoAdDismissed')")
        elif case=='bg':
            js("Object.defineProperty(document,'hidden',{configurable:true,get:function(){return true}});document.dispatchEvent(new Event('visibilitychange'))");pg.wait_for_timeout(500)
            js("Object.defineProperty(document,'hidden',{configurable:true,get:function(){return false}});document.dispatchEvent(new Event('visibilitychange'))")
            js("__fire('onRewardedVideoAdReward');__fire('onRewardedVideoAdDismissed')")
        pg.wait_for_timeout(16000 if case=='fail' else 600)
        res.append((case,ev("[JSON.stringify(__cb),ADS.busy,ADS.on,MUS.held]")))
    print('D ads',res,flush=True)
    # 광고 이어하기 실제 흐름: 싱글 먹힘 → 광고 이어하기 → 다시 플레이 중인지
    ev(HIDE+"toHome();sel='clownfish';startRun('single');P.fx.ghost=0;P.s*=3;1");pg.wait_for_timeout(300)
    ev("for(var k=0;k<60;k++)update(1/30);endRun(false,false,null);1");pg.wait_for_timeout(500)
    ev("$('adContBtn').click();1");pg.wait_for_timeout(800);js("__fire('onRewardedVideoAdReward');__fire('onRewardedVideoAdDismissed')");pg.wait_for_timeout(1500)
    st=ev("[state,P.adContd,!!P.dead]");t0=ev("P.time");time.sleep(3);print('D revive',st,'time+',round(ev("P.time")-t0,2),flush=True)
    ev("endRun(false,false,null);"+HIDE+"toHome();1")
    # E 플레이 중 백그라운드↔복귀 10번
    ev(HIDE+"sel='clownfish';startRun('single');P.fx.ghost=9999;1");pg.wait_for_timeout(300)
    for i in range(10):
        js("Object.defineProperty(document,'hidden',{configurable:true,get:function(){return true}});document.dispatchEvent(new Event('visibilitychange'));window.dispatchEvent(new Event('pagehide'))");pg.wait_for_timeout(150)
        js("Object.defineProperty(document,'hidden',{configurable:true,get:function(){return false}});document.dispatchEvent(new Event('visibilitychange'));window.dispatchEvent(new Event('pageshow'))");pg.wait_for_timeout(150)
    if ev("state")=='pause': ev("resumeRun();1")
    t0=ev("P.time");time.sleep(4)
    snap('E bg x10','[state,+(P.time-%f).toFixed(2)]'%t0)
    ev("endRun(false,false,null);"+HIDE+"toHome();1")
    # F 탭·모드 이동 20번(홈·수족관·도감·상점·모드 고르기·탐험·생존·설정)
    for i in range(20):
        for c in ["showTab('tank')","showTab('dex')","showTab('sea')","showTab('home')","modePickOpen()","$('modePick').hidden=true","campStart(1)","endRun(false,true,null)","svStart(1)","state==='play'&&endRun(false,true,null)","renderSetPage();$('setp').hidden=false","$('setp').hidden=true"]:
            try: ev(HIDE+c+";1")
            except Exception as e: errs.append('F '+c+' '+str(e)[:80])
            pg.wait_for_timeout(60)
        ev(HIDE+"toHome();showTab('home');1")
    pg.wait_for_timeout(2500);snap('F tabs/modes x20')
    # G 심해 생존 10분(빠른 감기)
    ev(HIDE+"toHome();sel='clownfish';svStart(1);1");pg.wait_for_timeout(400)
    for blk in range(10):
        ev("for(var k=0;k<1800;k++){if(!$('svUp').hidden){var bb=document.querySelectorAll('#svUpList button');bb.length&&bb[k%bb.length].click()}if(state==='pause'&&$('svUp').hidden){['svBox','svRev','pause'].forEach(function(i){var o=$(i);if(o)o.hidden=true});state='play'}if(state!=='play')continue;var t=SV.t;joy={id:1,ox:195,oy:600,x:195+Math.cos(t*.5)*80,y:600+Math.sin(t*.4)*70};SV.hp=SV.maxHp;update(1/30)}1")
        snap('G surv %dmin'%(blk+1),"[SV.t|0,SV.lv,SV.en.length,(SV.pb||SV.shots||[]).length,fxs.length,texts.length,rings.length,SV.gem.length,state]")
    ev("state==='play'&&svEnd(false,false);"+HIDE+"toHome();1")
    # H 저장소가 꽉 차서 저장이 실패해도 게임이 계속되는지
    js("void(Storage.prototype.setItem=function(){throw new DOMException('QuotaExceededError','QuotaExceededError')})")
    ev(HIDE+"sel='clownfish';startRun('single');for(var k=0;k<90;k++)update(1/30);endRun(false,false,null);persist();"+HIDE+"toHome();1")
    pg.wait_for_timeout(4000);snap('H storage full','[state]')
    b.close()
print('errs',errs[:10])
