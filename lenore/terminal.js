/* LENORE STUDIO / C.LINK PERSONAL PLANNER R004
 * Single-screen presentation of the existing Studio records. Nodes are MOVED,
 * never cloned; the pet engine, filters and local saves retain their listeners.
 * No network calls, no cross-seat writes, and no change to Quin.
 */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const stations=[
    ['cat','🐾','GREM','Gremelkin / interactive companion'],
    ['mission','✦','MISSION','Human-selected studio mission'],
    ['radar','◎','RADAR','Verified checkpoints / not releases'],
    ['projects','▣','FILES','Searchable project records'],
    ['todo','☷','TASKS','Current studio work queue'],
    ['diary','✎','DIARY','Public-safe work notes'],
    ['rules','◇','RULES','Seat routing and release boundaries']
  ];
  const root=document.createElement('div');
  root.id='studioTerminal';root.className='ctl-terminal';
  root.setAttribute('aria-label','Lenore Studio C.Link Personal Planner');
  root.innerHTML=`
    <header class="ctl-topbar">
      <div class="ctl-brand"><span class="ctl-power" aria-hidden="true"></span><strong>C.LINK</strong><small>LENORE.PRIME / STUDIO 01</small></div>
      <span class="ctl-channel">● STUDIO PERSONAL PLANNER <span>// ODDFM-001</span></span>
      <div class="ctl-toptools"><span class="ctl-hold">QUIN: HOLD</span><button type="button" data-drawer="status">▣ STATUS</button><button type="button" data-drawer="backpack">▥ BACKPACK</button><button type="button" data-drawer="help">? HELP</button></div>
      <div class="ctl-cat-dock" title="Open Gremelkin's quick care"></div>
    </header>
    <nav class="ctl-tabs" role="tablist" aria-label="Studio appliance stations"></nav>
    <div class="ctl-screen">
      <aside class="ctl-rail" aria-label="Studio quick stations">
        <span class="ctl-rail-label">PORTS</span><span class="ctl-leds" aria-hidden="true">▦</span>
        <span class="ctl-rail-brand" aria-hidden="true">L<br>E<br>N<br>O<br>R<br>E<br><b>★</b></span>
        <div class="ctl-rail-buttons"><button type="button" data-target="cat" aria-label="Gremelkin">♥</button><button type="button" data-target="mission" aria-label="Mission">✦</button><button type="button" data-target="projects" aria-label="Project files">▣</button><button type="button" data-drawer="status" aria-label="Release status">◎</button></div>
        <span class="ctl-rail-label">ODD<br>FM<br>01</span>
      </aside>
      <div class="ctl-workspace">
        <div class="ctl-location"><span id="ctlPath">PORT 01 / GREM</span><span class="ctl-mode">ONE SCREEN • ZERO PAGE JUMPS</span><span id="ctlClock" class="ctl-clock">--:--</span></div>
        <div class="ctl-panels" id="ctlPanels"></div>
      </div>
    </div>
    <footer class="ctl-commandbar"><span>● ODD FM / NIGHT SHIFT ONLINE <span class="ctl-footer-extra">/ BROWSER-LOCAL CAT /</span></span><div><button type="button" data-target="cat">♥ PLAY WITH GREM</button><button type="button" data-drawer="backpack">▥ SAVE / RESTORE</button><button type="button" data-drawer="help">⌨ KEYS</button></div></footer>
    <div class="ctl-shade" id="ctlShade" hidden></div>
    <aside class="ctl-drawer" id="ctlDrawer" aria-hidden="true" aria-label="Studio utility flyout" tabindex="-1">
      <div class="ctl-drawer-head"><strong id="ctlDrawerTitle">OPERATOR MENU</strong><button type="button" id="ctlDrawerClose">✕ CLOSE</button></div>
      <div class="ctl-drawer-body" id="ctlDrawerBody"></div><div class="ctl-drawer-foot">STUDIO / HUMAN AUTHORITY / R004</div>
    </aside>
    <div class="ctl-quick" id="ctlQuick" hidden role="dialog" aria-label="Gremelkin quick care">
      <div class="ctl-quick-head">🐾 GREMLINK • QUICK CARE <button type="button" id="ctlQuickClose" aria-label="Close quick care">✕</button></div>
      <div class="ctl-quick-cat" id="ctlQuickCat" role="button" tabindex="0" aria-label="Pet Gremelkin">🐈‍⬛ <small>DROP HERE</small></div>
      <div class="ctl-quick-tools"><button type="button" data-quick="feed">🐟<small>FOOD</small></button><button type="button" data-quick="brush">🪮<small>BRUSH</small></button><button type="button" data-quick="pet">💗<small>PET</small></button><button type="button" data-quick="laser">🐭<small>TOY</small></button></div>
      <p id="ctlQuickMessage" role="status" aria-live="polite">Mrrp. Your cat is one click away.</p>
      <button type="button" class="ctl-room-link" data-target="cat">▣ OPEN FULL CAT ROOM</button>
    </div>`;
  document.body.append(root);
  const dock=root.querySelector('.ctl-cat-dock');
  const headerCat=document.querySelector('body > header .pixel-cat-wrap');
  if(headerCat){dock.append(headerCat);headerCat.setAttribute('aria-expanded','false')}

  const tabbar=root.querySelector('.ctl-tabs');
  const panelBank=$('ctlPanels');
  const panels=new Map(),tabs=new Map();
  for(const [id,icon,label,subtitle] of stations){
    const tab=document.createElement('button');tab.type='button';tab.className='ctl-tab';
    tab.id='ctl-tab-'+id;tab.dataset.target=id;tab.setAttribute('role','tab');
    tab.setAttribute('aria-controls','ctl-panel-'+id);tab.setAttribute('aria-selected','false');tab.tabIndex=-1;
    tab.innerHTML=`<span aria-hidden="true">${icon}</span><b>${label}</b>`;
    tabbar.append(tab);tabs.set(id,tab);
    const panel=document.createElement('section');panel.className='ctl-panel';panel.id='ctl-panel-'+id;
    panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.hidden=true;
    const head=document.createElement('div');head.className='ctl-panel-head';
    head.innerHTML=`<div><small>STATION_${String(panels.size+1).padStart(2,'0')} / C.LINK UTILITY</small><h1>${label}<span>★</span></h1><p>${subtitle}</p></div><span class="ctl-panel-code">C.LINK / ${String(panels.size+1).padStart(2,'0')}</span>`;
    const body=document.createElement('div');body.className='ctl-panel-body';panel.append(head,body);panelBank.append(panel);
    panels.set(id,{panel,body});
  }
  // Keep every existing data-driven node and its registered events alive.
  const sources={cat:$('gremelkin-home'),mission:$('mission'),radar:$('radar'),projects:$('projects'),todo:$('todo'),diary:$('diary'),rules:$('rules')};
  for(const [id,node] of Object.entries(sources))panels.get(id).body.append(node);
  const missionLaunch=document.createElement('div');missionLaunch.className='ctl-mission-launch';
  missionLaunch.innerHTML='<button type="button" data-target="cat">♥ VISIT GREMELKIN</button><button type="button" data-drawer="status">◎ CHECK RELEASE GATES</button>';
  panels.get('mission').body.append(missionLaunch);
  const radarNote=document.createElement('div');radarNote.className='ctl-radar-note';
  radarNote.innerHTML='<b>THE ACTIVE SIGNAL IS GREMELKIN-PET</b><p>Studio companion R004 interface under Human review. Music Video Machine R016 and Looky Lou R014 remain unchanged. No Quin install, C.Link network door or worldwide cat lease.</p><button type="button" data-target="cat">♥ RETURN TO GREM</button>';
  panels.get('radar').body.append(radarNote);

  // Appliance pagination replaces the old endless page. Search/filter regenerate
  // project cards; the observer watches children only, never class mutations.
  function pager(id,container,selector,observe=false){
    const body=panels.get(id).body,bar=document.createElement('div');bar.className='ctl-pager';
    bar.innerHTML='<button type="button" data-step="-1">◀ PREV</button><output aria-live="polite">RECORD 1 / 1</output><button type="button" data-step="1">NEXT ▶</button>';
    body.append(bar);
    const label=bar.querySelector('output'),prev=bar.querySelector('[data-step="-1"]'),next=bar.querySelector('[data-step="1"]');
    let page=0;
    const render=()=>{
      const all=[...container.querySelectorAll(selector)].filter(el=>!el.hidden);
      page=Math.max(0,Math.min(page,all.length-1));
      all.forEach((el,i)=>el.classList.toggle('ctl-page-off',i!==page));
      label.textContent=all.length?`RECORD ${page+1} / ${all.length}`:'NO MATCHING RECORDS';
      prev.disabled=page<=0;next.disabled=page>=all.length-1;
    };
    bar.addEventListener('click',e=>{const step=e.target.closest('[data-step]');if(step){page+=Number(step.dataset.step);render()}});
    if(observe)new MutationObserver(()=>{page=0;render()}).observe(container,{childList:true});
    render();return render;
  }
  pager('projects',$('cards'),':scope > .card',true);
  pager('todo',$('tasks'),':scope > .task');
  pager('diary',$('entries'),':scope > .entry');
  pager('rules',$('rules').querySelector('.grid'),':scope > .block');

  let active='cat';
  const quick=$('ctlQuick'),shade=$('ctlShade'),drawer=$('ctlDrawer');
  let lastTrigger=null;
  function closeQuick(){quick.hidden=true;if(headerCat)headerCat.setAttribute('aria-expanded','false')}
  function closeDrawer(){
    const wasOpen=drawer.classList.contains('open');drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden','true');shade.hidden=true;root.querySelectorAll('[data-drawer]').forEach(x=>x.setAttribute('aria-expanded','false'));
    if(wasOpen&&lastTrigger?.isConnected)lastTrigger.focus({preventScroll:true});
  }
  function switchTo(id,{focus=false}={}){
    if(!panels.has(id))return;
    active=id;closeQuick();closeDrawer();
    for(const [name,{panel}] of panels){panel.hidden=name!==id;panel.setAttribute('aria-hidden',String(name!==id))}
    for(const [name,tab] of tabs){const selected=name===id;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1}
    const ix=stations.findIndex(s=>s[0]===id);$('ctlPath').textContent=`PORT ${String(ix+1).padStart(2,'0')} / ${stations[ix][2]}`;
    if(focus)tabs.get(id).focus({preventScroll:true});
    if(location.hash!==`#port-${id}`)try{history.replaceState(null,'',location.pathname+location.search+`#port-${id}`)}catch(_){}
  }
  const oldAnchors={'#gremelkin-home':'cat','#mission':'mission','#radar':'radar','#projects':'projects','#todo':'todo','#diary':'diary','#rules':'rules'};
  const initial=location.hash.startsWith('#port-')?location.hash.slice(6):oldAnchors[location.hash]||'cat';
  switchTo(panels.has(initial)?initial:'cat');
  const drawerTemplates={
    status:`<span class="ctl-stamp">VERIFIED RECORDS / READ-ONLY</span><h2>STUDIO GATES</h2><div class="ctl-statgrid"><div><b>GREM</b><small>ACTIVE MISSION</small></div><div><b>R004</b><small>UI IN REVIEW</small></div><div><b>R016</b><small>FACTORY TRIAL</small></div><div><b>HOLD</b><small>QUIN INSTALL</small></div></div><p>Gremelkin is playable in this browser. The worldwide C.Link cat-door lease is not connected. Music Video Machine R016 remains a guarded trial; Looky Lou R014 awaits Human review and music.</p><p>Task 999 stays parked. Guardians stay frozen. Expedition Lenore controls her own planner.</p><button type="button" data-target="mission">✦ OPEN MISSION LOCK</button>`,
    backpack:`<span class="ctl-stamp">LOCAL MEMORIES / NO CLOUD SYNC</span><h2>GREMELKIN BACKPACK</h2><p>His care and memories are saved on this browser. Export a portable JSON copy before changing devices; import restores a compatible backpack. No private save is pushed to GitHub.</p><div class="ctl-drawer-actions"><button type="button" data-backpack="export">▥ EXPORT CAT SAVE</button><button type="button" data-backpack="import">↩ IMPORT CAT SAVE</button></div><p>His Director Backpack is the public character specification, not your live pet state. Global single-presence is still a future project.</p><button type="button" data-target="cat">♥ OPEN CAT ROOM</button>`,
    help:`<span class="ctl-stamp">OPERATOR MANUAL / REV 004</span><h2>NO MORE PAGE JUMPS.</h2><p>Choose a station tab. The display changes in place, like an appliance. FILES, TASKS, DIARY and RULES use record buttons instead of a long scrolling page.</p><div class="ctl-keygrid"><span>ALT + 1–7</span><b>JUMP TO STATION</b><span>← / →</span><b>SWITCH FOCUSED TAB</b><span>ESC</span><b>CLOSE FLYOUT</b></div><p>Click the small cat in the upper right for instant care. In the GREM station, drag a fish, brush, heart, moon, music note or mouse onto him—or tap the item. Pet the big cat directly.</p><button type="button" data-target="cat">🐾 OPEN GREM</button>`
  };
  function openDrawer(type,trigger){
    if(!drawerTemplates[type])return;closeQuick();lastTrigger=trigger;
    $('ctlDrawerTitle').textContent=type==='status'?'▣ STATUS':type==='backpack'?'▥ BACKPACK':'? HELP';
    $('ctlDrawerBody').innerHTML=drawerTemplates[type];shade.hidden=false;drawer.classList.add('open');
    drawer.setAttribute('aria-hidden','false');root.querySelectorAll('[data-drawer]').forEach(x=>x.setAttribute('aria-expanded',String(x===trigger)));
    $('ctlDrawerClose').focus({preventScroll:true});
  }
  function quickCare(action){
    const button=document.querySelector(`#grem-actions [data-act="${action}"]`);
    if(!button)return;
    if(action==='laser'){switchTo('cat');button.click()}
    else {button.click();$('ctlQuickMessage').textContent=$('grem-dialogue').textContent}
  }
  function openQuick(){
    closeDrawer();quick.hidden=!quick.hidden;
    if(headerCat)headerCat.setAttribute('aria-expanded',String(!quick.hidden));
    if(!quick.hidden){$('ctlQuickMessage').textContent=$('grem-dialogue').textContent;$('ctlQuickClose').focus({preventScroll:true})}
  }
  window.addEventListener('gremelkin:open',openQuick);
  $('ctlQuickClose').addEventListener('click',()=>{closeQuick();headerCat?.focus({preventScroll:true})});
  $('ctlQuickCat').addEventListener('click',()=>quickCare('pet'));
  $('ctlQuickCat').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();quickCare('pet')}});
  // Drag quick-care icons to the pocket cat, with click/tap and keyboard fallback.
  root.querySelectorAll('[data-quick]').forEach(btn=>{
    let drag=null;
    btn.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};btn.setPointerCapture(e.pointerId)});
    btn.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>9)drag.moved=true;btn.classList.toggle('ctl-quick-drag',drag.moved)});
    btn.addEventListener('pointerup',e=>{if(!drag||drag.id!==e.pointerId)return;if(drag.moved){btn.dataset.ignoreClick='1';const r=$('ctlQuickCat').getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom)quickCare(btn.dataset.quick);else $('ctlQuickMessage').textContent='Drop the item on the cat, or tap it to use.';setTimeout(()=>delete btn.dataset.ignoreClick,450)}drag=null;btn.classList.remove('ctl-quick-drag')});
    btn.addEventListener('pointercancel',()=>{drag=null;btn.classList.remove('ctl-quick-drag')});
    btn.addEventListener('click',()=>{if(btn.dataset.ignoreClick){delete btn.dataset.ignoreClick;return}quickCare(btn.dataset.quick)});
  });
  root.addEventListener('click',e=>{
    const backpack=e.target.closest('[data-backpack]');
    if(backpack){document.getElementById(backpack.dataset.backpack==='export'?'grem-export':'grem-import')?.click();return}
    const target=e.target.closest('[data-target],[data-drawer]');if(!target)return;
    if(target.dataset.drawer){openDrawer(target.dataset.drawer,target);return}
    if(target.dataset.target)switchTo(target.dataset.target,{focus:target.getAttribute('role')==='tab'});
  });
  $('ctlDrawerClose').addEventListener('click',closeDrawer);shade.addEventListener('click',closeDrawer);
  window.addEventListener('hashchange',()=>{const id=location.hash.startsWith('#port-')?location.hash.slice(6):oldAnchors[location.hash];if(panels.has(id))switchTo(id)});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){if(!quick.hidden){closeQuick();headerCat?.focus({preventScroll:true})}else closeDrawer();return}
    if(e.altKey&&!e.ctrlKey&&!e.metaKey&&/^[1-7]$/.test(e.key)){e.preventDefault();switchTo(stations[Number(e.key)-1][0],{focus:true});return}
    if(tabbar.contains(document.activeElement)&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const i=stations.findIndex(s=>s[0]===active),delta=e.key==='ArrowRight'?1:-1;switchTo(stations[(i+delta+stations.length)%stations.length][0],{focus:true})}
    if(drawer.classList.contains('open')&&e.key==='Tab'){
      const focusable=[...drawer.querySelectorAll('button:not([disabled])')],first=focusable[0],last=focusable.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  const clock=()=>{$('ctlClock').textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})};clock();setInterval(clock,30000);
  document.documentElement.classList.add('terminal-ready');
})();
