/* 아가미시티 진행 시뮬레이터: 유저 유형별로 산호궁이 며칠 만에 몇 단계에 가는지 */
const D=require('./village-data.js');
const P={
  light :{name:'가벼운 유저',ses:[21],dur:10,pearlDay:400,gemDay:0},
  normal:{name:'보통 유저',ses:[8,13,21],dur:15,pearlDay:1000,gemDay:0},
  heavy :{name:'열심 유저',ses:[7,10,13,16,19,22],dur:20,pearlDay:2500,gemDay:40},
};
function run(type,days,opt){opt=opt||{};const pf=P[type];
  const S={lv:{},res:{pearl:1500,stone:800,brick:0,nail:0},gems:0,jobs:[],log:{},block:{},snap:{},spent:{pearl:0,gem:0}};
  Object.keys(D.B).forEach(k=>S.lv[k]=0);S.lv.hall=1;
  const lv=k=>S.lv[k],busy=k=>S.jobs.some(j=>j.id===k);
  const POPREQ=L=>L<3?0:Math.round(1.4*L*L),PUB={diner:10,school:14,clinic:18,aqua:10,palace:30};
  const lim=()=>30+6*lv('hall')+Object.keys(PUB).reduce((a,k)=>a+PUB[k]*lv(k),0);
  const popOk=L=>POPREQ(L)<=lim()*.85;
  const met=(id,L)=>D.needs(id,L).every(([k,l])=>lv(k)>=l)&&(id!=='hall'||popOk(L));
  const can=(c)=>Object.keys(c).every(k=>(S.res[k]||0)>=c[k]);
  const pay=(c)=>{for(const k in c){S.res[k]-=c[k];if(k==='pearl')S.spent.pearl+=c[k]}};
  const open=id=>id==='hall'||lv('hall')>=D.B[id].at;
  function start(id){const L=lv(id)+1;S.jobs.push({id,L,left:D.time(id,L)});pay(D.cost(id,L))}
  /* 다음 산호궁에 필요한 것 중 지금 시작할 수 있는 것 */
  function critical(){if(lv('hall')>=D.HMAX)return [];const out=[];const seen={};
    (function walk(id,L){const key=id+L;if(seen[key])return;seen[key]=1;if(lv(id)>=L)return;
      if(lv(id)+1<L){walk(id,lv(id)+1)}
      D.needs(id,lv(id)+1).forEach(([k,l])=>{if(lv(k)<l)walk(k,l)});
      if(lv(id)+1===L&&met(id,L)&&!busy(id)&&open(id))out.push(id)})('hall',lv('hall')+1);return out}
  function session(day,first){
    /* 주문판 · 열차 · 항구 보상(들어와야 받음) */
    if(first){S.res.pearl+=pf.pearlDay*(1+day/90)/pf.ses.length;if(lv('turtle')){const L=lv('hall'),n=Math.min(3,1+L/10);S.res.pearl+=Math.min(3,3+Math.floor(lv('turtle')/2))*.7*n*10*(1+.35*L)*(pf.ordK||.6)}
    S.res.brick+=3*lv('train');S.res.nail+=1*lv('port');S.gems+=pf.gemDay/pf.ses.length;}
    let guard=0;
    while(S.jobs.length<D.crabs(lv('crab'))&&guard++<20){
      const all=critical();if(first&&guard===1&&all.length){const blk=all.find(id=>!can(D.cost(id,lv(id)+1)));if(blk&&S.jobs.length===0){const c=D.cost(blk,lv(blk)+1);const k=Object.keys(c).find(k=>(S.res[k]||0)<c[k]);S.block[k]=(S.block[k]||0)+1}else if(S.jobs.length)S.block.time=(S.block.time||0)+1}
      let all2=all;if(lv('hall')<D.HMAX&&D.needs('hall',lv('hall')+1).every(([k,l])=>lv(k)>=l)&&!popOk(lv('hall')+1)){S.block.pop=(S.block.pop||0)+(first&&guard===1?1:0);all2=Object.keys(PUB).filter(k=>open(k)&&!busy(k)&&lv(k)<lv('hall')&&met(k,lv(k)+1)).sort((a,b)=>lv(a)-lv(b))}
      const cr=all2.filter(id=>can(D.cost(id,lv(id)+1)));
      if(cr.length){start(cr[0]);continue}
      /* 남는 진주로 옆 건물(생산 먼저) — 다음 핵심 비용의 2배 넘게 있을 때만 */
      const nextNeed=critical()[0],reserve=nextNeed?D.cost(nextNeed,lv(nextNeed)+1).pearl*2:0;
      const side=Object.keys(D.B).filter(k=>k!=='hall'&&open(k)&&!busy(k)&&lv(k)<lv('hall')&&met(k,lv(k)+1))
        .sort((a,b)=>(D.B[b].prod?1:0)-(D.B[a].prod?1:0)||lv(a)-lv(b))
        .find(k=>{const c=D.cost(k,lv(k)+1);return can(c)&&S.res.pearl-c.pearl>=reserve});
      if(side){start(side);continue}break}
    /* 보석: 산호궁 공사 남은 시간에 씀 */
    if(pf.gemDay){const j=S.jobs.find(j=>j.id==='hall')||S.jobs[0];if(j){const g=D.rushGems(j.left);const use=Math.min(Math.floor(S.gems),g);if(use>0){j.left-=use*60;S.gems-=use;S.spent.gem+=use}}}
  }
  for(let m=0;m<days*1440;m++){const day=Math.floor(m/1440),h=(m%1440)/60;
    /* 생산(분당) · 창고 한도 */
    const cap=D.storeCap(lv('store'));
    ['quarry','kiln','pearl','farm'].forEach(id=>{const p=D.prodPerHour(id,lv(id));for(const k in p){if(k==='kelp')continue;
      if(k==='brick'){if(S.res.stone>2000&&S.res.brick<Math.min(cap/4,+(process.env.BT||5000))){const use=Math.min(S.res.stone,p[k]/60*4);S.res.stone-=use;S.res.brick+=use/4}}
      else if(k==='pearl')S.res.pearl+=p[k]/60;else S.res[k]=Math.min(k==='nail'?cap/10:cap,S.res[k]+p[k]/60)}});
    S.jobs.forEach(j=>{j.left-=60;if(j.left<=300&&!opt.noFree)j.left=Math.min(j.left,0)});/* 5분 이하는 무료로 바로 */
    if(m%1440===0&&[30,60,90].includes(m/1440))S.snap[m/1440]={hall:lv('hall'),pearl:Math.round(S.res.pearl),stone:Math.round(S.res.stone),brick:Math.round(S.res.brick),nail:Math.round(S.res.nail)};
    S.jobs=S.jobs.filter(j=>{if(j.left<=0){S.lv[j.id]=j.L;if(j.id==='hall')S.log[j.L]=+(m/1440).toFixed(1);return false}return true});
    const mm=m%1440;for(const s of pf.ses){const d=mm-s*60;if(d>=0&&d<(day===0?40:pf.dur)){session(day,d===0);break}}}
  return S}
function report(){const out={};for(const t of Object.keys(P)){const S=run(t,200);out[t]=S}
  const marks=[5,10,15,20,25];
  console.log('산호궁 도달 날짜(일차)');console.log('단계\t'+Object.keys(P).map(t=>P[t].name).join('\t'));
  marks.forEach(L=>console.log('Lv.'+L+'\t'+Object.keys(P).map(t=>out[t].log[L]!=null?out[t].log[L]:'-').join('\t')));
  Object.keys(P).forEach(t=>{const S=out[t];console.log(P[t].name,'막힌 이유(세션수)',JSON.stringify(S.block),'스냅',JSON.stringify(S.snap));console.log(P[t].name,'200일 뒤 산호궁',S.lv.hall,'· 진주 쓴 총량',Math.round(S.spent.pearl),'· 보석',S.spent.gem,'· 건물 평균 Lv',(Object.values(S.lv).reduce((a,b)=>a+b,0)/Object.keys(S.lv).length).toFixed(1))});
  return out}
if(require.main===module){const o=report();if(process.argv[2]==='full'){const t=process.argv[3]||'normal';console.log(JSON.stringify(o[t].log))}}
module.exports={run,P};
