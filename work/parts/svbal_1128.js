/* ===== 1.1.28 늑구 '심해생존 판이라는 표현도 게임으로 · 각성은 두 스킬(무기 + 짝 능력) 다 만렙일 때인데 상자 먹는 걸로 돼 있음 → 수정 ·
   레벨업이 너무 빨라 만렙이 금방 돼서 할 게 없음 → 레벨업을 더디게'
   ① 한국어 「판」 → 「게임」: T()가 한국어를 돌려줄 때 숫자+판 · 한 판 · 이번/다음/그/지난 판 · 판이/판을/판마다 … 를 게임으로(장판 · 빨판 · 시험판 · 기록판 · 막판 · 한판 승부는 그대로)
   ② 각성: 무기 6단계 + 짝 능력 5단계(최대)가 되는 순간 바로 각성(보물상자에서 각성하지 않음 · 상자는 보통 강화만)
   ③ 레벨업 곡선: 10레벨까지는 그대로, 그 뒤로 점점 더 많이 필요(무적 봇 시뮬 끝 레벨: 1장 49~54 → 22~38, 3장 53 → 41~51 · 예전엔 4분 30초 무렵 전부 최대 → 이제 한 게임 안에 다 못 채움) ===== */
function koGame(s){if(typeof s!=='string'||s.indexOf('판')<0)return s;var KOG=koGame.c||(koGame.c={}),v=KOG[s];if(v!==undefined)return v;
  v=s.replace(/(\d+|\{n\})\s?판(?=[^가-힣]|$|[이을에의마은도])/g,'$1게임').replace(/(^|[^가-힣])한 판/g,'$1한 게임').replace(/(^|[^가-힣])판(?=이|을|마다|에서|에|의|은|도|부터|까지| |$|\)|·)/g,'$1게임');
  return KOG[s]=v}
abyTr(TRT,{'5단계':'Lv 5','무기와 짝 능력을 둘 다 최고 단계로 올리면 바로 각성!':'Collect orbs to level up and pick weapons and skills. Max both a weapon and its paired skill to awaken it instantly!',
 '구슬을 모아 레벨업 · 무기와 능력을 골라요. 무기와 짝 능력을 둘 다 최고 단계로 올리면 바로 각성!':'Collect orbs to level up and pick weapons and skills. Max both a weapon and its paired skill to awaken it instantly!',
 '무기와 짝 능력을 둘 다 최대 단계로 올리면 바로 각성해요':'Max both a weapon and its paired skill to awaken it instantly'});
abyTr(TRJ,{'5단계':'Lv5','구슬을 모아 레벨업 · 무기와 능력을 골라요. 무기와 짝 능력을 둘 다 최고 단계로 올리면 바로 각성!':'玉を集めてレベルアップ · 武器と能力を選びます。武器とペアの能力を両方最高段階にするとすぐ覚醒！',
 '무기와 짝 능력을 둘 다 최대 단계로 올리면 바로 각성해요':'武器とペアの能力を両方最大まで上げるとすぐ覚醒します'});
/* ② 각성 조건: 무기 최대 + 짝 능력 최대 */
svEvoReady=function(k){if(SV._chest)return false;var w=SV.w[k],E=SV_EVO[k];return !!(w&&E&&w.lv===SV_WMAX&&(SV.pv[E.p]|0)>=SV_PMAX)};
var svChestB8=svChest;svChest=function(){SV._chest=1;try{return svChestB8.apply(this,arguments)}finally{SV._chest=0;try{svAwakeNow()}catch(e){}}};
function svAwakeNow(){for(var k in SV_EVO){if(svEvoReady(k)){SV.w[k].lv=SV_WMAX+1;try{svSeen('e',k)}catch(e){}try{svDqAdd('evo',1)}catch(e){}SV.awkPend=k;try{svSnd('evo')}catch(e){}crumb('svAwk:'+k)}}}
var svApplyB8=svApply;svApply=function(c){var r=svApplyB8.apply(this,arguments);try{svAwakeNow()}catch(e){}return r};
/* ③ 레벨업 곡선 */
svNeed=function(lv){return Math.round(3+(lv-1)*3.5+Math.max(0,lv-10)*1+Math.max(0,lv-20)*2+Math.max(0,lv-30)*3)};
