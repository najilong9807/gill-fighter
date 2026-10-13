import sys
src,dst=sys.argv[1],sys.argv[2]
h=open(src,encoding='utf-8').read()
hook=r"""window.__st=function(){return ['fish'+fish.length,'pl'+plank.length,'fx'+fxs.length,'tx'+texts.length,'rg'+rings.length,'tr'+trail.length,'amb'+amb.length,'ink'+inks.length,'bots'+bots.length,state,'y'+Math.round(P.y/H*100)+'%','s'+Math.round(P.s),'z'+zoom.toFixed(2)]};
window.__drive=function(){window.__wt=setInterval(function(){if(state!=='play')return;var t=performance.now()/1000;joy={id:1,ox:200,oy:400,x:200+Math.cos(t*.4)*90,y:400+Math.sin(t*.3)*60+25};P.fx=P.fx||{};P.fx.ghost=2;if(Math.random()<.01){try{useSkill()}catch(e){}}},100)};
window.__eat=function(n){var k=0;for(var j=0;j<n;j++){var er=eatRatio(),i;for(i=0;i<fish.length;i++){var q=fish[i];if(!q.peerEnt&&q.s<=P.s*er){consume(q,i);k++;break}}if(i>=fish.length){for(var m=0;m<8;m++)spawnFish(false)}}return [k,P.s|0,cmOf(P.s)|0,runGain(false),P.grownW|0]};
function boot(){"""
assert h.count('function boot(){')==1
h=h.replace('function boot(){',hook,1)
for k,v in [('top','--sat'),('bottom','--sab'),('left','--sal'),('right','--sar')]:
    h=h.replace('env(safe-area-inset-%s,0px)'%k,'var(%s,0px)'%v)
open(dst,'w',encoding='utf-8').write(h)
