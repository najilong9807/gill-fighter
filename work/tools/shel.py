# usage: python3 shel.py OUT.png "js" "css selector" [w h]
from playwright.sync_api import sync_playwright
import sys
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
out,js,selr=sys.argv[1],sys.argv[2],sys.argv[3];W=int(sys.argv[4]) if len(sys.argv)>4 else 390;H=int(sys.argv[5]) if len(sys.argv)>5 else 844
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg=b.new_page(viewport={'width':W,'height':H},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.goto(D+'t2e.html?lang=ko&build=release');pg.wait_for_timeout(2500)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("save.onb=1;save.runs=40;save.pearls=42800;save.gems=37;save.newsSeen=APP_VER;persist();document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});1")
    for part in js.split('|||'):
        r=ev(part);pg.wait_for_timeout(700)
        if r not in (None,1): print('->',str(r)[:600])
    pg.locator(selr).first.screenshot(path=out);print('errs',errs)
