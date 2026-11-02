/* GREMELKIN R007: single-screen CAT / CARE / GAMES with proper flyouts.
 * Presentation-only enhancement. Keeps R001 save and existing UI event owners.
 */
(function(){
 'use strict';
 const app=document.getElementById('gremelkin-app');
 if(!app || !document.documentElement.classList.contains('terminal-ready'))return;
 const room=app.querySelector('.grem-room');
 const layout=app.querySelector('.grem-layout');
 const stage=app.querySelector('#grem-stage');
 const controls=app.querySelector('.grem-controls');
 const game=app.querySelector('#grem-game');
 const box=app.querySelector('#grem-box-overlay');
 const dialogue=app.querySelector('#grem-dialogue');
 if(!room||!layout||!stage||!controls||!game||!box||!dialogue||app.querySelector('.grem-r007-top'))return;
 room.classList.add('grem-r007');room.dataset.gremMode='cat';
 const top=document.createElement('div');
 top.className='grem-r007-top';
 top.innerHTML=`<div class="grem-r007-id"><strong>GREMELKIN</strong><span>CAT.EXE / NIGHT SHIFT COMPANION</span></div>
  <div class="grem-r007-ops"><div class="grem-r007-tabs" role="tablist" aria-label="Gremelkin rooms">
    <button type="button" role="tab" data-grem-mode="cat" aria-selected="true">🐈 CAT</button>
    <button type="button" role="tab" data-grem-mode="care" aria-selected="false">♥ CARE</button>
    <button type="button" role="tab" data-grem-mode="games" aria-selected="false">✦ GAMES</button>
   </div><div class="grem-r007-flyouts">
    <button type="button" id="grem-r007-vitals" aria-controls="grem-r007-drawer" aria-expanded="false">▣ VITALS</button>
    <button type="button" id="grem-r007-treasures">✧ TREASURES</button>
   </div></div>`;
 room.insertBefore(top,layout);
 // Move the EXISTING elements instead of cloning state or replacing event listeners.
 stage.append(game);
 room.insertBefore(dialogue,room.querySelector('.grem-footer'));
 const hub=document.createElement('div');hub.className='grem-r007-hub';
 hub.innerHTML=`<div class="grem-r007-hub-title">CHOOSE A GAME <small>NO PENALTIES. JUST MISCHIEF.</small></div>
  <div class="grem-r007-gamecards">
   <button type="button" data-grem-play="mouse"><span>🐭</span><strong>LASER MOUSE</strong><small>Catch five in 18 seconds</small></button>
   <button type="button" data-grem-play="boxes"><span>📦</span><strong>HIDE &amp; SEEK</strong><small>Find the cat in three rounds</small></button>
  </div>`;
 stage.append(hub);
 const drawer=document.createElement('aside');
 drawer.id='grem-r007-drawer';drawer.className='grem-r007-drawer';drawer.hidden=true;
 drawer.setAttribute('aria-label','Gremelkin vital statistics flyout');
 drawer.innerHTML=`<div class="grem-r007-drawerhead"><strong>▣ GREMELKIN / VITALS</strong><button type="button" id="grem-r007-close">✕ CLOSE</button></div>
  <div class="grem-r007-vital-list"></div><p class="grem-r007-drawer-note">These are local pet readings. World cat doors are not connected.</p>
  <button type="button" id="grem-r007-save">▥ SAVE / RESTORE</button>`;
 room.append(drawer);
 const tabs=[...top.querySelectorAll('[data-grem-mode]')];
 const vitals=top.querySelector('#grem-r007-vitals');
 const statList=drawer.querySelector('.grem-r007-vital-list');
 let lastFocus=null;
 const labels={hunger:['🐟 FULL','fish'],energy:['☾ ENERGY','sleep'],fun:['✦ FUN','play'],clean:['✧ FLUFF','brush']};
 function renderVitals(){
  statList.replaceChildren();
  for(const [key,[name]] of Object.entries(labels)){
   const origin=app.querySelector(`.grem-vitals [data-stat="${key}"]`);
   const val=origin?.querySelector('output')?.textContent||'--';
   const row=document.createElement('div');row.className='grem-r007-vital';
   const caption=document.createElement('div');caption.className='grem-r007-vital-label';
   const a=document.createElement('span');a.textContent=name;const b=document.createElement('strong');b.textContent=val;caption.append(a,b);
   const track=document.createElement('div');track.className='grem-r007-track';
   const fill=document.createElement('i');const num=Number.parseInt(val,10);fill.style.width=(Number.isFinite(num)?Math.max(0,Math.min(100,num)):0)+'%';track.append(fill);
   row.append(caption,track);statList.append(row);
  }
  const memo=document.createElement('p');memo.className='grem-r007-memories';
  memo.textContent=app.querySelector('#grem-memory')?.textContent||'Your memories remain in this browser.';
  statList.append(memo);
 }
 function closeDrawer(restore=true){
  if(drawer.hidden)return;
  drawer.hidden=true;vitals.setAttribute('aria-expanded','false');
  if(restore)(lastFocus||vitals).focus({preventScroll:true});
 }
 function openDrawer(){lastFocus=document.activeElement;renderVitals();drawer.hidden=false;vitals.setAttribute('aria-expanded','true');drawer.querySelector('#grem-r007-close').focus({preventScroll:true});}
 vitals.addEventListener('click',()=>drawer.hidden?openDrawer():closeDrawer());
 drawer.querySelector('#grem-r007-close').addEventListener('click',()=>closeDrawer());
 drawer.querySelector('#grem-r007-save').addEventListener('click',()=>{
   closeDrawer(false);
   const btn=document.querySelector('.ctl-toptools [data-drawer="backpack"]');
   if(btn)btn.click();else app.querySelector('#grem-export')?.click();
 });
 top.querySelector('#grem-r007-treasures').addEventListener('click',()=>{
  closeDrawer(false);app.querySelector('#grem-treasures')?.click();
 });
 function setMode(mode,focus=false){
  if(!['cat','care','games'].includes(mode))return;
  // Leaving GAMES closes active overlays; no invisible timers over other rooms.
  if(mode!=='games'){
   if(!game.hidden)app.querySelector('#grem-cancel')?.click();
   if(!box.hidden)app.querySelector('#grem-box-close')?.click();
  }
  room.dataset.gremMode=mode;
  tabs.forEach(btn=>{
   const selected=btn.dataset.gremMode===mode;
   btn.setAttribute('aria-selected',String(selected));btn.tabIndex=selected?0:-1;
   if(selected&&focus)btn.focus({preventScroll:true});
  });
  closeDrawer(false);
 }
 top.querySelector('.grem-r007-tabs').addEventListener('click',e=>{
  const btn=e.target.closest('[data-grem-mode]');if(btn)setMode(btn.dataset.gremMode);
 });
 top.querySelector('.grem-r007-tabs').addEventListener('keydown',e=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
  e.preventDefault();const current=tabs.indexOf(document.activeElement);let target=0;
  if(e.key==='Home')target=0;else if(e.key==='End')target=tabs.length-1;
  else target=(current+(e.key==='ArrowLeft'?-1:1)+tabs.length)%tabs.length;
  setMode(tabs[target].dataset.gremMode,true);
 });
 hub.querySelectorAll('[data-grem-play]').forEach(btn=>btn.addEventListener('click',()=>{
  if(btn.dataset.gremPlay==='mouse')app.querySelector('#grem-actions [data-act="laser"]')?.click();
  else app.querySelector('#grem-box-toggle')?.click();
 }));
 // Quick-care popovers can also launch laser; follow the game into its own room.
 const obs=new MutationObserver(()=>{
  if(!game.hidden || !box.hidden)setMode('games');
 });
 obs.observe(game,{attributes:true,attributeFilter:['hidden']});
 obs.observe(box,{attributes:true,attributeFilter:['hidden']});
 const vitalObserver=new MutationObserver(()=>{if(!drawer.hidden)renderVitals()});
 vitalObserver.observe(app.querySelector('.grem-vitals'),{childList:true,characterData:true,subtree:true});
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!drawer.hidden){e.preventDefault();e.stopImmediatePropagation();closeDrawer();}
 },true);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)closeDrawer(false)});
 setMode('cat');
})();
