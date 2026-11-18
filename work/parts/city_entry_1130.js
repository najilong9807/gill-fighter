/* 아가미시티(물고기 마을) 입구 — 1.1.30 시험 붙임
   - 홈 위쪽 아이콘 줄에 🏘 '마을' 버튼
   - 누르면 city.html을 화면 가득 띄움(iframe). 마을은 진주 · 보석을 아가미 파이터와 같은 지갑으로 씀(window.GF_WALLET)
   - 마을 저장은 같은 기기 localStorage 'gfcity.v1'(본게임 save와 따로) · 저장 백업에는 같이 실림 */
(function(){
  window.GF_WALLET={get:function(k){return k==='pearl'?(save.pearls|0):(save.gems|0)},
    add:function(k,n){n=Math.round(n)||0;if(k==='pearl')save.pearls=Math.max(0,(save.pearls|0)+n);else save.gems=Math.max(0,(save.gems|0)+n);try{persist()}catch(e){}try{refreshHome()}catch(e){}}};
  /* 저장 백업에 마을 저장도 같이: 맡길 때 save.city로 싣고, 불러올 때 'gfcity.v1'로 되돌림.
     city 칸이 없는 옛 백업이면 이 폰의 마을은 그대로 두고, 있으면(null 포함) 그 백업의 마을로 바꿈. 바꾸기 전 것은 'gfcity.v1.bak'에 한 벌 남김 */
  var CK='gfcity.v1',_cd=cloudData,_ca=cloudApply;
  cloudData=function(){var o=_cd();o.city=null;try{var c=localStorage.getItem(CK);if(c&&c.length<250000)o.city=JSON.parse(c)}catch(e){}return o};
  cloudApply=function(code,d){try{if(d&&('city' in d)){var old=localStorage.getItem(CK);if(old)localStorage.setItem(CK+'.bak',old);if(d.city&&typeof d.city==='object')localStorage.setItem(CK,JSON.stringify(d.city));else localStorage.removeItem(CK);delete d.city}}catch(e){}_ca(code,d)};
  var ov=null;
  function open(){if(ov)return;ov=document.createElement('div');ov.id='cityOv';ov.style.cssText='position:fixed;inset:0;z-index:9000;background:#1d5f86';
    var f=document.createElement('iframe');f.src='city.html?lang='+((typeof SUBL==='string'&&SUBL)||LANG||'ko');f.title='아가미시티';f.style.cssText='border:0;width:100%;height:100%;display:block';ov.appendChild(f);document.body.appendChild(ov);
    try{if(window.Bgm&&Bgm.pause)Bgm.pause()}catch(e){}}
  window.GF_CITY_CLOSE=function(){if(!ov)return;ov.remove();ov=null;try{refreshHome()}catch(e){}};
  window.GF_CITY_OPEN=open;
  var rb=document.getElementById('rbxBtn');if(rb&&!document.getElementById('cityBtn')){var b=document.createElement('button');b.className='iconbtn';b.id='cityBtn';b.type='button';b.setAttribute('aria-label','아가미시티');b.setAttribute('data-lab','마을');
    b.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="15" width="18" height="12" rx="2" fill="#FFD7E0" stroke="#0B2C4A" stroke-width="2.4"/><path d="M8 16 Q16 3 24 16Z" fill="#FFD04A" stroke="#0B2C4A" stroke-width="2.4" stroke-linejoin="round"/><rect x="14" y="20" width="4" height="7" rx="2" fill="#7A4A3A"/><circle cx="16" cy="6" r="2" fill="#fff" stroke="#0B2C4A" stroke-width="1.6"/></svg>';
    b.onclick=open;rb.parentNode.insertBefore(b,rb)}
})();
