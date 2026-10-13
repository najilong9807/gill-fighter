/* ===== 1.1.11 앱 키우기(사용자 요청: 저장 백업 · 계정 연동 · 친구 수족관 · 세트/업적)
   ① 저장 백업 코드: 12자리 코드로 저장을 서버에 맡기고(코드 원문은 서버에 안 남김 · 해시만), 다른 폰에서 코드로 불러온다. 코드가 있으면 앱을 나갈 때 자동 백업(10분 간격)
   ② 계정 연동(Apple): Apple 로그인 확인은 서버(gf-account)에서 하고, 그 계정에 백업 코드를 이어 둔다 → 새 폰에서 Apple로 로그인하면 코드를 찾아 불러온다. 앱에 Apple 로그인 기능이 들어간 빌드에서만 보임
   ③ 친구 수족관: 내 수족관 모습(물고기 · 소품 배치 · 집 · 산호 · 배경)만 공개 코드로 올리고, 코드나 목록으로 남의 수족관을 구경 · 하트(하루 한 번) → 받은 하트는 진주로
   ④ 세트 · 업적: 물고기 세트를 다 모으거나 목표를 이루면 보석/진주 */
abyTr(TRT,{'저장 백업 · 계정':'Backup & account','폰을 바꾸거나 앱을 지워도 이어서 할 수 있게 저장을 맡겨 둬요. 코드를 아는 사람은 누구나 불러올 수 있으니 남에게 알려 주지 마세요.':"Keep your save in the cloud so you can continue on a new phone or after reinstalling. Anyone with the code can load it, so don't share it.",
  '백업 코드':'Backup code','만들기':'Create','보기':'View','지금 백업':'Back up now','자동 백업':'Auto backup','앱을 나갈 때마다 자동으로 맡겨 둬요':'Saved automatically when you leave the app','아직 백업하지 않았어요':'Not backed up yet','마지막 백업: ':'Last backup: ','방금':'just now','분 전':' min ago','시간 전':' h ago','일 전':' d ago',
  '백업 코드로 불러오기':'Load from backup code','다른 폰에서 만든 코드를 넣으면 그 저장으로 바뀌어요':'Enter a code from another phone to switch to that save','코드 넣기':'Enter code','불러오기':'Load',
  '내 백업 코드':'My backup code','이 코드를 꼭 적어 두거나 화면을 캡처해 두세요. 새 폰에서 설정 › 저장 백업 · 계정 › 백업 코드로 불러오기에 넣으면 돼요.':'Write this code down or take a screenshot. On a new phone, enter it in Settings › Backup & account › Load from backup code.',
  '복사':'Copy','복사했어요':'Copied','백업했어요':'Backed up','백업하지 못했어요':"Couldn't back up",'인터넷 연결을 확인해 주세요':'Please check your internet connection',
  '코드 12자리를 넣어 주세요':'Enter the 12-character code','그 코드로 맡긴 저장이 없어요':'No save found for that code','이 저장으로 바꿀까요?':'Switch to this save?','지금 이 폰의 저장은 사라지고 아래 저장으로 바뀌어요.':"This phone's current save will be replaced with the one below.",
  '물고기 ':'Fish ','종':'','진주 ':'Pearls ','보석 ':'Gems ','바꾸기':'Switch','취소':'Cancel','불러왔어요! 다시 시작할게요':'Loaded! Restarting',
  'Apple 계정 연동':'Link Apple account','Apple로 로그인해 두면 새 폰에서도 Apple로 바로 불러와요':'Sign in with Apple to load your save on a new phone instantly','연동하기':'Link','연동됨':'Linked','Apple로 불러오기':'Load with Apple','연동했어요! 이제 Apple 계정에 백업돼요':'Linked! Your save now backs up to your Apple account',
  '이 Apple 계정에는 다른 저장이 이어져 있어요':'This Apple account is linked to a different save','그 저장을 불러올까요, 아니면 이 폰의 저장으로 바꿀까요?':"Load that save, or replace it with this phone's save?",'그 저장 불러오기':'Load that save','이 폰 저장으로 바꾸기':"Use this phone's save",'Apple 로그인을 하지 못했어요':"Couldn't sign in with Apple",'이 Apple 계정에 이어진 저장이 없어요':'No save is linked to this Apple account',
  '친구 수족관':'Friend aquariums','내 수족관 코드':'My aquarium code','친구에게 코드를 보내면 내 수족관을 구경하고 하트를 남겨요. 하트 1개에 진주 5개!':'Send your code and friends can visit and leave hearts. 5 pearls per heart!',
  '내 수족관 공개하기':'Share my aquarium','공개하면 물고기 · 소품 · 집 모습과 아이디만 올라가요':'Only your fish, decor, house and nickname are shared','공유':'Share','구경 목록에 보이기':'Show in visitor list','받은 하트 ':'Hearts received ',
  '코드로 놀러 가기':'Visit by code','6자리 코드':'6-character code','놀러 가기':'Visit','다른 사람 수족관':'Other aquariums','새로고침':'Refresh','불러오는 중…':'Loading…','아직 공개한 수족관이 없어요':'No shared aquariums yet','그 코드의 수족관이 없어요':'No aquarium with that code',
  '님의 수족관':"'s aquarium",'하트 보내기':'Send a heart','하트를 보냈어요!':'Heart sent!','오늘은 이미 하트를 보냈어요':'You already sent a heart today','나가기':'Leave','내 수족관이에요':"That's your aquarium",'내 수족관에 하트 ':'Your aquarium got ','개가 왔어요!':' hearts!','마리':'',
  '아가미 파이터 내 수족관 구경 와요! 수족관 코드: ':'Come visit my Gulp Deep aquarium! Code: ','익명':'Anonymous',
  '세트 · 업적':'Sets & achievements','세트':'Sets','업적':'Achievements','받을 보상 ':'Rewards ready ','받기':'Claim','받음':'Claimed','보상: ':'Reward: ','세트를 다 모으면 보석을 받아요':'Complete a set to earn gems',
  '상어 친구들':'Shark Pals','심해의 등불':'Deep-Sea Lanterns','산호초 친구들':'Reef Friends','가오리 · 해파리':'Rays & Jellies','바다의 질주자':'Ocean Sprinters','우리 바다 밥상':'Seafood Table','문어 · 오징어':'Octopus & Squid','살아 있는 화석':'Living Fossils','행운의 진주':'Lucky Pearls',
  '물고기 10종 모으기':'Collect 10 fish','물고기 25종 모으기':'Collect 25 fish','물고기 50종 모으기':'Collect 50 fish','물고기 75종 모으기':'Collect 75 fish','모든 물고기 모으기':'Collect every fish','별 3개 물고기 5종':'5 fish with 3 stars','별 3개 물고기 20종':'20 fish with 3 stars',
  '50판 하기':'Play 50 runs','300판 하기':'Play 300 runs','대전 1등 하기':'Win an arena match','대전 10번 1등':'Win 10 arena matches','심해 탐험 10층 깨기':'Clear deep dive floor 10','심해 탐험 30층 깨기':'Clear deep dive floor 30','심해 생존 1장 클리어':'Clear survival chapter 1',
  '집 Lv.5 짓기':'Build a Lv.5 house','별빛 산호 키우기':'Grow a Starlight Coral','손님 3명과 친구 되기':'Befriend 3 visitors','손님 9명 모두 친구':'Befriend all 9 visitors','♥5 물고기 만들기':'Reach ♥5 with a fish','꾸밈 ★4 달성':'Reach decor ★4',
  '저장 백업하기':'Back up your save','내 수족관 공개하기 ':'Share your aquarium','하트 10개 받기':'Receive 10 hearts','집':'House','보상을 받았어요!':'Reward claimed!'});
