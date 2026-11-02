/* GREMELKIN R008: one HOME room, CARE / NEEDS flyouts, distinct ARCADE.
 * Presentation-only. Reuses existing buttons, pet handlers and R001 local saves. */
(()=>{
'use strict';
const doc=document,app=doc.getElementById('gremelkin-app');
if(!app||!doc.documentElement.classList.contains('terminal-ready'))return;
const room=app.querySelector('.grem-room'),stage=app.querySelector('#grem-stage'),game=app.querySelector('#grem-game'),
 boxes=app.querySelector('#grem-box-overlay'),sprite=app.querySelector('#grem-sprite'),controls=app.querySelector('.grem-controls');
if(!room||!stage||!game||!boxes||!sprite||!controls||room.classList.contains('grem-r008'))return;
room.classList.add('grem-r008');room.dataset.view='home';
stage.append(game);
const dialogue=app.querySelector('#grem-dialogue');
if(dialogue)room.insertBefore(dialogue,room.querySelector('.grem-footer'));
const toolbar=doc.createElement('nav');toolbar.className='grem-r008-toolbar';
toolbar.setAttribute('aria-label','Gremelkin room controls');
toolbar.innerHTML=`<div class="grem-r008-name"><strong>GREMELKIN</strong><small>ODD FM · NIGHT CAT</small></div>
<div class="grem-r008-buttons">
<button type="button" data-view="home" aria-pressed="true">🐈 HOME</button>
<button type="button" data-view="arcade" aria-pressed="false">✦ ARCADE</button>
<button type="button" data-open="care" aria-expanded="false">♥ CARE</button>
<button type="button" data-open="needs" aria-expanded="false">▣ NEEDS</button>
<button type="button" data-open="treasures">✧ TREASURES</button></div>`;
room.insertBefore(toolbar,room.querySelector('.grem-layout'));
const scene=doc.createElement('div');scene.className='grem-r008-decor';scene.setAttribute('aria-hidden','true');
scene.innerHTML='<div class="grem-r008-moon">☾<small>ODD FM</small></div><div class="grem-r008-radio">♫<small>ON AIR</small></div>';
stage.prepend(scene);
const arcade=doc.createElement('div');arcade.className='grem-r008-arcade';
arcade.innerHTML=`<h3>THE NIGHT CAT ARCADE</h3><p>Two games. No chores, no punishment.</p>
<div class="grem-r008-cards"><button type="button" data-play="mouse"><span>🐭</span><b>LASER MOUSE</b><small>Find five in 18 seconds</small></button>
<button type="button" data-play="boxes"><span>📦</span><b>HIDE &amp; SEEK</b><small>Catch the cat in three boxes</small></button></div>`;
stage.append(arcade);
const drawer=doc.createElement('aside');drawer.className='grem-r008-drawer';drawer.hidden=true;
drawer.setAttribute('aria-label','Gremelkin flyout');
drawer.innerHTML=`<div class="grem-r008-drawer-head"><h3>CARE</h3>
<button type="button" class="grem-r008-close" aria-label="Close flyout">✕ CLOSE</button></div>
<div class="grem-r008-drawer-content"></div>`;
room.append(drawer);
const content=drawer.querySelector('.grem-r008-drawer-content');
const actionBox=doc.createElement('div');actionBox.className='grem-r008-care-items';
[...stage.querySelectorAll('.grem-item')].forEach(btn=>actionBox.append(btn));
const help=doc.createElement('p');help.className='grem-r008-help';
help.textContent='Tap a tool to care for Gremelkin. On desktop, you can drag a tool onto him.';
let currentDrawer=null,focusReturn=null;
const buttons=[...toolbar.querySelectorAll('button')];
function toggleButtons(){buttons.forEach(b=>{
 if(b.dataset.view)b.setAttribute('aria-pressed',String(b.dataset.view===room.dataset.view));
 if(b.dataset.open&&(b.dataset.open==='care'||b.dataset.open==='needs'))
 b.setAttribute('aria-expanded',String(b.dataset.open===currentDrawer));
});}
function closeDrawer(restore=true){
 if(drawer.hidden)return;
 drawer.hidden=true;currentDrawer=null;toggleButtons();
 if(restore&&focusReturn&&focusReturn.isConnected)focusReturn.focus({preventScroll:true});
}
function needs(){
 const wrap=doc.createElement('div');wrap.className='grem-r008-needs';
 const labels={hunger:'🐟 FULL',energy:'☾ ENERGY',fun:'✦ FUN',clean:'✧ FLUFF'};
 for(const [key,label] of Object.entries(labels)){
  const source=controls.querySelector(`[data-stat="${key}"] output`);
  const value=source?.textContent||'--',item=doc.createElement('div');item.className='grem-r008-need';
  const header=doc.createElement('div'),a=doc.createElement('span'),b=doc.createElement('b');
  a.textContent=label;b.textContent=value;header.append(a,b);
  const bar=doc.createElement('div');bar.className='grem-r008-bar';const fill=doc.createElement('i');
  const n=parseInt(value,10);fill.style.width=(Number.isFinite(n)?Math.min(100,Math.max(0,n)):0)+'%';
  bar.append(fill);item.append(header,bar);wrap.append(item);
 }
 const memory=doc.createElement('p');memory.className='grem-r008-memory';
 memory.textContent=app.querySelector('#grem-memory')?.textContent||'';wrap.append(memory);
 return wrap;
}
function showDrawer(which,button){
 if(currentDrawer===which){closeDrawer();return}
 // CARE uses the actual cat as its target. Leaving ARCADE must reveal the pet.
 // Existing game close buttons own any score/timeout cleanup.
 if(which==='care'&&room.dataset.view!=='home')setView('home');
 if(!drawer.hidden)closeDrawer(false);
 focusReturn=button;currentDrawer=which;content.replaceChildren();
 drawer.querySelector('h3').textContent=which==='care'?'♥ CARE TOOLS':'▣ HOW IS GREMELKIN?';
 if(which==='care')content.append(actionBox,help);else content.append(needs());
 drawer.hidden=false;toggleButtons();drawer.querySelector('.grem-r008-close').focus({preventScroll:true});
}
function setView(view){
 if(view!=='home'&&view!=='arcade')return;
 if(view==='home'){
  if(!game.hidden)app.querySelector('#grem-cancel')?.click();
  if(!boxes.hidden)app.querySelector('#grem-box-close')?.click();
 }
 room.dataset.view=view;closeDrawer(false);toggleButtons();
}
toolbar.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.view){setView(b.dataset.view);return}
 if(b.dataset.open==='care'||b.dataset.open==='needs'){showDrawer(b.dataset.open,b);return}
 if(b.dataset.open==='treasures'){closeDrawer(false);app.querySelector('#grem-treasures')?.click()}
});
drawer.querySelector('.grem-r008-close').addEventListener('click',()=>closeDrawer());
arcade.addEventListener('click',e=>{
 const b=e.target.closest('[data-play]');if(!b)return;
 if(b.dataset.play==='mouse')app.querySelector('#grem-actions [data-act="laser"]')?.click();
 else app.querySelector('#grem-box-toggle')?.click();
});
const observer=new MutationObserver(()=>{
 if(!game.hidden||!boxes.hidden){room.dataset.view='arcade';toggleButtons()}
});
observer.observe(game,{attributes:true,attributeFilter:['hidden']});
observer.observe(boxes,{attributes:true,attributeFilter:['hidden']});
doc.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&!drawer.hidden){e.preventDefault();e.stopImmediatePropagation();closeDrawer()}
},true);
doc.addEventListener('visibilitychange',()=>{if(doc.hidden)closeDrawer(false)});
const statObserver=new MutationObserver(()=>{if(currentDrawer==='needs')content.replaceChildren(needs())});
const statSource=controls.querySelector('.grem-vitals');
if(statSource)statObserver.observe(statSource,{childList:true,characterData:true,subtree:true});
toggleButtons();
})();