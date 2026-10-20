import sys,base64
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
FISH=sys.argv[1];SLOT=sys.argv[2];OUT=sys.argv[3];PAGE=sys.argv[4] if len(sys.argv)>4 else 't2e.html'
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page();pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+PAGE+'?lang=ko&build=release&hw=1&wn=1');pg.wait_for_timeout(3500)
  pg.evaluate("a=>__ev(a)","Object.keys(HW2H).forEach(function(k){hwAcs(HW2H[k][0])});Object.keys(HW2F).forEach(function(k){hwAcs(HW2F[k][0])});1");pg.wait_for_timeout(2500)
  js="""a=>{var L=byId(a[0]),slot=a[1],ids=Object.keys(slot==='head'?ACC_HEAD:ACC_FACE),cols=8,cw=190,ch=150,S=50,cv=document.createElement('canvas');cv.width=cols*cw;cv.height=Math.ceil(ids.length/cols)*ch;var c=cv.getContext('2d');c.fillStyle='#1E5F8C';c.fillRect(0,0,cv.width,cv.height);
   ids.forEach(function(id,i){var x=(i%cols)*cw+cw/2,y=Math.floor(i/cols)*ch+ch*.58,q={};q[slot]=id;try{drawFishDeco(c,[],x,y,S,0,L,{q:q,phase:0,stun:1})}catch(e){}c.fillStyle='#fff';c.font='14px sans-serif';c.textAlign='center';c.fillText(i+' '+id,x,Math.floor(i/cols)*ch+ch-6)});return cv.toDataURL('image/png')}"""
  d=pg.evaluate("a=>__ev(a[0])(a[1])",["("+js+")",[FISH,SLOT]])
  open(OUT,'wb').write(base64.b64decode(d.split(',')[1]))