abyTr(TRJ,{'저장 백업 · 계정':'セーブのバックアップ・アカウント','폰을 바꾸거나 앱을 지워도 이어서 할 수 있게 저장을 맡겨 둬요. 코드를 아는 사람은 누구나 불러올 수 있으니 남에게 알려 주지 마세요.':'機種変更やアプリ削除のあとも続きから遊べるように、セーブを預けておきます。コードを知っている人はだれでも読み込めるので、人に教えないでください。',
  '백업 코드':'バックアップコード','만들기':'作る','보기':'見る','지금 백업':'今すぐバックアップ','자동 백업':'自動バックアップ','앱을 나갈 때마다 자동으로 맡겨 둬요':'アプリを閉じるたびに自動で預けます','아직 백업하지 않았어요':'まだバックアップしていません','마지막 백업: ':'最後のバックアップ：','방금':'たった今','분 전':'分前','시간 전':'時間前','일 전':'日前',
  '백업 코드로 불러오기':'バックアップコードで読み込む','다른 폰에서 만든 코드를 넣으면 그 저장으로 바뀌어요':'ほかのスマホで作ったコードを入れると、そのセーブに切り替わります','코드 넣기':'コードを入れる','불러오기':'読み込む',
  '내 백업 코드':'自分のバックアップコード','이 코드를 꼭 적어 두거나 화면을 캡처해 두세요. 새 폰에서 설정 › 저장 백업 · 계정 › 백업 코드로 불러오기에 넣으면 돼요.':'このコードを必ずメモするか、スクリーンショットを撮っておいてください。新しいスマホで 設定 › セーブのバックアップ・アカウント › バックアップコードで読み込む に入れればOKです。',
  '복사':'コピー','복사했어요':'コピーしました','백업했어요':'バックアップしました','백업하지 못했어요':'バックアップできませんでした','인터넷 연결을 확인해 주세요':'インターネット接続を確認してください',
  '코드 12자리를 넣어 주세요':'12けたのコードを入れてください','그 코드로 맡긴 저장이 없어요':'そのコードのセーブはありません','이 저장으로 바꿀까요?':'このセーブに切り替えますか？','지금 이 폰의 저장은 사라지고 아래 저장으로 바뀌어요.':'今このスマホにあるセーブは消えて、下のセーブに切り替わります。',
  '물고기 ':'魚 ','종':'種','진주 ':'真珠 ','보석 ':'ジェム ','바꾸기':'切り替える','취소':'キャンセル','불러왔어요! 다시 시작할게요':'読み込みました！再起動します',
  'Apple 계정 연동':'Appleアカウント連携','Apple로 로그인해 두면 새 폰에서도 Apple로 바로 불러와요':'Appleでサインインしておくと、新しいスマホでもすぐ読み込めます','연동하기':'連携する','연동됨':'連携済み','Apple로 불러오기':'Appleで読み込む','연동했어요! 이제 Apple 계정에 백업돼요':'連携しました！これからはAppleアカウントにバックアップされます',
  '이 Apple 계정에는 다른 저장이 이어져 있어요':'このAppleアカウントには別のセーブがつながっています','그 저장을 불러올까요, 아니면 이 폰의 저장으로 바꿀까요?':'そのセーブを読み込みますか？それともこのスマホのセーブに切り替えますか？','그 저장 불러오기':'そのセーブを読み込む','이 폰 저장으로 바꾸기':'このスマホのセーブにする','Apple 로그인을 하지 못했어요':'Appleでサインインできませんでした','이 Apple 계정에 이어진 저장이 없어요':'このAppleアカウントにつながったセーブはありません',
  '친구 수족관':'友だちの水族館','내 수족관 코드':'自分の水族館コード','친구에게 코드를 보내면 내 수족관을 구경하고 하트를 남겨요. 하트 1개에 진주 5개!':'コードを送ると友だちが水族館を見に来てハートを残せます。ハート1個で真珠5個！',
  '내 수족관 공개하기':'自分の水族館を公開する','공개하면 물고기 · 소품 · 집 모습과 아이디만 올라가요':'公開されるのは魚・小物・家のようすとニックネームだけです','공유':'シェア','구경 목록에 보이기':'見学リストに表示','받은 하트 ':'もらったハート ',
  '코드로 놀러 가기':'コードで遊びに行く','6자리 코드':'6けたのコード','놀러 가기':'遊びに行く','다른 사람 수족관':'みんなの水族館','새로고침':'更新','불러오는 중…':'読み込み中…','아직 공개한 수족관이 없어요':'まだ公開された水族館がありません','그 코드의 수족관이 없어요':'そのコードの水族館はありません',
  '님의 수족관':'さんの水族館','하트 보내기':'ハートを送る','하트를 보냈어요!':'ハートを送りました！','오늘은 이미 하트를 보냈어요':'今日はもうハートを送りました','나가기':'出る','내 수족관이에요':'自分の水族館です','내 수족관에 하트 ':'水族館にハートが','개가 왔어요!':'個届きました！','마리':'匹',
  '아가미 파이터 내 수족관 구경 와요! 수족관 코드: ':'Gulp Deepの水族館に遊びに来てね！コード：','익명':'名無し',
  '세트 · 업적':'セット・実績','세트':'セット','업적':'実績','받을 보상 ':'受け取れる報酬 ','받기':'受け取る','받음':'受取済み','보상: ':'報酬：','세트를 다 모으면 보석을 받아요':'セットをそろえるとジェムがもらえます',
  '상어 친구들':'サメなかま','심해의 등불':'深海のあかり','산호초 친구들':'サンゴ礁のなかま','가오리 · 해파리':'エイ・クラゲ','바다의 질주자':'海のスプリンター','우리 바다 밥상':'おさかな食堂','문어 · 오징어':'タコ・イカ','살아 있는 화석':'生きた化石','행운의 진주':'幸運の真珠',
  '물고기 10종 모으기':'魚を10種集める','물고기 25종 모으기':'魚を25種集める','물고기 50종 모으기':'魚を50種集める','물고기 75종 모으기':'魚を75種集める','모든 물고기 모으기':'すべての魚を集める','별 3개 물고기 5종':'星3つの魚 5種','별 3개 물고기 20종':'星3つの魚 20種',
  '50판 하기':'50回プレイ','300판 하기':'300回プレイ','대전 1등 하기':'対戦で1位','대전 10번 1등':'対戦で1位を10回','심해 탐험 10층 깨기':'深海探検 10階クリア','심해 탐험 30층 깨기':'深海探検 30階クリア','심해 생존 1장 클리어':'深海サバイバル 1章クリア',
  '집 Lv.5 짓기':'家をLv.5に','별빛 산호 키우기':'星明かりサンゴに育てる','손님 3명과 친구 되기':'お客さん3人と友だちに','손님 9명 모두 친구':'お客さん9人全員と友だちに','♥5 물고기 만들기':'♥5の魚をつくる','꾸밈 ★4 달성':'デコ★4達成',
  '저장 백업하기':'セーブをバックアップ','내 수족관 공개하기 ':'水族館を公開','하트 10개 받기':'ハートを10個もらう','집':'家','보상을 받았어요!':'報酬を受け取りました！'});

