// 가짜 시계: 화면을 한 장씩 찍는 동안 게임 시간을 정확히 1/30초씩만 흐르게 한다
module.exports=`(()=>{let vt=0,auto=true;const base=Date.now(),rSI=window.setInterval.bind(window);let q=[],tid=1;const T=new Map();
performance.now=()=>vt;Date.now=()=>Math.round(base+vt);
window.requestAnimationFrame=cb=>{const id=tid++;q.push([id,cb]);return id};window.cancelAnimationFrame=id=>{q=q.filter(x=>x[0]!==id)};
window.setTimeout=(f,ms,...a)=>{const id=tid++;T.set(id,{t:vt+(+ms||0),f,a});return id};window.clearTimeout=id=>{T.delete(id)};
window.setInterval=(f,ms,...a)=>{const id=tid++,iv=Math.max(4,+ms||0);T.set(id,{t:vt+iv,f,a,iv});return id};window.clearInterval=window.clearTimeout;
const run=o=>{try{typeof o.f==='function'?o.f(...o.a):(0,eval)(o.f)}catch(e){console.error('pvT',e&&e.message)}};
window.__adv=ms=>{const end=vt+ms;for(let g=0;g<5000;g++){let b=null,bi;for(const [i,o] of T)if(o.t<=end&&(!b||o.t<b.t)){b=o;bi=i}if(!b)break;vt=Math.max(vt,b.t);if(b.iv)b.t+=b.iv;else T.delete(bi);run(b)}
 vt=end;if(window.__pre)try{window.__pre()}catch(e){}const c=q;q=[];for(const [,cb] of c)try{cb(vt)}catch(e){console.error('pvR',e&&e.message)}};
window.__auto=v=>{auto=v};rSI(()=>{if(auto)window.__adv(1000/30)},33);})();`;
