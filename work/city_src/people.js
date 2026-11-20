/* ===== 40차 주민 눌러 보기: 길을 걷는 주민을 누르면 이름 · 집 · 일터 · 기분 · 한마디 =====
   - 이름은 집 · 일터 짝으로 정해짐(같은 짝이면 같은 물고기). 언어마다 이름 목록이 따로
   - 한마디는 지금 마을 사정(사건 · 탁한 물 · 경단 · 옷 · 인구 한도 · 장터 · 정책 · 땅값 · 행복)에서 고름 → 플레이어가 문제를 알아채는 길
   - 누르면 그 주민이 잠깐 멈춰 💬, '집 보기'로 카메라 이동. 사용 기록 talk */
var PNAME={ko:['뽀글이','방울이','지느','말랑이','반짝이','통통이','살랑이','몽글이','짭짤이','보글이','동글이','파닥이','첨벙이','산들이','꼼지','토실이','송송이','데굴이','나풀이','쫑긋이'],
 en:['Bubbles','Fizz','Finn','Squishy','Sparkle','Chubby','Breezy','Puffy','Salty','Bloop','Roundy','Flappy','Splash','Gilly','Wiggle','Plump','Speckle','Tumble','Flutter','Pebble'],
 ja:['ぷくぷく','しずく','ひれまる','もちもち','きらり','まるまる','そよぎ','もこもこ','しおみ','ぽこぽこ','ころん','ぱたぱた','ちゃぷん','そよかぜ','ちょこ','ぷっくり','てんてん','ころころ','ひらり','ぴこ'],
 es:['Burbujas','Chispa','Aleta','Blandito','Brillo','Gordito','Brisa','Esponjoso','Salado','Glup','Redondo','Aletea','Chapuzón','Agallín','Meneíto','Rellenito','Pecas','Volteretas','Revoloteo','Guijarro'],
 vi:['Bọt Bọt','Giọt Nước','Vây Nhỏ','Mềm Mềm','Lấp Lánh','Tròn Trịa','Gió Nhẹ','Phồng Phồng','Mặn Mòi','Lục Bục','Tròn Xoe','Vẫy Vẫy','Tõm Tõm','Mang Nhỏ','Ngúng Nguẩy','Mũm Mĩm','Lốm Đốm','Lăn Lăn','Phấp Phới','Sỏi Nhỏ']};
var _newWalkerP=newWalker;newWalker=function(a,b){var n=WALK.length;var r=_newWalkerP.apply(this,arguments);if(WALK.length>n){var f=WALK[WALK.length-1];f.fr=a;f.to=b}return r};
function pHome(f){var a=f.fr,b=f.to;if(a&&isZ(a.k)&&a.k.charAt(1)==='R')return [a,b];if(b&&isZ(b.k)&&b.k.charAt(1)==='R')return [b,a];return [a,b]}
function pName(f){var hw=pHome(f),s=((hw[0]&&hw[0].id)|0)*131+((hw[1]&&hw[1].id)|0)*17+(G.seed|0),L=PNAME[window.CITY_LANG]||PNAME.ko;return L[(s>>>0)%L.length]}
function pHit(x,y){var best=null,bd=1e9;WALK.forEach(function(f){if(f.st||!f.p)return;var q=walkerPos(f),p=sc(q.i,q.j),z=cam.z;if(z<.4)return;var dx=x-p.x,dy=y-(p.y-24*z);if(Math.abs(dx)<Math.max(16,14*z)&&Math.abs(dy)<Math.max(22,24*z)){var d=dx*dx+dy*dy;if(d<bd){bd=d;best=f}}});return best}
function pSay(f,home){var t=[],L=hallLv();
  if(home&&home.inc&&INCT[home.inc.k])t.push({ko:{shark:'우리 집 앞에 상어가 왔어요! 무서워서 못 들어가요',cold:'콜록… 우리 동네에 감기가 돌아요',vent:'바닥에서 뜨거운 물이 나와요!',tide:'붉은 물 때문에 숨쉬기 힘들어요'}[home.inc.k],w:9});
  var mk=home?murkAt(home.x,home.y):0;if(mk>=30)t.push({ko:'물이 너무 탁해서 아가미가 따끔해요… 물 거르개가 있으면 좋겠어요',w:7});else if(mk>=15)t.push({ko:'요즘 물이 좀 뿌옇네요',w:3});
  if(!CS.food)t.push({ko:'배고파요… 장터에 경단이 없대요',w:8});if(CS.clothOn&&!CS.cloth)t.push({ko:'옷이 다 해졌어요. 새 옷 사고 싶어요',w:6});
  if(CS.pop>=CS.lim)t.push({ko:'친구들이 이사 오고 싶어 하는데 마을이 꽉 찼대요',w:4});if(CS.dem&&CS.dem.C>.3)t.push({ko:'장 볼 가게가 모자라요. 줄이 너무 길어요',w:4});
  if(CS.dem&&CS.dem.R>.3)t.push({ko:'일자리는 많은데 살 집이 모자라요',w:3});
  if(polOn('fest'))t.push({ko:'바다 축제의 밤 최고! 매일 했으면 좋겠어요',w:3});if(polOn('early'))t.push({ko:'아침 일찍 나오니까 졸려요… 하암',w:3});if(polOn('night'))t.push({ko:'게 일꾼들이 밤새 망치질해요. 쿵쿵!',w:2});if(polOn('lamp'))t.push({ko:'밤에도 길이 환해서 좋아요',w:2});
  if(home&&landVal(home.x,home.y)>=66)t.push({ko:'우리 동네 땅값이 많이 올랐대요!',w:2});
  if(CS.happy>=85)t.push({ko:'아가미시티에 살아서 행복해요!',w:3});else if(CS.happy<50)t.push({ko:'요즘 마을 분위기가 좀 가라앉았어요',w:4});
  if(L>=12&&!bOf('aqua'))t.push({ko:'수족관이 생기면 구경 가고 싶어요',w:1});
  ['오늘도 열심히 헤엄쳐요!','산호궁이 정말 멋져요','거북 택배가 언제 오려나','다시마 냄새가 좋아요','주말엔 친구랑 산책할 거예요'].forEach(function(s){t.push({ko:s,w:1})});
  var mx=0;t.forEach(function(q){if(q.w>mx)mx=q.w});var top=t.filter(function(q){return q.w>=Math.min(mx,4)}),pick=top[((f.ph*1000)|0)%top.length];return pick.ko}
