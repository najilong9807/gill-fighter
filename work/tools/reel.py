import json,sys,os,shutil
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
STEER=open('botsim.py').read().split('BOT="""')[1].split('function one(')[0].replace('(function(cfg){var out=[];','')
LANG=sys.argv[1] if len(sys.argv)>1 else 'ko'
ONLY=sys.argv[2].split(',') if len(sys.argv)>2 else None
src=open('decoex.py').read();LAY=eval(src.split('LAY=')[1].split('\nFISH=')[0]);JSTANK=src.split('js="""')[1].split('"""')[0]
FISH=['dumbo','anchovy','shark','clownfish','bluetang','angelfish','butterfly','mandarinfish','seahorse','moorish','yellowtang','lionfish','goldfish','koi','puffer','manta','turtle','whaleshark','footballfish','tuna','orca']
CAP={'ko':['작은 물고기로 태어나','먹을수록 쑥쑥 커져요','큰 물고기는 피해요!','할로윈 보스 등장 🎃','나만의 수족관 꾸미기'],
     'en':['Born tiny','Eat to grow bigger','Dodge the big ones!','Halloween boss is here 🎃','Decorate your aquarium']}
END={'ko':('아가미 파이터','App Store에서 검색','무료 · 오프라인도 OK'),'en':('Gulp Deep','Search on the App Store','Free to play')}
OUT='reel/'+LANG
VW,VH,DSF=432,768,2.5
CSS="""#reelCap{position:fixed;left:0;right:0;top:15%;z-index:999;text-align:center;pointer-events:none;font-family:'Black Han Sans',sans-serif;font-size:40px;color:#FFE45C;-webkit-text-stroke:8px #0B2C4A;paint-order:stroke fill;text-shadow:0 5px 0 rgba(8,30,60,.55);padding:0 18px;line-height:1.15;transition:none}
#reelEnd{position:fixed;inset:0;z-index:1000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:rgba(8,28,52,.62);font-family:'Black Han Sans',sans-serif;color:#fff;text-align:center}
#reelEnd b{font-size:62px;color:#FFE45C;-webkit-text-stroke:9px #0B2C4A;paint-order:stroke fill;text-shadow:0 6px 0 rgba(0,0,0,.4)}
#reelEnd span{font-family:Jua,sans-serif;font-size:28px;background:#fff;color:#0B2C4A;border-radius:99px;padding:10px 26px;box-shadow:0 5px 0 #0B2C4A}
#reelEnd small{font-family:Jua,sans-serif;font-size:22px;opacity:.9}
.coach,#hmTip{display:none!important}"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  base={'runs':120,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.13','newsMute':'1.1.13','introDay':'x','thx1111':2,'pearls':48210,'gems':137,'owned':FISH,'hwAtt':{'y':2026,'n':7,'d':'x'},'lv':{'dumbo':7,'shark':9},'dmgNum':True,
        'acc':{'own':['hw_witch','hw_souls','hw_bonecrown'],'eq':{'dumbo':{'head':'hw_witch'},'shark':{'head':'hw_bonecrown','fx':'hw_souls'}}},'nick':{'ko':'바다왕'}.get(LANG,'Finn'),'showNick':False}
  if os.path.isdir(OUT) and not ONLY: shutil.rmtree(OUT)
  os.makedirs(OUT,exist_ok=True)
  n=[0]
  def page(sv):
    ctx=b.new_context(viewport={'width':VW,'height':VH},device_scale_factor=DSF)
    pg=ctx.new_page();pg.errs=[];pg.on('pageerror',lambda e:pg.errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%LANG);pg.add_style_tag(path='gfonts.css');pg.add_style_tag(content=CSS+':root{--sat:40px;--sab:24px}');pg.wait_for_timeout(2500)
    pg.evaluate("c=>__ev(c)","banner=function(){};banner0=function(){};try{bannerOff()}catch(e){};document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.vib=false;save.newsSeen=APP_VER;save.newsMute=APP_VER;window.requestAnimationFrame=function(){return 0};1");pg.wait_for_timeout(200)
    return ctx,pg
  def cap(pg,txt,top='15%'):
    pg.evaluate("a=>{var t=a[0];var e=document.getElementById('reelCap');if(!e){e=document.createElement('div');e.id='reelCap';document.body.appendChild(e)}e.textContent=t;e.style.top=a[1];e.style.display=t?'block':'none'}",[txt,top])
  def rec(pg,secs,js=None,steer=True,sp=0):
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    # 게임 루프를 멈추고 우리가 한 장면씩 진행: rAF 대신 직접 frame 호출
    for i in range(int(secs*30)):
      st=(STEER+"if(state==='play'&&P&&!P.dead)steer();") if steer else ""
      ex="for(var q=0;q<"+str(sp)+";q++){if(state==='play'){"+st+"update(1/30)}}"
      ev("(function(){['news','upd','daily'].forEach(function(id){var o=document.getElementById(id);if(o)o.hidden=true});"+st+(js or '')+ex+"window.__RT=(window.__RT||performance.now())+33.333;try{frame(window.__RT)}catch(e){update(1/30);draw()}})()")
      pg.screenshot(path='%s/f%05d.jpg'%(OUT,n[0]),type='jpeg',quality=92);n[0]+=1
  # 1) 작은 덤보문어
  if not ONLY or '1' in ONLY:
    ctx,pg=page(dict(base,pick='dumbo'));ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("sel='dumbo';save.pick='dumbo';curSrv=SERVERS[0];startRun('single');MUS&&MUS.stop&&MUS.stop();1")
    for k in range(40): ev("frame((window.__RT=(window.__RT||performance.now())+33.3))")
    cap(pg,CAP[LANG][0]);rec(pg,3,sp=1)
    cap(pg,CAP[LANG][1]);rec(pg,3.5,sp=2)
    print('s1',pg.errs[:2]);ctx.close()
  # 2) 큰 백상아리 + 위험 피하기
  if not ONLY or '2' in ONLY:
    ctx,pg=page(dict(base,pick='shark'));ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("sel='shark';save.pick='shark';startRun('single');MUS&&MUS.stop&&MUS.stop();1")
    ev("(function(){"+STEER+"for(var k=0;k<30*120;k++){steer();P.fx.ghost=999;update(1/30)}})()")
    ev('P.fx.ghost=0;1');cap(pg,CAP[LANG][2]);rec(pg,3.5)
    print('s2',pg.errs[:2]);ctx.close()
  # 3) 할로윈 보스
  if not ONLY or '3' in ONLY:
    ctx,pg=page(dict(base,pick='dumbo'));ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("sel='dumbo';save.pick='dumbo';startRun('single');MUS&&MUS.stop&&MUS.stop();1")
    ev("(function(){"+STEER+"for(var k=0;k<30*30;k++){steer();P.fx.ghost=999;update(1/30)}})()")
    ev('P.fx.ghost=0;1');ev("try{hwbSpawn()}catch(e){};var f=HWB.f;if(f){f.x=P.x+viewR()*.42;f.y=P.y-viewR()*.1};1")
    cap(pg,CAP[LANG][3]);rec(pg,3.5,js="var f=HWB.f;if(f&&Math.hypot(f.x-P.x,f.y-P.y)>viewR()*.6){f.x=P.x+viewR()*.4;f.y=P.y-viewR()*.1}",steer=False)
    print('s3',pg.errs[:2]);ctx.close()
  # 4) 수족관 + 끝 화면
  if not ONLY or '4' in ONLY:
    L=LAY['hw'];sv=dict(base,owned=['clownfish','bluetang','angelfish','butterfly','mandarinfish','seahorse','moorish','yellowtang','lionfish','goldfish','koi','puffer','manta','turtle','dumbo'],pick='clownfish',house={'lv':5,'acc':0,'at':1791800000000,'fed':0,'boost':0},tankBgs=[L['bg']],tankBg=L['bg'])
    ctx,pg=page(sv);ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    pg.evaluate("a=>__ev(a[0])(a[1])",[JSTANK,L]);pg.wait_for_timeout(1500)
    ev("try{tankCam=camMax()*.2}catch(e){};1")
    cap(pg,CAP[LANG][4],'24%');rec(pg,3,js="try{tankCam=Math.min(camMax(),tankCam+camMax()*.012)}catch(e){}",steer=False)
    cap(pg,'')
    e=END[LANG];pg.evaluate("a=>{var d=document.createElement('div');d.id='reelEnd';d.innerHTML='<b></b><span></span><small></small>';d.children[0].textContent=a[0];d.children[1].textContent=a[1];d.children[2].textContent=a[2];document.body.appendChild(d)}",list(e))
    rec(pg,2.5,js="try{tankCam=Math.min(camMax(),tankCam+camMax()*.006)}catch(e){}",steer=False)
    print('s4',pg.errs[:2]);ctx.close()
  print('frames',n[0])
