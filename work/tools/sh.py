# usage: python3 sh.py OUT.png "js" [w h wait lang file]
from playwright.sync_api import sync_playwright
import sys
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
out,js=sys.argv[1],sys.argv[2];W=int(sys.argv[3]) if len(sys.argv)>3 else 390;H=int(sys.argv[4]) if len(sys.argv)>4 else 844
wt=int(sys.argv[5]) if len(sys.argv)>5 else 900;L=sys.argv[6] if len(sys.argv)>6 else 'ko';F=sys.argv[7] if len(sys.argv)>7 else 't2e.html'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg=b.new_page(viewport={'width':W,'height':H},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto(D+F+'?lang=%s&build=release'%L);pg.add_style_tag(content=':root{--sat:47px;--sab:34px}');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("save.onb=1;save.runs=40;save.nick='늑구';save.pearls=42800;save.gems=37;save.newsSeen=APP_VER;persist();document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1")
    for part in js.split('|||'):
        r=ev(part);pg.wait_for_timeout(wt)
        if r not in (None,1): print('->',str(r)[:600])
    pg.screenshot(path=out);print('errs',errs)
