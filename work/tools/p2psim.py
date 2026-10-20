# P2P 대전 종합 점검: 여러 창 · 진짜 WebRTC · 가짜 소개소(실패 · 차단 흉내 가능)
import json,time,itertools,sys,re
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
class Broker:
  def __init__(s,per=16,down=False,block=()):
    s.MEM={};s.MSG=[];s.ID=itertools.count(1);s.calls=0;s.out=0;s.per=per;s.down=down;s.block=set(block);s.bytes=0
  def __call__(s,body):
    s.calls+=1
    if s.down:return None
    me=body.get('p_me');room=body.get('p_room');now=time.time();per=min(s.per,body.get('p_per') or 16)
    if body.get('p_leave'):
      for k in list(s.MEM):
        if k[1]==me:del s.MEM[k]
      return {'ok':True}
    if not room:
      k=1
      while sum(1 for (r,p),t in s.MEM.items() if r=='r14-%d'%k and now-t<12 and p!=me)>=per:k+=1
      room='r14-%d'%k
    s.MEM[(room,me)]=now
    for o in body.get('p_out') or []:
      if (room,o['to']) in s.MEM:
        b=o['b']
        if frozenset((me,o['to'])) in s.block and isinstance(b,dict) and 's' in b:  # 이 쌍은 직접 연결이 안 되는 망 흉내: 주소 후보를 지움
          b=dict(b);b['s']='\r\n'.join(l for l in b['s'].split('\r\n') if not l.startswith('a=candidate'))
        s.MSG.append({'id':next(s.ID),'room':room,'to':o['to'],'f':me,'b':b});s.out+=1
    mem=[p for (r,p),t in s.MEM.items() if r==room and p!=me and now-t<12]
    if (body.get('p_after') or 0)<0:
      top=max([m['id'] for m in s.MSG if m['to']==me] or [0]);r={'room':room,'mem':mem,'msg':[],'top':top};s.bytes+=len(json.dumps(r))+350;return r
    msg=[{'id':m['id'],'f':m['f'],'b':m['b']} for m in s.MSG if m['to']==me and m['room']==room and m['id']>(body.get('p_after') or 0)][:40]
    r={'room':room,'mem':mem,'msg':msg};s.bytes+=len(json.dumps(r))+350;return r
