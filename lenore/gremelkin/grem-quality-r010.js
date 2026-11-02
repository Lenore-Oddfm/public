/* LENORE STUDIO / GREMELKIN R010 — focus and click-away hardening.
 * No additional save keys, pet core, network, timers or audio. */
(()=>{
 'use strict';
 const app=document.getElementById('gremelkin-app');
 const room=app?.querySelector('.grem-r008');
 const drawer=room?.querySelector('.grem-r008-drawer');
 const toolbar=room?.querySelector('.grem-r008-toolbar');
 if(!room||!drawer||!toolbar||room.classList.contains('grem-r010'))return;
 room.classList.add('grem-r010');
 drawer.setAttribute('role','dialog');
 drawer.setAttribute('aria-modal','false');
 const title=drawer.querySelector('h3');
 if(title){title.id='grem-r010-drawer-title';drawer.setAttribute('aria-labelledby',title.id)}
 for(const button of toolbar.querySelectorAll('button')){
  if(button.dataset.view)button.setAttribute('aria-controls','grem-stage');
  if(button.dataset.open==='care'||button.dataset.open==='needs')button.setAttribute('aria-controls','grem-r010-drawer');
 }
 drawer.id='grem-r010-drawer';
 function focusables(){return [...drawer.querySelectorAll('button:not([disabled]),[tabindex="0"]')].filter(e=>e.getClientRects().length>0)}
 document.addEventListener('keydown',e=>{
  if(drawer.hidden||e.key!=='Tab')return;
  const list=focusables();if(!list.length)return;
  const first=list[0],last=list.at(-1);
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus({preventScroll:true})}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus({preventScroll:true})}
  else if(!drawer.contains(document.activeElement)){e.preventDefault();first.focus({preventScroll:true})}
 },true);
 // A flyout, not another room: dismiss on outside pointerdown and let cat click proceed.
 document.addEventListener('pointerdown',e=>{
  if(drawer.hidden||drawer.contains(e.target)||toolbar.contains(e.target))return;
  drawer.querySelector('.grem-r008-close')?.click();
 },true);
})();