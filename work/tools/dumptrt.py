from playwright.sync_api import sync_playwright
import json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg=b.new_page(viewport={'width':390,'height':844})
    pg.goto(D+'t2e.html?lang=en&build=release');pg.wait_for_timeout(2500)
    d=pg.evaluate("()=>__ev('JSON.stringify(TRT)')")
    open('trt_all.json','w').write(d)
    t=json.loads(d);print(len(t),sum(len(k) for k in t),sum(len(v) for v in t.values()))