var GFN={fn:'https://tfkdcguuuuwocshascat.supabase.co/functions/v1/gf-account',AL:'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'};
function gfRand(n){var r='',a=GFN.AL;try{var u=new Uint32Array(n);crypto.getRandomValues(u);for(var i=0;i<n;i++)r+=a[u[i]%32]}catch(e){for(var j=0;j<n;j++)r+=a[(Math.random()*32)|0]}return r}
function gfCodeFmt(c){return c?c.slice(0,4)+'-'+c.slice(4,8)+'-'+c.slice(8):''}
function gfCodeIn(s){return String(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'').replace(/O/g,'0').replace(/I/g,'1')}
function gfAgo(ts){var m=Math.floor((Date.now()-ts)/60000);if(m<1)return T('방금');if(m<60)return m+T('분 전');var h=Math.floor(m/60);if(h<24)return h+T('시간 전');return Math.floor(h/24)+T('일 전')}
function gfCopy(txt){try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){banner(T('복사했어요'),txt)},function(){banner(T('복사'),txt)});return}}catch(e){}banner(T('복사'),txt)}
/* 작은 창(제목 · 글 · 큰 코드 · 입력 칸 · 버튼들) */
function gfDlg(o){var el=$('gfDlg');if(!el){el=document.createElement('div');el.className='overlay';el.id='gfDlg';el.hidden=true;el.innerHTML='<div class="panel gfd-panel"><h1></h1><p class="lead"></p><p class="gfd-code"></p><input class="gfd-in" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false"><div class="gfd-btns"></div></div>';document.body.appendChild(el)}
  el.querySelector('h1').textContent=o.title||'';var ld=el.querySelector('.lead');ld.textContent=o.text||'';ld.hidden=!o.text;
  var cd=el.querySelector('.gfd-code');cd.textContent=o.code||'';cd.hidden=!o.code;var inp=el.querySelector('.gfd-in');inp.hidden=!o.input;inp.value='';inp.placeholder=o.input||'';inp.maxLength=o.max||20;
  var bx=el.querySelector('.gfd-btns');bx.textContent='';(o.btns||[]).forEach(function(b){var e=document.createElement('button');e.type='button';e.className='btn'+(b.ghost?' ghost':'');e.textContent=b.t;e.addEventListener('click',function(){if(b.keep){b.fn&&b.fn(inp.value,e);return}el.hidden=true;b.fn&&b.fn(inp.value,e)});bx.appendChild(e)});
  el.hidden=false;if(o.input)setTimeout(function(){try{inp.focus()}catch(e){}},60);return el}
function gfDlgClose(){var el=$('gfDlg');if(el)el.hidden=true}

/* ① 백업 코드 */
function CL(){var c=save.cloud;if(!c||typeof c!=='object')c=save.cloud={code:'',at:0,h:''};return c}
function cloudData(){var o=JSON.parse(JSON.stringify(save));delete o.crashQ;delete o.crashLog;delete o.cloud;delete o.dev;return o}
function cloudPut(force,cb){var c=CL();if(!c.code){cb&&cb(false);return}var d=cloudData(),s=JSON.stringify(d),h=s.length+':'+s.slice(-64);
  if(!force&&c.h===h&&Date.now()-c.at<6*3600e3){cb&&cb(true);return}
  lbReq('rpc/gf_cloud_put',{p_code:c.code,p_data:d,p_ver:APP_VER}).then(function(){c.at=Date.now();c.h=h;persist();crumb('cloudPut');cb&&cb(true);try{achDot()}catch(e){}}).catch(function(){cb&&cb(false)})}
function cloudMake(cb){var c=CL();if(!c.code)c.code=gfRand(12);persist();cloudPut(true,function(ok){if(!ok){banner(T('백업하지 못했어요'),T('인터넷 연결을 확인해 주세요'));cb&&cb(false);return}cb&&cb(true)})}
function cloudShowCode(){var c=CL();gfDlg({title:T('내 백업 코드'),text:T('이 코드를 꼭 적어 두거나 화면을 캡처해 두세요. 새 폰에서 설정 › 저장 백업 · 계정 › 백업 코드로 불러오기에 넣으면 돼요.'),code:gfCodeFmt(c.code),btns:[{t:T('복사'),keep:1,fn:function(){gfCopy(gfCodeFmt(c.code))}},{t:T('닫기'),ghost:1}]})}
function cloudAsk(){gfDlg({title:T('백업 코드로 불러오기'),text:T('다른 폰에서 만든 코드를 넣으면 그 저장으로 바뀌어요'),input:'XXXX-XXXX-XXXX',max:16,btns:[{t:T('불러오기'),keep:1,fn:function(v,b){var code=gfCodeIn(v);if(!/^[A-HJ-NP-Z2-9]{12}$/.test(code)){banner(T('코드 12자리를 넣어 주세요'),'');return}b.disabled=true;cloudLoad(code,function(){b.disabled=false})}},{t:T('취소'),ghost:1}]})}
function cloudLoad(code,done){lbReq('rpc/gf_cloud_get',{p_code:code}).then(function(r){done&&done();var row=r&&r[0];if(!row||!row.data||!row.data.owned){banner(T('그 코드로 맡긴 저장이 없어요'),'');return}cloudConfirm(code,row)}).catch(function(){done&&done();banner(T('인터넷 연결을 확인해 주세요'),'')})}
function cloudConfirm(code,row){var d=row.data,sum=T('물고기 ')+((d.owned||[]).length)+T('종')+' · '+T('진주 ')+nf(d.pearls||0)+' · '+T('보석 ')+nf(d.gems||0)+(d.nick?' · '+d.nick:'')+'\n'+T('마지막 백업: ')+gfAgo(new Date(row.updated_at).getTime());
  gfDlg({title:T('이 저장으로 바꿀까요?'),text:T('지금 이 폰의 저장은 사라지고 아래 저장으로 바뀌어요.'),code:sum,btns:[{t:T('바꾸기'),fn:function(){cloudApply(code,d)}},{t:T('취소'),ghost:1}]})}
function cloudApply(code,d){d.cloud={code:code,at:Date.now(),h:''};d.lang=LANG;if(save.acct)d.acct=save.acct;crumb('cloudLoad');try{localStorage.setItem('fishproto.save2',JSON.stringify(d))}catch(e){}banner(T('불러왔어요! 다시 시작할게요'),'');CLOUD_LOCK=1;setTimeout(function(){location.reload()},900)}
var CLOUD_LOCK=0,CLOUD_T=0;
document.addEventListener('visibilitychange',function(){if(document.hidden&&!CLOUD_LOCK&&CL().code&&Date.now()-CLOUD_T>10*60000){CLOUD_T=Date.now();cloudPut(false)}});
/* 불러온 직후엔 persist가 새 저장을 옛 값으로 덮지 않게 막는다 */
var persistCL=persist;persist=function(){if(CLOUD_LOCK)return;return persistCL.apply(this,arguments)};

/* ② Apple 계정 연동(네이티브 Apple 로그인 기능이 있는 빌드에서만) */
function applePlug(){try{var C=window.Capacitor;return C&&C.isNativePlatform&&C.isNativePlatform()&&C.Plugins&&C.Plugins.SignInWithApple?C.Plugins.SignInWithApple:null}catch(e){return null}}
function appleToken(cb){var A=applePlug();if(!A){cb(null);return}
  A.authorize({clientId:'com.gillfighter.game',redirectURI:'https://apps.apple.com/app/id6816376999',scopes:'',state:gfRand(8),nonce:gfRand(16)}).then(function(r){var t=r&&r.response&&r.response.identityToken;cb(t||null)}).catch(function(){cb(null)})}
