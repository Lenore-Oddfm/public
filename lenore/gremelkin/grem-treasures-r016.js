/* GREMELKIN R016 — treasures in a local popover BELOW its visible button.
 * Read-only presentation of the existing collection. No save schema changes. */
(()=>{
'use strict';
const room=document.querySelector('#gremelkin-app .grem-r008');
const toolbar=room?.querySelector('.grem-r008-toolbar');
const trigger=toolbar?.querySelector('[data-open="treasures"]');
if(!room||!toolbar||!trigger||room.classList.contains('grem-r016'))return;
room.classList.add('grem-r016');
const popup=document.createElement('aside');
popup.className='grem-treasures-r016';popup.id='grem-treasures-r016';popup.hidden=true;
popup.setAttribute('aria-label','Gremelkin treasures');
popup.innerHTML=`<header class="grem-treasures-head"><strong>✧ TINY TREASURES</strong><button type="button" data-t-close aria-label="Close treasures">✕ CLOSE</button></header><p class="grem-treasures-count" aria-live="polite"></p><div class="grem-treasures-grid"></div><div class="grem-treasures-pager"><button type="button" data-t-prev>◀ PREV</button><output aria-live="polite"></output><button type="button" data-t-next>NEXT ▶</button></div><button type="button" class="grem-treasures-postcard" data-t-postcard>✉ GREM'S DAILY MISCHIEF</button><p class="grem-treasures-message" role="status" aria-live="polite">One peculiar story a day.</p>`;
room.append(popup);
trigger.setAttribute('aria-controls',popup.id);trigger.setAttribute('aria-expanded','false');
let page=0, opened=false;
const $=sel=>popup.querySelector(sel);
function pageSize(){return room.getBoundingClientRect().height<440?2:4;}
function position(){
 if(!opened)return;
 const r=room.getBoundingClientRect(),b=toolbar.getBoundingClientRect(),t=trigger.getBoundingClientRect();
 const width=popup.getBoundingClientRect().width;
 room.style.setProperty('--grem-treasures-top',Math.max(0,Math.ceil(b.bottom-r.top+7))+'px');
 room.style.setProperty('--grem-treasures-left',Math.min(Math.max(5,r.width-width-5),Math.max(5,t.right-r.left-width))+'px');
}
function render(){
 const list=window.GremelkinCompanion?.collection?.()||[];
 const per=pageSize();page=Math.max(0,Math.min(page,Math.max(0,Math.ceil(list.length/per)-1)));
 const unlocked=list.filter(x=>x.unlocked).length;
 $('.grem-treasures-count').textContent=unlocked+' / '+list.length+' FOUND';
 const grid=$('.grem-treasures-grid');grid.replaceChildren();
 const shown=list.slice(page*per,(page+1)*per);
 for(const item of shown){
  const card=document.createElement('article');card.className='grem-treasure-card';
  const icon=document.createElement('span');icon.className='grem-treasure-icon';icon.textContent=item.unlocked?item.icon:'◇';
  const detail=document.createElement('div'),name=document.createElement('b'),note=document.createElement('small');
  name.textContent=item.unlocked?item.title:'MYSTERY: '+item.title;
  note.textContent=item.unlocked?item.note:item.hint;
  detail.append(name,note);card.append(icon,detail);grid.append(card);
 }
 if(!list.length){const empty=document.createElement('p');empty.textContent='No treasures yet.';grid.append(empty)}
 const max=Math.max(1,Math.ceil(list.length/per));
 $('.grem-treasures-pager output').textContent='PAGE '+(page+1)+' / '+max;
 $('[data-t-prev]').disabled=page<=0;$('[data-t-next]').disabled=page>=max-1;
}
function close(restore=true){
 if(!opened)return;opened=false;popup.hidden=true;trigger.setAttribute('aria-expanded','false');
 if(restore)trigger.focus({preventScroll:true});
}
function open(){
 // The existing CARE and NEEDS drawer must never overlap this panel.
 const old=room.querySelector('.grem-r008-drawer');
 if(old&&!old.hidden)old.querySelector('.grem-r008-close')?.click();
 opened=true;page=0;popup.hidden=false;trigger.setAttribute('aria-expanded','true');
 render();position();$('[data-t-close]').focus({preventScroll:true});
}
// Capture before the R008 handler. Do not call the terminal-wide TREASURES drawer.
toolbar.addEventListener('click',e=>{
 const btn=e.target.closest('button');if(!btn)return;
 if(btn===trigger){e.preventDefault();e.stopImmediatePropagation();opened?close():open();return;}
 if(opened)close(false);
},true);
popup.addEventListener('click',e=>{
 const btn=e.target.closest('button');if(!btn)return;
 if(btn.hasAttribute('data-t-close')){close();return}
 if(btn.hasAttribute('data-t-prev')){page=Math.max(0,page-1);render();return}
 if(btn.hasAttribute('data-t-next')){page++;render();return}
 if(btn.hasAttribute('data-t-postcard')){
  const report=window.GremelkinCompanion?.postcard?.();
  if(report){const line=report.day+' / GREM REPORTS: “'+report.message+'”';$('.grem-treasures-message').textContent=line; const dialogue=room.querySelector('#grem-dialogue');if(dialogue)dialogue.textContent=line;}
 }
});
document.addEventListener('pointerdown',e=>{
 if(opened&&!popup.contains(e.target)&&!toolbar.contains(e.target))close(false);
},true);
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&opened){e.preventDefault();e.stopImmediatePropagation();close()}
},true);
const resize=()=>{if(opened){render();position()}};
window.addEventListener('resize',resize,{passive:true});
window.visualViewport?.addEventListener('resize',resize,{passive:true});
if(typeof ResizeObserver==='function')new ResizeObserver(position).observe(toolbar);
})();