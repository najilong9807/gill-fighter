import sys,json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
LINT=open('walk2.py').read().split('LINT=r"""')[1].split('"""')[0]
VW,VH=int(sys.argv[1]),int(sys.argv[2])
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  for lg in ['ko','en','ja']:
    pg=b.new_page(viewport={'width':VW,'height':VH},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    pg.goto(D+'t2e.html?lang=%s&build=release'%lg);pg.add_style_tag(path='gfonts.css');pg.add_style_tag(content=':root{--sat:47px;--sab:34px}');pg.wait_for_timeout(1500)
    ev=lambda c: pg.evaluate("c=>__ev(c)",c)
    def shot(tag):
      pg.wait_for_timeout(700);pg.screenshot(path='S4/%s%d_%s.png'%(lg,VW,tag));r=ev(LINT);bad={k:v for k,v in r.items() if v}
      print(lg,tag,json.dumps(bad,ensure_ascii=False)[:500],flush=True)
    ev("try{$('onb').hidden=true}catch(x){};save.onb=1;save.tut=1;save.sv={};var S=svSave();S.guide=1;S.plays=9;save.owned=SPECIES.map(function(L){return L.id});sel='anchovy';svStart(1);1")
    pg.wait_for_timeout(800);
    ev("for(var k=0;k<60;k++)update(1/30);SV.xp=(SV.need||99)+5;for(var k=0;k<30&&$('svUp').hidden;k++)update(1/30);1")
    shot('play_or_up')
    ev("for(var k=0;k<200;k++){if(!$('svUp').hidden){var c=$('svUpList').querySelector('.svc');c&&c.click()}if(!$('svBox').hidden)svBoxDone();update(1/30)};1")
    shot('play')
    ev("SV.hp=1;SV.inv=0;SV.bgd=0;svPlayerHit(1);1");pg.wait_for_timeout(400)
    shot('rev')
    ev("if(!$('svRev').hidden)svReviveNo();1");pg.wait_for_timeout(2600)
    shot('res')
    print(lg,'errs',errs[:3]);pg.close()
