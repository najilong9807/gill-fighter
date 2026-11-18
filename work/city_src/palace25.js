/* 산호궁 Lv.1~25: 레벨마다 하나씩 더해지는 모습 */
function crenel(p,cx,cy,r){if(p.bp)return '';var s='';for(var i=0;i<5;i++){var t=i/4,x=cx-r+2*r*t,y=cy+Math.sin(Math.PI*t)*r/2*.9;s+='<rect x="'+(x-4)+'" y="'+(y-9)+'" width="8" height="9" rx="1.5" fill="#e9fffb"'+S(p)+'/>'}return s}
function jelly(p,x,y,c){if(p.bp)return '';return '<g transform="translate('+x+','+y+') scale(1.8) translate('+(-x)+','+(-y)+')"><circle cx="'+x+'" cy="'+y+'" r="16" fill="url(#gGlow)"/>'+
  '<path d="M'+(x-9)+','+y+' Q'+(x-9)+','+(y-13)+' '+x+','+(y-13)+' Q'+(x+9)+','+(y-13)+' '+(x+9)+','+y+'Z" fill="'+c+'"'+S(p)+'/>'+
  '<path d="M'+(x-5)+','+y+' q-2,7 1,12 M'+x+','+y+' q2,7 -1,13 M'+(x+5)+','+y+' q-2,7 1,11" fill="none" stroke="'+OUT+'" stroke-width="1.6"/></g>'}
function crown(p,cx,y,w){if(p.bp)return '';var d='M'+(cx-w)+','+y+' L'+(cx-w)+','+(y-12)+' L'+(cx-w/2)+','+(y-5)+' L'+cx+','+(y-18)+' L'+(cx+w/2)+','+(y-5)+' L'+(cx+w)+','+(y-12)+' L'+(cx+w)+','+y+'Z';
  return '<path d="'+d+'" fill="url(#gGoldRoof)"'+S(p)+'/>'+'<circle cx="'+cx+'" cy="'+(y-18)+'" r="3.5" fill="#ff6f8f"'+S(p)+'/>'}
function gate(p,cx,cy){if(p.bp)return '';var c='#ff8fa3',l=cx-34,r=cx+34;
  return '<path d="M'+l+','+cy+' L'+l+','+(cy-40)+' Q'+cx+','+(cy-78)+' '+r+','+(cy-40)+' L'+r+','+cy+'" fill="none" stroke="'+OUT+'" stroke-width="12" stroke-linecap="round"/>'+
    '<path d="M'+l+','+cy+' L'+l+','+(cy-40)+' Q'+cx+','+(cy-78)+' '+r+','+(cy-40)+' L'+r+','+cy+'" fill="none" stroke="'+c+'" stroke-width="7.5" stroke-linecap="round"/>'+
    '<circle cx="'+cx+'" cy="'+(cy-59)+'" r="5" fill="url(#gPearl)"'+S(p)+'/>'}
function tower(p,L,x,y,r,h,flagC){var g=cyl(p,x,y,r,h,p.teal);if(L>=16)g+=bands(p,x,y,r,h,3);
  g+=roundWin(p,x,y-h*.55,Math.max(5,r*.3));if(L>=13)g+=roundWin(p,x,y-h*.28,Math.max(5,r*.28));
  if(L>=9){var rf=L>=20?'url(#gGoldRoof)':null;g+=cone(p,x,y-h,r+5,r*2.2,rf);var tip=y-h-r*2.2;
    if(L>=22)g+=pearl(p,x,tip-4,5,L>=19);else if(L>=17)g+=flag(p,x,tip,24,flagC||'#ffd54a')}
  else g+=crenel(p,x,y-h,r);
  return g}
