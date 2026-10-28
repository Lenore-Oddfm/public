/* LENORE.EXE / C.LINK Quest bay — Public QA ONE STORY ONLY.
   Not canon, no GM controls, no API, no user telemetry. */
(()=>{'use strict';
 const selector='#term-panel-quest .term-panel-body';
 const mount=document.querySelector(selector);
 if(!mount)return;
 const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const KEY='lenore-after-hours-public-qa-thirdbell-r027';
 const DATA='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';
 const css=document.createElement('style');css.textContent=`
 #term-panel-quest .term-panel-body{padding:7px 10px!important;display:block;min-height:0}
 #term-panel-quest .term-panel-body>section{width:100%;height:100%;min-height:0}
 .nightqa{height:100%;width:100%;display:grid;grid-template-rows:41px minmax(0,1fr) 39px;gap:7px;min-height:0;font-family:ui-monospace,Consolas,monospace;color:#fff3e6}
 .nightqa button{cursor:pointer;font:900 11px/1.3 ui-monospace,monospace;background:#20213c;color:#7bf4db;border:2px solid #6e8eac;padding:6px 10px;white-space:normal}
 .nightqa button:hover{color:#13152b;background:#ffe783;border-color:#ffe783}
 .nightqa button:focus-visible{outline:3px solid #ffdc6c;outline-offset:2px}
 .nightqa-toolbar{display:flex;gap:7px;align-items:center;justify-content:space-between;border:2px solid #a568a1;background:#2d2141;padding:4px 8px;min-width:0}
 .nightqa-badge{color:#ffe781;font:900 11px/1.3 ui-monospace,monospace;letter-spacing:.045em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
 .nightqa-badge b{color:#ff78bb}.nightqa-actions{display:flex;gap:6px;align-items:center}
 .nightqa-layout{display:grid;grid-template-columns:minmax(240px,.9fr) minmax(0,1.45fr);min-width:0;min-height:0;gap:10px}
 .nightqa-aside,.nightqa-story{min-height:0;background:#211e3a;border:3px solid #82619f;box-shadow:3px 3px 0 #080918;overflow:hidden;display:flex;flex-direction:column}
 .nightqa-aside{padding:9px;gap:8px}.nightqa-aside small,.nightqa-story small{font-size:9px;color:#7df5da;letter-spacing:.05em}
 .nightqa-art{width:100%;aspect-ratio:320/150;min-height:70px;max-height:35vh;border:4px solid #e976b7;background:#0d1327;display:block;image-rendering:pixelated}
 .nightqa-objective{border:2px solid #a284be;color:#ffe787;padding:8px;font-size:11px;line-height:1.5}
 .nightqa-memory{border:2px dashed #678fad;background:#111b31;padding:7px;font-size:10px;line-height:1.45;min-height:0;overflow:auto}
 .nightqa-memory strong{color:#ffe787;display:block;margin-bottom:6px}.nightqa-memory span{display:inline-block;border:1px solid #436f81;padding:3px 5px;margin:2px;color:#abf8e5}
 .nightqa-note{font-size:9px;color:#d5aecd;margin-top:auto}
 .nightqa-story{padding:15px 17px;gap:9px}
 .nightqa-story h2{margin:0;font:1000 clamp(18px,2.2vw,30px)/1.13 ui-monospace,Consolas,monospace;color:#ffe77d;text-shadow:2px 2px #754268}
 .nightqa-scroll{overflow:auto;min-height:0;scrollbar-width:thin;scrollbar-color:#9c719e #1b1a36;flex:1;display:flex;flex-direction:column;gap:7px}
 .nightqa-scroll p{font-size:clamp(11px,1.05vw,15px);line-height:1.55;margin:0;color:#fff0e7;white-space:pre-wrap}
 .nightqa-scroll p.nightqa-reaction{padding-left:9px;border-left:3px solid #ffe787;color:#f7d9ab;font-size:11px}
 .nightqa-scroll .nightqa-feedback{border:2px solid #59cbb8;background:#163b39;color:#b8ffe9;padding:7px;font-size:10px}
 .nightqa-choices{flex:none;display:flex;flex-direction:column;gap:5px;margin-top:auto;padding-top:8px;border-top:2px dashed #644e82;max-height:47%;overflow:auto;scrollbar-width:thin}
 .nightqa-choices button{width:100%;text-align:left;display:flex;justify-content:space-between;gap:12px;background:#17373f;border-color:#64e9d2;color:#f5fffc;padding:9px 11px}
 .nightqa-choices button:hover{background:#64e9d2;color:#0b1828}
 .nightqa-choices button em{color:#ffe883;font-style:normal}
 .nightqa-foot{display:flex;gap:7px;justify-content:space-between;align-items:center;padding:7px;border:2px solid #666b9a;background:#17162d;color:#ffde79;font-size:9px}
 .nightqa-quiet{color:#c9bddc;font-size:9px}
 .nightqa-case{height:100%;overflow:auto;background:#191b34;border:3px solid #7c5d98;padding:18px;display:flex;flex-direction:column;gap:12px}
 .nightqa-case h2{font:1000 26px/1.2 ui-monospace,monospace;color:#ffe781;margin:0}
 .nightqa-case p{font-size:12px;line-height:1.6;margin:0}.nightqa-tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
 .nightqa-tile{border:2px solid #79628f;padding:10px;font-size:11px;background:#241f3c}.nightqa-tile.found{color:#b6ffe8;border-color:#54d9bb}.nightqa-tile:not(.found){color:#9f91b1}
 .nightqa-rating{display:flex;gap:5px;flex-wrap:wrap;align-items:center;color:#ffe781;font-size:11px}.nightqa-rating button{min-width:35px}.nightqa-rating .chosen{background:#ffe781;color:#111527}
 .nightqa-error{display:flex;justify-content:center;align-items:center;height:100%;background:#311e36;border:4px solid #f59ac5;color:#fff0e6;font-size:13px;text-align:center;padding:15px}
 @media(max-width:900px){.nightqa-layout{grid-template-columns:minmax(175px,.7fr) minmax(0,1.3fr)}.nightqa-art{max-height:26vh}.nightqa-aside{gap:4px;padding:5px}.nightqa-objective{font-size:9px;padding:5px}.nightqa-memory{font-size:9px;padding:4px}.nightqa-story{padding:8px;gap:5px}}
 @media(max-width:650px){.nightqa{grid-template-rows:45px minmax(0,1fr) 32px;gap:4px}.nightqa-layout{grid-template-columns:1fr;grid-template-rows:minmax(0,.30fr) minmax(0,.70fr);gap:4px}.nightqa-aside{display:grid;grid-template-columns:40% 60%;gap:3px;padding:4px}.nightqa-art{max-height:100%;height:auto;grid-row:span 3}.nightqa-memory{max-height:50px}.nightqa-note{display:none}.nightqa-story{padding:6px}.nightqa-story h2{font-size:17px}.nightqa-scroll p{font-size:10px}.nightqa-choices button{padding:5px;font-size:10px}.nightqa-toolbar{padding:3px}.nightqa-toolbar button{font-size:9px;padding:5px}.nightqa-foot{font-size:8px}}
 @media(prefers-reduced-motion:reduce){.nightqa *{animation:none!important;scroll-behavior:auto!important}}
 `;document.head.append(css);
 async function unpack(){
  const bytes=Uint8Array.from(atob(DATA),c=>c.charCodeAt(0));
  if(!('DecompressionStream' in window))throw Error('This browser cannot unpack the story data');
  const text=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  return JSON.parse(text);
 }
 const apply=(cond,flags)=>!cond||!!flags[cond.flag]===cond.value;
 const applicable=(o,flags)=>apply(o.when,flags)&&(!o.whenAll||o.whenAll.every(c=>apply(c,flags)));
 const selected=(ep,s)=>ep.nodes.find(n=>n.id===s.sceneId);
 const available=(node,s)=>node.choices.filter(c=>applicable(c,s.flags));
 function load(){try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&typeof v==='object'?v:null}catch{return null}}
 function persist(){try{localStorage.setItem(KEY,JSON.stringify({game,casebook,view}))}catch{}}
 let story=null,game=null,casebook={endings:[],clues:[],rating:0},view='story';
 function reset(){game={sceneId:story.nodes[0].id,flags:{},steps:0,history:[],complete:false};view='story';persist();paint()}
 function record(){const node=selected(story,game);if(!node.ending)return;
  game.complete=true;if(!casebook.endings.includes(node.ending.id))casebook.endings.push(node.ending.id);
  for(const c of story.clues||[])if(game.flags[c.flag]&&!casebook.clues.includes(c.label))casebook.clues.push(c.label);
 }
 function drawArt(canvas,node){if(!canvas)return;const c=canvas.getContext('2d');if(!c)return;c.imageSmoothingEnabled=false;
  const r=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};const pal={ink:'#0a1025',wall:'#382446',rose:'#e87cb6',mint:'#71eeda',gold:'#ffe67d',violet:'#6b4b89',floor:'#3f344f'};
  r(0,0,320,150,pal.ink);for(let i=0;i<30;i++)r((i*41)%320,(i*23)%84,2,2,i%2?pal.gold:pal.mint);
  r(14,18,35,98,pal.rose);r(270,18,35,98,pal.rose);r(46,19,226,95,pal.violet);r(53,28,210,77,pal.ink);
  for(let i=0;i<5;i++)r(55+i*43,30,6,76,pal.wall);
  r(0,113,320,37,pal.floor);for(let i=0;i<8;i++)r(i*42,126,28,8,pal.rose);
  const x=161,y=79;r(x-12,y-17,24,24,pal.ink);r(x-8,y-13,16,15,'#f5c5b6');r(x-6,y-8,3,3,pal.ink);r(x+4,y-8,3,3,pal.ink);r(x-7,y-19,5,8,pal.rose);
  r(x-12,y+7,24,31,pal.ink);r(x-4,y+7,10,18,pal.violet);r(x-8,y+36,6,11,pal.ink);r(x+4,y+36,6,11,pal.ink);
  // Each scene uses a visual accent from actual scene art, even before bespoke art is approved.
  if(node.art==='balcony'){for(let i=0;i<5;i++)r(40+i*48,65,36,4,pal.gold);r(23,53,274,5,pal.mint)}
  else if(node.art==='booth'){r(210,39,80,55,pal.mint);r(217,46,66,43,pal.ink);for(let i=0;i<6;i++)r(222+i*10,79-(i*11)%18,7,8+(i*11)%18,pal.rose)}
  else if(node.art==='backstage'){r(27,22,23,83,pal.gold);r(270,22,23,83,pal.gold)}
  r(0,146,320,4,pal.mint);
 }
 const getMemory=()=>story.clues?.filter(c=>game.flags[c.flag]).map(c=>c.label)||[];
 function paint(){if(!story)return;const node=selected(story,game);if(!node)return;
  const mem=getMemory();const total=story.nodes.filter(n=>n.ending).length;
  const art=`<aside class="nightqa-aside"><small>ODD FM THEATER / 01:13 AM</small><canvas class="nightqa-art" id="nightQaArt" width="320" height="150" role="img" aria-label="Pixel-art after-hours ODD FM theater with Lenore on stage"></canvas><div class="nightqa-objective">MISSION: ${h(story.objective)}</div><div class="nightqa-memory"><strong>✧ YOUR NIGHT SO FAR</strong>${mem.length?mem.map(v=>`<span>◆ ${h(v)}</span>`).join(''):'No clues yet. Start exploring.'}</div><div class="nightqa-note">THEATER DETAILS ARE PROVISIONAL / NOT OFFICIAL CANON</div></aside>`;
  const comments=(node.reactions||[]).filter(r=>applicable(r,game.flags)).map(r=>`<p class="nightqa-reaction">↳ ${h(r.text)}</p>`).join('');
  const vary=(node.variants||[]).length?node.variants[game.steps%(node.variants.length)]:'';
  const choices=node.ending?`<div class="nightqa-rating"><b>PLAY AGAIN URGE?</b> ${[1,2,3,4,5].map(n=>`<button type="button" data-score="${n}" class="${casebook.rating===n?'chosen':''}" aria-label="Replay urge ${n} out of 5">${n}</button>`).join('')}</div><button type="button" data-action="restart">↻ EXPLORE A DIFFERENT ENDING</button><button type="button" data-action="casebook">▣ OPEN CASEBOOK</button>`:
   available(node,game).map((choice,i)=>`<button type="button" data-choice="${i}"><span>${i+1}. ${h(choice.label)}</span><em>▶</em></button>`).join('');
  const dialogue=`<section class="nightqa-story"><small>${node.ending?'★ ENDING DISCOVERED':'SCENE '+(game.steps+1)+' / STORY IN PROGRESS'}</small><h2>${h(node.title)}</h2><div class="nightqa-scroll"><p>${h(node.text)}</p>${comments}${game.feedback?`<div class="nightqa-feedback" role="status">★ ${h(game.feedback)}</div>`:''}${vary?`<p class="nightqa-reaction">✦ ${h(vary)}</p>`:''}</div><div class="nightqa-choices">${choices}</div></section>`;
  const endings=(story.nodes||[]).filter(n=>n.ending);
  const caseHtml=`<div class="nightqa-case"><small>▣ PRIVATE DEVICE-ONLY CASEBOOK</small><h2>YOUR NIGHT SHIFT CASEBOOK</h2><p>${casebook.endings.length} of ${total} endings discovered. Unfound outcomes stay hidden; your clues and rating stay on this browser only.</p><div class="nightqa-tiles">${endings.map(n=>`<div class="nightqa-tile ${casebook.endings.includes(n.ending.id)?'found':''}">${casebook.endings.includes(n.ending.id)?'★ '+h(n.title):'◇ ??? / UNSOLVED'}</div>`).join('')}</div><p>CLUES DISCOVERED: ${casebook.clues.length}</p><div class="nightqa-rating">MOST RECENT REPLAY-URGE RATING: ${casebook.rating||'NOT RATED'} / 5</div><div class="nightqa-actions"><button type="button" data-action="back">▶ BACK TO STORY</button><button type="button" data-action="restart">↻ NEW NIGHT</button><button type="button" data-action="clear">□ CLEAR CASEBOOK</button></div><p class="nightqa-quiet">This is a publicly visible draft for QA, not canon or a fan release. No analytics, accounts, or paid requests.</p></div>`;
  mount.innerHTML=`<section class="nightqa" aria-label="After Hours public QA adventure"><header class="nightqa-toolbar"><span class="nightqa-badge"><b>● QA DRAFT</b> / THE THIRD BELL · NOT CANON</span><div class="nightqa-actions"><button type="button" data-action="back">▶ STORY</button><button type="button" data-action="casebook">▣ CASEBOOK (${casebook.endings.length}/${total})</button><button type="button" data-action="restart">↻</button></div></header><div class="nightqa-layout">${view==='casebook'?`<div style="grid-column:1/-1;min-height:0">${caseHtml}</div>`:art+dialogue}</div><footer class="nightqa-foot"><span>🎭 ${h(story.title)} · DRAFT 027</span><span>NO APPROVAL / NO CANON CHANGE / NO API</span></footer></section>`;
  if(view!=='casebook')drawArt(document.getElementById('nightQaArt'),node);
 }
 mount.addEventListener('click',e=>{
  const btn=e.target.closest('button');if(!btn||!btn.closest('.nightqa'))return;
  if(btn.dataset.choice!==undefined){const node=selected(story,game);const choice=available(node,game)[Number(btn.dataset.choice)];if(!choice)return;
   game.history.push({sceneId:game.sceneId,flags:{...game.flags}});
   Object.assign(game.flags,choice.set||{});game.feedback=choice.feedback||'';game.sceneId=choice.to;game.steps++;record();
  }else if(btn.dataset.score){casebook.rating=Number(btn.dataset.score)}
  else if(btn.dataset.action==='restart'){reset();return}
  else if(btn.dataset.action==='casebook'){view='casebook'}
  else if(btn.dataset.action==='back'){view='story'}
  else if(btn.dataset.action==='clear'){if(!confirm('Clear your locally saved endings, clues and rating?'))return;casebook={endings:[],clues:[],rating:0}}
  else return;
  persist();paint();
 });
 unpack().then(ep=>{
  story=ep;const saved=load();casebook=saved?.casebook&&typeof saved.casebook==='object'?saved.casebook:casebook;
  if(!Array.isArray(casebook.endings))casebook.endings=[];if(!Array.isArray(casebook.clues))casebook.clues=[];
  game=saved?.game&&story.nodes.some(n=>n.id===saved.game.sceneId)?saved.game:null;
  if(!game){reset();return}view=saved?.view==='casebook'?'casebook':'story';paint();
 }).catch(error=>{mount.innerHTML=`<div class="nightqa-error" role="alert">THE THIRD BELL COULD NOT LOAD: ${h(error.message)}. TRY A HARD REFRESH.</div>`});
})();