function acctReq(body){var h={apikey:NET.key,Authorization:'Bearer '+NET.key,'Content-Type':'application/json'};return fetch(GFN.fn,{method:'POST',headers:h,body:JSON.stringify(body)}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})}
function acctLink(){appleToken(function(tok){if(!tok){banner(T('Apple 로그인을 하지 못했어요'),'');return}
  var go=function(){acctReq({op:'link',id_token:tok,code:CL().code}).then(function(r){if(r.linked){save.acct={on:1,at:Date.now()};persist();crumb('acctLink');banner(T('연동했어요! 이제 Apple 계정에 백업돼요'),'');try{renderSetPage()}catch(e){}return}
      gfDlg({title:T('이 Apple 계정에는 다른 저장이 이어져 있어요'),text:T('그 저장을 불러올까요, 아니면 이 폰의 저장으로 바꿀까요?'),btns:[{t:T('그 저장 불러오기'),fn:function(){cloudLoad(r.code)}},{t:T('이 폰 저장으로 바꾸기'),ghost:1,fn:function(){acctReq({op:'link',id_token:tok,code:CL().code,force:1}).then(function(){save.acct={on:1,at:Date.now()};persist();banner(T('연동했어요! 이제 Apple 계정에 백업돼요'),'');try{renderSetPage()}catch(e){}}).catch(function(){banner(T('인터넷 연결을 확인해 주세요'),'')})}},{t:T('취소'),ghost:1}]})}).catch(function(){banner(T('인터넷 연결을 확인해 주세요'),'')})};
  if(CL().code)go();else cloudMake(function(ok){if(ok)go()})})}
function acctLoad(){appleToken(function(tok){if(!tok){banner(T('Apple 로그인을 하지 못했어요'),'');return}
  acctReq({op:'get',id_token:tok}).then(function(r){if(!r.code){banner(T('이 Apple 계정에 이어진 저장이 없어요'),'');return}save.acct={on:1,at:Date.now()};cloudLoad(r.code)}).catch(function(){banner(T('인터넷 연결을 확인해 주세요'),'')})})}

/* 설정 화면: '저장 데이터' 앞에 '저장 백업 · 계정' */
var renderSetPageCL=renderSetPage;renderSetPage=function(){renderSetPageCL.apply(this,arguments);try{
  var box=$('setAll'),rb=$('resetBtn'),before=rb?rb.closest('section'):null,c=CL();
  var sC=setSec(T('저장 백업 · 계정'),T('폰을 바꾸거나 앱을 지워도 이어서 할 수 있게 저장을 맡겨 둬요. 코드를 아는 사람은 누구나 불러올 수 있으니 남에게 알려 주지 마세요.'));sC.id='setCloud';
  var b1=document.createElement('button');b1.type='button';b1.className='sw';b1.id='cloudMk';b1.textContent=c.code?T('보기'):T('만들기');
  b1.addEventListener('click',function(){if(CL().code){cloudShowCode();return}b1.disabled=true;cloudMake(function(ok){b1.disabled=false;if(ok){renderSetPage();cloudShowCode()}})});
  sC.appendChild(setRow(T('백업 코드'),c.code?gfCodeFmt(c.code).slice(0,4)+'-····-····':T('아직 백업하지 않았어요'),b1));
  if(c.code){var b2=document.createElement('button');b2.type='button';b2.className='sw';b2.id='cloudNow';b2.textContent=T('지금 백업');b2.addEventListener('click',function(){b2.disabled=true;cloudPut(true,function(ok){b2.disabled=false;banner(ok?T('백업했어요'):T('백업하지 못했어요'),ok?'':T('인터넷 연결을 확인해 주세요'));if(ok)renderSetPage()})});
    sC.appendChild(setRow(T('자동 백업'),(c.at?T('마지막 백업: ')+gfAgo(c.at):T('아직 백업하지 않았어요'))+' · '+T('앱을 나갈 때마다 자동으로 맡겨 둬요'),b2))}
  var b3=document.createElement('button');b3.type='button';b3.className='sw';b3.id='cloudIn';b3.textContent=T('코드 넣기');b3.addEventListener('click',cloudAsk);
  sC.appendChild(setRow(T('백업 코드로 불러오기'),T('다른 폰에서 만든 코드를 넣으면 그 저장으로 바뀌어요'),b3));
  if(applePlug()||(dev()&&location.search.indexOf('apple')>=0)){var b4=document.createElement('button');b4.type='button';b4.className='sw';b4.id='acctBtn';var on=save.acct&&save.acct.on;b4.textContent=on?T('연동됨'):T('연동하기');b4.disabled=!!on;b4.addEventListener('click',acctLink);
    sC.appendChild(setRow(T('Apple 계정 연동'),T('Apple로 로그인해 두면 새 폰에서도 Apple로 바로 불러와요'),b4));
    var b5=document.createElement('button');b5.type='button';b5.className='sw';b5.id='acctLoad';b5.textContent=T('불러오기');b5.addEventListener('click',acctLoad);sC.appendChild(setRow(T('Apple로 불러오기'),'',b5))}
  if(before)box.insertBefore(sC,before);else box.appendChild(sC)}catch(e){}};

/* ③ 친구 수족관 */
var VISIT=null;
function TKS(){var o=save.tk;if(!o||typeof o!=='object')o=save.tk={code:'',sec:'',pub:true,h:'',at:0,hearts:0,sent:{}};if(!o.sent||typeof o.sent!=='object')o.sent={};return o}
function tkSnap(){var pl=DS0().placed.filter(function(q){return !q.pv&&decoById(q.k)}).slice(0,70).map(function(q){var o={},k;for(k in q){var v=q[k];if(k==='pv')continue;if(typeof v==='number')o[k]=Math.round(v*1000)/1000;else if(typeof v==='string'||typeof v==='boolean')o[k]=v}return o});
  return {v:1,f:tankIds0().slice(0,40),d:pl,h:HS0().lv||0,c:coralSt0(),b:TB0().id}}
function tkPut(force,cb){var o=TKS();if(!o.code||!o.sec){cb&&cb(false);return}var sn=tkSnap(),s=JSON.stringify(sn)+'|'+(save.nick||'')+'|'+o.pub;
  if(!force&&o.h===s&&Date.now()-o.at<12*3600e3){cb&&cb(true);return}
  lbReq('rpc/gf_tank_put',{p_code:o.code,p_sec:o.sec,p_nick:netClean(save.nick||''),p_data:sn,p_pub:!!o.pub}).then(function(r){var x=r&&r[0];if(x){o.code=x.code;o.hearts=x.hearts}o.h=s;o.at=Date.now();persist();cb&&cb(true)}).catch(function(){cb&&cb(false)})}
function tkPublish(cb){var o=TKS();if(!o.sec)o.sec=gfRand(28);var sn=tkSnap();
  lbReq('rpc/gf_tank_put',{p_code:null,p_sec:o.sec,p_nick:netClean(save.nick||''),p_data:sn,p_pub:true}).then(function(r){var x=r&&r[0];if(!x)throw 0;o.code=x.code;o.pub=true;o.at=Date.now();o.h='';persist();crumb('tkPub');cb&&cb(true);try{achDot()}catch(e){}}).catch(function(){banner(T('인터넷 연결을 확인해 주세요'),'');cb&&cb(false)})}
