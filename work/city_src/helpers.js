var OUT='#22304d';
var W=340,H=500,GX=170,GY=410; /* 그림 안에서 땅 중심 */
function pal(bp){
  if(bp){var c='rgba(150,220,255,.26)';return {bp:1,out:'rgba(200,240,255,.95)',sw:2,
    stoneT:c,stoneL:c,stoneR:c,wallT:c,wallL:c,wallR:c,trim:c,win:'rgba(140,215,255,.05)',winHi:'none',door:c,
    gold:'none',teal:'none',roof:'none',pearl:'none',coralA:'none',coralB:'none',kelp:'none',flag:'none',flat:c}}
  return {out:OUT,sw:2.6,stoneT:'#f6f9fd',stoneL:'#e2eaf5',stoneR:'#bccbe0',wallT:'#fff3f6',wallL:'#ffd7e0',wallR:'#f0a3b5',
    trim:'#ffe58a',win:'#3f6fa8',winHi:'#bfe6ff',door:'#7a4a3a',gold:'url(#gGold)',teal:'url(#gTeal)',roof:'url(#gRoof)',pearl:'url(#gPearl)',
    coralA:'#ff7d8f',coralB:'#ffa04d',kelp:'#3fae6a',flag:'#ff5d5d'}
}
var DEFS='<defs>'+
 '<linearGradient id="gGold" x1="0" x2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".45" stop-color="#ffd04a"/><stop offset="1" stop-color="#e3921b"/></linearGradient>'+
 '<linearGradient id="gTeal" x1="0" x2="1"><stop offset="0" stop-color="#d4fbf6"/><stop offset=".45" stop-color="#5fd0cf"/><stop offset="1" stop-color="#2a8a9c"/></linearGradient>'+
 '<linearGradient id="gRoof" x1="0" x2="1"><stop offset="0" stop-color="#ffb3a2"/><stop offset=".5" stop-color="#ff6f63"/><stop offset="1" stop-color="#c8433f"/></linearGradient>'+
 '<radialGradient id="gPearl" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef0ff"/><stop offset="1" stop-color="#b9c3ea"/></radialGradient>'+
 '<radialGradient id="gGlow"><stop offset="0" stop-color="#fffbe0" stop-opacity=".9"/><stop offset="1" stop-color="#fffbe0" stop-opacity="0"/></radialGradient>'+
'<linearGradient id="gPink" x1="0" x2="1"><stop offset="0" stop-color="#ffe0e7"/><stop offset=".5" stop-color="#ff9fb4"/><stop offset="1" stop-color="#d9667f"/></linearGradient>'+
 '<linearGradient id="gGoldRoof" x1="0" x2="1"><stop offset="0" stop-color="#fff2a0"/><stop offset=".5" stop-color="#ffc83a"/><stop offset="1" stop-color="#d9861a"/></linearGradient>'+
 '<radialGradient id="gRainbow" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#ffe6fb"/><stop offset=".65" stop-color="#c9e9ff"/><stop offset="1" stop-color="#b9a6ff"/></radialGradient>'+
'</defs>';
function S(p){return ' stroke="'+p.out+'" stroke-width="'+p.sw+'" stroke-linejoin="round" stroke-linecap="round"'}
/* 아이소 상자: 바닥 마름모 중심(cx,cy), 가로 반폭 a, 높이 h */
function box(p,cx,cy,a,h,T,L,R){var b=a/2;return ''+
  '<path d="M'+(cx-a)+','+(cy-h)+' L'+cx+','+(cy+b-h)+' L'+cx+','+(cy+b)+' L'+(cx-a)+','+cy+'Z" fill="'+L+'"'+S(p)+'/>'+
  '<path d="M'+(cx+a)+','+(cy-h)+' L'+cx+','+(cy+b-h)+' L'+cx+','+(cy+b)+' L'+(cx+a)+','+cy+'Z" fill="'+R+'"'+S(p)+'/>'+
  '<path d="M'+cx+','+(cy-b-h)+' L'+(cx+a)+','+(cy-h)+' L'+cx+','+(cy+b-h)+' L'+(cx-a)+','+(cy-h)+'Z" fill="'+T+'"'+S(p)+'/>'}
/* 왼쪽 · 오른쪽 벽면에 붙여 그리기(기울인 좌표) */
function faceL(cx,cy,a,inner){return '<g transform="matrix(1,0.5,0,1,'+(cx-a)+','+cy+')">'+inner+'</g>'}
function faceR(cx,cy,a,inner){return '<g transform="matrix(1,-0.5,0,1,'+cx+','+(cy+a/2)+')">'+inner+'</g>'}
function archWin(p,x,y,w,h){var r=w/2;return '<path d="M'+x+','+y+' L'+x+','+(y-h+r)+' A'+r+','+r+' 0 0 1 '+(x+w)+','+(y-h+r)+' L'+(x+w)+','+y+'Z" fill="'+p.win+'"'+S(p)+'/>'+
  (p.bp?'':'<path d="M'+(x+w*.28)+','+(y-3)+' L'+(x+w*.28)+','+(y-h+r)+'" stroke="'+p.winHi+'" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>')}
