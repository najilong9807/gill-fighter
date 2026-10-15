import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
STEER=open('botsim.py').read().split('BOT="""')[1].split('function one(')[0].replace('(function(cfg){var out=[];','')
RT=float(sys.argv[1]) if len(sys.argv)>1 else .45   # 반응 시간(초)
SEE=float(sys.argv[2]) if len(sys.argv)>2 else .55  # 위험을 알아채는 거리(화면 반경 비율)
N=int(sys.argv[3]) if len(sys.argv)>3 else 12
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844});pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  sv={'runs':1,'onb':1,'tut':1,'newsSeen':'1.1.13','newsMute':'1.1.13','introDay':'x','thx1111':2,'owned':['anchovy'],'pick':'anchovy','nbC':9}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
  ev=lambda c:pg.evaluate("c=>__ev(c)",c)
  ev("window.requestAnimationFrame=function(){return 0};banner=function(){};1")
  out=[]
  for k in range(N):
    r=ev("""(function(){%s
      document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.runs=1;sel='anchovy';startRun('single');
      var RT=%f,SEE=%f,n=0,next=0,jy=null;var vr0=viewR;
      while(state==='play'&&n<30*180){
        if(P.time>=next){var keep=viewR;viewR=function(){return keep()*SEE};try{steer()}catch(e){}viewR=keep;
          var a=Math.atan2(joy.y,joy.x)+(Math.random()-.5)*.9;jy={x:Math.cos(a)*56,y:Math.sin(a)*56,ox:0,oy:0,pad:false};next=P.time+RT*(.6+Math.random()*.8)}
        joy=jy;update(1/30);n++}
      return [Math.round(P.time),Math.round(cmOf(P.s)*10)/10,P.eaten|0,state]})()"""%(STEER,RT,SEE))
    out.append(r);ev("if(state==='play')endRun(false,true);document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1")
  ts=sorted(x[0] for x in out)
  print('RT',RT,'SEE',SEE,'death times',ts,'median',ts[len(ts)//2],'cm',[x[1] for x in out])
