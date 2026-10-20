import json,base64,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
P=json.load(open(sys.argv[1]));OUT=sys.argv[2]
JS="""(function(P){var cw=230,ch=170,cols=6,cv=document.createElement('canvas');cv.width=cols*cw;cv.height=Math.ceil(P.length/cols)*ch;var c=cv.getContext('2d');c.fillStyle='#1E5F8C';c.fillRect(0,0,cv.width,cv.height);
 P.forEach(function(q,i){var x=(i%cols)*cw+cw/2,y=Math.floor(i/cols)*ch+ch*.55,L=byId(q[0]),qq={};qq[q[2]||'head']=q[1];drawFishDeco(c,[],x,y,55,q[3]||0,L,{q:qq,phase:0,stun:1});c.fillStyle='#fff';c.font='13px sans-serif';c.textAlign='center';c.fillText(q[0]+' / '+q[1],x,Math.floor(i/cols)*ch+ch-5)});return cv.toDataURL()})"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page();pg.route(lambda u:'supabase' in u or 'google' in u or 'gvt1' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1&wn=1');pg.wait_for_timeout(3500);pg.evaluate("a=>__ev(a)","hw2Preload();1");pg.wait_for_timeout(2000)
  d=pg.evaluate("a=>__ev(a[0])(a[1])",[JS,P])
  open(OUT,'wb').write(base64.b64decode(d.split(',')[1]))
