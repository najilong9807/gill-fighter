import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
JS=r"""(function(cfg){var out=[];var hits=0;var dh0=deepHurt;deepHurt=function(){hits++;return dh0.apply(this,arguments)};
function threat(){var R=viewR(),fx=0,fy=0,i;
  for(i=0;i<VOLC.em.length;i++){var e=VOLC.em[i],px=e.x+e.vx*.35,py=e.y+e.vy*.35,dx=P.x-px,dy=P.y-py,d=Math.hypot(dx,dy)||1,lim=R*.55;if(d<lim){var w=(lim-d)/lim;fx+=dx/d*w*3;fy+=dy/d*w*3}}
  var pd=(VOLC.big&&VOLC.big.pend)||[];for(i=0;i<pd.length;i++){var p=pd[i],dx=P.x-p.x,dy=P.y-p.y,d=Math.hypot(dx,dy)||1,lim=R*.9;if(d<lim){var w=(lim-d)/lim;fx+=dx/d*w*2;fy+=(dy/d-.6)*w*2}}
  return [fx,fy]}
for(var k=0;k<cfg.n;k++){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('single');var dt=1/30,n=0;hits=0;
  if(cfg.big){P.s*=cfg.big;try{rescaleWorld()}catch(e){}}P.time=31;VOLC.bigT=.01;var s0=P.s;
  while(state==='play'&&!P.dead&&n<15.5*30){fish.length=0;
    if(cfg.mode==='dodge'){var t2=threat(),l=Math.hypot(t2[0],t2[1]);joy=l>.05?{x:t2[0]/l*56,y:t2[1]/l*56,ox:0,oy:0,pad:false}:null}
    else if(cfg.mode==='wander'){joy={x:Math.sin(P.time*.7)*56,y:Math.cos(P.time*.4)*30,ox:0,oy:0,pad:false}}
    else if(cfg.mode==='dive'){joy={x:Math.sin(P.time*.9)*40,y:50,ox:0,oy:0,pad:false}}
    else if(cfg.mode==='divedodge'){var t3=threat(),bx=Math.sin(P.time*.9)*.7+t3[0]*1.5,by=.9+t3[1]*1.5,l3=Math.hypot(bx,by)||1;joy={x:bx/l3*56,y:by/l3*56,ox:0,oy:0,pad:false}}
    else joy=null;
    try{update(dt)}catch(e){out.push({err:String(e).slice(0,120)});break}n++}
  out.push({hits:hits,shrink:+(1-P.s/s0).toFixed(3)});if(state==='play'&&!P.dead){try{endRun(false,true)}catch(e){}}joy=null}
deepHurt=dh0;return out})"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for f in ['t2e_pv.html','t2e.html']:
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+f+'?lang=ko&build=release&hw=0');pg.wait_for_timeout(500)
    sv={'runs':80,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.14','newsMute':'1.1.14','thx1111':2,'owned':['anchovy'],'pick':'anchovy','en':{'n':99,'t':0}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+f+'?lang=ko&build=release&hw=0');pg.wait_for_timeout(2500)
    pg.evaluate("c=>__ev(c)","document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});MUS&&MUS.stop&&MUS.stop();1")
    for big in [1,4]:
     for mode in ['idle','dive','divedodge']:
      r=pg.evaluate("a=>__ev(a[0])(a[1])",[JS,{'n':int(sys.argv[1]) if len(sys.argv)>1 else 20,'mode':mode,'big':big}])
      er=[x for x in r if 'err' in x];r=[x for x in r if 'hits' in x]
      h=[x['hits'] for x in r];
      print(f,'size x%d'%big,mode,'runs',len(r),'avg hits %.2f'%(sum(h)/max(1,len(h))),'0-hit runs %d/%d'%(sum(1 for x in h if x==0),len(h)),'avg shrink %.1f%%'%(100*sum(x['shrink'] for x in r)/max(1,len(r))),er[:1],errs[:1])
    pg.close()
