import sys,base64
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
FISH=sys.argv[1].split(',');ITEMS=sys.argv[2].split(',');OUT=sys.argv[3];S=float(sys.argv[4]) if len(sys.argv)>4 else 80
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':400,'height':400});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1&wn=1');pg.wait_for_timeout(3500)
  pg.evaluate("a=>__ev(a)","Object.keys(HW2H).forEach(function(k){hwAcs(HW2H[k][0])});Object.keys(HW2F).forEach(function(k){hwAcs(HW2F[k][0])});1");pg.wait_for_timeout(2500)
  js="""a=>{var F=a[0],I=a[1],S=a[2],cw=S*3.2,ch=S*2.3,cv=document.createElement('canvas');cv.width=F.length*cw+150;cv.height=I.length*ch;var c=cv.getContext('2d');c.fillStyle='#1E5F8C';c.fillRect(0,0,cv.width,cv.height);
   I.forEach(function(it,r){c.fillStyle='#fff';c.font='16px sans-serif';c.textAlign='left';c.fillText(it,6,r*ch+ch/2);var q={};if(ACC_HEAD[it])q.head=it;else if(ACC_FACE[it])q.face=it;else q.fx=it;
     F.forEach(function(fid,k){var L=byId(fid);drawFishDeco(c,[],150+k*cw+cw/2,r*ch+ch*.6,S,0,L,{q:q,phase:0,stun:1})})});return cv.toDataURL('image/png')}"""
  d=pg.evaluate("a=>__ev(a[0])(a[1])",["("+js+")",[FISH,ITEMS,S]])
  open(OUT,'wb').write(base64.b64decode(d.split(',')[1]));print('errs',errs)
