cd /tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w
python3 mkst.py /home/claude/fishgame/index.html t.html
python3 mkdbg.py
python3 - <<'P'
h=open('t2.html').read()
h=h.replace('function boot(){','window.__ev=function(c){return eval(c)};function boot(){',1)
open('t2e.html','w').write(h)
P
python3 - <<'P'
h=open('t.html').read()
h=h.replace('function boot(){','window.__ev=function(c){return eval(c)};function boot(){',1)
a="if(!save.onb&&!(save.runs>0))prologShow();"
h=h.replace(a,"if(!save.onb&&!(save.runs>0)&&location.search.indexOf('prolog')>=0)prologShow();else if(!save.onb&&!(save.runs>0))onbShow();",1)
open('t_mp.html','w').write(h)
P
