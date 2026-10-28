(()=>{'use strict';
 const p=document.getElementById('term-panel-quest');if(!p)return;
 const mount=p.querySelector('.term-panel-body');if(!mount)return;
 const foyer=document.createElement('div');foyer.className='term-panel-body qa29-foyer';
 foyer.innerHTML=`<div class="qa29-poster"><small>▣ NIGHT SHIFT / C.LINK ADVENTURE / QA DRAFT</small><h2>THE THIRD BELL</h2><p>One empty theater. Four endings. Fourteen unique pixel scenes.</p><canvas id="qa29-poster" width="320" height="150" role="img" aria-label="Theater pixel-art preview"></canvas><div class="qa030-save" role="status" id="qa30-save">◈ CHECKPOINT READY</div><div class="qa030-actions"><button type="button" id="qa29-enter">▶ ENTER THE THEATER</button><button type="button" id="qa30-newnight">↻ NEW NIGHT</button></div></div><div class="qa29-desk"><small>STATUS / FIELD DESK</small><div class="qa29-stats"><span><b>14</b> SCENES</span><span><b>04</b> ENDINGS</span><span><b id="qa29-finds">0/4</b> FOUND</span><span><b>HOLD</b> CANON</span></div><h3>THE FOYER'S TWO TOYS</h3><div class="qa29-toys"><div>♫ THE BELL<br><output id="qa29-bell">Suspiciously quiet.</output><button type="button" id="qa29-ring">RING BELL</button></div><div>✧ THE MOTH<br><output id="qa29-moth">Watching the light.</output><button type="button" id="qa29-tap">TAP MOTH</button></div></div><p>PUBLIC PLAYTEST · NO OFFICIAL CANON · NO API CALLS</p></div>`;
 const overlay=document.createElement('div');overlay.className='qa29-overlay';overlay.id='qa29-overlay';overlay.hidden=true;
 const origin=mount.parentNode;origin.replaceChild(foyer,mount);document.body.append(overlay);overlay.append(mount);
 const subtitle=p.querySelector('.term-panel-head p');if(subtitle)subtitle.textContent='After Hours / Enter the theater';
 const style=document.createElement('style');style.textContent=`
 .qa29-foyer{min-height:0;min-width:0;display:grid!important;grid-template-columns:minmax(0,1.25fr) minmax(240px,.8fr);gap:12px;overflow:hidden!important;padding:13px!important;color:#fff0e7;font:800 11px/1.4 ui-monospace,Consolas,monospace}
 .qa29-foyer>div{border:3px solid #8866a7;background:#1b1b35;padding:12px;min-width:0;min-height:0;overflow:hidden;display:flex;flex-direction:column;gap:9px}
 .qa29-foyer small{font-size:10px;color:#74f5dd;letter-spacing:.07em}.qa29-foyer h2{font:1000 clamp(20px,2.7vw,39px)/1.1 ui-monospace,monospace;color:#ffe479;margin:0;text-shadow:3px 3px #683761}.qa29-foyer h2::before{display:none}
 .qa29-foyer p{font-size:11px;line-height:1.35;margin:0;color:#e3d5e9}.qa29-foyer canvas{display:block;width:100%;height:auto;min-height:0;max-height:55%;aspect-ratio:320/150;object-fit:contain;image-rendering:pixelated;border:4px solid #ff77b9;background:#0d1226}
 .qa29-foyer button,.qa29-overlay button{cursor:pointer;font:900 11px/1.15 ui-monospace,monospace;background:#143b41;border:2px solid #6ef0d5;color:#ccfff1;padding:9px;box-shadow:3px 3px #090b1b}
 .qa29-foyer button:hover,.qa29-overlay button:hover{background:#ffe478;color:#0e1729;border-color:#ffe478}.qa29-foyer button:focus-visible,.qa29-overlay button:focus-visible{outline:3px solid #ff89c0;outline-offset:2px}
 #qa29-enter{margin-top:auto;background:#ff7aba;color:#11152b;border-color:#ffe478;min-height:52px;font-size:15px}
 .qa29-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.qa29-stats span{border:2px solid #71558b;background:#0e1428;padding:10px;color:#86f1da;font-size:9px}.qa29-stats b{display:block;font:1000 24px ui-monospace,monospace;color:#ffe57e}
 .qa29-desk h3{font-size:13px;margin:8px 0 0;color:#ff80bf}.qa29-toys{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.qa29-toys>div{border:2px solid #755a90;background:#211b3b;display:flex;flex-direction:column;padding:8px;gap:8px;color:#ffe27f}.qa29-toys output{display:block;color:#a9f5e9;font-size:10px;min-height:32px}.qa29-toys button{margin-top:auto;font-size:10px;padding:8px 4px}
 .qa29-desk>p{margin-top:auto;color:#f7b5d5!important;font-size:9px!important}
 .qa29-overlay{position:fixed;inset:0;z-index:9000;display:block;width:100vw;height:100vh;height:100dvh;background:#0a0e1e;overflow:hidden;overscroll-behavior:none}
 .qa29-overlay .term-panel-body{width:100%;height:100%;min-width:0;min-height:0;padding:0!important;overflow:hidden!important}
 .qa29-overlay .nightqa{height:100%;width:100%;display:grid;grid-template-rows:50px minmax(0,1fr) 28px;gap:0;padding:0!important;background:#0e1025}
 .qa29-overlay .nightqa-toolbar{border:0;border-bottom:5px solid #ff80bc;min-width:0;padding:5px 13px;background:#30203f}
 .qa29-overlay .nightqa-badge{font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.qa29-overlay .nightqa-actions{flex:none;gap:5px}
 .qa29-overlay .nightqa-actions button{white-space:nowrap;padding:6px 9px;font-size:10px}
 .qa29-overlay .nightqa-layout{padding:14px;gap:15px;min-width:0;min-height:0;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
 .qa29-overlay .nightqa-aside,.qa29-overlay .nightqa-story{min-width:0;min-height:0;max-width:100%;height:100%;overflow:hidden;border:4px solid #83639e;box-shadow:none;padding:12px;gap:9px}
 .qa29-overlay .nightqa-art{min-height:0;max-height:min(53vh,570px);height:auto;width:100%;aspect-ratio:320/150;object-fit:contain;border-width:4px}
 .qa29-overlay .nightqa-story{display:grid;grid-template-rows:auto auto minmax(0,1fr) auto auto;gap:7px;padding:14px}
 .qa29-overlay .nightqa-story h2{font-size:clamp(20px,3vw,39px)}
 .qa29-overlay .nightqa-scroll{overflow:hidden!important;min-height:0;display:flex;flex-direction:column;gap:6px;flex:none}
 .qa29-overlay .nightqa-scroll p{font-size:clamp(12px,1.2vw,17px);line-height:1.46;white-space:pre-wrap;margin:0}
 .qa29-overlay .nightqa-choices{min-height:95px;max-height:40%;flex:none;overflow:hidden!important;gap:5px;padding:5px 0 0;margin:0}
 .qa29-overlay .nightqa-choices button{flex:1;min-height:0;text-align:left;font-size:clamp(10px,1vw,14px);padding:7px;display:flex;align-items:center}
 .qa29-overlay .nightqa-foot{margin:0;border:0;border-top:3px solid #64e8ce;font-size:9px;padding:4px 14px}
 .qa29-overlay .nightqa-memory{overflow:hidden!important}.qa29-overlay .nightqa-case{overflow:hidden!important}
 .qa29-pager{display:flex;align-items:center;justify-content:space-between;min-height:34px;gap:6px;border:2px solid #684e82;padding:3px 5px;background:#211b37}
 .qa29-pager button{font-size:10px;padding:5px 9px}.qa29-pager span{color:#ffe57c;font-size:10px}
 .qa29-overlay .nightqa-choices .qa29-next{background:#ffe575;color:#121326;text-align:center;justify-content:center}
 @media(max-width:750px){.qa29-foyer{grid-template-columns:1fr;grid-template-rows:minmax(0,1.08fr) minmax(0,.92fr);padding:6px!important;gap:5px}.qa29-foyer>div{padding:7px;border-width:2px;gap:5px}.qa29-foyer h2{font-size:21px}.qa29-foyer p{font-size:9px}.qa29-foyer canvas{max-height:calc(100% - 96px);height:auto}#qa29-enter{min-height:35px;padding:6px;font-size:12px}.qa29-stats{gap:4px}.qa29-stats span{padding:4px}.qa29-stats b{font-size:16px}.qa29-desk h3{font-size:11px;margin:0}.qa29-toys{gap:5px}.qa29-toys>div{padding:4px;gap:3px}.qa29-toys output{font-size:9px;min-height:0}.qa29-toys button{padding:4px}.qa29-desk>p{display:none}
 .qa29-overlay .nightqa{grid-template-rows:47px minmax(0,1fr) 24px}.qa29-overlay .nightqa-toolbar{gap:4px;padding:4px}.qa29-overlay .nightqa-badge{font-size:10px;min-width:0}.qa29-overlay .nightqa-actions{gap:3px}.qa29-overlay .nightqa-actions button{font-size:8px;padding:5px 3px}
 .qa29-overlay .nightqa-layout{grid-template-columns:1fr;grid-template-rows:minmax(0,.34fr) minmax(0,.66fr);gap:5px;padding:5px}
 .qa29-overlay .nightqa-aside,.qa29-overlay .nightqa-story{border-width:2px;padding:6px;gap:3px}
 .qa29-overlay .nightqa-aside{display:flex;flex-direction:column}.qa29-overlay .nightqa-aside small{font-size:8px}.qa29-overlay .nightqa-art{flex:1;min-height:0;height:100%;max-height:calc(100% - 38px);border-width:2px}
 .qa29-overlay .nightqa-objective,.qa29-overlay .nightqa-note{display:none}.qa29-overlay .nightqa-memory{max-height:24px;min-height:0;padding:2px;font-size:8px;flex:none}.qa29-overlay .nightqa-memory strong{display:none}.qa29-overlay .nightqa-memory span{font-size:8px;padding:1px}
 .qa29-overlay .nightqa-story h2{font-size:18px}.qa29-overlay .nightqa-story small{font-size:8px}.qa29-overlay .nightqa-scroll{gap:3px}.qa29-overlay .nightqa-scroll p{font-size:11px;line-height:1.38}.qa29-overlay .nightqa-choices{min-height:88px;max-height:48%;gap:3px;padding:2px}.qa29-overlay .nightqa-choices button{font-size:9px;padding:4px;box-shadow:none}
 .qa29-pager{min-height:27px;padding:2px}.qa29-pager button{font-size:9px;padding:4px;box-shadow:none}.qa29-pager span{font-size:8px}.qa29-overlay .nightqa-foot{font-size:8px;padding:2px}.qa29-overlay .nightqa-toolbar .nightqa-actions>button[data-action=back],.qa29-overlay .nightqa-toolbar .nightqa-actions>button[data-action=restart]{display:none}
 }
 @media(prefers-reduced-motion:reduce){.qa29-foyer *,.qa29-overlay *{animation:none!important}}

 .qa030-actions{display:flex;gap:7px;margin-top:auto;min-width:0}
 .qa030-actions #qa29-enter{flex:1;margin-top:0;min-width:0}
 .qa030-actions #qa30-newnight{flex:0 0 auto;min-width:0;font-size:10px;padding:7px}
 .qa030-save{font:900 10px/1.35 ui-monospace,monospace;color:#ffe57c;border:2px solid #5ceacb;background:#102d37;padding:5px 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
 .qa29-overlay .nightqa-choices button.qa030-undo{flex:0 0 auto;min-height:24px;font-size:10px;padding:3px 7px;background:#302543;color:#ffe27c;border-color:#a17fae}
 @media(max-width:750px){.qa030-save{font-size:8px;padding:3px}.qa030-actions{gap:4px}.qa030-actions #qa30-newnight{font-size:8px;padding:4px}.qa29-overlay .nightqa-choices button.qa030-undo{min-height:19px;padding:2px;font-size:9px}}
 `;document.head.append(style);
 let rings=0,taps=0,enhancing=false,readingPage=0,readingPages=[[]];
 const $=id=>document.getElementById(id);
 $('qa29-ring').addEventListener('click',()=>{$('qa29-bell').textContent=`DING ${++rings}. Still not the third cue.`});
 $('qa29-tap').addEventListener('click',()=>{$('qa29-moth').textContent=['It evades capture.','It lands on the EXIT sign.','It looks disappointed.'][++taps%3]});
 $('qa29-enter').addEventListener('click',()=>{overlay.hidden=false;refresh();overlay.querySelector('.qa29-exit')?.focus({preventScroll:true})});
 $('qa30-newnight').addEventListener('click',()=>{
  const root=mount.querySelector('.nightqa');if(!root)return;
  const marker=root.querySelector('.nightqa-story small')?.textContent||'';
  if(marker&&!marker.startsWith('SCENE 1 ')&&!window.confirm('Start a NEW NIGHT? Your current choices will be replaced. Discovered endings remain in your Casebook.'))return;
  root.querySelector('[data-action="restart"]')?.click();refresh();
 });
 async function leave(){if(document.fullscreenElement===overlay)try{await document.exitFullscreen()}catch{}overlay.hidden=true;p.querySelector('.term-panel-head h1')?.focus?.();const diary=$('term-tab-diary');diary?.click();diary?.focus({preventScroll:true})}
 async function full(){try{if(document.fullscreenElement===overlay)await document.exitFullscreen();else await overlay.requestFullscreen()}catch(e){const foot=overlay.querySelector('.nightqa-foot');if(foot)foot.textContent='Fullscreen unavailable in this browser; full-window mode stays active.'}refreshButtons()}
 function refreshButtons(){const btn=overlay.querySelector('.qa29-full');if(btn)btn.textContent=document.fullscreenElement===overlay?'▣ LEAVE FULLSCREEN':'▣ FULLSCREEN'}
 document.addEventListener('fullscreenchange',refreshButtons);
 document.addEventListener('keydown',e=>{if(overlay.hidden)return;if(e.key==='Escape'&&!document.fullscreenElement){e.preventDefault();e.stopPropagation();leave()}},true);
 function sliceText(str){const out=[];for(const line of str.split(/\n+/))for(let t of line.split(/(?<=[.!?])\s+(?=[A-Z“"'(])/)){t=t.trim();while(t.length>130){let n=t.lastIndexOf(' ',130);if(n<25)n=130;out.push(t.slice(0,n));t=t.slice(n).trim()}if(t)out.push(t)}return out}
 function paginate(){const story=overlay.querySelector('.nightqa-story'),area=story?.querySelector('.nightqa-scroll');if(!area)return;
  const src=[...area.children].flatMap(e=>sliceText(e.textContent).map(t=>({cls:e.className,t})));readingPages=[[]];area.replaceChildren();
  for(let i=0;i<src.length;i++){const v=src[i],q=document.createElement('p');q.className=v.cls;q.textContent=v.t;area.append(q);
   if(area.scrollHeight>area.clientHeight+2){q.remove();if(readingPages.at(-1).length){readingPages.push([]);area.replaceChildren();i--;continue}if(v.t.length>22){let mid=v.t.lastIndexOf(' ',Math.floor(v.t.length/2));if(mid<8)mid=Math.floor(v.t.length/2);src.splice(i,1,{...v,t:v.t.slice(0,mid)},{...v,t:v.t.slice(mid).trim()});i--;continue}area.append(q)}readingPages.at(-1).push(v)
  }
  readingPage=0;const pager=document.createElement('nav');pager.className='qa29-pager';pager.setAttribute('aria-label','Story pages');area.after(pager);const choices=story.querySelector('.nightqa-choices');const choiceHTML=choices.innerHTML;
  function show(){area.replaceChildren();for(const v of readingPages[readingPage]){const q=document.createElement('p');q.className=v.cls;q.textContent=v.t;area.append(q)}
   const done=readingPage===readingPages.length-1;pager.innerHTML=`<button type="button" data-page="prev" ${readingPage?'':'disabled'}>◀ BACK</button><span>PAGE ${readingPage+1} / ${readingPages.length}</span><button type="button" data-page="next" ${done?'disabled':''}>CONTINUE ▶</button>`;
   choices.innerHTML=done?choiceHTML:'<button type="button" class="qa29-next" data-page="next">▶ CONTINUE READING</button>';
  }
  pager.addEventListener('click',e=>{const x=e.target.closest('[data-page]');if(!x)return;readingPage=Math.max(0,Math.min(readingPages.length-1,readingPage+(x.dataset.page==='next'?1:-1)));show()});
  choices.addEventListener('click',e=>{if(e.target.closest('[data-page]')){readingPage=Math.min(readingPage+1,readingPages.length-1);show()}},true);
  show();
 }
 function refresh(){const root=mount.querySelector('.nightqa');if(!root)return;
  const marker=root.querySelector('.nightqa-story small')?.textContent||'';
  const heading=root.querySelector('.nightqa-story h2')?.textContent||'';
  const progressed=Boolean(marker)&&!marker.startsWith('SCENE 1 ');
  const info=$('qa30-save'),enter=$('qa29-enter');
  if(info)info.textContent=progressed?('◈ SAVED NIGHT · '+heading+' · '+marker):'◈ NEW NIGHT · YOUR PROGRESS SAVES ON THIS DEVICE';
  if(enter)enter.textContent=progressed?'▶ RESUME NIGHT':'▶ ENTER THE THEATER';
  const actions=root.querySelector('.nightqa-actions');if(actions&&!actions.querySelector('.qa29-exit'))actions.insertAdjacentHTML('beforeend','<button type="button" class="qa29-full">▣ FULLSCREEN</button><button type="button" class="qa29-exit">✕ EXIT TO DIARY</button>');
  const count=(actions?.textContent||'').match(/CASEBOOK\s*\((\d+)\/4\)/);if(count)$('qa29-finds').textContent=count[1]+'/4';
  const art=root.querySelector('.nightqa-art'),poster=$('qa29-poster');if(art&&poster)try{const c=poster.getContext('2d');c.imageSmoothingEnabled=false;c.clearRect(0,0,320,150);c.drawImage(art,0,0)}catch{}
  const unpaged=root.querySelector('.nightqa-story:not([data-qa29-paginated])');if(unpaged){unpaged.setAttribute('data-qa29-paginated','1');requestAnimationFrame(()=>{if(mount.querySelector('.nightqa')===root)paginate()})}
  refreshButtons();
 }
 mount.addEventListener('click',e=>{const b=e.target.closest('.qa29-exit,.qa29-full');if(!b)return;e.stopPropagation();if(b.classList.contains('qa29-exit'))leave();else full()},true);
 const observer=new MutationObserver(()=>{if(enhancing)return;enhancing=true;requestAnimationFrame(()=>{enhancing=false;refresh()})});observer.observe(mount,{childList:true});
 refresh();
})();