VP={'width':390,'height':844}
LITE=0
SNAP="(function(){var ps=bots.filter(function(b){return b.peer});return {me:netId(),p2p:P2P.on,room:P2P.room,humans:NET.humans,open:Object.keys(P2P.peers).filter(function(k){return P2P.peers[k].open}).length,wait:Object.keys(P2P.peers).filter(function(k){return !P2P.peers[k].open}).length,fresh:ps.filter(function(b){return performance.now()-b.last<1500}).length,state:state,fish:bots.length}})()"
def run(label,n,per=16,down=False,block_pairs=(),room=None,wait=16,after=None):
  with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files','--disable-features=WebRtcHideLocalIpsWithMdns'])
    br=Broker(per=per,down=down);pages=[];errs=[];ids=[]
    for i in range(n):
      ctx=b.new_context(viewport=VP);pg=ctx.new_page();pg.on('pageerror',lambda e,i=i:errs.append(('p%d'%i,str(e)[:100])))
      def rt(r):
        u=r.request.url
        if 'rpc/gf_cfg' in u:r.fulfill(status=200,content_type='application/json',body=json.dumps({'p2p':1}))
        elif 'rpc/gf_p2p' in u:
          res=br(json.loads(r.request.post_data or '{}'))
          if res is None:r.fulfill(status=503,body='down')
          else:r.fulfill(status=200,content_type='application/json',body=json.dumps(res))
        else:r.abort()
      pg.route(lambda u:'supabase' in u or 'google' in u,rt);pg.route_web_socket(lambda u:'supabase' in u,lambda ws:None)
      pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(300)
      sv={'runs':30,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.14','newsMute':'1.1.14','thx1111':2,'owned':['anchovy'],'pick':'anchovy','nick':'P%d'%i,'mp':{'games':5,'wins':0,'top3':0,'trophy':0,'best':5},'room':room or '','lite':LITE}
      pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
      pg.goto(D+'t2e.html?lang=ko&build=release');pages.append(pg)
    pages[0].wait_for_timeout(4500)
    ev=lambda pg,c:pg.evaluate("c=>__ev(c)",c)
    for pg in pages:ids.append(ev(pg,"netId()"))
    if block_pairs:
      for a,c in block_pairs:br.block.add(frozenset((ids[a],ids[c])))
    for pg in pages:ev(pg,"document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});NET.room=%s;curSrv=SERVERS[0];startRun('multi');P.fx.ghost=99999;setInterval(function(){if(P&&P.fx)P.fx.ghost=99999},500);1"%json.dumps(room or ''))
    t0=time.time();pages[0].wait_for_timeout(wait*1000)
    snaps=[ev(pg,SNAP) for pg in pages]
    res={'label':label,'t':round(time.time()-t0),'rooms':{} ,'calls':br.calls,'sig':br.out,'kb':round(br.bytes/1024,1),'errs':errs[:3]}
    for sn in snaps:res['rooms'].setdefault(sn['room'] or '-',[]).append('o%d/w%d/f%d%s'%(sn['open'],sn['wait'],sn['fresh'],'' if sn['p2p'] else '(off)'))
    if after:after(pages,ev,res,br)
    print(json.dumps(res,ensure_ascii=False));sys.stdout.flush()
    b.close()
which=sys.argv[1] if len(sys.argv)>1 else 'all'
def abrupt(pages,ev,res,br):
  pages[3].context.close();pages[0].wait_for_timeout(12000)
  res['after_close']=[ev(pg,SNAP)['open'] for i,pg in enumerate(pages) if i!=3]
def round2(pages,ev,res,br):
  for pg in pages:ev(pg,"endRun(false,true);1")
  pages[0].wait_for_timeout(1500)
  for pg in pages:ev(pg,"document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('multi');P.fx.ghost=99999;1")
  pages[0].wait_for_timeout(14000)
  res['round2']=[ev(pg,SNAP)['open'] for pg in pages]
if which in('all','8'):run('① 8명 한 바다',8,wait=20)
if which in('all','split'):run('② 정원 4명 · 6명 들어옴',6,per=4)
if which in('all','block'):run('③ 직접 연결 안 되는 쌍 2개(0-1, 2-3)',5,block_pairs=[(0,1),(2,3)],wait=20)
if which in('all','abrupt'):run('④ 4번이 앱을 갑자기 끔',5,after=abrupt)
if which in('all','down'):run('⑤ 소개 서버 죽음',3,down=True,wait=12)
if which in('all','friend'):run('⑥ 친구 코드 바다 1234',3,room='1234')
if which in('all','r2'):run('⑦ 다음 판 다시 들어감',4,after=round2)
if which=='16':run('⑧ 16명 꽉 찬 채널',16,wait=35)
if which=='17':run('⑨ 17명(16명 차면 2번 채널)',17,wait=35)
if which=='16lite':
  VP={'width':160,'height':300};LITE=1
  run('⑧-2 16명 · 부하 줄임(작은 화면 · 가벼운 모드) · 60초',16,wait=60)
if which=='17lite':
  VP={'width':160,'height':300};LITE=1
  run('⑨ 17명 · 16명 차면 2번 채널 · 60초',17,wait=60)
if which=='blocklong':
  def chk(pages,ev,res,br):
    c0=br.calls;pages[0].wait_for_timeout(60000);res['calls_per_min_after']=br.calls-c0;res['snap2']=[ev(pg,SNAP)['open'] for pg in pages];res['dead_tries']=ev(pages[0],"JSON.stringify(P2P.tries)")
  run('③-2 안 되는 쌍 · 1분 더 지켜보기',5,block_pairs=[(0,1),(2,3)],wait=20,after=chk)