function pMood(home){var v=CS.happy-(home?murkAt(home.x,home.y)*.5:0)-(home&&home.inc?25:0);return v>=80?'😄 아주 좋아요':v>=60?'🙂 좋아요':v>=40?'😐 그저 그래요':'😟 안 좋아요'}
function pPanel(f){var hw=pHome(f),home=hw[0]&&isZ(hw[0].k)&&hw[0].k.charAt(1)==='R'?hw[0]:null,work=hw[1],el=$('panel');f.wait=Math.max(f.wait||0,5);f.emo='💬';
  var h='<button class="x" id="pX">✕</button><h2><span class="pdot" style="background:'+f.c+'"></span>'+pName(f)+'</h2><div class="box">'+
   '🏠 집: '+(home?NM(home.k)+' Lv.'+home.lv:'—')+'<br>💼 일터: '+(work&&work!==home?NM(work.k):'—')+'<br>기분: <b>'+pMood(home)+'</b></div>'+
   '<div class="say">“'+pSay(f,home)+'”</div><div class="row">'+(home?'<button class="sub" id="pHm">🏠 집 보기</button>':'')+(work&&work!==home?'<button class="sub" id="pWk">💼 일터 보기</button>':'')+'</div>';
  el.innerHTML=h;el.hidden=false;panelFor=null;$('pX').onclick=closePanel;if($('pHm'))$('pHm').onclick=function(){closePanel();focus(home);SEL=home};if($('pWk'))$('pWk').onclick=function(){closePanel();focus(work);SEL=work};snd('pop');gfEv('talk')}
var _tapP=tap;tap=function(x,y){if(!TOOL&&!GH){var f=pHit(x,y);if(f){pPanel(f);return}}return _tapP.apply(this,arguments)};
(function(){var st=document.createElement('style');st.textContent='.pdot{display:inline-block;width:16px;height:16px;border-radius:8px;border:2px solid var(--ink);margin-right:7px;vertical-align:-2px}.say{margin:8px 2px;padding:10px 12px;border:2px solid var(--ink);border-radius:14px 14px 14px 4px;background:#fffdf0;font-size:14.5px;line-height:1.45;word-break:keep-all}';document.head.appendChild(st)})();
window.__people={n:function(){return WALK.filter(function(f){return !f.st&&f.fr}).length},open:function(){var f=WALK.filter(function(f){return !f.st&&f.fr})[0];if(f)pPanel(f);return f?pName(f):null},pos:function(){var f=WALK.filter(function(f){return !f.st&&f.fr})[0];if(!f)return null;var q=walkerPos(f),p=sc(q.i,q.j);return {x:p.x,y:p.y-24*cam.z}}};