function roundWin(p,x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+p.win+'"'+S(p)+'/>'+(p.bp?'':'<circle cx="'+(x-r*.3)+'" cy="'+(y-r*.3)+'" r="'+r*.32+'" fill="'+p.winHi+'" opacity=".85"/>')}
function cyl(p,cx,cy,r,h,fill){var e=r/2;return '<path d="M'+(cx-r)+','+(cy-h)+' L'+(cx-r)+','+cy+' A'+r+','+e+' 0 0 0 '+(cx+r)+','+cy+' L'+(cx+r)+','+(cy-h)+'Z" fill="'+fill+'"'+S(p)+'/>'+
  '<ellipse cx="'+cx+'" cy="'+(cy-h)+'" rx="'+r+'" ry="'+e+'" fill="'+(p.bp?p.flat:'#e9fffb')+'"'+S(p)+'/>'}
function bands(p,cx,cy,r,h,n){if(p.bp)return '';var s='';for(var i=1;i<=n;i++){var y=cy-h*i/(n+1);s+='<path d="M'+(cx-r)+','+y+' A'+r+','+(r/2)+' 0 0 0 '+(cx+r)+','+y+'" fill="none" stroke="'+OUT+'" stroke-width="1.4" opacity=".35"/>'}return s}
function cone(p,cx,cy,r,h,fill){return '<path d="M'+(cx-r)+','+cy+' A'+r+','+(r/2)+' 0 0 0 '+(cx+r)+','+cy+' L'+cx+','+(cy-h)+'Z" fill="'+(p.bp?'none':(fill||p.roof))+'"'+S(p)+'/>'}
function shellDome(p,cx,cy,r,h,ribs,fill,rc){var s='<path d="M'+(cx-r)+','+cy+' C'+(cx-r)+','+(cy-h*1.05)+' '+(cx+r)+','+(cy-h*1.05)+' '+(cx+r)+','+cy+' A'+r+','+(r/2)+' 0 0 1 '+(cx-r)+','+cy+'Z" fill="'+(p.bp?'none':(fill||p.gold))+'"'+S(p)+'/>';
  if(!p.bp)for(var i=1;i<ribs;i++){var t=i/ribs,x=cx-r+2*r*t,yb=cy+Math.sin(Math.PI*t)*r/2*.92;s+='<path d="M'+x+','+yb+' Q'+(cx+(x-cx)*.55)+','+(cy-h*.55)+' '+cx+','+(cy-h*.8)+'" fill="none" stroke="'+(rc||'#b86d10')+'" stroke-width="1.6" opacity=".55"/>'}
  return s}
function pearl(p,x,y,r,glow,fill){return (p.bp||!glow?'':'<circle cx="'+x+'" cy="'+y+'" r="'+r*2.6+'" fill="url(#gGlow)"/>')+'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(p.bp?'none':(fill||p.pearl))+'"'+S(p)+'/>'}
function flag(p,x,y,h,c){return '<path d="M'+x+','+y+' L'+x+','+(y-h)+'" stroke="'+p.out+'" stroke-width="2.4"/>'+
  '<path d="M'+x+','+(y-h)+' Q'+(x+14)+','+(y-h-5)+' '+(x+26)+','+(y-h+2)+' Q'+(x+14)+','+(y-h+7)+' '+x+','+(y-h+13)+'Z" fill="'+(p.bp?'none':c||p.flag)+'"'+S(p)+'/>'}
function coral(p,x,y,s,c){if(p.bp)return '';var d='M'+x+','+y+' L'+x+','+(y-26*s)+' M'+x+','+(y-12*s)+' Q'+(x-12*s)+','+(y-16*s)+' '+(x-13*s)+','+(y-30*s)+' M'+x+','+(y-18*s)+' Q'+(x+11*s)+','+(y-20*s)+' '+(x+12*s)+','+(y-34*s)+' M'+x+','+(y-26*s)+' L'+(x-3*s)+','+(y-38*s);
  return '<path d="'+d+'" fill="none" stroke="'+OUT+'" stroke-width="'+(9*s+3)+'" stroke-linecap="round"/><path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+9*s+'" stroke-linecap="round"/>'}
function kelp(p,x,y,h){if(p.bp)return '';var d='M'+x+','+y+' C'+(x-9)+','+(y-h*.3)+' '+(x+9)+','+(y-h*.6)+' '+(x-2)+','+(y-h);
  return '<path d="'+d+'" fill="none" stroke="'+OUT+'" stroke-width="9" stroke-linecap="round"/><path d="'+d+'" fill="none" stroke="'+p.kelp+'" stroke-width="5.5" stroke-linecap="round"/>'}
function stones(p,cx,cy,a,h){if(p.bp)return '';var s='',b=a/2,i;/* 돌 줄눈 */
  for(i=1;i<4;i++){var t=i/4;s+='<path d="M'+(cx-a+a*t)+','+(cy-h+b*t)+' L'+(cx-a+a*t)+','+(cy+b*t)+'" stroke="'+OUT+'" stroke-width="1.2" opacity=".25"/>';
    s+='<path d="M'+(cx+a*t)+','+(cy+b-h-b*t)+' L'+(cx+a*t)+','+(cy+b-b*t)+'" stroke="'+OUT+'" stroke-width="1.2" opacity=".25"/>'}return s}
function steps(p,cx,cy,hb){var s='';for(var i=0;i<3;i++){var w=26-i*0,y=cy+hb*.55-i*hb/3;s+='<path d="M'+(cx+30-i*6)+','+(y+4)+' l'+w+',-13 l8,4 l-'+w+',13Z" fill="'+(p.bp?p.flat:p.stoneL)+'"'+S(p)+'/>'}return s}

