import json
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
JS=r"""()=>{var out={};SPECIES.forEach(function(L){var spr=SPRITES[L.id];if(!spr||!spr.ok)return;var im=spr.img,W=200,H=Math.max(8,Math.round(W*im.height/im.width)),cc=document.createElement('canvas');cc.width=W;cc.height=H;var x=cc.getContext('2d');x.drawImage(im,0,0,W,H);var d=x.getImageData(0,0,W,H).data;
 var op=function(i,j){return i>=0&&i<W&&d[(j*W+i)*4+3]>110};
 var top=[],bot=[],xr=-1,i,j,k;for(i=0;i<W;i++){top[i]=-1;bot[i]=-1;for(j=0;j<H;j++){var ok=true;for(k=-3;k<=3;k++)if(!op(i+k,j)){ok=false;break}if(ok){if(top[i]<0)top[i]=j;bot[i]=j}}if(top[i]>=0)xr=i}
 var q=ANCH[L.id];var ex,ey,er;if(q){ex=q.ex;ey=q.ey;er=q.er}else{var a=sprAnchor(spr);ex=a.ex;ey=a.ey;er=.04}
 var flipH=L.kind==='horse'||L.kind==='float';
 var xc=Math.round((ex-Math.max(er,.03)*0.9)*W);xc=Math.max(3,Math.min(W-4,xc));
 function T(i){for(var q=0;q<8;q++){if(top[i-q]>=0)return i-q;if(top[i+q]>=0)return i+q}return i}
 var c0=T(xc),yt=top[c0],yb=bot[c0];if(yt<0)return;
 var dd=Math.round(W*.05),ca=T(Math.max(0,c0-dd)),cb=T(Math.min(W-1,c0+dd)),sl=(top[ca]>=0&&top[cb]>=0&&cb!==ca)?((top[cb]-top[ca])/H)/((cb-ca)/W):0;
 out[L.id]=[+(c0/W).toFixed(3),+(yt/H).toFixed(3),+((yb-yt)/H).toFixed(3),+sl.toFixed(3),+(xr/W).toFixed(3)]});return out}"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page();pg.route(lambda u:'supabase' in u or 'google' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=0');pg.wait_for_timeout(4000)
  r=pg.evaluate("a=>__ev('('+a+')()')",JS)
  json.dump(r,open('hatg.json','w'),separators=(',',':'));print(len(r));print({k:r[k] for k in list(r)[:6]})
