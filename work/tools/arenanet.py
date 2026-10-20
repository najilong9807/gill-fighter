# 대전 바다 구조 시험: 가짜 실시간 서버(웹소켓 가로채기)로 바다 꽉 참 · 넘침 · 끊김 · 원격 설정 확인
import json,time
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
def others(n,tag):return {('%s%d'%(tag,i)):{'metas':[{'n':'p%d'%i,'l':'anchovy','phx_ref':'r%d'%i}]} for i in range(n)}
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  def case(label,fill,closes=0,cfg=None,rounds=1,home_wait=0):
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:120]))
    log={'ws':0,'joins':[],'sent':0,'st':0,'t0':None}
    def on_ws(ws):
      log['ws']+=1;state={'closes':0}
      def msg(m):
        try:o=json.loads(m)
        except Exception:return
        t=o.get('topic','');ev=o.get('event')
        if ev=='phx_join':
          log['joins'].append(t);ws.send(json.dumps({'topic':t,'event':'phx_reply','ref':o.get('ref'),'payload':{'status':'ok','response':{}}}))
          k=t.split('-')[-1] if 'gf-sea' in t else 'x'
          n=fill.get(k,0) if 'gf-sea' in t else 0
          ws.send(json.dumps({'topic':t,'event':'presence_state','payload':others(n,'s'+k+'_')}))
          if closes and state['closes']<closes and 'gf-sea' in t:
            state['closes']+=1
            import threading
        elif ev=='broadcast':
          log['sent']+=1
          if (o.get('payload') or {}).get('event')=='st':log['st']+=1
      ws.on_message(msg)
    pg.route_web_socket(lambda u:'supabase' in u,on_ws)
    def rt(r):
      u=r.request.url
      if 'rpc/gf_cfg' in u and cfg is not None:r.fulfill(status=200,content_type='application/json',body=json.dumps(cfg))
      else:r.abort()
    pg.route(lambda u:'supabase' in u or 'google' in u,rt)
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(500)
    sv={'runs':30,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.14','newsMute':'1.1.14','thx1111':2,'owned':['anchovy'],'pick':'anchovy','mp':{'games':5,'wins':0,'top3':0,'trophy':0,'best':5}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(3500+home_wait)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    home_ws=log['ws']
    res=[]
    for r in range(rounds):
      ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});NET.room='';curSrv=SERVERS[0];startRun('multi');1")
      if closes:
        pg.wait_for_timeout(1500)
        for _ in range(closes):
          ev("try{NET.ws&&NET.ws.onclose&&NET.ws.onclose()}catch(e){};1");pg.wait_for_timeout(4800)
      pg.wait_for_timeout(4000)
      st0=log['st'];pg.wait_for_timeout(4000);rate=(log['st']-st0)/4
      res.append({'round':r+1,'live':ev("NET.live"),'shard':ev("NET.shard"),'humans':ev("NET.humans"),'fish':ev("bots.length"),'st_per_s':round(rate,1),'retry':ev("NET.retry"),'cfg':ev("[NET.maxShard,NET.maxPer,NET.hzNear,NET.hzFar]")})
      ev("try{endRun(false,true)}catch(e){};1");pg.wait_for_timeout(800)
    crumbs=ev("(CR.bc||[]).filter(function(x){return /net|sea|cfg/.test(x)}).join(' ')")+' | banner:'+ev("(document.querySelector('#banner,.banner')||{}).textContent||''")
    print(label,'| home ws',home_ws,'| joins',[j.replace('realtime:','') for j in log['joins'] if 'lobby' not in j or True],'|',res,'| crumbs',crumbs[-160:],'| errs',errs[:2])
    pg.close()
  case('A 채널1에 5명',{'1':5})
  case('B 채널1 꽉(16명)',{'1':16,'2':3})
  case('C 채널1~3 꽉',{'1':16,'2':16,'3':16,'4':0})
  case('D 두 번 끊김',{'1':1},closes=2)
  case('E 원격 설정 채널 2개 · 다 참',{'1':16,'2':16},cfg={'shards':2},rounds=2)
  case('F 원격 rt 끔',{'1':1},cfg={'rt':0})
