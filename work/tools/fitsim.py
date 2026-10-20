# 꾸미기 전수 검사: 머리/얼굴 꾸미기 x 물고기 x 각도(0, +-0.5, 왼쪽) x 먹는 순간
import json,sys
from playwright.sync_api import sync_playwright
D='file:///tmp/claude-0/-home-claude/e922937a-9a51-5144-b16c-c7a7a3d12de9/scratchpad/w/'
SLOT=sys.argv[1];OUT=sys.argv[2];ITEMS=sys.argv[3].split(',') if len(sys.argv)>3 and sys.argv[3] else None
JS=r"""a=>{var slot=a[0],only=a[1],N=200,S=40,cx=N/2,cy=N*.55;
 function cv(){var k=document.createElement('canvas');k.width=N;k.height=N;return k}
 var cf=cv(),ci=cv(),ce=cv(),xf=cf.getContext('2d',{willReadFrequently:true}),xi=ci.getContext('2d',{willReadFrequently:true}),xe=ce.getContext('2d',{willReadFrequently:true});
 var ids=only||Object.keys(slot==='head'?ACC_HEAD:ACC_FACE),out=[];
 var poses=[[0,0,'정면'],[-.5,0,'위로'],[.5,0,'아래로'],[Math.PI,0,'왼쪽'],[0,.5,'먹기']];
 SPECIES.forEach(function(L){poses.forEach(function(ps){var o={phase:0,stun:1,chomp:ps[1]},ang=ps[0];
   xf.clearRect(0,0,N,N);drawFish(xf,cx,cy,S,ang,L,o);var F=xf.getImageData(0,0,N,N).data;
   var g=accGeom(L,S,o);xe.clearRect(0,0,N,N);xe.save();fishFrame(xe,cx,cy,ang,L,o,S);xe.beginPath();xe.arc(g.ex,g.ey,Math.max(1.5,g.E*.75),0,7);xe.fillStyle='#f00';xe.fill();xe.restore();var Ey=xe.getImageData(0,0,N,N).data;
   var fx0=N,fx1=-1,fy0=N,fy1=-1,i,j,eN=0,ex=0,ey=0;for(j=0;j<N;j++)for(i=0;i<N;i++){var p=(j*N+i)*4;if(F[p+3]>60){if(i<fx0)fx0=i;if(i>fx1)fx1=i;if(j<fy0)fy0=j;if(j>fy1)fy1=j}if(Ey[p+3]>60){eN++;ex+=i;ey+=j}}
   ex/=Math.max(1,eN);ey/=Math.max(1,eN);
   ids.forEach(function(id){var q={};q[slot]=id;xi.clearRect(0,0,N,N);try{ACC_Q=q;var g2=accGeom(L,S,o);ACC_Q=null;accFront(xi,q,cx,cy,S,ang,L,o,g2)}catch(e){out.push({f:L.id,i:id,p:ps[2],err:String(e).slice(0,60)});return}
     var I=xi.getImageData(0,0,N,N).data,n=0,ov=0,eo=0,ix=0,iy=0,bx0=N,bx1=-1,by0=N,by1=-1,colLow={},front=0;
     for(j=0;j<N;j++)for(i=0;i<N;i++){var p=(j*N+i)*4;if(I[p+3]<=60)continue;n++;ix+=i;iy+=j;if(F[p+3]>60)ov++;if(Ey[p+3]>60)eo++;if(i<bx0)bx0=i;if(i>bx1)bx1=i;if(j<by0)by0=j;if(j>by1)by1=j;if(colLow[i]==null||j>colLow[i])colLow[i]=j}
     if(!n){out.push({f:L.id,i:id,p:ps[2],empty:1});return}
     ix/=n;iy/=n;var cols=0,touch=0;for(var k in colLow){cols++;var y=colLow[k],x=+k,hit=false;for(var d=-3;d<=5;d++){var yy=y+d;if(yy>=0&&yy<N&&F[(yy*N+x)*4+3]>60){hit=true;break}}if(hit)touch++}
     var r={f:L.id,i:id,p:ps[2],ov:+(ov/n).toFixed(2),eye:+(eo/Math.max(1,eN)).toFixed(2),touch:+(touch/Math.max(1,cols)).toFixed(2),dEye:+(Math.hypot(ix-ex,iy-ey)/S).toFixed(2),
       hR:+((by1-by0+1)/(fy1-fy0+1)).toFixed(2),wR:+((bx1-bx0+1)/(fx1-fx0+1)).toFixed(2),out:+(((bx1>fx1+2?bx1-fx1:0)+(bx0<fx0-2?fx0-bx0:0))/S).toFixed(2),top:+((fy0-by0)/S).toFixed(2)};
     out.push(r)})})});return out}"""
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/opt/pw-browsers/chromium',args=['--allow-file-access-from-files'])
  pg=b.new_page();pg.route(lambda u:'supabase' in u or 'google' in u or 'gvt1' in u, lambda r:r.abort())
  pg.goto(D+'t2e.html?lang=ko&build=release&hw=1&wn=1');pg.wait_for_timeout(3500)
  pg.evaluate("a=>__ev(a)","hw2Preload&&hw2Preload();1");pg.wait_for_timeout(2500)
  r=pg.evaluate("a=>__ev(a[0])(a[1])",["("+JS+")",[SLOT,ITEMS]])
  json.dump(r,open(OUT,'w'));print(len(r))
