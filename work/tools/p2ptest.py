# P2P 대전 시험: 창 3개 + 가짜 소개소(gf_p2p를 파이썬으로 흉내) + 진짜 WebRTC
import json,time,itertools
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
MEM={};MSG=[];ID=itertools.count(1);CALLS={'n':0,'out':0}
def broker(body):
  CALLS['n']+=1;me=body.get('p_me');room=body.get('p_room');now=time.time();per=body.get('p_per') or 16
  if body.get('p_leave'):
    for k in list(MEM):
      if k[1]==me:del MEM[k]
    return {'ok':True}
  if not room:
    k=1
    while sum(1 for (r,p),t in MEM.items() if r=='r14-%d'%k and now-t<12 and p!=me)>=per:k+=1
    room='r14-%d'%k
  MEM[(room,me)]=now
  for o in body.get('p_out') or []:
    if (room,o['to']) in MEM:MSG.append({'id':next(ID),'room':room,'to':o['to'],'f':me,'b':o['b']});CALLS['out']+=1
  mem=[p for (r,p),t in MEM.items() if r==room and p!=me and now-t<12]
  msg=[{'id':m['id'],'f':m['f'],'b':m['b']} for m in MSG if m['to']==me and m['room']==room and m['id']>(body.get('p_after') or 0)][:40]
  return {'room':room,'mem':mem,'msg':msg}
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files','--disable-features=WebRtcHideLocalIpsWithMdns'])
  pages=[];errs=[]
  def mk(i):
    ctx=b.new_context(viewport={'width':390,'height':844})
    pg=ctx.new_page();pg.on('pageerror',lambda e:errs.append(('p%d'%i,str(e)[:120])))
    def rt(r):
      u=r.request.url
      if 'rpc/gf_cfg' in u:r.fulfill(status=200,content_type='application/json',body=json.dumps({'p2p':1}))
      elif 'rpc/gf_p2p' in u:r.fulfill(status=200,content_type='application/json',body=json.dumps(broker(json.loads(r.request.post_data or '{}'))))
      elif 'stun' in u:r.abort()
      else:r.abort()
    pg.route(lambda u:'supabase' in u or 'google' in u,rt)
    pg.route_web_socket(lambda u:'supabase' in u,lambda ws:None)
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(400)
    sv={'runs':30,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.14','newsMute':'1.1.14','thx1111':2,'owned':['anchovy','shark'],'pick':['anchovy','shark','anchovy'][i],'nick':'P%d'%i,'mp':{'games':5,'wins':0,'top3':0,'trophy':0,'best':5}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s);localStorage.setItem('gf.pid','pid%d')"%(json.dumps(json.dumps(sv)),i))
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(4200)
    return pg
  for i in range(3):pages.append(mk(i))
  ev=lambda pg,c:pg.evaluate("c=>__ev(c)",c)
  for pg in pages:ev(pg,"document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});NET.room='';curSrv=SERVERS[0];startRun('multi');P.fx.ghost=99999;setInterval(function(){if(P&&P.fx)P.fx.ghost=99999},500);1");pg.wait_for_timeout(300)
  t0=time.time();pages[0].wait_for_timeout(14000)
  def snap(tag):
    out=[]
    for i,pg in enumerate(pages):
      try:out.append(ev(pg,"(function(){var ps=bots.filter(function(b){return b.peer});return {me:netId(),p2p:P2P.on,room:P2P.room,humans:NET.humans,peers:Object.keys(P2P.peers).map(function(k){return k.slice(-4)+':'+(P2P.peers[k].open?'open':'wait')}),fish:ps.map(function(b){return b.name+'@'+Math.round(performance.now()-b.last)+'ms'}),state:state}})()"))
      except Exception as e:out.append('closed')
    print(tag,json.dumps(out,ensure_ascii=False))
  snap('T+14s')
  # 위치가 실제로 움직이는지: page0이 보는 P1 물고기
  gx="(function(){var b=bots.filter(function(b){return b.peer&&b.name==='P1'})[0];return b?Math.round(b.tx):null})()"
  ev(pages[1],"window.__mv=setInterval(function(){P.x+=40;},100);1")
  x1=ev(pages[0],gx);pages[0].wait_for_timeout(2000);x2=ev(pages[0],gx);ev(pages[1],"clearInterval(__mv);1")
  print('P1 x seen by P0',x1,'->',x2)
  # 물기 · 죽음 이벤트 전달
  ev(pages[0],"window.__got=[];var nb=netBite,nd=netDied;netBite=function(p){__got.push('bite:'+p.i.slice(-4));return nb.apply(this,arguments)};netDied=function(p){__got.push('ded:'+p.i.slice(-4));return nd.apply(this,arguments)};1")
  ev(pages[1],"netCast('bite',{i:netId(),t:'zzz',d:1});netCast('ded',{i:netId(),by:'zzz'});1");pages[0].wait_for_timeout(1500)
  print('events at P0',ev(pages[0],"__got"))
  # 한 명 판 끝 → 나머지에서 사라지는지
  ev(pages[2],"endRun(false,true);1");pages[0].wait_for_timeout(5000)
  snap('after P2 left')
  print('broker calls',CALLS,'errs',errs[:4])
  print('crumbs p0',ev(pages[0],"(CR.bc||[]).filter(function(x){return /p2p|net/.test(x)}).join(' ')"))
