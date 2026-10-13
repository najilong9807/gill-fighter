import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
CFG=json.loads(sys.argv[1]) # {fish,lv,floors,runs}
BOT=open(D[7:]+'botsim.py').read().split('BOT="""')[1].split('"""')[0]
BOT=BOT.replace("function one(){","function one(fl){EN().n=ENERGY.max;").replace("startRun('single');","CAMP.cur=campFloor(fl);CAMP.pend=true;startRun('single');")
BOT=BOT.replace("if(DPZ.gull","if(P.camp&&(P.camp.type==='hunt'||P.camp.type==='boss')){for(var q=0;q<fish.length;q++){var t2=fish[q];if((P.camp.type==='hunt'?t2.look.id===P.camp.tgt:t2===CAMP.boss)&&t2.s<=P.s*eatR){best=t2;var dx2=t2.x-P.x,dy2=t2.y-P.y,l3=Math.hypot(dx2,dy2)||1;tx=dx2/l3;ty=dy2/l3;break}}}\n if(DPZ.gull")
BOT=BOT.replace("while(state==='play'&&!P.dead&&n<cfg.cap*30)","var lim=(P.camp.type==='survive'?P.camp.goal+15:P.camp.lim+90);while(state==='play'&&!P.dead&&n<lim*30)")
BOT=BOT.replace("var r={fish:cfg.fish","var r={fl:fl,ty:P.camp?P.camp.type:'',stars:P.campStars|0,win:(P.campStars|0)>0,fish:cfg.fish")
BOT=BOT.replace("for(var k=0;k<cfg.runs;k++)one();","cfg.floors.forEach(function(fl){for(var k=0;k<cfg.runs;k++){var c0=JSON.stringify(save.camp);one(fl);}});")
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  cs={str(n):3 for n in range(1,31)}
  sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':100000,'gems':500,'owned':[CFG['fish'],'anchovy'],'pick':CFG['fish'],'hwAtt':{'y':2026,'n':7,'d':'x'},'lv':{CFG['fish']:CFG.get('lv',1)},'camp':{'s':cs,'ch':9},'en':{'n':99,'t':0}}
  pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=0');pg.wait_for_timeout(3000)
  pg.evaluate("c=>__ev(c)","document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});MUS&&MUS.stop&&MUS.stop();1")
  res=pg.evaluate("a=>__ev(a[0])(a[1])",[BOT,CFG])
  agg={}
  for r in res:
    if 'err' in r: print('ERR',r);continue
    a=agg.setdefault(r['fl'],[r['ty'],0,0,[]]);a[1]+=1;a[2]+=1 if r['win'] else 0;a[3].append(r['t'])
  for fl in sorted(agg):a=agg[fl];print(CFG['fish'],fl,a[0],'%d/%d'%(a[2],a[1]),'t',a[3])
  print('errs',errs[:3])
