/* GREMELKIN R006 | optional cardboard-box hide-and-seek.
 * Local ephemeral game only. R001 pet state and exported saves untouched.
 * No network, no clocks/streaks, no independent authority or global lease.
 */
(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.GremelkinBoxes=api;
  if(typeof document!=='undefined')api.mount(document);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const host=typeof globalThis!=='undefined'?globalThis:window;
  function choose(previous=-1,random=Math.random){
    const raw=Number(random());
    const r=Number.isFinite(raw)?Math.max(0,Math.min(.999999,raw)):0;
    return previous<0?Math.floor(r*3):(previous+1+Math.floor(r*2))%3;
  }
  function result(target,choice){
    if(!Number.isInteger(target)||target<0||target>2||!Number.isInteger(choice)||choice<0||choice>2)throw Error('Invalid hide-and-seek box');
    return choice===target?'found':'miss';
  }
  function mount(doc){
    const app=doc.getElementById('gremelkin-app');
    if(!app||!app.querySelector('#grem-stage')||!app.querySelector('.grem-tools')||doc.getElementById('grem-box-toggle'))return false;
    const stage=app.querySelector('#grem-stage'),tools=app.querySelector('.grem-tools');
    const toggle=doc.createElement('button');
    toggle.type='button';toggle.id='grem-box-toggle';toggle.textContent='📦 BOX GAME';
    toggle.setAttribute('aria-haspopup','true');toggle.setAttribute('aria-expanded','false');
    tools.insertBefore(toggle,tools.querySelector('#grem-export'));
    const overlay=doc.createElement('div');
    overlay.id='grem-box-overlay';overlay.className='grem-box-overlay';overlay.hidden=true;
    overlay.setAttribute('role','group');overlay.setAttribute('aria-label','Gremelkin cardboard-box hide and seek');
    overlay.innerHTML=`<div class="grem-box-head"><strong>📦 HIDE &amp; SEEK</strong><button type="button" id="grem-box-close" aria-label="Close hide and seek">✕</button></div>
      <p id="grem-box-line" role="status" aria-live="polite">Find the mischievous cat!</p>
      <div class="grem-box-choices" role="group" aria-label="Choose one of three cardboard boxes">
        <button type="button" data-box="0" aria-label="Look in box one">📦<small>BOX 1</small></button>
        <button type="button" data-box="1" aria-label="Look in box two">📦<small>BOX 2</small></button>
        <button type="button" data-box="2" aria-label="Look in box three">📦<small>BOX 3</small></button>
      </div><button type="button" id="grem-box-again" hidden>↻ PLAY AGAIN</button>`;
    stage.append(overlay);
    const line=overlay.querySelector('#grem-box-line'),boxes=[...overlay.querySelectorAll('[data-box]')],again=overlay.querySelector('#grem-box-again');
    let active=false,round=0,target=-1,previous=-1,pending=null,misses=new Set();
    const here=()=>Boolean(host.GremelkinCompanion&&host.GremelkinCompanion.isHere());
    function clearPending(){if(pending!==null){clearTimeout(pending);pending=null}}
    function close(){clearPending();active=false;overlay.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus({preventScroll:true})}
    function startRound(){
      misses.clear();target=choose(previous);previous=target;
      boxes.forEach((b)=>{b.disabled=false;b.textContent='📦';const label=doc.createElement('small');label.textContent='BOX '+(Number(b.dataset.box)+1);b.append(label)});
      line.textContent='FIND '+(round+1)+'/3 • Where did he hide?';
    }
    function start(){
      if(!here()){
        const msg=app.querySelector('#grem-dialogue');if(msg)msg.textContent='Gremelkin is visiting another tab. Bring him home to play.';
        return;
      }
      // Do not overlap the existing 18-second mouse chase or disrupt its score.
      if(!app.querySelector('#grem-game').hidden){const msg=app.querySelector('#grem-dialogue');if(msg)msg.textContent='Finish the mouse chase first!';return}
      clearPending();active=true;round=0;previous=-1;overlay.hidden=false;again.hidden=true;
      toggle.setAttribute('aria-expanded','true');startRound();boxes[0].focus({preventScroll:true});
    }
    toggle.addEventListener('click',()=>active?close():start());
    overlay.querySelector('#grem-box-close').addEventListener('click',close);
    again.addEventListener('click',start);
    overlay.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close()}});
    boxes.forEach((b)=>b.addEventListener('click',()=>{
      if(!active||!here()||b.disabled)return;
      const selected=Number(b.dataset.box),found=result(target,selected)==='found';
      if(!found){
        misses.add(selected);b.disabled=true;b.textContent=['🧦','📼','🪶'][selected];
        line.textContent=['An old sock. Gremelkin denies ownership.','Only a haunted mixtape in there.','One feather. No cat.'][selected];
        return;
      }
      b.textContent='🐈‍⬛';boxes.forEach(x=>x.disabled=true);round++;
      if(round===3){
        line.textContent='THREE FINDS! The box republic has elected you!';again.hidden=false;
        // Existing care button owns all authoritative pet-state writes and save behavior.
        const talk=app.querySelector('#grem-actions [data-act="talk"]');if(talk&&!talk.disabled)talk.click();
        pending=setTimeout(()=>{pending=null;if(active)again.focus({preventScroll:true})},200);
      }else{
        line.textContent='FOUND HIM! Now he has another hiding place…';
        pending=setTimeout(()=>{pending=null;if(active){startRound();boxes[0].focus({preventScroll:true})}},850);
      }
    }));
    doc.addEventListener('visibilitychange',()=>{if(doc.hidden&&active)close()});
    host.addEventListener?.('storage',(e)=>{if(e.key==='ODDFM.GREMELKIN.R001.TAB'&&active&&!here())close()});
    return true;
  }
  return Object.freeze({choose,result,mount});
});
