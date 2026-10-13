h=open('t.html').read()
dbg=("window.__dbg={roomInvite:function(c){roomInvite(c)},roomFromUrl:function(u){return roomFromUrl(u)},get pendRoom(){return pendRoom},endRun:function(a,b,c){endRun(a,b,c)},save:save,AS:AS,DS:DS,SPECIES:SPECIES,ACC:ACC,DECOR:DECOR,GRADES:GRADES,TANK_BGS:TANK_BGS,"
     "EN:EN,byId:byId,cmOf:function(s){return cmOf(s)},cmRel:function(s){return cmRel(s)},cmMap:cmMap,fmtBig:fmtBig,gradeOf:gradeOf,growF:growF,skillF:skillF,skillLine:skillLine,"
     "nextHuntGoal:nextHuntGoal,zoneAt:zoneAt,capText:capText,updateHud:updateHud,startRun:startRun,persist:persist,"
     "deco:deco,TWW:TWW,camMax:camMax,viewW:viewW,setZoom:setZoom,s2wx:s2wx,s2wy:s2wy,showTab:showTab,"
     "scoreNow:function(){return scoreNow()},scoreParts:function(){return scoreParts()},scoreText:function(){return scoreText()},"
     "boardAdd:function(e){return boardAdd(e)},fair:function(){return fair()},"
     "get SERVERS(){return SERVERS},get P(){return P},get fish(){return fish},get tank(){return tank},get bots(){return bots},get NET(){return NET},get LOB(){return LOB},"
     "get joy(){return joy},set joy(v){joy=v},get keys(){return keys},get state2(){return state},eatRatio:function(){return eatRatio()},rescaleWorld:function(){rescaleWorld()},drawFish:function(){return drawFish.apply(null,arguments)},drawFishDeco:function(){return drawFishDeco.apply(null,arguments)},get MUS(){return MUS},AS:AS,accIcon:function(a){return accIcon(a)},setT:function(v){t=v},get SPRITES(){return SPRITES},BG_SRC:BG_SRC,get zoom(){return zoom},set zoom(v){zoom=v},targetZoom:function(){return targetZoom()},viewR:function(){return viewR()},populate:function(){populate()},refSpeed:function(){return refSpeed()},get mode(){return mode},get page(){return page},get chestN(){return chestN},"
     "get letter(){return letter},get H(){return H},darkAt:function(y){return darkAt(y)},camSet:function(x,y){cam.x=x;cam.y=y},cam:function(v){if(v!=null)tankCam=v;return tankCam},vo:function(){return decoVo},get trail(){return trail},"
     "get tankZ(){return tankZ},set tankZ(v){tankZ=v},get tankCam(){return tankCam},set tankCam(v){tankCam=v},"
     "tankIds:tankIds,ownedIds:ownedIds,tankOut:tankOut,tankToggle:tankToggle,get tank2(){return tank},get sel(){return sel},set sel(v){sel=v},state:function(){return state},playIntro:function(){playIntro()}};")
assert h.count('function boot(){')>=1
h=h.replace('function boot(){',dbg+'function boot(){',1)
REL="location.search.indexOf('build=release')>=0"
assert h.count("var BUILD='release';")==1
h=h.replace("var BUILD='release';","var BUILD=("+REL+"?'release':'dev');",1)
assert h.count("rankOpen:true,dev:false,")==1
h=h.replace("rankOpen:true,dev:false,","rankOpen:false,dev:!("+REL+"),",1)
open('t2.html','w').write(h)
print('ok',len(h))
# 1.1.7: 테스트에서는 ?prolog 가 있을 때만 프롤로그, 아니면 예전 게임 방법 카드(기존 테스트 호환)
h=open('t2.html').read()
a="if(!save.onb&&!(save.runs>0))prologShow();"
if a in h:
    h=h.replace(a,"if(!save.onb&&!(save.runs>0)&&location.search.indexOf('prolog')>=0)prologShow();else if(!save.onb&&!(save.runs>0))onbShow();",1)
    open('t2.html','w').write(h)
