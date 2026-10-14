import json,sys,os
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LANG=sys.argv[1] if len(sys.argv)>1 else 'ko'; VW,VH,DPR=[int(x) for x in (sys.argv[2] if len(sys.argv)>2 else '440,956,3').split(',')]; TAG=sys.argv[3] if len(sys.argv)>3 else '69'
STEER=open('botsim.py').read().split('BOT="""')[1].split('function one(')[0].replace('(function(cfg){var out=[];','')
exec(open('decoex.py').read().split('FISH=')[0].split('LAY=')[1].join(['LAY=',''])) if False else None
src=open('decoex.py').read();LAY=eval(src.split('LAY=')[1].split('\nFISH=')[0]);JSTANK=src.split('js="""')[1].split('"""')[0]
FISH=['dumbo','anchovy','shark','clownfish','bluetang','angelfish','butterfly','mandarinfish','seahorse','moorish','yellowtang','lionfish','goldfish','koi','puffer','manta','turtle','whaleshark','footballfish','tuna','orca']
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  def page(sv):
    pg=b.new_page(viewport={'width':VW,'height':VH},device_scale_factor=DPR);pg.errs=[];pg.on('pageerror',lambda e:pg.errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.add_init_script("(function(){var css=%s;function go(){var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);try{document.fonts.load('20px \\'Black Han Sans\\'','가나다바다왕');document.fonts.load('20px Jua','가나다바다왕')}catch(e){}}if(document.head)go();else document.addEventListener('DOMContentLoaded',go)})()"%json.dumps(open('gfonts.css').read()))
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%LANG);pg.add_style_tag(content=':root{--sat:54px;--sab:30px}');pg.wait_for_timeout(2600);pg.evaluate("c=>__ev(c)","banner=function(){};banner0=function(){};try{bannerOff()}catch(e){};1")
    return pg
  base={'runs':120,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':48210,'gems':137,'owned':FISH,'hwAtt':{'y':2026,'n':7,'d':'x'},'lv':{'dumbo':7,'shark':9},
        'acc':{'own':['hw_witch','hw_batlens','hw_souls','hw_bonecrown'],'eq':{'dumbo':{'head':'hw_witch'},'shark':{'head':'hw_bonecrown','fx':'hw_souls'}}},'nick':{'ko':'바다왕','ja':'うみのおう'}.get(LANG,'Finn'),'top':{'score':38450}}
  HIDE="document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});document.querySelectorAll('.coach').forEach(function(x){x.remove()});try{bannerOff()}catch(e){};1"
  def play(pg,fish,mode,secs,extra=''):
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev(HIDE);ev("save.pick='%s';sel='%s';ENERGY&&(EN().n=ENERGY.max);curSrv=SERVERS[0];NET.room='';startRun('%s');P.fx.ghost=999;MUS&&MUS.stop&&MUS.stop();%s;1"%(fish,fish,mode,extra))
    js="(function(){"+STEER+"var n=0;while(state==='play'&&n<%d){steer();update(1/30);n++;P.fx.ghost=999}joy=null;return [state,P.s,cmOf(P.s)]})()"%(secs*30)
    return ev(js)
  def snap(pg,name,wait=700):
    pg.evaluate("c=>__ev(c)","try{bannerOff()}catch(e){};document.querySelectorAll('.coach').forEach(function(x){x.remove()});1");pg.wait_for_timeout(wait);pg.evaluate("c=>__ev(c)","try{if(P&&P.fx)P.fx.ghost=0}catch(e){};1");pg.wait_for_timeout(120);pg.screenshot(path='shots/%s_%s_%s.png'%(TAG,LANG,name));print(name,pg.errs[:2])
  # 1 small fish early
  pg=page(dict(base,pick='dumbo'));print(play(pg,'dumbo','single',22));snap(pg,'1_small');pg.close()
  # 2 big fish
  pg=page(dict(base,pick='shark'));print(play(pg,'shark','single',140));snap(pg,'2_big');pg.close()
  # 3 halloween boss
  pg=page(dict(base,pick='dumbo'));print(play(pg,'dumbo','single',30));pg.evaluate("c=>__ev(c)","try{hwbSpawn()}catch(e){};var f=HWB.f;if(f){f.x=P.x+viewR()*.32;f.y=P.y-viewR()*.12}1");
  for k in range(40): pg.evaluate("c=>__ev(c)","update(1/30);P.fx.ghost=999;var f=HWB.f;if(f&&Math.hypot(f.x-P.x,f.y-P.y)>viewR()*.45){f.x=P.x+viewR()*.32;f.y=P.y-viewR()*.12};1")
  pg.evaluate("c=>__ev(c)","var f=HWB.f;if(f){f.x=P.x+viewR()*.3;f.y=P.y-viewR()*.1;f.stun=4};update(1/30);1");snap(pg,'3_boss',250);pg.close()
  # 4 battle with peers
  pg=page(dict(base,pick='dumbo'));print(play(pg,'dumbo','multi',35))
  pg.evaluate("c=>__ev(c)","""var NM=%s;window.__pk=function(){NM.forEach(function(q,i){netState({i:'p'+i,n:q[0],l:q[1],s:P.s*q[2],x:P.x+q[3]*P.s,f:(P.y+q[4]*P.s)/H,vx:0,vy:0,a:q[5],k:i})})};__pk();1"""%json.dumps(
     [['파도타기','sawfish',1.6,7,-5,3.1],['꼬마멸치','anchovy',.6,-5,4,0],['참치왕','tuna',.85,4,6,2.5],['고래구름','whaleshark',2.4,-9,-10,0.3]] if LANG=='ko' else ([['なみのり','sawfish',1.6,7,-5,3.1],['ちびイワシ','anchovy',.6,-5,4,0],['マグロ王','tuna',.85,4,6,2.5],['くじら雲','whaleshark',2.4,-9,-10,0.3]] if LANG=='ja' else [['Kai','sawfish',1.6,7,-5,3.1],['Momo','anchovy',.6,-5,4,0],['Rina','tuna',.85,4,6,2.5],['Leo','whaleshark',2.4,-9,-10,0.3]])))
  for k in range(20): pg.evaluate("c=>__ev(c)","__pk();P.fx.ghost=999;1");pg.wait_for_timeout(150)
  snap(pg,'4_battle',300);pg.close()
  # 5 aquarium
  L=LAY['hw'];sv=dict(base,owned=['clownfish','bluetang','angelfish','butterfly','mandarinfish','seahorse','moorish','yellowtang','lionfish','goldfish','koi','puffer','manta','turtle','dumbo'],pick='clownfish',house={'lv':5,'acc':0,'at':1791800000000,'fed':0,'boost':0},tankBgs=[L['bg']],tankBg=L['bg'])
  pg=page(sv);pg.evaluate("a=>__ev(a[0])(a[1])",[JSTANK,L]);pg.wait_for_timeout(1800);pg.evaluate("c=>__ev(c)","try{tankCam=camMax()*.5}catch(e){};1");snap(pg,'5_tank',1500);pg.close()
  # 6 camp map
  cs={str(n):3 for n in range(1,15)};cs.update({str(n):2 for n in range(15,19)})
  pg=page(dict(base,camp={'s':cs,'ch':4}));pg.evaluate("c=>__ev(c)",HIDE+";showTab('home');campOpen(19);1");snap(pg,'6_camp',1200);pg.close()