function palaceL(L,bp){var p=pal(bp),g='',cx=GX,cy=GY;if(L>=25&&!bp){p.wallT='#fdfaff';p.wallL='#efe6ff';p.wallR='#c9b6f0'}
  if(L>=25&&!bp)g+='<ellipse cx="'+cx+'" cy="'+(cy-190)+'" rx="170" ry="170" fill="url(#gGlow)" opacity=".55"/>';
  var baseA=L>=3?100+Math.min(L,22)*1.8:0,baseH=L>=3?10+L*.55:0;
  if(L>=6)g+=kelp(p,cx-150,cy+8,44+L)+kelp(p,cx+142,cy+10,40+L);
  if(L>=21)g+=box(p,cx,cy+10,baseA+22,10,p.bp?p.flat:'#e7f0f8',p.bp?p.flat:'#cfdcec',p.bp?p.flat:'#a9bbd3'); /* 바깥 테라스 */
  if(baseA)g+=box(p,cx,cy,baseA,baseH,p.stoneT,p.stoneL,p.stoneR)+stones(p,cx,cy,baseA,baseH);
  var y1=cy-baseH,ba=58+Math.min(L,20)*1.6,bh=50+L*1.4,th=74+L*3.4,tr=15+L*.35;
  /* 뒤 탑 */
  if(L>=12)g+=tower(p,L,cx,y1-ba*.62,tr-1,L>=23?th-40:th+26);
  if(L>=7)g+=tower(p,L,cx-ba-tr*.4,y1+2,tr,th,'#ff5d5d');
  /* 몸통 */
  g+=box(p,cx,y1,ba,bh,p.wallT,p.wallL,p.wallR);
  var trim=L>=11?(p.bp?p.out:'#ffcf3f'):(p.bp?p.out:'#e58aa0');
  var fl='',fr='';
  if(L>=4){fl+=roundWin(p,ba*.3,-bh*.6,7+L*.1)+roundWin(p,ba*.66,-bh*.6,7+L*.1)}
  if(L>=13){fl='';var n=3;for(var i=0;i<n;i++)fl+=archWin(p,ba*(.12+i*.28),-10,ba*.17,bh*.42);fl+=roundWin(p,ba*.3,-bh*.75,7)+roundWin(p,ba*.66,-bh*.75,7)}
  fl+='<path d="M0,'+(-bh+8)+' L'+ba+','+(-bh+8)+'" stroke="'+trim+'" stroke-width="'+(L>=11?4:3)+'"/>';
  var dw=Math.min(40,22+L*.8),dh=Math.min(62,36+L*1.2);
  fr+=archWin(p,ba*.28,0,dw,dh).replace(p.win,p.bp?p.win:p.door);
  if(L>=4)fr+=roundWin(p,ba*.78,-bh*.55,6+L*.1);
  if(L>=13)fr+=archWin(p,ba*.74,-12,ba*.14,bh*.38);
  fr+='<path d="M0,'+(-bh+8)+' L'+ba+','+(-bh+8)+'" stroke="'+(L>=11?(p.bp?p.out:'#e0a91f'):(p.bp?p.out:'#d47790'))+'" stroke-width="'+(L>=11?4:3)+'"/>';
  g+=faceL(cx,y1,ba,fl)+faceR(cx,y1,ba,fr);
  if(L>=6)g+=steps(p,cx,y1,baseH||12);
  var top=y1-bh,da=ba;
  /* 2층 */
  if(L>=14){var ua=ba*.68,uh=34+(L-14)*2.2;g+=box(p,cx,top,ua,uh,p.wallT,p.wallL,p.wallR);
    g+=faceL(cx,top,ua,roundWin(p,ua*.3,-uh*.5,7)+roundWin(p,ua*.68,-uh*.5,7))+faceR(cx,top,ua,roundWin(p,ua*.3,-uh*.5,7)+roundWin(p,ua*.68,-uh*.5,7));top-=uh;da=ua}
  /* 앞 오른쪽 탑 */
  if(L>=8)g+=tower(p,L,cx+ba+tr*.4,y1+2,tr,th,'#ff5d5d');
  /* 지붕 · 돔 */
  var dr=L<5?ba*.62:da*(L>=15?.86:.72),dh2=L<5?dr*.8:dr*1.15;
  g+=shellDome(p,cx,top,dr,dh2,L<5?7:11,L<5?'url(#gPink)':null,L<5?'#b04a66':null);
  var peak=top-dh2*.8;
  if(L>=23){g+=cyl(p,cx,peak+10,14,24,p.teal)+roundWin(p,cx,peak-2,5)+cone(p,cx,peak-14,18,30,'url(#gGoldRoof)');peak-=44}
  if(L>=25)g+=crown(p,cx,peak+4,22);
  if(L>=10)g+=pearl(p,cx,peak-(L>=25?20:6),L>=25?12:8+Math.min(L,20)*.15,L>=19,L>=25?'url(#gRainbow)':null);
  else if(L>=2)g+=flag(p,cx,peak+4,28);
  /* 앞 장식 */
  if(L>=4){g+=coral(p,cx-baseA*.82-10,cy+20,.8+L*.012,p.coralA)+coral(p,cx+baseA*.82+8,cy+22,.75+L*.012,p.coralB)}
  if(L>=12){g+=coral(p,cx-60,cy+56,.7,p.coralB)+coral(p,cx+66,cy+58,.7,p.coralA)}
  if(L>=18)g+=gate(p,cx,cy+(baseA/2)+10);
  if(L>=24){g+=jelly(p,cx-ba-40,top-20,'#ffc3ec')+jelly(p,cx+ba+42,top-40,'#c3ecff')+jelly(p,cx-74,top-dh2-70,'#fff0a8')}
  if(L>=25&&!bp)for(var k=0;k<8;k++){var a=k/8*Math.PI*2,rx=cx+Math.cos(a)*120,ry=top-40+Math.sin(a)*40;g+='<path d="M'+rx+','+(ry-6)+' Q'+rx+','+ry+' '+(rx+6)+','+ry+' Q'+rx+','+ry+' '+rx+','+(ry+6)+' Q'+rx+','+ry+' '+(rx-6)+','+ry+' Q'+rx+','+ry+' '+rx+','+(ry-6)+'Z" fill="#fff6c0"/>'}
  return {svg:g,top:Math.min(peak-40,top-th)}}
