/* 구역 건물(1칸): 집 · 장터 · 공방 × 3단계 × 모양 3가지 */
var ZPAL=[['#fff3f6','#ffd7e0','#f0a3b5','url(#gRoof)'],['#eafcff','#c6eef5','#8fcbd8','url(#gTeal)'],['#fff8e0','#ffe7a8','#e8c070','url(#gPink)']];
function zArt(z,L,v,bp){var p=pal(bp),cx=GX,cy=GY,g='',c=ZPAL[v%3],a=34;
  g+=box(p,cx,cy,44,5,sp(p,'#f2f6fa'),sp(p,'#dde6f0'),sp(p,'#b9c8dc'));var y=cy-5;
  if(z==='R'){
    if(L===1){var h=30;g+=box(p,cx,y,a,h,sp(p,c[0]),sp(p,c[1]),sp(p,c[2]))+faceR(cx,y,a,archWin(p,8,0,11,18).replace(p.win,sp(p,'#7a4a3a'))+roundWin(p,25,-h*.55,4))+faceL(cx,y,a,roundWin(p,17,-h*.55,4.5));
      g+=shellDome(p,cx,y-h,a*.78,30,7,sp(p,c[3]),'#8a3a4a');return {svg:g,top:y-h-34}}
    if(L===2){var h2=54;g+=box(p,cx,y,a,h2,sp(p,c[0]),sp(p,c[1]),sp(p,c[2]))+faceR(cx,y,a,archWin(p,8,0,11,18).replace(p.win,sp(p,'#7a4a3a'))+roundWin(p,25,-h2*.35,4)+roundWin(p,10,-h2*.72,4)+roundWin(p,25,-h2*.72,4))+faceL(cx,y,a,roundWin(p,10,-h2*.35,4)+roundWin(p,24,-h2*.35,4)+roundWin(p,10,-h2*.72,4)+roundWin(p,24,-h2*.72,4));
      g+=cone(p,cx,y-h2,a*.95,30,sp(p,c[3]));if(!p.bp)g+='<path d="M'+(cx+18)+','+(y-h2-6)+' l0,-16" stroke="'+OUT+'" stroke-width="5"/><path d="M'+(cx+18)+','+(y-h2-6)+' l0,-16" stroke="#c9d3e0" stroke-width="2.6"/>';return {svg:g,top:y-h2-40}}
    var h3=86;g+=cyl(p,cx,y,a*.9,h3,sp(p,v%2?'url(#gTeal)':'url(#gPink)'))+bands(p,cx,y,a*.9,h3,3);
    for(var i=0;i<3;i++){g+=roundWin(p,cx-12,y-18-i*24,4)+roundWin(p,cx+12,y-18-i*24,4)}
    g+=shellDome(p,cx,y-h3,a*.95,34,9,sp(p,'url(#gGold)'))+(p.bp?'':'<circle cx="'+cx+'" cy="'+(y-h3-30)+'" r="4" fill="url(#gPearl)" stroke="'+OUT+'" stroke-width="2"/>');return {svg:g,top:y-h3-44}}
  if(z==='C'){var col=['#ff7d8f','#4f8fdc','#ffb347'][v%3];
    if(L===1){g+=box(p,cx,y,a*.9,22,sp(p,'#fff5e8'),sp(p,'#ffe0bf'),sp(p,'#f0b98a'));
      g+='<path d="M'+(cx-a)+','+(y-24)+' L'+cx+','+(y-24-a/2)+' L'+(cx+a)+','+(y-24)+' L'+(cx+a)+','+(y-12)+' L'+cx+','+(y-12+a/2-6)+' L'+(cx-a)+','+(y-12)+'Z" fill="'+sp(p,col)+'"'+S(p)+'/>';
      for(var k=0;k<4;k++)g+=pearl(p,cx-14+k*9,y-6+(k%2)*3,3.2,false,k%2?'#ffd54a':'#7fd3ff');return {svg:g,top:y-60}}
    if(L===2){var hc=44;g+=box(p,cx,y,a,hc,sp(p,'#fffaf0'),sp(p,'#ffe9c9'),sp(p,'#efc690'))+faceR(cx,y,a,'<rect x="4" y="-24" width="26" height="24" fill="'+sp(p,'#9ec9ff')+'"'+S(p)+'/>')+faceL(cx,y,a,'<path d="M0,-30 L'+a+',-30 L'+a+',-20 L0,-20Z" fill="'+sp(p,col)+'"'+S(p)+'/>');
      g+=box(p,cx,y-hc,a*.98,6,sp(p,col),sp(p,col),sp(p,col))+sign(p,cx,y-hc-14,34,16,'#fffdf7','🛍');return {svg:g,top:y-hc-40}}
    var hd=50;g+=cyl(p,cx,y,a,hd,sp(p,'#fffaf0'))+'<path d="M'+(cx-a)+','+(y-hd*.45)+' A'+a+','+(a/2)+' 0 0 0 '+(cx+a)+','+(y-hd*.45)+'" fill="none" stroke="'+sp(p,col)+'" stroke-width="7"/>';
    g+=shellDome(p,cx,y-hd,a,40,9,sp(p,'rgba(150,225,255,.7)'),'#3f7fa0')+sign(p,cx,y-hd-48,36,16,'#fffdf7','🛍');return {svg:g,top:y-hd-66}}
  /* 공방 */
  var wc=['#c9d3e0','#d8bb94','#b9e3c6'][v%3];
  if(L===1){g+=box(p,cx,y,a,26,sp(p,'#eef3fb'),sp(p,wc),sp(p,'#a9bad3'))+faceR(cx,y,a,'<rect x="6" y="-18" width="16" height="18" fill="'+sp(p,'#7a8aa8')+'"'+S(p)+'/>');
    g+='<path d="M'+(cx-a)+','+(y-26)+' L'+cx+','+(y-26-a/2-14)+' L'+(cx+a)+','+(y-26)+' L'+cx+','+(y-26+a/2)+'Z" fill="'+sp(p,'#ffb347')+'"'+S(p)+'/>';return {svg:g,top:y-80}}
  if(L===2){var hi=40;g+=cyl(p,cx+18,y-14,6,hi+30,sp(p,'#c9d3e0'))+bubblesUp(p,cx+18,y-hi-52,2)+box(p,cx,y,a,hi,sp(p,'#eef3fb'),sp(p,wc),sp(p,'#a9bad3'))+faceR(cx,y,a,'<rect x="6" y="-22" width="18" height="22" fill="'+sp(p,'#7a8aa8')+'"'+S(p)+'/>')+faceL(cx,y,a,roundWin(p,16,-hi*.6,5));
    for(var s2=0;s2<2;s2++){var t=s2/2;g+='<path d="M'+(cx-a+a*t)+','+(y-hi+a/2*t)+' l'+a/2+','+a/4+' l0,-14 Z" fill="'+sp(p,'#ffb347')+'"'+S(p)+'/>'}return {svg:g,top:y-hi-80}}
  var hj=58;g+=cyl(p,cx-16,y-16,7,hj+36,sp(p,'#c9d3e0'))+cyl(p,cx+16,y-16,7,hj+28,sp(p,'#c9d3e0'))+bubblesUp(p,cx-16,y-hj-60,3)+box(p,cx,y,a,hj,sp(p,'#eef3fb'),sp(p,wc),sp(p,'#a9bad3'));
  g+=faceR(cx,y,a,'<rect x="5" y="-26" width="22" height="26" fill="'+sp(p,'#7a8aa8')+'"'+S(p)+'/>'+roundWin(p,26,-hj*.7,4))+faceL(cx,y,a,roundWin(p,10,-hj*.6,4.5)+roundWin(p,24,-hj*.6,4.5))+box(p,cx,y-hj,a*.98,6,sp(p,'#ffb347'),sp(p,'#f09a2a'),sp(p,'#c97a14'));
  return {svg:g,top:y-hj-90}}
var _artFor=artFor;artFor=function(id,L,bp){if(id.charAt(0)==='z')return zArt(id.charAt(1),Math.max(1,Math.min(3,L)),+id.charAt(2)||0,bp);return _artFor(id,L,bp)};
