import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
JS="""(function(){var out=[];for(var k=0;k<10;k++){document.querySelectorAll('.overlay').forEach(function(o){o.hidden=true});startRun('single');var dt=1/30;
 P.time=50;HWB.next=0;hwbTick();var B=HWB.f;if(!B){out.push('nospawn');continue}var a0=Math.random()*6.28;B.x=P.x+Math.cos(a0)*P.s*7;B.y=clamp(P.y+Math.sin(a0)*P.s*7,H*.05,H*.9);B.ang=Math.random()*6.28;HWB.t0=P.time-Math.random()*6.8;
 var n0=P.nibbles|0,res='timeout',tt=0,minR=9;
 for(var j=0;j<30*75&&state==='play';j++){
   if(!B||fish.indexOf(B)<0){res=HWB.done?'WIN':'gone';break}
   var tx=B.x-Math.cos(B.ang)*B.s*.9,ty=B.y-Math.sin(B.ang)*B.s*.9,mx=B.x+Math.cos(B.ang)*B.s,my=B.y+Math.sin(B.ang)*B.s;
   var edible=B.s<=P.s*eatRatio(),dxm=mx-P.x,dym=my-P.y,dm=Math.hypot(dxm,dym);
   var gx,gy;if(edible){gx=B.x-P.x;gy=B.y-P.y}else if(B.stun>0||B.hwPh===0){gx=tx-P.x;gy=ty-P.y}else{gx=-dxm;gy=-dym}
   if(!edible&&dm<B.s*1.2&&!(B.stun>0)){gx-=dxm/dm*3*P.s;gy-=dym/dm*3*P.s}
   var l=Math.hypot(gx,gy)||1;joy={x:gx/l*56,y:gy/l*56,ox:0,oy:0,pad:false};update(dt);tt=j/30;minR=Math.min(minR,B.s/P.s)}
 if(state!=='play'&&res==='timeout')res='DIED';out.push(res+' t'+tt.toFixed(0)+' nib'+((P.nibbles|0)-n0)+' minR'+minR.toFixed(2))}
 return out;
 function steerIdle(){joy={x:Math.sin(P.time)*56,y:20,ox:0,oy:0,pad:false};P.inv=5}})()"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
  for fishid,lv in [('anchovy',1),('octopus',10)]:
    pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
    sv={'runs':12,'onb':1,'tut':1,'firstAt':1759000000000,'newsSeen':'1.1.12','newsMute':'1.1.12','thx1111':2,'pearls':500,'owned':[fishid,'anchovy'],'pick':fishid,'lv':{fishid:lv},'hwAtt':{'y':2026,'n':7,'d':'x'}}
    pg.add_init_script("localStorage.setItem('fishproto.save2',%s)"%json.dumps(json.dumps(sv)))
    pg.goto(D+'t2e.html?lang=ko&build=release&hw=1');pg.wait_for_timeout(2500)
    print(fishid,pg.evaluate("c=>__ev(c)",JS),errs[:2])