function tkClaim(){var o=TKS();if(!o.code)return;lbReq('rpc/gf_tank_claim',{p_code:o.code,p_sec:o.sec}).then(function(n){n=+n||0;if(n>0){var g=Math.min(n,40)*5;save.pearls+=g;o.hearts=(o.hearts||0)+0;persist();banner(T('내 수족관에 하트 ')+n+T('개가 왔어요!'),T('진주 +')+g);try{refreshHome(true);refreshTank()}catch(e){}}}).catch(function(){})}
setTimeout(function(){if(TKS().code){tkPut(false);setTimeout(tkClaim,2500)}},6000);
document.addEventListener('visibilitychange',function(){if(document.hidden&&TKS().code)tkPut(false)});
var decoEndTK=decoEnd;decoEnd=function(){var r=decoEndTK.apply(this,arguments);if(TKS().code)setTimeout(function(){tkPut(false)},400);return r};
/* 구경 모드: 남의 수족관 모습으로 잠깐 바꿔 그린다(내 저장은 건드리지 않음) */
var DS0=DS,tankIds0=tankIds,HS0=HS,TB0=TB,coralSt0=coralSt;
DS=function(){return VISIT?VISIT.ds:DS0()};tankIds=function(){return VISIT?VISIT.f:tankIds0()};HS=function(){return VISIT?VISIT.hs:HS0()};TB=function(){return VISIT?tankBgById(VISIT.b):TB0()};coralSt=function(){return VISIT?VISIT.c:coralSt0()};
function visitStart(row){var d=row.data||{};VISIT={code:row.code,nick:row.nick||T('익명'),hearts:row.hearts||0,f:(d.f||[]).filter(function(id){return byId(id)}),ds:{placed:(d.d||[]).filter(function(q){return q&&decoById(q.k)}),inv:{},out:[]},hs:{lv:clamp(d.h|0,0,5),acc:0,at:Date.now(),fed:0,boost:0},c:clamp(d.c|0,0,6),b:tankBgById(d.b||'reef').id};
  crumb('visit');$('tkFr')&&($('tkFr').hidden=true);if(page!=='tank')showTab('tank');VISIT_ON=1;tankCam=-1;camClamp();$('tankUI').hidden=true;visBar();try{ABY.vis=null}catch(e){}}
var VISIT_ON=0;
function visitEnd(){if(!VISIT)return;VISIT=null;VISIT_ON=0;var b=$('visBar');if(b)b.hidden=true;if(page==='tank')$('tankUI').hidden=false;tankCam=-1;try{refreshTank()}catch(e){}}
function visBar(){var b=$('visBar');if(!b){b=document.createElement('div');b.id='visBar';b.innerHTML='<div class="vb-top"><b class="vb-name"></b><span class="vb-h"></span></div><div class="vb-btns"><button type="button" class="btn vb-heart"></button><button type="button" class="btn ghost vb-out"></button></div>';document.body.appendChild(b);
    b.querySelector('.vb-out').addEventListener('click',function(){visitEnd();tkFrOpen()});
    b.querySelector('.vb-heart').addEventListener('click',function(){var v=VISIT;if(!v)return;var o=TKS(),d=today();if(v.code===o.code){banner(T('내 수족관이에요'),'');return}if(o.sent[v.code]===d){banner(T('오늘은 이미 하트를 보냈어요'),'');return}
      var btn=this;btn.disabled=true;lbReq('rpc/gf_tank_heart',{p_code:v.code,p_pid:lbPid()}).then(function(n){btn.disabled=false;o.sent[v.code]=d;for(var k in o.sent)if(o.sent[k]!==d)delete o.sent[k];persist();if(VISIT){VISIT.hearts=+n||VISIT.hearts;visBar()}
        banner(T('하트를 보냈어요!'),'');try{for(var i=0;i<tank.length;i+=2)abyFxPush(tank[i].x,tank[i].y-20,'heart',2)}catch(e){}svSnd('gem');buzz(20)}).catch(function(){btn.disabled=false;banner(T('인터넷 연결을 확인해 주세요'),'')})})}
  var v=VISIT;if(!v)return;b.querySelector('.vb-name').textContent=LANG==='en'?v.nick+T('님의 수족관'):v.nick+T('님의 수족관');b.querySelector('.vb-h').textContent='♥ '+nf(v.hearts)+' · '+T('물고기 ')+v.f.length+T('마리');
  var hb=b.querySelector('.vb-heart'),sent=TKS().sent[v.code]===today();hb.textContent=(sent?'♥ ':'♡ ')+T('하트 보내기');hb.classList.toggle('done',sent);b.querySelector('.vb-out').textContent=T('나가기');b.hidden=false}
var showTabTK=showTab;showTab=function(p){if(VISIT)visitEnd();return showTabTK.apply(this,arguments)};
var tankTapTK=tankTap;tankTap=function(wx,wy){if(!VISIT)return tankTapTK(wx,wy);
  var bestF=null,bd=1e9;for(var q=0;q<tank.length;q++){var tf=tank[q],dd=Math.hypot(wx-tf.x,wy-tf.y);if(dd<tankSize(tf.L)*1.6+14&&dd<bd){bd=dd;bestF=tf}}
  if(bestF){var s=tankSize(bestF.L);abyFxPush(bestF.x,bestF.y-s*.9,'heart',3);bestF.cur={x:bestF.x+bestF.dir*s*.9,y:bestF.y-s*.7,t:.55};svSnd('bub',1.3);buzz(8);return}
  TK_RIP.push({x:wx,y:wy,r:6,life:.9,max:.9});var cand=tank.map(function(f){return [Math.hypot(f.x-wx,f.y-wy),f]}).filter(function(a){return a[0]<Math.max(260,viewW()*.55)}).sort(function(a,b){return a[0]-b[0]}).slice(0,6);cand.forEach(function(a,k){a[1].cur={x:wx+rnd(-40,40),y:wy+rnd(-26,26),t:2.4+k*.15}});svSnd('bub',1.4)};
/* 친구 수족관 창 */
function tkFrOpen(){var el=$('tkFr');if(!el){el=document.createElement('div');el.className='overlay';el.id='tkFr';el.hidden=true;
    el.innerHTML='<div class="panel fr-panel"><h1></h1><div class="fr-box fr-me"></div><div class="fr-box fr-go"><b class="fr-h"></b><div class="fr-row"><input type="text" id="frCode" maxlength="8" autocomplete="off" autocapitalize="characters" spellcheck="false"><button type="button" class="btn" id="frGo"></button></div></div><div class="fr-box fr-list"><div class="fr-lh"><b class="fr-h"></b><button type="button" class="btn ghost" id="frRe"></button></div><ul id="frUl"></ul></div><button type="button" class="btn ghost" id="frX"></button></div>';document.body.appendChild(el);
    $('frX').addEventListener('click',function(){el.hidden=true});el.addEventListener('click',function(e){if(e.target===el)el.hidden=true});
    $('frGo').addEventListener('click',function(){var c=gfCodeIn($('frCode').value).slice(0,6);if(c.length!==6){banner(T('6자리 코드'),'');return}tkVisit(c)});
    $('frRe').addEventListener('click',tkList)}
  el.querySelector('h1').textContent=T('친구 수족관');el.querySelector('.fr-go .fr-h').textContent=T('코드로 놀러 가기');$('frCode').placeholder='ABC123';$('frGo').textContent=T('놀러 가기');el.querySelector('.fr-list .fr-h').textContent=T('다른 사람 수족관');$('frRe').textContent='↻ '+T('새로고침');$('frX').textContent=T('닫기');
  tkFrMe();el.hidden=false;tkList();if(TKS().code)tkClaim()}
