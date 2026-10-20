import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
JS=r"""()=>{var out={};SPECIES.forEach(function(L){var spr=SPRITES[L.id],q=ANCH[L.id];if(!spr||!spr.ok)return;var noA=!q;if(!q){var a0=sprAnchor(spr);q={ex:a0.ex,ey:a0.ey,er:.035}}var im=spr.img,W=256,H=Math.round(W*im.height/im.width),cc=document.createElement('canvas');cc.width=W;cc.height=H;var x=cc.getContext('2d');x.drawImage(im,0,0,W,H);var d=x.getImageData(0,0,W,H).data;
 function lum(i,j){if(i<0||j<0||i>=W||j>=H)return -1;var p=(j*W+i)*4;if(d[p+3]<100)return -1;return .3*d[p]+.59*d[p+1]+.11*d[p+2]}
 var er=Math.max(2,q.er*H),best=null,bs=-1e9,cx0=q.ex*W,cy0=q.ey*H,R=Math.max(W,H)*(noA?.16:.1);
 for(var r of [er*.6,er*.85,er*1.15]){for(var cy=cy0-R;cy<=cy0+R;cy+=1)for(var cx=cx0-R;cx<=cx0+R;cx+=1){var a=0,na=0,b=0,nb=0,ok=true;
   for(var k=0;k<16;k++){var an=k/16*Math.PI*2,l1=lum(Math.round(cx+Math.cos(an)*r*.5),Math.round(cy+Math.sin(an)*r*.5));if(l1<0){ok=false;break}a+=l1;na++;var l2=lum(Math.round(cx+Math.cos(an)*r*1.6),Math.round(cy+Math.sin(an)*r*1.6));if(l2<0){ok=false;break}b+=l2;nb++}
   if(!ok)continue;var c0=lum(Math.round(cx),Math.round(cy));var sc=(b/nb-a/na)-(c0)*.3-Math.hypot(cx-cx0,cy-cy0)*.4;if(sc>bs){bs=sc;best=[cx/W,cy/H,r/H]}}}
 if(best)out[L.id]={old:[q.ex,q.ey,q.er],nw:[+best[0].toFixed(3),+best[1].toFixed(3),+best[2].toFixed(3)],d:+(Math.hypot((best[0]-q.ex)*W,(best[1]-q.ey)*H)/Math.max(W,H)).toFixed(3),sc:Math.round(bs),noA:noA}});return out}"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page();pg.route(lambda u:'supabase' in u or 'google' in u or 'gvt1' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=0');pg.wait_for_timeout(4000)
  r=pg.evaluate("a=>__ev('('+a+')()')",JS);json.dump(r,open('eyes.json','w'))
  for k,v in sorted(r.items(),key=lambda kv:-kv[1]['d'])[:25]:print(k,v)
