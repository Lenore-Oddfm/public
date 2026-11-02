/* LENORE / STUDIO / GREMELKIN R015 — flyouts anchored BELOW control buttons.
   Presentation and focus only. No pet state, saves, network or core changes. */
(()=>{
'use strict';
const room=document.querySelector('#gremelkin-app .grem-r008');
const toolbar=room?.querySelector('.grem-r008-toolbar');
const drawer=room?.querySelector('.grem-r008-drawer');
if(!room||!toolbar||!drawer||room.classList.contains('grem-r015'))return;
room.classList.add('grem-r015');
let trigger=null;
function position(){
 if(drawer.hidden)return;
 const b=room.getBoundingClientRect(),t=toolbar.getBoundingClientRect();
 trigger=toolbar.querySelector('[data-open][aria-expanded="true"]')||trigger;
 const a=trigger?.getBoundingClientRect()||t;
 const width=drawer.getBoundingClientRect().width;
 const top=Math.ceil(t.bottom-b.top+7);
 const rightLimit=Math.max(4,b.width-width-5);
 const left=Math.min(rightLimit,Math.max(5,Math.round(a.right-b.left-width)));
 room.style.setProperty('--grem-flyout-top',top+'px');
 room.style.setProperty('--grem-flyout-left',left+'px');
}
const mo=new MutationObserver(position);
mo.observe(drawer,{attributes:true,attributeFilter:['hidden']});
for(const btn of toolbar.querySelectorAll('[data-open]')){
 if(btn.dataset.open!=='care'&&btn.dataset.open!=='needs')continue;
 mo.observe(btn,{attributes:true,attributeFilter:['aria-expanded']});
 btn.addEventListener('click',()=>{trigger=btn;queueMicrotask(position)});
}
const ro=typeof ResizeObserver==='function'?new ResizeObserver(position):null;
ro?.observe(room);ro?.observe(toolbar);
window.addEventListener('resize',position,{passive:true});
window.visualViewport?.addEventListener('resize',position,{passive:true});
document.addEventListener('keydown',e=>{
 if(drawer.hidden||e.key!=='Tab')return;
 const all=[...drawer.querySelectorAll('button:not(:disabled)')].filter(el=>el.getClientRects().length);
 if(!all.length)return;
 // Unlike old focus trapping, keyboard users can reach the control that
 // opened the panel. The same button closes it on activation.
 if(e.shiftKey&&document.activeElement===all[0]){
  e.preventDefault();(trigger||toolbar.querySelector('[aria-expanded="true"]'))?.focus({preventScroll:true});
 }else if(!e.shiftKey&&document.activeElement===all[all.length-1]){
  e.preventDefault();(trigger||toolbar.querySelector('[aria-expanded="true"]'))?.focus({preventScroll:true});
 }
},true);
position();
})();
