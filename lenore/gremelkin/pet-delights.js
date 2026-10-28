/* Gremelkin R005 — low-pressure discoveries. R001 pet state stays authoritative. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.GremelkinDelights=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const entries=[
  {id:'tuna',icon:'🐟',title:'The First Fish',hint:'Feed Gremelkin once.',note:'A fishbone fit for a museum.',ready:s=>s.meals>=1},
  {id:'purr',icon:'💗',title:'Purr Frequency',hint:'Build your bond to 35%.',note:'He has chosen your lap as headquarters.',ready:s=>s.affection>=35},
  {id:'mouse',icon:'🐭',title:'Mouse License',hint:'Win a mouse chase.',note:'Officially licensed to pounce.',ready:s=>s.games>=1},
  {id:'cassette',icon:'📼',title:'Night Shift Tape',hint:'Visit on three occasions.',note:'A mixtape full of mysterious purring.',ready:s=>s.visits>=3},
  {id:'owl',icon:'🌙',title:'Midnight Whisker',hint:'Visit after midnight, before five.',note:'The moon has accepted his paperwork.',ready:s=>Array.isArray(s.achievements)&&s.achievements.includes('night-owl')},
  {id:'yarn',icon:'🧶',title:'Mischief Yarn',hint:'Win three mouse chases.',note:'He insists this is a tactical device.',ready:s=>s.games>=3},
  {id:'fish',icon:'🎣',title:'Tuna Connoisseur',hint:'Serve five fish.',note:'The menu has received five tiny stars.',ready:s=>s.meals>=5},
  {id:'crown',icon:'👑',title:'Human Approved',hint:'Grow your bond to 65%.',note:'You are now staff. Gremelkin is management.',ready:s=>s.affection>=65}
 ];
 const whispers=[
  'I have purchased the moon. You may visit on weekends.',
  'The cardboard box is now an independent republic.',
  'Today’s mission: locate the warmest rectangle.',
  'I hid a purr behind the radio. Go find it.',
  'The fish union demands a second breakfast.',
  'I have renamed every star after myself.',
  'A mysterious noise? It was me. It is always me.',
  'I am not asleep. I am downloading dreams.',
  'The tape deck is haunted by excellent music.',
  'Someone moved my shadow. I suspect the furniture.',
  'The night shift needs more snacks and fewer meetings.',
  'You may borrow my favorite sunbeam. Briefly.'
 ];
 function collection(s){
  if(!s||typeof s!=='object')throw Error('Missing pet state');
  return entries.map(({id,icon,title,hint,note,ready})=>Object.freeze({id,icon,title,hint,note,unlocked:Boolean(ready(s))}));
 }
 function postcard(now=Date.now()){
  const d=new Date(now);
  if(!Number.isFinite(d.getTime()))throw Error('Invalid postcard date');
  const day=[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
  let hash=2166136261;for(const c of 'GREMELKIN:'+day){hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0}
  return Object.freeze({day,message:whispers[hash%whispers.length]});
 }
 return Object.freeze({collection,postcard});
});