function tkFrMe(){var box=document.querySelector('#tkFr .fr-me');if(!box)return;box.textContent='';var o=TKS(),h=document.createElement('b');h.className='fr-h';h.textContent=T('내 수족관 코드');box.appendChild(h);
  var p=document.createElement('p');p.className='fr-p';p.textContent=T('친구에게 코드를 보내면 내 수족관을 구경하고 하트를 남겨요. 하트 1개에 진주 5개!');box.appendChild(p);
  if(!o.code){var b=document.createElement('button');b.type='button';b.className='btn';b.id='frPub';b.textContent=T('내 수족관 공개하기');b.addEventListener('click',function(){b.disabled=true;tkPublish(function(ok){b.disabled=false;if(ok)tkFrMe()})});box.appendChild(b);
    var s=document.createElement('small');s.className='fr-s';s.textContent=T('공개하면 물고기 · 소품 · 집 모습과 아이디만 올라가요');box.appendChild(s);return}
  var r=document.createElement('div');r.className='fr-row';var c=document.createElement('span');c.className='fr-code';c.textContent=o.code;r.appendChild(c);
  var sh=document.createElement('button');sh.type='button';sh.className='btn';sh.textContent=T('공유');sh.addEventListener('click',function(){var t=T('아가미 파이터 내 수족관 구경 와요! 수족관 코드: ')+o.code;var S=shareNative();try{if(S){S.share({title:T('아가미 파이터'),text:t,url:STORE_URL});return}if(navigator.share){navigator.share({title:T('아가미 파이터'),text:t,url:STORE_URL}).catch(function(){});return}}catch(e){}gfCopy(t)});r.appendChild(sh);box.appendChild(r);
  var r2=document.createElement('div');r2.className='fr-row fr-sub';var hs=document.createElement('span');hs.textContent=T('받은 하트 ')+'♥ '+nf(o.hearts||0);r2.appendChild(hs);
  var pb=document.createElement('button');pb.type='button';pb.className='sw';pb.setAttribute('aria-pressed',o.pub?'true':'false');pb.textContent=T('구경 목록에 보이기')+(o.pub?' ✓':'');pb.addEventListener('click',function(){o.pub=!o.pub;persist();tkPut(true);tkFrMe()});r2.appendChild(pb);box.appendChild(r2)}
function tkList(){var ul=$('frUl');if(!ul)return;ul.textContent='';var li0=document.createElement('li');li0.className='fr-empty';li0.textContent=T('불러오는 중…');ul.appendChild(li0);
  lbReq('rpc/gf_tank_list',{p_n:12}).then(function(rows){ul.textContent='';var me=TKS().code;rows=(rows||[]).filter(function(x){return x.code!==me});
    if(!rows.length){var e=document.createElement('li');e.className='fr-empty';e.textContent=T('아직 공개한 수족관이 없어요');ul.appendChild(e);return}
    rows.forEach(function(x){var li=document.createElement('li'),b=document.createElement('button');b.type='button';b.className='fr-it';var n=document.createElement('b');n.textContent=x.nick||T('익명');var s=document.createElement('small');s.textContent=T('물고기 ')+x.fishn+T('마리')+(x.house?' · '+T('집')+' Lv.'+x.house:'');var h=document.createElement('em');h.textContent='♥ '+nf(x.hearts||0);
      b.appendChild(n);b.appendChild(s);b.appendChild(h);b.addEventListener('click',function(){tkVisit(x.code)});li.appendChild(b);ul.appendChild(li)})}).catch(function(){ul.textContent='';var e=document.createElement('li');e.className='fr-empty';e.textContent=T('인터넷 연결을 확인해 주세요');ul.appendChild(e)})}
function tkVisit(code){lbReq('rpc/gf_tank_get',{p_code:code}).then(function(r){var row=r&&r[0];if(!row){banner(T('그 코드의 수족관이 없어요'),'');return}visitStart(row)}).catch(function(){banner(T('인터넷 연결을 확인해 주세요'),'')})}
/* 수족관 화면 오른쪽 버튼 줄에 '친구 수족관' 버튼 */
(function(){var z=document.querySelector('#tankUI .tank-zoom');if(!z)return;var b=document.createElement('button');b.className='zbtn';b.id='tkFrBtn';b.type='button';b.setAttribute('aria-label',T('친구 수족관'));
  b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8.5" cy="9" r="3.4" fill="#fff" stroke="#0B2C4A" stroke-width="2"/><circle cx="16" cy="10" r="2.8" fill="#FFD25A" stroke="#0B2C4A" stroke-width="2"/><path d="M2.8 19.5c.6-3.4 2.9-5.2 5.7-5.2s5.1 1.8 5.7 5.2z" fill="#fff" stroke="#0B2C4A" stroke-width="2" stroke-linejoin="round"/><path d="M14.2 15.2c.6-.4 1.2-.6 1.9-.6 2.3 0 4.2 1.5 4.7 4.4h-5.3" fill="#FFD25A" stroke="#0B2C4A" stroke-width="2" stroke-linejoin="round"/></svg>';
  b.addEventListener('click',function(e){e.stopPropagation();tkFrOpen()});z.appendChild(b)})();
/* 구경 중엔 손님 · 톡톡 안내를 쉬게 */
var guestTickTK=guestTick;guestTick=function(dt){if(VISIT){ABY.vis=null;return}return guestTickTK(dt)};

/* ④ 세트 · 업적 */
var ACH_SETS=[{k:'s_shark',n:T('상어 친구들'),ids:['shark','hammerhead','mako','thresher','goblinshark','frilledshark','greenlandshark','whaleshark'],g:10},
  {k:'s_deep',n:T('심해의 등불'),ids:['lanternfish','barreleye','atolla','vampiresquid','footballfish','dragonfish','viperfish','angler'],g:10},
  {k:'s_reef',n:T('산호초 친구들'),ids:['clownfish','tomatoclown','butterfly','bluetang','angelfish','moorish','mandarinfish','boxfish','trigger','parrotfish'],g:8},
  {k:'s_ray',n:T('가오리 · 해파리'),ids:['stingray','manta','sawfish','moonjelly','seanettle'],g:5},
  {k:'s_fast',n:T('바다의 질주자'),ids:['tuna','yellowfin','marlin','sailfish','swordfish','mahi','barracuda'],g:8},
  {k:'s_table',n:T('우리 바다 밥상'),ids:['mackerel','hairtail','yellowtail','seabream','blackbream','flounder','flatfish','rockfish','cod','jack'],g:8},
  {k:'s_ceph',n:T('문어 · 오징어'),ids:['octopus','dumbo','blueringed','cuttle','giantsquid','vampiresquid'],g:6},
  {k:'s_fossil',n:T('살아 있는 화석'),ids:['coelacanth','frilledshark','greenlandshark','chimaera','oarfish'],g:6},
  {k:'s_luck',n:T('행운의 진주'),ids:['seahorse','goldfish','mandarinfish'],g:3}];
