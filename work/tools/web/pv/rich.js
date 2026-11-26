// 미리보기용 풍성한 저장: 물고기 다 · 진주/보석 · 수족관 궁전 · 소품
module.exports=`(function(){try{save.owned=SPECIES.map(function(s){return s.id});save.pearls=48210;save.gems=137;
var h=HS();h.lv=HOUSE.length-1;
var d=DS(),W=TWW(),ids=DECOR.filter(function(D){return !D.pv&&!D.gem&&!D.hw}).map(function(D){return D.id});
var pick=['palace','castle','coraltree','chest','shell','anemone','kelp','lantern','bigshell','arch'];var L=[];pick.forEach(function(k){if(ids.indexOf(k)>=0)L.push(k)});
for(var i=0;L.length<9&&i<ids.length;i+=Math.max(1,Math.floor(ids.length/9)))if(L.indexOf(ids[i])<0)L.push(ids[i]);
d.placed=d.placed.slice(0,4);L.forEach(function(k,j){var D=decoById(k);if(!D)return;var nx=.08+j*.1;d.placed.push({k:k,x:nx,y:clamp((floorAt(nx*W)+ch*.03-decoW(D,1)*decoAR(D)*.42)/ch,.25,.95),s:1,f:j%2})});
persist();return 'ok '+save.owned.length+' decos '+d.placed.map(function(q){return q.k}).join(',')}catch(e){return 'ERR '+e.message}})()`;
