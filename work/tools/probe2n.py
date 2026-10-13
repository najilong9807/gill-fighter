from playwright.sync_api import sync_playwright
import sys,json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
VW,VH,L,F=int(sys.argv[1]),int(sys.argv[2]),sys.argv[3],(sys.argv[4] if len(sys.argv)>4 else 't2e.html')
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':VW,'height':VH},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u, lambda r:r.abort())
    pg.goto(D+F+'?lang=%s&build=release&hw=0'%L);pg.add_style_tag(content=':root{--sat:47px;--sab:34px}');pg.wait_for_timeout(2600)
    ev=lambda c:pg.evaluate("c=>__ev(c)",c)
    ev("document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});save.onb=1;save.runs=40;save.nick='늑구';save.pearls=4280;save.gems=37;save.newsSeen=APP_VER;save.owned=SPECIES.slice(0,40).map(function(x){return x.id});var H=HS();H.lv=3;persist();toHome();showTab('home');1")
    for i,part in enumerate(sys.stdin.read().split('\n###\n')):
        part=part.strip()
        if not part:continue
        nm,js=part.split('\n',1)
        r=ev(js);pg.wait_for_timeout(int(__import__("os").environ.get("WT","700")))
        print(nm,'->',json.dumps(r,ensure_ascii=False)[:1500])
        if nm.startswith('@'):pg.screenshot(path='W/p_%s.png'%nm[1:])
    print('errs',errs)