ACH_SETS.forEach(function(S){S.ids=S.ids.filter(function(id){return byId(id)})});
function achOwn(id){return save.owned.indexOf(id)>=0}
function achCampHi(){try{var c=campSave(),hi=0,k;for(k in c.s)if((c.s[k]||0)>0&&+k>hi)hi=+k;return hi}catch(e){return 0}}
function achSvClear(){try{var S=svSave();return S.ch&&S.ch[1]&&S.ch[1].clear?1:0}catch(e){return 0}}
function achStar3(){var n=0;SPECIES.forEach(function(L){try{if(achOwn(L.id)&&starsOf(L.id)>=3)n++}catch(e){}});return n}
function achAffMax(){var m=0,a=AB().aff,k;for(k in a){var l=affLv(a[k]&&a[k].n||0);if(l>m)m=l}return m}
function achGuests(){var o=AB(),n=0;GUESTS.forEach(function(G){if(o.vis[G.k])n++});return n}
var ACH=[{k:'own10',n:T('물고기 10종 모으기'),p:function(){return save.owned.length},goal:10,r:{gems:3}},{k:'own25',n:T('물고기 25종 모으기'),p:function(){return save.owned.length},goal:25,r:{gems:5}},
  {k:'own50',n:T('물고기 50종 모으기'),p:function(){return save.owned.length},goal:50,r:{gems:10}},{k:'own75',n:T('물고기 75종 모으기'),p:function(){return save.owned.length},goal:75,r:{gems:15}},
  {k:'ownAll',n:T('모든 물고기 모으기'),p:function(){return SPECIES.filter(function(L){return achOwn(L.id)}).length},goal:SPECIES.length,r:{gems:30}},
  {k:'star5',n:T('별 3개 물고기 5종'),p:achStar3,goal:5,r:{gems:5}},{k:'star20',n:T('별 3개 물고기 20종'),p:achStar3,goal:20,r:{gems:10}},
  {k:'runs50',n:T('50판 하기'),p:function(){return save.runs||0},goal:50,r:{pearls:300}},{k:'runs300',n:T('300판 하기'),p:function(){return save.runs||0},goal:300,r:{gems:5}},
  {k:'mp1',n:T('대전 1등 하기'),p:function(){return (save.mp&&save.mp.wins)||0},goal:1,r:{gems:3}},{k:'mp10',n:T('대전 10번 1등'),p:function(){return (save.mp&&save.mp.wins)||0},goal:10,r:{gems:8}},
  {k:'camp10',n:T('심해 탐험 10층 깨기'),p:achCampHi,goal:10,r:{gems:3}},{k:'camp30',n:T('심해 탐험 30층 깨기'),p:achCampHi,goal:30,r:{gems:8}},{k:'sv1',n:T('심해 생존 1장 클리어'),p:achSvClear,goal:1,r:{gems:3}},
  {k:'house5',n:T('집 Lv.5 짓기'),p:function(){return HS0().lv||0},goal:5,r:{gems:5}},{k:'coral6',n:T('별빛 산호 키우기'),p:function(){return coralSt0()},goal:6,r:{gems:5}},
  {k:'guest3',n:T('손님 3명과 친구 되기'),p:achGuests,goal:3,r:{gems:3}},{k:'guest9',n:T('손님 9명 모두 친구'),p:achGuests,goal:9,r:{gems:8}},
  {k:'aff5',n:T('♥5 물고기 만들기'),p:achAffMax,goal:5,r:{gems:3}},{k:'deco4',n:T('꾸밈 ★4 달성'),p:function(){try{var v=VISIT;VISIT=null;var s=decoStars();VISIT=v;return s}catch(e){return 0}},goal:4,r:{gems:3}},
  {k:'backup',n:T('저장 백업하기'),p:function(){return CL().at?1:0},goal:1,r:{gems:2}},{k:'tkpub',n:T('내 수족관 공개하기 '),p:function(){return TKS().code?1:0},goal:1,r:{pearls:300}},
  {k:'hearts10',n:T('하트 10개 받기'),p:function(){return TKS().hearts||0},goal:10,r:{gems:3}}];
function ACS(){var o=save.ach;if(!o||typeof o!=='object')o=save.ach={got:{}};if(!o.got)o.got={};return o}
function achList(){var out=[];ACH_SETS.forEach(function(S){var n=S.ids.filter(achOwn).length;out.push({k:S.k,set:S,n:S.n,cur:n,goal:S.ids.length,r:{gems:S.g}})});ACH.forEach(function(A){var c=0;try{c=A.p()||0}catch(e){}out.push({k:A.k,n:A.n,cur:Math.min(c,A.goal),goal:A.goal,r:A.r})});return out}
function achReady(){var g=ACS().got;return achList().filter(function(x){return x.cur>=x.goal&&!g[x.k]}).length}
function achRw(r){return r.gems?'◆ '+r.gems:'◎ '+r.pearls}
function achClaim(x){var g=ACS().got;if(g[x.k]||x.cur<x.goal)return;g[x.k]=Date.now();if(x.r.gems)save.gems+=x.r.gems;if(x.r.pearls)save.pearls+=x.r.pearls;persist();crumb('ach:'+x.k);svSnd('gem');buzz([20,30,40]);banner(T('보상을 받았어요!'),x.n+' · '+achRw(x.r));try{refreshHome(true);refreshTank()}catch(e){}achDot()}
var ACH_TAB='set';
function achOpen(){var el=$('achP');if(!el){el=document.createElement('div');el.className='overlay';el.id='achP';el.hidden=true;
    el.innerHTML='<div class="panel ach-panel"><h1></h1><div class="dd-seg ach-seg"><button type="button" data-t="set"></button><button type="button" data-t="ach"></button></div><p class="ach-note"></p><ul id="achUl"></ul><button type="button" class="btn ghost" id="achX"></button></div>';document.body.appendChild(el);
    $('achX').addEventListener('click',function(){el.hidden=true});el.addEventListener('click',function(e){if(e.target===el)el.hidden=true});
    el.querySelectorAll('.ach-seg button').forEach(function(b){b.addEventListener('click',function(){ACH_TAB=b.getAttribute('data-t');achRender()})})}
  el.querySelector('h1').textContent=T('세트 · 업적');var bs=el.querySelectorAll('.ach-seg button');bs[0].textContent=T('세트');bs[1].textContent=T('업적');$('achX').textContent=T('닫기');achRender();el.hidden=false}
function achRender(){var el=$('achP');if(!el)return;var bs=el.querySelectorAll('.ach-seg button');bs.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-t')===ACH_TAB?'true':'false')});
  el.querySelector('.ach-note').textContent=ACH_TAB==='set'?T('세트를 다 모으면 보석을 받아요'):'';
  var ul=$('achUl'),g=ACS().got;ul.textContent='';var list=achList().filter(function(x){return ACH_TAB==='set'?!!x.set:!x.set});
  list.sort(function(a,b){var ra=(a.cur>=a.goal&&!g[a.k])?0:g[a.k]?2:1,rb=(b.cur>=b.goal&&!g[b.k])?0:g[b.k]?2:1;return ra-rb});
  list.forEach(function(x){var li=document.createElement('li');li.className='ach-it'+(g[x.k]?' got':x.cur>=x.goal?' ready':'');
    var tx=document.createElement('div');tx.className='ach-tx';var b=document.createElement('b');b.textContent=x.n;tx.appendChild(b);
    if(x.set){var fr=document.createElement('div');fr.className='ach-fish';x.set.ids.forEach(function(id){var L=byId(id),i=document.createElement('i');i.className=achOwn(id)?'on':'';if(achOwn(id)&&SPRITE_SRC[id]){var im=document.createElement('img');im.alt='';im.loading='lazy';im.src=SPRITE_SRC[id];i.appendChild(im)}else i.textContent='?';i.title=achOwn(id)?L.name:'???';fr.appendChild(i)});tx.appendChild(fr)}
    var bar=document.createElement('div');bar.className='ach-bar';var fi=document.createElement('i');fi.style.width=Math.round(100*Math.min(1,x.cur/x.goal))+'%';bar.appendChild(fi);var nm=document.createElement('span');nm.textContent=nf(x.cur)+' / '+nf(x.goal);bar.appendChild(nm);tx.appendChild(bar);li.appendChild(tx);
    var bt=document.createElement('button');bt.type='button';bt.className='ach-btn';if(g[x.k]){bt.textContent=T('받음');bt.disabled=true}else if(x.cur>=x.goal){bt.textContent=T('받기')+' '+achRw(x.r);bt.addEventListener('click',function(){achClaim(x);achRender()})}else{bt.textContent=achRw(x.r);bt.disabled=true}
    li.appendChild(bt);ul.appendChild(li)})}
function achDot(){var b=$('achBtn');if(!b)return;var n=achReady();var e=b.querySelector('em');e.textContent=n?T('받을 보상 ')+n:'';e.hidden=!n;b.classList.toggle('ready',n>0);
  var dn=0;try{var sets=ACH_SETS.filter(function(S){return S.ids.every(achOwn)}).length;dn=sets}catch(x){}b.querySelector('small').textContent=dn+' / '+ACH_SETS.length}
