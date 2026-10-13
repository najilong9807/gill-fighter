/* ===== 1.1.11 수족관 사진 공유: 구경 모드에서 '사진 공유'를 누르면 지금 보이는 수족관을 아래 띠(게임 이름)와 함께 한 장으로 만들어 공유 창에 넣는다 ===== */
Object.assign(TRT,{"사진 공유":"Share photo","내 수족관":"My Aquarium","내 수족관 구경 와요!":"Come see my aquarium!"});
function tankShot(btn){if(btn.dataset.busy||page!=='tank')return;btn.dataset.busy='1';crumb('tankShot');
  var src=$('game'),W=src.width,H=src.height;if(!W||!H){delete btn.dataset.busy;return}
  var k=Math.min(1,1500/Math.max(W,H)),w=Math.round(W*k),h=Math.round(H*k),band=Math.round(w*.13),c=document.createElement('canvas');c.width=w;c.height=h+band;var x=c.getContext('2d');
  try{x.drawImage(src,0,0,w,h)}catch(e){delete btn.dataset.busy;return}
  var g=x.createLinearGradient(0,h,0,h+band);g.addColorStop(0,'#1C6FA8');g.addColorStop(1,'#0B3D6B');x.fillStyle=g;x.fillRect(0,h,w,band);
  x.fillStyle='rgba(255,255,255,.35)';x.fillRect(0,h,w,Math.max(2,band*.04));
  cardTxt(x,T('아가미 파이터'),w*.05,h+band*.52,Math.round(band*.4),'#FFE27A',Math.max(3,band*.07),'left');
  var nm=(save.nick?save.nick+' · ':'')+T('내 수족관');cardTxt(x,nm,w*.95,h+band*.52,cardFit(x,nm,w*.45,Math.round(band*.3)),'#fff',Math.max(2,band*.05),'right');
  var fl=document.createElement('div');fl.className='tkflash';document.body.appendChild(fl);setTimeout(function(){fl.remove()},450);buzz(15);
  shareImg(c,T('내 수족관 구경 와요!'),null,null,function(){delete btn.dataset.busy})}
(function(){var b=document.createElement('button');b.type='button';b.id='tkShot';
  b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h2l1.4-2h6.2l1.4 2h2A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" fill="#fff" stroke="#0B2C4A" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="13" r="4" fill="#9FD8F5" stroke="#0B2C4A" stroke-width="2"/></svg><span></span>';
  b.querySelector('span').textContent=T('사진 공유');
  ['pointerdown','pointerup','click'].forEach(function(ev){b.addEventListener(ev,function(e){e.stopPropagation();if(ev==='click')tankShot(b)})});document.body.appendChild(b);
  var st=document.createElement('style');st.textContent='#tkShot{display:none}body.tkview #tkShot{display:flex;align-items:center;gap:7px;position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 26px);transform:translateX(-50%);z-index:45;font:inherit;font-family:var(--disp);font-size:17px;color:#fff;border:0;border-radius:99px;padding:10px 18px 11px 14px;cursor:pointer;background:linear-gradient(180deg,#5FC8F0,#1E7FC0);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 0 0 3px #0B2C4A,0 5px 0 3px #0B2C4A;-webkit-text-stroke:3px #0B2C4A;paint-order:stroke fill}'+
   'body.tkview #tkShot svg{width:24px;height:24px}body.tkview #tkShot[data-busy]{opacity:.6}.tkflash{position:fixed;inset:0;z-index:60;background:#fff;pointer-events:none;animation:tkfl .45s ease-out forwards}@keyframes tkfl{0%{opacity:.85}100%{opacity:0}}';
  document.head.appendChild(st)})();
