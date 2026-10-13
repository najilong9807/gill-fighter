# 문제 종을 크게 그리고 머리(빨강) · 눈(초록) 기준점과 정규화 격자를 표시
from playwright.sync_api import sync_playwright
import base64,sys,json
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
IDS=sys.argv[1].split(',');OUT=sys.argv[2];Q=json.loads(sys.argv[3]) if len(sys.argv)>3 else None
JS="""(function(a){var ids=a[0],Q=a[1];var C=4,cwid=360,chh=300,R=Math.ceil(ids.length/C);var cv=document.createElement('canvas');cv.width=C*cwid;cv.height=R*chh;var c=cv.getContext('2d');c.fillStyle='#7FB8D6';c.fillRect(0,0,cv.width,cv.height);
ids.forEach(function(id,i){var sp=byId(id),x=(i%C)*cwid+cwid/2,y=Math.floor(i/C)*chh+chh/2+12,s=95;var spr=SPRITES[id],dm=spriteDims(spr,s),w=dm[0],h=dm[1];
 c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=1;for(var k=0;k<=10;k++){c.beginPath();c.moveTo(x-w/2+w*k/10,y-h/2);c.lineTo(x-w/2+w*k/10,y+h/2);c.stroke();c.beginPath();c.moveTo(x-w/2,y-h/2+h*k/10);c.lineTo(x+w/2,y-h/2+h*k/10);c.stroke()}
 if(Q)drawFishDeco(c,null,x,y,s,0,sp,{q:Q,px:s*2});else drawFish(c,x,y,s,0,sp,{px:s*2});
 var g=accGeom(sp,s,{});c.fillStyle='red';c.beginPath();c.arc(x+g.hx,y+g.hy,5,0,7);c.fill();c.fillStyle='lime';c.beginPath();c.arc(x+g.ex,y+g.ey,5,0,7);c.fill();
 var q=ANCH[id]||{};c.fillStyle='#000';c.font='bold 14px sans-serif';c.fillText(id+' h('+q.hx+','+q.hy+') e('+q.ex+','+q.ey+') er'+q.er,(i%C)*cwid+6,Math.floor(i/C)*chh+16)});
return cv.toDataURL('image/png')})"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium');pg=b.new_page(viewport={'width':390,'height':844})
    pg.route(lambda u:'supabase' in u, lambda r:r.abort());pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
    pg.evaluate("__ev(\"document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});showTab('dex');1\")");pg.wait_for_timeout(4000)
    d=pg.evaluate("a=>__ev(%s)(a)"%json.dumps(JS),[IDS,Q]);open(OUT,'wb').write(base64.b64decode(d.split(',')[1]));b.close()
