import json,sys,base64
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
HEAD=sys.argv[1];FACE=sys.argv[2] if len(sys.argv)>2 else '';OUT=sys.argv[3] if len(sys.argv)>3 else 'sheet'
CH=float(sys.argv[4]) if len(sys.argv)>4 else 0
DBG=1 if len(sys.argv)>5 else 0
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':400,'height':400});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:150]))
  pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(4000)
  js="""a=>{var H=a[0],F=a[1],CH=a[2];SPECIES.forEach(function(L){try{spriteFor&&spriteFor(L)}catch(e){}});
   var hk=H&&HW2H[H]?HW2H[H][0]:null,fk=F&&HW2F[F]?HW2F[F][0]:null;if(hk)hwAcs(hk);if(fk)hwAcs(fk);return SPECIES.length}"""
  n=pg.evaluate("a=>__ev(a[0])(a[1])",["("+js+")",[HEAD,FACE,CH]])
  pg.wait_for_timeout(3000)
  js2="""a=>{var H=a[0],F=a[1],CH=a[2],cols=5,cw=300,chh=200,L0=SPECIES.slice(a[3]||0,(a[3]||0)+30),rows=Math.ceil(L0.length/cols),cv=document.createElement('canvas');cv.width=cols*cw;cv.height=rows*chh;var c=cv.getContext('2d');c.fillStyle='#1E5F8C';c.fillRect(0,0,cv.width,cv.height);
   var miss=[];L0.forEach(function(L,i){var x=(i%cols)*cw+cw/2,y=Math.floor(i/cols)*chh+chh*.6,spr=SPRITES[L.id];if(!(spr&&spr.ok))miss.push(L.id);
     var s=88;try{drawFishDeco(c,null,x,y,s,0,L,{q:{head:H||null,face:F||null},phase:0,stun:1,chomp:CH})}catch(e){miss.push('E'+L.id+String(e).slice(0,40))}
     if(a[4]){var g=accGeom(L,s,{});c.save();c.translate(x,y);c.strokeStyle='#ff2020';c.lineWidth=2;c.beginPath();c.arc(g.ex,g.ey,g.E,0,7);c.stroke();c.fillStyle='#30ff30';c.beginPath();c.arc(g.hx,g.hy,4,0,7);c.fill();c.restore()}c.fillStyle='#fff';c.font='15px sans-serif';c.textAlign='center';c.fillText((i+(a[3]||0))+' '+L.id,x,Math.floor(i/cols)*chh+chh-6)});
   return [cv.toDataURL('image/png'),miss]}"""
  for st in (0,30,60):
    d,miss=pg.evaluate("a=>__ev(a[0])(a[1])",["("+js2+")",[HEAD,FACE,CH,st,DBG]])
    open(OUT+'_%d.png'%st,'wb').write(base64.b64decode(d.split(',')[1]))
  print('errs',errs)