(function(){var m=document.querySelector('#menu h1');if(!m)return;var b=document.createElement('button');b.type='button';b.id='achBtn';b.className='achbar';b.innerHTML='<span class="ach-ico" aria-hidden="true">🏅</span><b></b><small></small><em hidden></em>';b.querySelector('b').textContent=T('세트 · 업적');b.addEventListener('click',achOpen);m.parentNode.insertBefore(b,m.nextSibling)})();
var showTabACH=showTab;showTab=function(p){var r=showTabACH.apply(this,arguments);if(p==='dex')try{achDot()}catch(e){}return r};
setTimeout(function(){try{achDot()}catch(e){}},1500);

(function(){var st=document.createElement('style');st.textContent=
  '#gfDlg{z-index:47}#tkFr,#achP{z-index:45}.gfd-panel{max-width:380px;display:flex;flex-direction:column;gap:10px;text-align:center}.gfd-panel .lead{margin:0;word-break:keep-all;white-space:pre-line}.gfd-code{margin:2px 0;font-family:var(--disp);font-size:22px;letter-spacing:.06em;color:#0B2C4A;background:rgba(11,44,74,.07);border-radius:12px;padding:10px 8px;white-space:pre-line;word-break:keep-all}'+
  '.gfd-in{font:inherit;font-size:20px;text-align:center;letter-spacing:.08em;padding:10px;border-radius:12px;border:3px solid #0B2C4A;text-transform:uppercase}.gfd-btns{display:flex;flex-direction:column;gap:8px}'+
  '.gfd-panel .btn,.fr-panel .btn,.ach-panel>.btn{min-height:0!important;height:auto!important;flex:none!important;padding:11px 14px 13px!important;font-size:18px!important}'+
  '.fr-panel{max-width:420px;max-height:88vh;display:flex;flex-direction:column;gap:9px}.fr-box{background:rgba(11,44,74,.06);border-radius:16px;padding:10px 12px;display:flex;flex-direction:column;gap:7px;text-align:left}.fr-h{font-family:var(--disp);font-weight:normal;font-size:16px;color:#0B2C4A}'+
  '.fr-p{margin:0;font-size:13px;color:#4A6680;word-break:keep-all}.fr-s{font-size:12px;color:#6A8096}.fr-row{display:flex;gap:8px;align-items:center}.fr-row input{flex:1;min-width:0;font:inherit;font-size:18px;letter-spacing:.1em;text-transform:uppercase;padding:9px 10px;border-radius:12px;border:3px solid #0B2C4A}'+
  '.fr-row .btn{flex:none!important;padding:9px 14px 11px!important;font-size:16px!important}.fr-code{flex:1;font-family:var(--disp);font-size:26px;letter-spacing:.12em;color:#0B2C4A}.fr-sub{justify-content:space-between;font-size:14px;color:#3A5C78}'+
  '.fr-list{min-height:0;flex:1 1 auto}.fr-lh{display:flex;justify-content:space-between;align-items:center}.fr-lh .btn{flex:none!important;min-height:0!important;padding:5px 10px 7px!important;font-size:13px!important}#frUl{list-style:none;margin:0;padding:0;overflow:auto;max-height:34vh;display:flex;flex-direction:column;gap:6px}'+
  '.fr-it{width:100%;display:grid;grid-template-columns:1fr auto;grid-template-rows:auto auto;column-gap:8px;text-align:left;font:inherit;background:#fff;border:0;border-radius:12px;padding:8px 12px;box-shadow:0 2px 0 rgba(11,44,74,.15);cursor:pointer}.fr-it b{font-family:var(--disp);font-weight:normal;font-size:16px;color:#0B2C4A}.fr-it small{grid-row:2;font-size:12px;color:#5B7188}.fr-it em{grid-row:1/3;grid-column:2;align-self:center;font-style:normal;color:#E5386B;font-family:var(--disp)}.fr-empty{font-size:13px;color:#6A8096;padding:6px 2px}'+
  '#visBar{position:fixed;left:50%;transform:translateX(-50%);top:calc(env(safe-area-inset-top,0px) + 10px);z-index:40;width:min(440px,calc(100vw - 24px));display:flex;flex-direction:column;gap:8px;align-items:stretch;pointer-events:none}#visBar[hidden]{display:none}'+
  '#visBar .vb-top{pointer-events:auto;background:rgba(255,255,255,.94);border-radius:16px;padding:8px 14px;box-shadow:0 0 0 3px #0B2C4A,0 4px 0 3px #0B2C4A;display:flex;flex-direction:column;align-items:center}#visBar .vb-name{font-family:var(--disp);font-weight:normal;font-size:19px;color:#0B2C4A}#visBar .vb-h{font-size:13px;color:#4A6680}'+
  '#visBar .vb-btns{display:flex;gap:8px;justify-content:center;pointer-events:auto}#visBar .btn{flex:none!important;min-height:0!important;padding:8px 14px 10px!important;font-size:16px!important}#visBar .vb-heart{background:linear-gradient(180deg,#FF8FB0,#E5386B)!important}#visBar .vb-heart.done{opacity:.75}'+
  '.achbar{display:flex;align-items:center;gap:8px;width:100%;margin:2px 0 8px;font:inherit;border:0;border-radius:14px;padding:9px 12px;background:linear-gradient(180deg,#FFF3C4,#FFD86A);box-shadow:0 0 0 3px #0B2C4A,0 4px 0 3px #0B2C4A;cursor:pointer;color:#0B2C4A;text-align:left}.achbar b{font-family:var(--disp);font-weight:normal;font-size:17px;flex:1}.achbar small{font-size:13px;color:#5A4300}.achbar em{font-style:normal;font-size:12px;color:#fff;background:#E5386B;border-radius:99px;padding:2px 8px}.ach-ico{font-size:20px}'+
  '.ach-panel{max-width:440px;max-height:88vh;display:flex;flex-direction:column;gap:8px}.ach-seg{display:flex;gap:6px}.ach-seg button{flex:1}.ach-note{margin:0;font-size:13px;color:#4A6680;text-align:center}.ach-note:empty{display:none}#achUl{list-style:none;margin:0;padding:0;overflow:auto;min-height:0;display:flex;flex-direction:column;gap:7px}'+
  '.ach-it{display:flex;align-items:center;gap:10px;background:rgba(11,44,74,.06);border-radius:14px;padding:8px 10px}.ach-it.ready{background:rgba(255,214,90,.35)}.ach-it.got{opacity:.6}.ach-tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}.ach-tx b{font-family:var(--disp);font-weight:normal;font-size:15px;color:#0B2C4A}'+
  '.ach-fish{display:flex;flex-wrap:wrap;gap:4px}.ach-fish i{width:30px;height:24px;border-radius:7px;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;color:#8A9AAA;font-family:var(--disp)}.ach-fish i.on{background:#fff}.ach-fish img{max-width:28px;max-height:20px}'+
  '.ach-bar{position:relative;height:16px;border-radius:99px;background:rgba(11,44,74,.15);overflow:hidden}.ach-bar i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#5FD06A,#2FA636)}.ach-bar span{position:relative;display:block;text-align:center;font-size:11px;line-height:16px;color:#0B2C4A;font-weight:700}'+
  '.ach-btn{flex:none;font:inherit;font-family:var(--disp);font-size:14px;border:0;border-radius:12px;padding:8px 10px;min-width:72px;color:#fff;background:linear-gradient(180deg,#5FC8F0,#1E7FC0);box-shadow:0 3px 0 #0B2C4A;cursor:pointer}.ach-btn:disabled{background:#B9C4CE;color:#fff;box-shadow:none;cursor:default}.ach-it.ready .ach-btn{background:linear-gradient(180deg,#FFB04A,#F07A12)}';
  document.head.appendChild(st)})();
