from playwright.sync_api import sync_playwright
import sys,json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
VW,VH=int(sys.argv[1]),int(sys.argv[2]);L=sys.argv[3] if len(sys.argv)>3 else 'ko'
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg=b.new_page(viewport={'width':VW,'height':VH},device_scale_factor=2);pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=%s&build=release&hw=1'%L);pg.wait_for_timeout(2600)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.newsSeen=APP_VER;save.owned=SPECIES.slice(0,40).map(function(x){return x.id});var H=HS();H.lv=3;persist();1")
    for line in sys.stdin.read().split('\n###\n'):
        line=line.strip()
        if not line: continue
        name,js=line.split('\n',1)
        try: r=ev(js)
        except Exception as e: r='ERR '+str(e)[:200]
        pg.wait_for_timeout(500)
        if name.startswith('@'): pg.screenshot(path='W/ft_%s.png'%name[1:])
        print(name,'->',json.dumps(r,ensure_ascii=False)[:400],flush=True)
    b.close()
print('errs',errs[:8])
