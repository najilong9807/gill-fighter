import json,sys,time,random
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
DATES=sys.argv[1].split(',') if len(sys.argv)>1 else ['now']
LANGS=sys.argv[2].split(',') if len(sys.argv)>2 else ['ko']
SKIP=['초기화','삭제','reset','Delete','削除','탈퇴']
def dscript(d):
  if d=='now':return ''
  ms=int(time.mktime(time.strptime(d,'%Y-%m-%d'))*1000)+10*3600e3
  return """(function(){var off=%d-Date.now(),R=Date;function F(a,b,c,d,e,f,g){if(!(this instanceof F))return new R(R.now()+off).toString();
  var n=arguments.length;return n===0?new R(R.now()+off):n===1?new R(a):new R(a,b,c==null?1:c,d||0,e||0,f||0,g||0)}
  F.prototype=R.prototype;F.now=function(){return R.now()+off};F.UTC=R.UTC;F.parse=R.parse;window.Date=F})();"""%ms
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  tot=0
  for d in DATES:
   for lang in LANGS:
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
    cons=[];pg.on('console',lambda m:cons.append(m.text[:120]) if m.type=='error' and 'net::' not in m.text and 'Failed to load' not in m.text else None)
    pg.on('dialog',lambda dl:dl.dismiss())
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    if dscript(d):pg.add_init_script(dscript(d))
    pg.goto(D+'t2e.html?lang=%s&build=release'%lang);pg.wait_for_timeout(800)
    sv={'runs':40,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.14','newsMute':'1.1.14','thx1111':2,'pearls':3000,'gems':50,'owned':['anchovy','sardine'],'pick':'anchovy','nick':'테스터'}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=%s&build=release'%lang);pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    info=ev("[new Date().toISOString().slice(0,10),typeof HW!=='undefined'?HW:null,(typeof MUS!=='undefined'&&MUS.want)?String(MUS.want()):'-']")
    clicks=0;seen=set()
    for tab in ['home','sea','tank','dex','rec','set']:
      for rnd in range(2):
        try:ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('%s');1"%tab)
        except Exception as e:errs.append('showTab '+tab+' '+str(e)[:80]);break
        pg.wait_for_timeout(250)
        labels=ev("""Array.from(document.querySelectorAll('button,[onclick],.btn,.tile,.card[data-k]')).filter(function(e){var r=e.getBoundingClientRect();return r.width>4&&r.height>4&&r.bottom>0&&r.top<innerHeight&&!e.disabled&&getComputedStyle(e).visibility!=='hidden'}).map(function(e,i){e.setAttribute('data-mk',i);return [i,(e.id||'')+'|'+(e.textContent||'').trim().slice(0,18)]})""")
        for i,lab in labels:
          if lab in seen or any(s in lab for s in SKIP):continue
          seen.add(lab);clicks+=1;n0=len(errs)
          try:
            pg.click('[data-mk="%d"]'%i,timeout=600,force=True);pg.wait_for_timeout(180)
            # one level deeper inside any opened overlay
            sub=ev("""(function(){var o=Array.from(document.querySelectorAll('.overlay')).filter(function(x){return !x.hidden});if(!o.length)return [];var L=o[o.length-1];return Array.from(L.querySelectorAll('button,[onclick],.btn')).filter(function(e){var r=e.getBoundingClientRect();return r.width>4&&r.height>4}).slice(0,10).map(function(e,j){e.setAttribute('data-mk2',j);return [j,L.id+'>'+(e.id||'')+'|'+(e.textContent||'').trim().slice(0,14)]})})()""")
            for j,l2 in sub:
              if l2 in seen or any(s in l2 for s in SKIP) or '닫기' in l2 or 'Close' in l2:continue
              seen.add(l2);clicks+=1
              try:pg.click('[data-mk2="%d"]'%j,timeout=500,force=True);pg.wait_for_timeout(150)
              except Exception:pass
              if len(errs)>n0:errs[-1]=l2+' :: '+errs[-1];n0=len(errs)
              st=ev("typeof state!=='undefined'?state:''")
              if st and st not in ('menu','home',''):ev("try{endRun&&endRun()}catch(e){};state='menu';1");pg.wait_for_timeout(200)
          except Exception as e:pass
          if len(errs)>n0:errs[-1]=lab+' :: '+errs[-1]
          st=ev("typeof state!=='undefined'?state:''")
          if st and st not in ('menu','home',''):
            pg.wait_for_timeout(1200);ev("try{endRun&&endRun()}catch(e){};1");pg.wait_for_timeout(300)
          ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1")
          try:ev("showTab('%s');1"%tab)
          except Exception:pass
    print(d,lang,'info',info,'clicks',clicks,'errs',len(errs),'console',len(set(cons)))
    for e in sorted(set(errs))[:15]:print('   ERR',e)
    for c in sorted(set(cons))[:6]:print('   CON',c)
    tot+=len(errs);pg.close()
  print('TOTAL_ERRS',tot)
