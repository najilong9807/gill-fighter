/* ===== 1.1.30 늑구 '수족관 비중도 작아지지 않게' ① 물고기 이야기
   - 💗 물고기 친구 목록에서 물고기를 누르면 '📖 ○○ 이야기' — 하트(♥1~♥5)마다 한 장씩 열리는 그 물고기만의 이야기 5장
   - 글은 물고기 자랑(trait) · 특기(skill) · 크기 · 단짝(♥3 이상 다른 물고기) · 수족관에 놓은 소품 · 놀아 준 횟수 · 마을 나들이에서 쓰다듬은 횟수로 채움
   - 새 장이 열리면 목록에 '📖 새 이야기', 하트가 오를 때 알림 아래 줄에도. 5개 언어 ===== */
(function(){
var SL=(typeof SUBL==='string'&&SUBL)||LANG||'ko';if(!{ko:1,en:1,ja:1,es:1,vi:1}[SL])SL='en';
function J(w,a,b){return SL==='ko'?w+josa(w,a,b):w}
var ST={
 ko:{t:['처음 만난 날','좋아하는 것','단짝','작은 선물','내 물고기'],lock:'♥{n}부터 열려요',hint:'물고기를 누르면 그 물고기 이야기를 볼 수 있어요',nw:'📖 새 이야기',title:'📖 {n} 이야기',open:'📖 이야기 {k}장이 열렸어요',
  s:[function(o){return J(o.n,'은','는')+' 처음엔 수줍어서 '+(o.deco?o.deco+' 뒤에':'바위 뒤에')+' 숨어 있었어요. 그래도 손가락을 대면 살짝 다가와 코를 톡 대요.'},
     function(o){return o.n+'의 자랑은 「'+o.trait+'」. 기분이 좋으면 빙글 한 바퀴 돌고, 몸길이 '+o.cap+'cm를 뽐내듯 지느러미를 쫙 펴요.'},
     function(o){return o.bud?J(o.n,'에게','에게')+' 단짝 '+J(o.bud,'이','가')+' 생겼어요. 둘이 나란히 헤엄치다 마주 보고 춤을 춰요.':J(o.n,'은','는')+' 단짝을 찾고 있어요. 하트 3이 된 친구가 하나 더 생기면 같이 춤을 출 거예요.'},
     function(o){return J(o.n,'이','가')+' 하루 한 번 진주 방울을 물어 와요. '+(o.deco?o.deco+' 근처가 제일 좋은가 봐요.':'집 앞이 제일 좋은가 봐요.')+' 받으러 오면 꼬리를 살랑살랑 흔들어요.'},
     function(o){return J(o.n,'은','는')+' 이제 이 수족관이 집이에요. 꼬리에 반짝이가 생겼고, 「'+o.skill+'」 솜씨를 보여 줄 때면 우쭐해져요. 지금까지 '+o.pets+'번 같이 놀았어요'+(o.tp?' · 마을에서도 '+o.tp+'번 쓰다듬어 줬어요.':'.')}]},
 en:{t:['The day we met','Favorite things','Best buddy','A small gift','My fish'],lock:'Unlocks at ♥{n}',hint:'Tap a fish to read its story',nw:'📖 New story',title:'📖 {n}\'s story',open:'📖 Story chapter {k} unlocked',
  s:[function(o){return o.n+' was shy at first and hid behind '+(o.deco?'the '+o.deco:'a rock')+'. Still, when you reach out, it swims close and gives your finger a little boop.'},
     function(o){return o.n+' is proud of this: “'+o.trait+'”. When it\'s happy it spins once and spreads its fins as if showing off all '+o.cap+' cm.'},
     function(o){return o.bud?o.n+' found a best buddy, '+o.bud+'. They swim side by side, then turn and dance together.':o.n+' is looking for a buddy. Once another fish reaches ♥3, they\'ll dance together.'},
     function(o){return 'Once a day '+o.n+' brings you a pearl bubble. '+(o.deco?'It seems to love the spot by the '+o.deco+'.':'It seems to love the spot by the house.')+' When you come to collect, it wiggles its tail.'},
     function(o){return 'This aquarium is home to '+o.n+' now. Its tail sparkles, and it gets proud whenever it shows off “'+o.skill+'”. You\'ve played together '+o.pets+' times'+(o.tp?', and petted it '+o.tp+' times in Town.':'.')}]},
 ja:{t:['はじめて会った日','好きなこと','なかよし','小さなプレゼント','わたしの魚'],lock:'♥{n}になると開きます',hint:'魚をタップするとその魚の物語が読めます',nw:'📖 新しい物語',title:'📖 {n}の物語',open:'📖 物語の{k}章が開きました',
  s:[function(o){return o.n+'は最初はずかしがって'+(o.deco?o.deco:'岩')+'のうしろにかくれていました。でも指を近づけると、そっと来て鼻でちょんとさわります。'},
     function(o){return o.n+'の自慢は「'+o.trait+'」。ごきげんだとくるりと一回転して、'+o.cap+'cmの体を見せるようにひれを広げます。'},
     function(o){return o.bud?o.n+'になかよしの'+o.bud+'ができました。ならんで泳いでは向かい合ってダンスします。':o.n+'はなかよしをさがしています。♥3の友だちがもう一匹できたら、いっしょに踊ります。'},
     function(o){return o.n+'は1日1回、真珠のあわを運んできます。'+(o.deco?o.deco+'のそばがいちばん好きみたい。':'家の前がいちばん好きみたい。')+'受け取りに行くとしっぽをふりふりします。'},
     function(o){return o.n+'にとって、この水族館はもうおうちです。しっぽはキラキラ、「'+o.skill+'」を見せるときは得意げ。これまで'+o.pets+'回いっしょに遊びました'+(o.tp?'。町でも'+o.tp+'回なでました。':'。')}]},
 es:{t:['El día que nos conocimos','Lo que le gusta','Mejor amigo','Un pequeño regalo','Mi pez'],lock:'Se abre con ♥{n}',hint:'Toca un pez para leer su historia',nw:'📖 Nueva historia',title:'📖 Historia de {n}',open:'📖 Se abrió el capítulo {k}',
  s:[function(o){return 'Al principio '+o.n+' era tímido y se escondía detrás de '+(o.deco?o.deco:'una roca')+'. Aun así, cuando acercas el dedo, se acerca y le da un toquecito.'},
     function(o){return o.n+' presume de esto: «'+o.trait+'». Cuando está contento da una vuelta y abre las aletas como si luciera sus '+o.cap+' cm.'},
     function(o){return o.bud?o.n+' encontró un mejor amigo: '+o.bud+'. Nadan juntos y luego bailan frente a frente.':o.n+' busca un mejor amigo. Cuando otro pez llegue a ♥3, bailarán juntos.'},
     function(o){return 'Una vez al día '+o.n+' te trae una burbuja de perla. '+(o.deco?'Parece que le encanta estar junto a '+o.deco+'.':'Parece que le encanta estar frente a la casa.')+' Cuando vas a recogerla, mueve la cola.'},
     function(o){return 'Este acuario ya es el hogar de '+o.n+'. Su cola brilla y se pone orgulloso al mostrar «'+o.skill+'». Habéis jugado '+o.pets+' veces'+(o.tp?' y lo acariciaste '+o.tp+' veces en el pueblo.':'.')}]},
 vi:{t:['Ngày đầu gặp','Điều yêu thích','Bạn thân','Món quà nhỏ','Cá của tôi'],lock:'Mở khi ♥{n}',hint:'Chạm vào cá để đọc câu chuyện',nw:'📖 Chuyện mới',title:'📖 Chuyện của {n}',open:'📖 Đã mở chương {k}',
  s:[function(o){return 'Lúc đầu '+o.n+' ngại ngùng nấp sau '+(o.deco?o.deco:'tảng đá')+'. Nhưng khi bạn đưa ngón tay lại, nó bơi tới khẽ chạm mũi.'},
     function(o){return 'Niềm tự hào của '+o.n+': “'+o.trait+'”. Khi vui nó xoay một vòng và xòe vây như khoe thân hình '+o.cap+' cm.'},
     function(o){return o.bud?o.n+' đã có bạn thân là '+o.bud+'. Hai bạn bơi cạnh nhau rồi quay lại nhảy múa.':o.n+' đang tìm bạn thân. Khi có thêm một bạn ♥3, hai bạn sẽ cùng nhảy múa.'},
     function(o){return 'Mỗi ngày một lần '+o.n+' mang tới một bong bóng ngọc trai. '+(o.deco?'Có vẻ nó thích chỗ gần '+o.deco+' nhất.':'Có vẻ nó thích chỗ trước nhà nhất.')+' Khi bạn tới nhận, nó vẫy đuôi.'},
     function(o){return 'Bể cá này giờ là nhà của '+o.n+'. Đuôi nó lấp lánh và nó rất tự hào khi khoe “'+o.skill+'”. Hai bạn đã chơi '+o.pets+' lần'+(o.tp?', và bạn đã vuốt ve nó '+o.tp+' lần ở làng.':'.')}]}};
var W=ST[SL];
function fact(L){var o=AB(),a=o.aff[L.id]||{},bud=null,deco=null;
  try{var best=0;for(var k in o.aff){if(k===L.id)continue;var n=o.aff[k]&&o.aff[k].n|0;if(affLv(n)>=3&&inTank(k)&&n>best){best=n;bud=byId(k).name}}}catch(e){}
  try{var p=DS().placed.filter(function(q){return !q.pv});if(p.length){var h=0,s=L.id;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;var D=decoById(p[h%p.length].k);deco=D&&D.name}}catch(e){}
  return {n:L.name,trait:L.trait||'',skill:L.skill||'',cap:L.cap|0,bud:affLv(affOf(L.id))>=3?bud:null,deco:deco,pets:a.n|0,tp:a.tp|0}}
function storyOpen(L){var el=aqSheet('aqStory'),b=el.querySelector('.aq-body'),o=AB(),a=o.aff[L.id]||(o.aff[L.id]={n:0,d:'',c:0}),lv=affLv(a.n|0),F=fact(L);
  el.querySelector('h1').textContent=W.title.replace('{n}',L.name);b.textContent='';
  var hd=document.createElement('div');hd.className='aqs-hd';var im=document.createElement('img');im.alt='';im.src=SPRITE_SRC[L.id]||'';hd.appendChild(im);var hs=document.createElement('span');hs.className='aq-h';hs.textContent='♥'.repeat(lv)+'♡'.repeat(5-lv);hd.appendChild(hs);b.appendChild(hd);
  for(var i=0;i<5;i++){var c=document.createElement('div'),open=lv>i;c.className='aqs-c'+(open?'':' lk');var h=document.createElement('b');h.textContent=(i+1)+'. '+(open?W.t[i]:'???');c.appendChild(h);var p=document.createElement('p');p.textContent=open?W.s[i](F):W.lock.replace('{n}',i+1);c.appendChild(p);b.appendChild(c)}
  if((a.sl|0)<lv){a.sl=lv;persist()}var bk=document.createElement('button');bk.type='button';bk.className='btn ghost aq-fr';bk.textContent='💗 '+T('물고기 친구');bk.addEventListener('click',function(){el.hidden=true;aqFriendsOpen()});b.appendChild(bk);el.hidden=false;crumb('aqStory');try{msEv('aqStory')}catch(e){}}
window.GF_STORY=storyOpen;
/* 친구 목록: 줄을 누르면 이야기, 새 장이 있으면 표시 */
var _afo=aqFriendsOpen;aqFriendsOpen=function(){var r=_afo.apply(this,arguments);try{var el=$('aqFr'),b=el.querySelector('.aq-body'),ld=b.querySelector('.aq-lead');if(ld&&!b.querySelector('.aqs-hint')){var hn=document.createElement('p');hn.className='aq-lead aqs-hint';hn.textContent='📖 '+W.hint;ld.parentNode.insertBefore(hn,ld.nextSibling)}
    var seen={},list=[];tank.forEach(function(f){if(!seen[f.L.id]){seen[f.L.id]=1;list.push(f.L)}});list.sort(function(a,c){return affOf(c.id)-affOf(a.id)});
    b.querySelectorAll('.aq-f').forEach(function(row,i){var L=list[i];if(!L)return;row.style.cursor='pointer';row.setAttribute('role','button');row.addEventListener('click',function(){el.hidden=true;storyOpen(L)});var a=AB().aff[L.id],lv=affLv(affOf(L.id));
      if(lv>((a&&a.sl)|0)){var t=document.createElement('em');t.className='aqs-new';t.textContent=W.nw;row.appendChild(t)}var ar=document.createElement('i');ar.className='aqs-go';ar.textContent='›';row.appendChild(ar)})}catch(e){}return r};
/* 하트가 오르면 알림 아래 줄에 '이야기 n장이 열렸어요' */
var _bnS=banner;banner=function(a,b){try{if(typeof a==='string'&&/♥[1-5]$/.test(a)){var m=a.match(/♥([1-5])$/);b=(b?b+' · ':'')+W.open.replace('{k}',m[1])}}catch(e){}return _bnS.call(this,a,b)};
var st=document.createElement('style');st.textContent='.aqs-hd{display:flex;flex-direction:column;align-items:center;gap:4px;margin-bottom:10px}.aqs-hd img{width:150px;height:96px;object-fit:contain;filter:drop-shadow(0 4px 0 rgba(11,44,74,.18))}.aqs-hd .aq-h{font-size:18px}@media (orientation:landscape) and (max-height:500px){.aqs-hd{flex-direction:row;justify-content:center;gap:10px;margin-bottom:6px}.aqs-hd img{width:96px;height:56px}}'+
 '.aqs-c{border-radius:13px;background:#fff;box-shadow:0 0 0 2px #0B2C4A;padding:9px 12px;margin-bottom:8px}.aqs-c b{display:block;font-family:var(--disp);font-weight:400;font-size:15px;color:#B0305A;margin-bottom:3px}.aqs-c p{margin:0;font-size:13.5px;line-height:1.5;color:#0B2C4A;word-break:keep-all}'+
 '.aqs-c.lk{background:#F1F4F8;box-shadow:0 0 0 2px #B9C7D6}.aqs-c.lk b{color:#8A9AAD}.aqs-c.lk p{color:#8A9AAD}.aq-f{position:relative}.aqs-go{font-style:normal;margin-left:auto;font-size:20px;color:#8AA3BA;padding-left:6px}.aqs-new{position:absolute;right:26px;top:-7px;font-style:normal;font-size:10.5px;font-weight:800;background:#FF5C8A;color:#fff;border-radius:8px;padding:1px 6px}.aqs-hint{color:#B0305A!important}';document.head.appendChild(st);
})();
