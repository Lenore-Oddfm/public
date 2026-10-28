/* LENORE.EXE / C.LINK APPLIANCE, ROUND FOUR
 * Progressive enhancement of the verified V3 public planner.
 * All original canvases, data filters and controls are MOVED (not cloned),
 * so existing listeners survive. Nothing writes to GitHub or makes API calls.
 */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const screens=[
    ['home','⌂','LOUNGE','The night-shift control room','01'],
    ['hook','✧','HOOK','Premise generator / word engine','02'],
    ['beat','♫','BEAT','Original eight-step rhythm lab','03'],
    ['cat','♥','CAT','Gremble / creative disruption','04'],
    ['sticker','▦','PIXEL','Sixteen-by-sixteen sticker lab','05'],
    ['quest','⚄','QUEST','The Third Bell / QA adventure · not canon','06'],
    ['radar','◎','RADAR','Verified Song Foundry progress','07'],
    ['projects','▣','FILES','Searchable public project registry','08'],
    ['todo','☷','TASKS','Status queue / not editable','09'],
    ['diary','✎','DIARY','Public-safe field notes','10'],
    ['routing','◇','RULES','Ownership and release safeguards','11']
  ];
  const titles=Object.fromEntries(screens.map(([id,,name])=>[id,name]));
  const root=document.createElement('div');
  root.id='terminalRoot';root.className='terminal-frame';
  root.setAttribute('aria-label','LENORE.EXE single-screen C.LINK utility terminal');
  root.innerHTML=`
    <header class="term-topline">
      <div class="term-brand"><span class="term-power" aria-hidden="true"></span><strong>C.LINK</strong><small>LENORE.EXE / CH.02</small></div>
      <div class="term-top-center"><span class="term-pulse" aria-hidden="true">■</span> EXPEDITION TERMINAL <span class="term-serial">// ODDFM-022</span></div>
      <div class="term-top-tools"><span class="term-gate">QUIN: HOLD</span><button type="button" data-drawer="status" aria-label="Open status flyout">▣ STATUS</button><button type="button" data-drawer="mixer" aria-label="Open quick mixer flyout">♫ MIXER</button><button type="button" data-drawer="help" aria-label="Open terminal help flyout">? HELP</button></div>
    </header>
    <nav class="term-tabs" role="tablist" aria-label="Appliance stations"></nav>
    <div class="term-screen">
      <aside class="term-rail" aria-label="Art Department device indicators">
        <div class="term-rail-label">PORTS</div>
        <div class="term-leds"><i></i><i></i><i></i><i></i></div>
        <div class="term-rail-machine">L<br>E<br>N<br>O<br>R<br>E<br><span>★</span></div>
        <button type="button" data-target="home" title="Return to lounge" aria-label="Lounge">⌂</button>
        <button type="button" data-target="beat" title="Open beat machine" aria-label="Beatbox">♫</button>
        <button type="button" data-target="sticker" title="Open sticker machine" aria-label="Sticker lab">▦</button>
        <button type="button" data-drawer="status" title="Open status panel" aria-label="Status drawer">◎</button>
        <div class="term-rail-base">ODD<br>FM<br>02</div>
      </aside>
      <div class="term-workspace">
        <div class="term-location"><span class="term-path" id="termPath">PORT 01 / LOUNGE</span><span class="term-mode" id="termMode">SINGLE-SCREEN MODE</span><span class="term-live-clock" id="termClock">--:--</span></div>
        <div class="term-panels" id="termPanels"></div>
      </div>
    </div>
    <footer class="term-commandbar">
      <div class="term-command-left"><span class="term-ok">●</span> PIXEL DEVICE ONLINE <span class="term-command-extra">/ NO NETWORK TOYS /</span></div>
      <div class="term-command-right"><span class="term-tickets">★ <output id="termTickets">0000</output></span><button type="button" data-target="hook">✧ GENERATE</button><button type="button" data-target="cat">♥ GREMBLE</button><button type="button" data-drawer="help">⌨ KEYS</button></div>
    </footer>
    <div class="term-drawer-scrim" id="termScrim" hidden></div>
    <aside class="term-drawer" id="termDrawer" aria-label="Terminal utility drawer" aria-hidden="true" tabindex="-1">
      <div class="term-drawer-head"><span id="termDrawerTitle">OPERATOR PANEL</span><button type="button" id="termDrawerClose" aria-label="Close utility drawer">✕ CLOSE</button></div>
      <div class="term-drawer-content" id="termDrawerContent"></div>
      <div class="term-drawer-foot">LENORE.EXE / MANUAL OVERRIDE READY</div>
    </aside>`;
  document.body.append(root);

  const tabBar=root.querySelector('.term-tabs'),panelBank=$('termPanels');
  const tabNodes=new Map(),panels=new Map();
  function make(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el}
  for(const [id,icon,label,description,port] of screens){
    const button=make('button','term-tab');button.type='button';button.id='term-tab-'+id;
    button.dataset.target=id;button.setAttribute('role','tab');button.setAttribute('aria-controls','term-panel-'+id);
    button.setAttribute('aria-selected','false');button.tabIndex=-1;
    button.innerHTML=`<span class="term-tab-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
    tabBar.append(button);tabNodes.set(id,button);

    const panel=make('section','term-panel');panel.id='term-panel-'+id;panel.dataset.screen=id;
    panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);panel.hidden=true;
    const head=make('div','term-panel-head');
    head.innerHTML=`<div><span class="term-kicker">SLOT_${port} / TERMINAL UTILITY</span><h1>${label}<span class="term-head-star">★</span></h1><p>${description}</p></div><span class="term-panel-code">C.LINK / ${port}</span>`;
    const body=make('div','term-panel-body');panel.append(head,body);panelBank.append(panel);
    panels.set(id,{panel,body});
  }

  // Move the original V2 animated room into the first terminal bay.
  const home=make('div','term-home-layout');
  const lounge=$('lounge');home.append(lounge);
  const dashboard=make('div','term-home-console');
  dashboard.innerHTML=`
    <div class="term-console-label">ART DEPARTMENT / LIVE STATUS <span class="term-blink">◆</span></div>
    <div class="term-home-headline">WELCOME BACK,<br><em>MY QUEEN.</em></div>
    <p>One screen. Eleven ports. Infinite harmless distractions. The records remain painfully honest.</p>
    <div class="term-mini-statset"><div><b>25</b><span>WRITER BRIEFS</span></div><div><b>00</b><span>QUEEN APPROVED</span></div><div><b>003</b><span>CARTRIDGE</span></div><div><b>HOLD</b><span>QUIN GATE</span></div></div>
    <div class="term-home-launchers"><button type="button" data-target="hook">✧ SPIN A HOOK</button><button type="button" data-target="beat">♫ BEAT LAB</button><button type="button" data-target="projects">▣ PROJECT FILES</button><button type="button" data-drawer="status">◎ RELEASE STATUS</button></div>
    <div class="term-home-warning">WRITER ≠ SCRAPER / DRAFT ≠ RELEASE</div>`;
  home.append(dashboard);panels.get('home').body.append(home);

  // Bring every V3 toy into its own independent appliance port.
  const toys={hook:document.querySelector('.toy-hook'),beat:document.querySelector('.toy-beat'),cat:document.querySelector('.toy-pet'),sticker:document.querySelector('.toy-sticker')};
  const sideNotes={
    hook:['WRITER\'S SIDE CHANNEL','Make something strange and specific. The hook machine supplies premises, never approved lyrics.','QUIET / TEXT ONLY','beat'],
    beat:['OSCILLATOR BAY','Four lanes. Eight steps. Original synthesized noises. No samples; sound requires pressing PLAY.','SOUND / USER START','sticker'],
    cat:['CREATURE CARE','Gremble is unpaid, overqualified, and occasionally asleep. His mood cannot alter project records.','PET-O-METER / LOCAL','quest'],
    sticker:['ART SUPPLY PORT','A pocket-sized art table. Stamp, draw and download your pixels; no upload and no outside image service.','PIXELS / ON DEVICE','home']
  };
  for(const [id,toy] of Object.entries(toys)){
    const row=make('div','term-device-layout');row.append(toy);
    const [title,note,state,next]=sideNotes[id];
    const side=make('aside','term-sidecar');
    side.innerHTML=`<div class="term-side-screen"><div class="term-side-led">◆ OPERATOR NOTE</div><h3>${title}</h3><p>${note}</p><div class="term-wave" aria-hidden="true">▂ ▆ ▃ █ ▅ ▂ ▇ ▃ ▆</div></div><div class="term-side-status">${state}</div><button type="button" data-target="${next}" class="term-next-device">NEXT DEVICE → ${titles[next]}</button>`;
    row.append(side);panels.get(id).body.append(row);
  }
  panels.get('quest').body.append($('questRoll').closest('.quest-console'));

  // These are real, pre-existing elements with their original behavior intact.
  for(const id of ['radar','projects','todo','diary','routing'])panels.get(id).body.append($(id));

  // Page-overflow is replaced by APPLIANCE PAGERS: search/filter counts still
  // use the original hidden property, and pagination only adds a CSS class.
  function addPager(id,items,observedControls=[]){
    const body=panels.get(id).body;
    const bar=make('div','term-pager');
    const prev=make('button','','◀ PREV'),next=make('button','','NEXT ▶');
    prev.type='button';next.type='button';
    const label=make('output','','RECORD 1 / 1');label.setAttribute('aria-live','polite');
    bar.append(prev,label,next);body.append(bar);
    let index=0;
    const render=()=>{
      const visible=items.filter(el=>!el.hidden);
      if(index>=visible.length)index=Math.max(0,visible.length-1);
      items.forEach(el=>el.classList.toggle('term-page-off',visible.length>0&&el!==visible[index]));
      label.textContent=visible.length?`RECORD ${index+1} / ${visible.length}`:'NO MATCHING RECORDS';
      prev.disabled=index<=0;next.disabled=index>=visible.length-1;
    };
    prev.addEventListener('click',()=>{index--;render()});
    next.addEventListener('click',()=>{index++;render()});
    for(const control of observedControls){
      for(const event of ['input','change','click'])control.addEventListener(event,()=>{index=0;render()});
    }
    render();return render;
  }
  addPager('projects',[...document.querySelectorAll('#projectCards .project')],[$('projectSearch'),$('projectFilter')]);
  addPager('todo',[...document.querySelectorAll('#tasks li')],[...document.querySelectorAll('[data-task-filter]')]);
  addPager('diary',[...document.querySelectorAll('.diary .entry')]);

  // Ticket counter stays connected to the V3 toy engines.
  const ticketOutput=$('arcadeScore');
  const observer=new MutationObserver(()=>{$('termTickets').textContent=ticketOutput.textContent});
  observer.observe(ticketOutput,{characterData:true,childList:true,subtree:true});
  $('termTickets').textContent=ticketOutput.textContent;

  let active='home';
  function switchTo(id,{focus=false}={}){
    if(!panels.has(id))return;
    const previous=active;active=id;
    for(const [name,{panel}] of panels){panel.hidden=name!==id;panel.setAttribute('aria-hidden',String(name!==id))}
    for(const [name,button] of tabNodes){const yes=name===id;button.setAttribute('aria-selected',String(yes));button.tabIndex=yes?0:-1}
    $('termPath').textContent=`PORT ${screens.find(row=>row[0]===id)[4]} / ${titles[id]}`;
    if(focus)tabNodes.get(id).focus();
    if(previous!==id)try{history.replaceState(null,'',location.pathname+location.search+'#port-'+id)}catch{}
  }
  const initial=location.hash.startsWith('#port-')?location.hash.slice(6):'home';
  switchTo(panels.has(initial)?initial:'home');
  root.addEventListener('click',e=>{
    const trigger=e.target.closest('[data-target],[data-drawer]');if(!trigger)return;
    if(trigger.dataset.drawer){openDrawer(trigger.dataset.drawer,trigger);return}
    if(trigger.dataset.target){closeDrawer();switchTo(trigger.dataset.target,{focus:trigger.getAttribute('role')==='tab'})}
  });
  window.addEventListener('hashchange',()=>{const id=location.hash.startsWith('#port-')?location.hash.slice(6):'';if(panels.has(id))switchTo(id)});

  // Utility drawers are deliberately independent from the main panels.
  const drawer=$('termDrawer'),scrim=$('termScrim'),drawerContent=$('termDrawerContent');
  const drawerTitle=$('termDrawerTitle'),drawerClose=$('termDrawerClose');
  let openType='',lastTrigger=null,previousVolume=18;
  const drawerTemplates={
    status:`<div class="term-drawer-stamp">VERIFIED CHECKPOINT / READ ONLY</div><div class="term-drawer-statgrid"><div><b>25</b><small>WRITER BRIEFS</small></div><div><b>00</b><small>APPROVED SONGS</small></div><div><b>003</b><small>CARTRIDGE</small></div><div><b>HOLD</b><small>QUIN GATE</small></div></div><h3>THE TRUTH PANEL</h3><p>One original Lenore audition draft exists, unapproved. The full 25-song collection has not been written. Real Quin launch is not verified; no paid OpenAI calls were used.</p><p>Expedition writes lyrics. Studio Lenore's scraper is a separate seat. Queen and Miss Spock own release and central routing decisions.</p><div class="term-drawer-buttons"><button type="button" data-target="radar">◎ OPEN RADAR</button><button type="button" data-target="projects">▣ VIEW RECORDS</button></div>`,
    mixer:`<div class="term-drawer-stamp">LIVE CONTROL / OPTIONAL SOUND</div><h3>QUICK MIXER</h3><p>Control the original eight-step device from anywhere in the terminal. No sound plays until you press PLAY in the beatbox.</p><label for="termBpm">TEMPO / <output id="termBpmRead">120</output> BPM</label><input type="range" id="termBpm" min="70" max="170" step="5" value="120"><label for="termVolume">VOLUME / <output id="termVolRead">18%</output></label><input type="range" id="termVolume" min="0" max="40" step="2" value="18"><div class="term-drawer-buttons"><button type="button" data-drawer-action="mute">♫ MUTE / UNMUTE</button><button type="button" data-drawer-action="stop">■ STOP BEAT</button><button type="button" data-target="beat">▶ OPEN BEATBOX</button></div>`,
    help:`<div class="term-drawer-stamp">FIELD MANUAL / REV 004</div><h3>C.LINK OPERATOR GUIDE</h3><p>LENORE.EXE is now a fixed-screen appliance. Choose a port; the content swaps in place. Nothing here automatically edits project files.</p><div class="term-help-keys"><span>ALT + 1…9</span><b>JUMP TO PORT</b><span>← / →</span><b>MOVE BETWEEN TABS (WHEN FOCUSED)</b><span>ESC</span><b>CLOSE ANY FLYOUT</b></div><p>Click STATUS for real project gates, MIXER for beat settings, and the big tabs for toys and records. The original animation still has DANCE and PAUSE buttons.</p><div class="term-drawer-buttons"><button type="button" data-target="home">⌂ OPEN LOUNGE</button><button type="button" data-target="sticker">▦ MAKE A STICKER</button></div>`
  };
  function openDrawer(type,trigger){
    if(!drawerTemplates[type])return;
    if(openType===type){closeDrawer();return}
    openType=type;lastTrigger=trigger;
    drawerTitle.textContent=type==='mixer'?'♫ QUICK MIXER':type==='help'?'? FIELD MANUAL':'▣ STATUS DRAWER';
    drawerContent.innerHTML=drawerTemplates[type];
    if(type==='mixer'){
      $('termBpm').value=$('beatBpm').value;$('termVolume').value=$('beatVolume').value;
      $('termBpmRead').textContent=$('beatBpm').value;$('termVolRead').textContent=$('beatVolume').value+'%';
    }
    scrim.hidden=false;drawer.setAttribute('aria-hidden','false');drawer.classList.add('open');
    root.classList.add('drawer-open');root.querySelectorAll('[data-drawer]').forEach(btn=>btn.setAttribute('aria-expanded',String(btn===trigger)));
    drawerClose.focus();
  }
  function closeDrawer(){
    if(!openType)return;
    openType='';drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');
    scrim.hidden=true;root.classList.remove('drawer-open');root.querySelectorAll('[data-drawer]').forEach(btn=>btn.setAttribute('aria-expanded','false'));
    if(lastTrigger?.isConnected)lastTrigger.focus();
    lastTrigger=null;
  }
  drawerClose.addEventListener('click',closeDrawer);scrim.addEventListener('click',closeDrawer);
  drawerContent.addEventListener('input',e=>{
    const mapping={'termBpm':['beatBpm','termBpmRead',''],'termVolume':['beatVolume','termVolRead','%']};
    const entry=mapping[e.target.id];if(!entry)return;
    const original=$(entry[0]);original.value=e.target.value;original.dispatchEvent(new Event('input',{bubbles:true}));
    $(entry[1]).textContent=e.target.value+entry[2];
  });
  drawerContent.addEventListener('click',e=>{
    const action=e.target.closest('[data-drawer-action]')?.dataset.drawerAction;
    if(action==='stop'&&$('beatPlay').textContent.includes('STOP'))$('beatPlay').click();
    if(action==='mute'){
      const volume=$('beatVolume');
      if(Number(volume.value)>0){previousVolume=Number(volume.value);volume.value='0'}
      else volume.value=String(previousVolume);
      volume.dispatchEvent(new Event('input',{bubbles:true}));
      if($('termVolume')){$('termVolume').value=volume.value;$('termVolRead').textContent=volume.value+'%'}
    }
  });
  root.addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeDrawer();return}
    if(!openType||e.key!=='Tab')return;
    const focusable=[...drawer.querySelectorAll('button:not([disabled]), input:not([disabled])')];
    const first=focusable[0],last=focusable.at(-1);
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}
  });
  document.addEventListener('keydown',e=>{
    if((e.altKey&&!e.ctrlKey&&!e.metaKey)&&/^[1-9]$/.test(e.key)){
      e.preventDefault();closeDrawer();switchTo(screens[Number(e.key)-1][0],{focus:true});return;
    }
    if(openType)return;
    if(!tabBar.contains(document.activeElement))return;
    const from=screens.findIndex(row=>row[0]===active);
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
      e.preventDefault();switchTo(screens[(from+(e.key==='ArrowRight'?1:-1)+screens.length)%screens.length][0],{focus:true});
    }
  });
  function clock(){const date=new Date();$('termClock').textContent=date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:false})}
  clock();setInterval(clock,30000);

  // Enhance only after every port has been mounted, so V3 remains the fallback.
  document.documentElement.classList.add('terminal-ready');
})();
