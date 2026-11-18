/* 건물 그림 17종 — 같은 그림체(외곽선 · 면 밝기 3단 · 그라데이션). 좌표: 땅 중심(GX,GY), 1칸 반폭 48 */
function sp(p,c){return p.bp?p.flat||'none':c}
function star(p,x,y,r,c){var d='';for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;d+=(i?'L':'M')+(x+Math.cos(a)*rr).toFixed(1)+','+(y+Math.sin(a)*rr).toFixed(1)}return '<path d="'+d+'Z" fill="'+sp(p,c)+'"'+S(p)+'/>'}
function sign(p,x,y,w,h,c,txt){return '<rect x="'+(x-w/2)+'" y="'+(y-h/2)+'" width="'+w+'" height="'+h+'" rx="5" fill="'+sp(p,c)+'"'+S(p)+'/>'+(p.bp||!txt?'':'<text x="'+x+'" y="'+(y+h*.22)+'" font-size="'+h*.62+'" text-anchor="middle" font-family="sans-serif">'+txt+'</text>')}
function plat(p,a,h,c){return box(p,GX,GY,a,h,sp(p,c[0]),sp(p,c[1]),sp(p,c[2]))}
var STONE=['#f6f9fd','#e2eaf5','#bccbe0'],SAND=['#f7ecd6','#ead8b8','#cdb58f'],SOIL=['#b98b62','#9e734f','#7d583b'];
function bubblesUp(p,x,y,n){if(p.bp)return '';var s='';for(var i=0;i<n;i++)s+='<circle cx="'+(x+(i%2?5:-3))+'" cy="'+(y-i*12)+'" r="'+(3+i)+'" fill="none" stroke="#e8fbff" stroke-width="1.8" opacity=".85"/>';return s}
function lvlDeco(p,L,x,y){var s='';if(L>=10)s+=flag(p,x,y,22,L>=20?'#ffd54a':'#ff5d5d');if(L>=15&&!p.bp)s+='<circle cx="'+x+'" cy="'+(y-26)+'" r="14" fill="url(#gGlow)"/>';return s}
var ART_B={
 pump:function(p,L){var cx=GX,cy=GY,h=46+L*1.2,g=plat(p,40,10,STONE);var y=cy-10;
   g+=cyl(p,cx,y,18,h,sp(p,'url(#gTeal)'))+bands(p,cx,y,18,h,2);
   g+='<rect x="'+(cx-9)+'" y="'+(y-h+8)+'" width="18" height="'+(h-18)+'" rx="8" fill="'+sp(p,'rgba(220,250,255,.75)')+'"'+S(p)+'/>'+bubblesUp(p,cx,y-14,3);
   g+=cone(p,cx,y-h,22,18,sp(p,'url(#gTeal)'));if(L>=10)g+=bubblesUp(p,cx+2,y-h-22,3);return {svg:g,top:y-h-40}},
 quarry:function(p,L){var cx=GX,cy=GY,g=plat(p,90,8,SAND),y=cy-8,s='';
   [[-34,6,30],[18,10,34],[-6,-18,38],[30,-14,24]].forEach(function(r){g+='<ellipse cx="'+(cx+r[0])+'" cy="'+(y+r[1]-r[2]*.35)+'" rx="'+r[2]+'" ry="'+r[2]*.62+'" fill="'+sp(p,'#9fb2c2')+'"'+S(p)+'/>'+(p.bp?'':'<ellipse cx="'+(cx+r[0]-r[2]*.3)+'" cy="'+(y+r[1]-r[2]*.55)+'" rx="'+r[2]*.35+'" ry="'+r[2]*.18+'" fill="#d6e2ea"/>')});
   for(var i=0;i<Math.min(6,2+L/4);i++){var x=cx-40+i*16,yy=y-30-(i%2)*14;g+='<path d="M'+(x-6)+','+yy+' L'+x+','+(yy-18-L*.4)+' L'+(x+6)+','+yy+'Z" fill="'+sp(p,i%2?'#ff8fb1':'#ffb3c6')+'"'+S(p)+'/>'}
   g+='<path d="M'+(cx+44)+','+(y+12)+' L'+(cx+44)+','+(y-52)+' L'+(cx+70)+','+(y-40)+'" fill="none" stroke="'+OUT+'" stroke-width="7"/><path d="M'+(cx+44)+','+(y+12)+' L'+(cx+44)+','+(y-52)+' L'+(cx+70)+','+(y-40)+'" fill="none" stroke="'+sp(p,'#d9995a')+'" stroke-width="4"/>';
   if(L>=10)g+='<rect x="'+(cx+58)+'" y="'+(y-38)+'" width="16" height="12" rx="2" fill="'+sp(p,'#9aa6b8')+'"'+S(p)+'/>';
   g+=lvlDeco(p,L,cx-60,y-6);return {svg:g,top:y-80}},
 farm:function(p,L){var cx=GX,cy=GY,g=plat(p,90,6,SOIL),y=cy-6,rows=3+Math.min(3,L/6|0);
   for(var r=0;r<rows;r++)for(var c=0;c<4;c++){var u=(c+.5)/4,v=(r+.5)/rows,x=cx+(u-v)*90,yy=y+(u+v-1)*45,hh=16+L*.6;
     if(!p.bp)g+='<path d="M'+x+','+yy+' C'+(x-6)+','+(yy-hh*.4)+' '+(x+6)+','+(yy-hh*.7)+' '+(x-1)+','+(yy-hh)+'" fill="none" stroke="'+OUT+'" stroke-width="7" stroke-linecap="round"/><path d="M'+x+','+yy+' C'+(x-6)+','+(yy-hh*.4)+' '+(x+6)+','+(yy-hh*.7)+' '+(x-1)+','+(yy-hh)+'" fill="none" stroke="'+(c%2?'#4fc06e':'#3aa95f')+'" stroke-width="4" stroke-linecap="round"/>'}
   for(var f=0;f<5;f++){var t=f/4;g+='<rect x="'+(cx-90+t*90-2)+'" y="'+(y+t*45-16)+'" width="5" height="16" fill="'+sp(p,'#d9995a')+'"'+S(p)+'/>'}
   g+=lvlDeco(p,L,cx+80,y-4);return {svg:g,top:y-60}},
 crab:function(p,L){var cx=GX,cy=GY,g=plat(p,84,10,SAND),y=cy-10,a=60,h=46+L;g+=box(p,cx,y,a,h,sp(p,'#ffe6d6'),sp(p,'#ffc3a5'),sp(p,'#ec9878'));
   g+=faceR(cx,y,a,archWin(p,16,0,22,34).replace(p.win,sp(p,'#7a4a3a'))+roundWin(p,46,-h*.6,6))+faceL(cx,y,a,roundWin(p,18,-h*.55,7)+roundWin(p,42,-h*.55,7));
   g+=shellDome(p,cx,y-h,a*.8,48,9,sp(p,'url(#gRoof)'),'#9a2f2a');
   if(!p.bp)g+='<g transform="translate('+(cx-70)+','+(y+6)+')"><ellipse rx="13" ry="8" fill="#ff7a4d" stroke="'+OUT+'" stroke-width="2.4"/><circle cx="-5" cy="-11" r="3.5" fill="#fff" stroke="'+OUT+'" stroke-width="2"/><circle cx="5" cy="-11" r="3.5" fill="#fff" stroke="'+OUT+'" stroke-width="2"/></g>';
   g+=lvlDeco(p,L,cx+64,y);return {svg:g,top:y-h-60}},
 factory:function(p,L){var cx=GX,cy=GY,g=plat(p,90,8,STONE),y=cy-8,a=72,h=48+L;g+=cyl(p,cx+38,y-30,10,h+40,sp(p,'#c9d3e0'))+bubblesUp(p,cx+38,y-h-80,3);
   g+=box(p,cx,y,a,h,sp(p,'#eef3fb'),sp(p,'#d4dff0'),sp(p,'#a9bad3'));
   for(var i=0;i<3;i++){var t=i/3;g+='<path d="M'+(cx-a+a*t)+','+(y-h+a/2*t)+' l'+a/3+','+a/6+' l0,-22 Z" fill="'+sp(p,'#ff8fa3')+'"'+S(p)+'/>'}
   g+=faceR(cx,y,a,'<rect x="12" y="-30" width="26" height="30" fill="'+sp(p,'#7a8aa8')+'"'+S(p)+'/>'+roundWin(p,54,-h*.6,7));
   g+=sign(p,cx-36,y-h*.55+14,34,20,'#fff2f5','🍡');g+=lvlDeco(p,L,cx-70,y);return {svg:g,top:y-h-90}},
 store:function(p,L){var cx=GX,cy=GY,g=plat(p,88,8,STONE),y=cy-8,r=62+L*.6;
   g+='<path d="M'+(cx-r)+','+y+' C'+(cx-r)+','+(y-r*1.3)+' '+(cx+r)+','+(y-r*1.3)+' '+(cx+r)+','+y+' A'+r+','+(r/2)+' 0 0 1 '+(cx-r)+','+y+'Z" fill="'+sp(p,'url(#gPink)')+'"'+S(p)+'/>';
   if(!p.bp)for(var i=1;i<8;i++){var t=i/8,x=cx-r+2*r*t;g+='<path d="M'+x+','+(y+Math.sin(Math.PI*t)*r*.46)+' Q'+(cx+(x-cx)*.6)+','+(y-r*.7)+' '+cx+','+(y-r*.92)+'" fill="none" stroke="#b04a66" stroke-width="1.6" opacity=".5"/>'}
   g+='<path d="M'+(cx-14)+','+(y+r*.48)+' L'+(cx-14)+','+(y+r*.48-36)+' A14,14 0 0 1 '+(cx+14)+','+(y+r*.48-36)+' L'+(cx+14)+','+(y+r*.48)+'Z" fill="'+sp(p,'#7a4a3a')+'"'+S(p)+'/>';
   [[-70,18],[-56,26],[62,22]].forEach(function(c){g+=box(p,cx+c[0],y+c[1],12,18,sp(p,'#e9b67c'),sp(p,'#d39a5a'),sp(p,'#b37b3e'))});
   g+=lvlDeco(p,L,cx+r-6,y-r*.4);return {svg:g,top:y-r*1.1-30}},
 turtle:function(p,L){var cx=GX,cy=GY,g=plat(p,86,8,SAND),y=cy-8,r=58+L*.5;
   g+='<path d="M'+(cx-r)+','+(y-10)+' C'+(cx-r)+','+(y-r*1.1)+' '+(cx+r)+','+(y-r*1.1)+' '+(cx+r)+','+(y-10)+' A'+r+','+(r/2)+' 0 0 1 '+(cx-r)+','+(y-10)+'Z" fill="'+sp(p,'#5fbf72')+'"'+S(p)+'/>';
   if(!p.bp)[[0,-r*.55],[-r*.45,-r*.3],[r*.45,-r*.3],[-r*.2,-r*.05+4],[r*.2,-r*.05+4]].forEach(function(h){g+='<path d="M'+(cx+h[0]-12)+','+(y+h[1])+' l6,-10 h12 l6,10 l-6,10 h-12Z" fill="#8fdc8f" stroke="#2f7d45" stroke-width="2"/>'});
   [-r*.8,r*.8].forEach(function(dx){g+='<rect x="'+(cx+dx-4)+'" y="'+(y-14)+'" width="8" height="18" fill="'+sp(p,'#d9995a')+'"'+S(p)+'/>'});
   [[-40,30],[-24,38],[40,30]].forEach(function(c){g+=box(p,cx+c[0],y+c[1],11,14,sp(p,'#f3d2a8'),sp(p,'#ddb27f'),sp(p,'#bb8b57'))});
   g+=sign(p,cx+70,y-30,30,20,'#fffdf7','🐢');g+=lvlDeco(p,L,cx-72,y);return {svg:g,top:y-r*.9-40}},
 diner:function(p,L){var cx=GX,cy=GY,g=plat(p,86,8,STONE),y=cy-8,a=64,h=44+L;g+=box(p,cx,y,a,h,sp(p,'#fff5e8'),sp(p,'#ffe0bf'),sp(p,'#f0b98a'));
   g+=faceL(cx,y,a,'<path d="M0,-'+(h-8)+' L'+a+',-'+(h-8)+' L'+a+',-'+(h-22)+' L0,-'+(h-22)+'Z" fill="'+sp(p,'#ff7d8f')+'"'+S(p)+'/>'+roundWin(p,20,-18,7)+roundWin(p,44,-18,7))+faceR(cx,y,a,archWin(p,20,0,22,32).replace(p.win,sp(p,'#7a4a3a')));
   if(!p.bp)for(var i=0;i<9;i++){var t=i/8,x=cx-a*.8+a*1.6*t,yy=y-h-6+Math.sin(Math.PI*t)*10;g+='<path d="M'+x+','+yy+' q-6,-18 2,-30" fill="none" stroke="'+OUT+'" stroke-width="9" stroke-linecap="round"/><path d="M'+x+','+yy+' q-6,-18 2,-30" fill="none" stroke="'+(i%2?'#c58cff':'#a66ef0')+'" stroke-width="5.5" stroke-linecap="round"/>'}
   g+=lvlDeco(p,L,cx+70,y);return {svg:g,top:y-h-50}},
 sew:function(p,L){var cx=GX,cy=GY,g=plat(p,84,8,STONE),y=cy-8,a=62,h=46+L;g+=box(p,cx,y,a,h,sp(p,'#e8d4b8'),sp(p,'#d8bb94'),sp(p,'#b8956a'));
   g+=faceR(cx,y,a,archWin(p,18,0,22,32).replace(p.win,sp(p,'#7a4a3a'))+roundWin(p,48,-h*.6,6))+faceL(cx,y,a,'<rect x="14" y="-'+(h*.7)+'" width="34" height="'+(h*.38)+'" rx="4" fill="'+sp(p,'#3f6fa8')+'"'+S(p)+'/>');
   g+=cone(p,cx,y-h,a*.9,34,sp(p,'#3fae6a'));g+=cyl(p,cx-64,y+16,10,20,sp(p,'#3fae6a'))+sign(p,cx+62,y-h*.6,28,20,'#fffdf7','👕');g+=lvlDeco(p,L,cx-70,y-20);return {svg:g,top:y-h-50}},
 school:function(p,L){var cx=GX,cy=GY,g=plat(p,88,8,STONE),y=cy-8,a=68,h=52+L;g+=box(p,cx,y,a,h,sp(p,'#fff4c9'),sp(p,'#ffe28a'),sp(p,'#e8b94a'));
   g+=faceL(cx,y,a,roundWin(p,16,-h*.55,6)+roundWin(p,34,-h*.55,6)+roundWin(p,52,-h*.55,6))+faceR(cx,y,a,archWin(p,18,0,24,34).replace(p.win,sp(p,'#7a4a3a'))+roundWin(p,52,-h*.55,6));
   g+=cyl(p,cx,y-h+6,16,30,sp(p,'#fff4c9'))+'<circle cx="'+cx+'" cy="'+(y-h-12)+'" r="9" fill="'+sp(p,'#fff')+'"'+S(p)+'/>'+(p.bp?'':'<path d="M'+cx+','+(y-h-12)+' l0,-6 M'+cx+','+(y-h-12)+' l5,2" stroke="'+OUT+'" stroke-width="2"/>')+cone(p,cx,y-h-24,20,30,sp(p,'#4f8fdc'));
   g+=lvlDeco(p,L,cx+70,y);return {svg:g,top:y-h-70}},
 kiln:function(p,L){var cx=GX,cy=GY,g=plat(p,86,8,STONE),y=cy-8,r=50+L*.6;g+=cyl(p,cx+30,y-24,10,r+30,sp(p,'#c9785a'))+bubblesUp(p,cx+30,y-r-66,3);
   g+='<path d="M'+(cx-r)+','+y+' C'+(cx-r)+','+(y-r*1.2)+' '+(cx+r)+','+(y-r*1.2)+' '+(cx+r)+','+y+' A'+r+','+(r/2)+' 0 0 1 '+(cx-r)+','+y+'Z" fill="'+sp(p,'#e2876b')+'"'+S(p)+'/>';
   if(!p.bp)for(var i=1;i<4;i++)g+='<path d="M'+(cx-r*.95)+','+(y-r*.22*i)+' Q'+cx+','+(y-r*.22*i+r*.25)+' '+(cx+r*.95)+','+(y-r*.22*i)+'" fill="none" stroke="#9a4b37" stroke-width="1.5" opacity=".5"/>';
   g+='<path d="M'+(cx-14)+','+(y+r*.46)+' L'+(cx-14)+','+(y+r*.46-22)+' A14,14 0 0 1 '+(cx+14)+','+(y+r*.46-22)+' L'+(cx+14)+','+(y+r*.46)+'Z" fill="'+sp(p,'#ffb347')+'"'+S(p)+'/>';
   for(var j=0;j<3;j++)g+=box(p,cx-62+j*8,y+22-j*4,12,8,sp(p,'#f0a088'),sp(p,'#d77c64'),sp(p,'#b25e4a'));g+=lvlDeco(p,L,cx+70,y);return {svg:g,top:y-r-80}},
 pearl:function(p,L){var cx=GX,cy=GY,g=plat(p,90,8,STONE),y=cy-8;
   g+='<path d="M'+cx+','+(y-36)+' L'+(cx+72)+','+y+' L'+cx+','+(y+36)+' L'+(cx-72)+','+y+'Z" fill="'+sp(p,'#6fd0e8')+'"'+S(p)+'/>';
   [[-30,0],[10,-14],[24,12],[-6,18]].forEach(function(c,i){if(i>1+L/6)return;var x=cx+c[0],yy=y+c[1];g+='<path d="M'+(x-13)+','+yy+' Q'+x+','+(yy+10)+' '+(x+13)+','+yy+'Z" fill="'+sp(p,'#ffd9e4')+'"'+S(p)+'/><path d="M'+(x-13)+','+yy+' Q'+x+','+(yy-20)+' '+(x+13)+','+yy+'" fill="'+sp(p,'#ffc4d6')+'"'+S(p)+'/>'+pearl(p,x,yy-3,4.5,L>=15)});
   g+=box(p,cx+66,y-10,20,30,sp(p,'#fff3f6'),sp(p,'#ffd7e0'),sp(p,'#f0a3b5'))+shellDome(p,cx+66,y-40,20,18,5);g+=lvlDeco(p,L,cx-76,y);return {svg:g,top:y-90}},
 train:function(p,L){var cx=GX,cy=GY,g=plat(p,90,8,STONE),y=cy-8;
   g+='<path d="M'+(cx-80)+','+(y+16)+' L'+(cx+16)+','+(y-32)+' M'+(cx-64)+','+(y+24)+' L'+(cx+32)+','+(y-24)+'" stroke="'+sp(p,'#8a97ab')+'" stroke-width="4"/>';
   g+=box(p,cx-30,y-4,26,22,sp(p,'#ffe58a'),sp(p,'#ffd04a'),sp(p,'#e3a51b'))+faceR(cx-30,y-4,26,roundWin(p,8,-12,5)+roundWin(p,18,-12,5));
   g+=box(p,cx+34,y+6,40,10,sp(p,'#f6f9fd'),sp(p,'#e2eaf5'),sp(p,'#bccbe0'));
   [[10,-4],[58,20],[34,-16],[74,8]].forEach(function(q){g+='<rect x="'+(cx+q[0]-3)+'" y="'+(y+q[1]-50)+'" width="6" height="50" fill="'+sp(p,'#d9995a')+'"'+S(p)+'/>'});
   g+='<path d="M'+(cx-6)+','+(y-54)+' L'+(cx+42)+','+(y-78)+' L'+(cx+92)+','+(y-52)+' L'+(cx+44)+','+(y-28)+'Z" fill="'+sp(p,'#4fc6c9')+'"'+S(p)+'/>';
   g+=sign(p,cx+44,y-86,40,18,'#fffdf7','🚋');g+=lvlDeco(p,L,cx-76,y+6);return {svg:g,top:y-110}},
 clinic:function(p,L){var cx=GX,cy=GY,g=plat(p,88,8,STONE),y=cy-8,a=66,h=56+L;g+=box(p,cx,y,a,h,sp(p,'#ffffff'),sp(p,'#eef3fb'),sp(p,'#c9d6ea'));
   g+=faceL(cx,y,a,roundWin(p,18,-h*.5,7)+roundWin(p,46,-h*.5,7)+'<path d="M0,-'+(h-8)+' L'+a+',-'+(h-8)+'" stroke="'+sp(p,'#ff9f43')+'" stroke-width="4"/>')+faceR(cx,y,a,archWin(p,20,0,26,36).replace(p.win,sp(p,'#9ec9ff'))+roundWin(p,54,-h*.6,6));
   g+=star(p,cx,y-h-14,20,'#ff9f43');g+=lvlDeco(p,L,cx+70,y);return {svg:g,top:y-h-50}},
 aqua:function(p,L){var cx=GX,cy=GY,g=plat(p,92,12,STONE),y=cy-12,r=70+L*.5;
   g+='<path d="M'+(cx-r)+','+y+' C'+(cx-r)+','+(y-r*1.25)+' '+(cx+r)+','+(y-r*1.25)+' '+(cx+r)+','+y+' A'+r+','+(r/2)+' 0 0 1 '+(cx-r)+','+y+'Z" fill="'+sp(p,'rgba(150,225,255,.55)')+'"'+S(p)+'/>';
   if(!p.bp){[[-24,-40,'#ffb347'],[18,-62,'#ff7d8f'],[26,-26,'#ffd54a'],[-10,-80,'#7fd3ff']].forEach(function(f){g+='<path d="M'+(cx+f[0]-10)+','+(y+f[1])+' q10,-9 20,0 q-10,9 -20,0Z M'+(cx+f[0]+10)+','+(y+f[1])+' l7,-6 l0,12Z" fill="'+f[2]+'" stroke="'+OUT+'" stroke-width="1.8"/>'});
     g+='<path d="M'+(cx-r*.5)+','+(y-r*.75)+' Q'+(cx-r*.2)+','+(y-r*1.05)+' '+(cx+r*.15)+','+(y-r*.98)+'" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>'}
   g+=pearl(p,cx,y-r*.98,8,L>=15);g+=lvlDeco(p,L,cx+r,y-10);return {svg:g,top:y-r*1.1-30}},
 port:function(p,L){var cx=GX,cy=GY,g='';
   g+='<path d="M'+cx+','+(cy-44)+' L'+(cx+88)+','+cy+' L'+cx+','+(cy+44)+' L'+(cx-88)+','+cy+'Z" fill="'+sp(p,'#5fb7d6')+'"'+S(p)+'/>';
   g+=box(p,cx-36,cy-4,40,8,sp(p,'#e6b07a'),sp(p,'#d0955c'),sp(p,'#ad7442'));
   g+='<path d="M'+(cx+6)+','+(cy+10)+' q30,-30 66,-6 q8,6 -6,14 q-30,12 -60,-8Z" fill="'+sp(p,'#6f8fc9')+'"'+S(p)+'/>'+(p.bp?'':'<circle cx="'+(cx+58)+'" cy="'+(cy-2)+'" r="2.5" fill="'+OUT+'"/><path d="M'+(cx+34)+','+(cy-18)+' q-4,-14 6,-20 M'+(cx+34)+','+(cy-18)+' q6,-12 14,-10" stroke="#bff3ff" stroke-width="3" fill="none"/>');
   g+='<path d="M'+(cx-60)+','+(cy-8)+' L'+(cx-60)+','+(cy-92)+' L'+(cx-10)+','+(cy-74)+'" fill="none" stroke="'+OUT+'" stroke-width="8"/><path d="M'+(cx-60)+','+(cy-8)+' L'+(cx-60)+','+(cy-92)+' L'+(cx-10)+','+(cy-74)+'" fill="none" stroke="'+sp(p,'#ffd04a')+'" stroke-width="5"/><path d="M'+(cx-10)+','+(cy-74)+' L'+(cx-10)+','+(cy-46)+'" stroke="'+OUT+'" stroke-width="2"/>';
   g+=lvlDeco(p,L,cx+80,cy-10);return {svg:g,top:cy-120}},
 fire:function(p,L){var cx=GX,cy=GY,g=plat(p,86,8,STONE),y=cy-8,a=64,h=50+L;g+=cyl(p,cx-40,y-10,14,h+34,sp(p,'#ff8a7a'))+bands(p,cx-40,y-10,14,h+34,3)+cone(p,cx-40,y-h-44,18,22,sp(p,'url(#gGoldRoof)'));
   g+=box(p,cx+6,y,a,h,sp(p,'#fff1ee'),sp(p,'#ffc9bf'),sp(p,'#e8877a'))+faceR(cx+6,y,a,'<rect x="6" y="-34" width="26" height="34" rx="4" fill="'+sp(p,'#c43b3b')+'"'+S(p)+'/>'+(p.bp?'':'<path d="M8,-26 h22 M8,-18 h22 M8,-10 h22" stroke="#ff9a9a" stroke-width="2"/>')+'<rect x="36" y="-34" width="22" height="34" rx="4" fill="'+sp(p,'#c43b3b')+'"'+S(p)+'/>')+faceL(cx+6,y,a,roundWin(p,20,-h*.6,7)+roundWin(p,44,-h*.6,7));
   g+=box(p,cx+6,y-h,a*.98,6,sp(p,'#ff5d5d'),sp(p,'#e14a4a'),sp(p,'#b83434'))+bubblesUp(p,cx+20,y-h-14,3);g+=lvlDeco(p,L,cx+70,y);return {svg:g,top:y-h-80}},
 police:function(p,L){var cx=GX,cy=GY,g=plat(p,86,8,STONE),y=cy-8,a=64,h=52+L;g+=box(p,cx,y,a,h,sp(p,'#eef5ff'),sp(p,'#c9dcfa'),sp(p,'#8fb0e0'));
   g+=faceR(cx,y,a,archWin(p,16,0,24,34).replace(p.win,sp(p,'#7a4a3a'))+roundWin(p,50,-h*.6,6))+faceL(cx,y,a,roundWin(p,18,-h*.55,7)+roundWin(p,44,-h*.55,7)+'<path d="M0,-'+(h-8)+' L'+a+',-'+(h-8)+'" stroke="'+sp(p,'#3f6fd8')+'" stroke-width="5"/>');
   g+=box(p,cx,y-h,a*.6,14,sp(p,'#3f6fd8'),sp(p,'#335cc0'),sp(p,'#28489a'))+star(p,cx,y-h-30,15,'#ffd54a')+(p.bp?'':'<circle cx="'+(cx+26)+'" cy="'+(y-h-6)+'" r="5" fill="#ff5d5d" stroke="'+OUT+'" stroke-width="2"/><circle cx="'+(cx-26)+'" cy="'+(y-h-6)+'" r="5" fill="#4fa0ff" stroke="'+OUT+'" stroke-width="2"/>');g+=lvlDeco(p,L,cx+70,y);return {svg:g,top:y-h-60}},
 palace:function(p,L){var cx=GX,cy=GY,g=plat(p,138,16,['#f3eaff','#e0d0ff','#b9a0ef']),y=cy-16,a=96,h=58+L;
   g+=box(p,cx,y,a,h,sp(p,'#fdf6ff'),sp(p,'#ecdcff'),sp(p,'#c4a9f0'));
   g+=faceL(cx,y,a,archWin(p,14,-10,18,32)+archWin(p,42,-10,18,32)+archWin(p,70,-10,18,32))+faceR(cx,y,a,archWin(p,30,0,32,50).replace(p.win,sp(p,'#7a4a3a')));
   var y2=y-h;g+='<path d="M'+(cx-a-14)+','+y2+' L'+cx+','+(y2-a*.5-34)+' L'+(cx+a+14)+','+y2+' L'+cx+','+(y2+a*.5+4)+'Z" fill="'+sp(p,'url(#gGoldRoof)')+'"'+S(p)+'/>';
   g+=box(p,cx,y2-14,a*.62,40,sp(p,'#fdf6ff'),sp(p,'#ecdcff'),sp(p,'#c4a9f0'));var y3=y2-54;
   g+='<path d="M'+(cx-a*.75)+','+y3+' L'+cx+','+(y3-a*.42-26)+' L'+(cx+a*.75)+','+y3+' L'+cx+','+(y3+a*.37)+'Z" fill="'+sp(p,'url(#gGoldRoof)')+'"'+S(p)+'/>';
   g+=pearl(p,cx,y3-a*.42-34,12,true,'url(#gRainbow)')+coral(p,cx-130,cy+20,1,p.coralA)+coral(p,cx+130,cy+22,1,p.coralB);return {svg:g,top:y3-a*.42-70}}
};
function artFor(id,L,bp){var p=pal(bp);if(id==='hall')return palaceL(L,bp);return ART_B[id](p,L)}
