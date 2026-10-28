/* GREMELKIN R001 | Studio Planner | client-only pet: browser save, no global doors */
(function(){
"use strict";
const P=window.GremelkinCore,root=document.getElementById("gremelkin-app");
if(!root)return;
if(!P){root.textContent="Gremelkin's engine did not load. The diary is still safe.";return;}
const DATA="ODDFM.GREMELKIN.R001.STATE",LOCK="ODDFM.GREMELKIN.R001.TAB";
const tid=window.crypto&&crypto.randomUUID?crypto.randomUUID():"tab"+Date.now()+Math.random();
let state=P.create(),owner=false,storageOK=true,visitCounted=false,game=null,timer=null;
const $=s=>root.querySelector(s);
function read(key){try{return localStorage.getItem(key)}catch(_){storageOK=false;return null}}
function write(key,value){try{localStorage.setItem(key,value);return true}catch(_){storageOK=false;return false}}
function remove(key){try{localStorage.removeItem(key)}catch(_){storageOK=false}}
function load(){const value=read(DATA);if(!value)return P.create();try{return P.tick(P.validate(JSON.parse(value)))}catch(_){return P.create()}}
function save(){state.updatedAt=Date.now();write(DATA,JSON.stringify(state))}
function lease(){try{return JSON.parse(read(LOCK)||"null")}catch(_){return null}}
function claim(){
 if(document.hidden){owner=false;return false}
 if(!storageOK){owner=true;return true}
 const old=lease(),now=Date.now();
 if(!storageOK){owner=true;return true}
 if(old&&old.id!==tid&&old.expire>now){owner=false;return false}
 write(LOCK,JSON.stringify({id:tid,expire:now+9000}));
 const test=lease();owner=!storageOK||(test&&test.id===tid);return owner
}
function release(){const l=lease();if(l&&l.id===tid)remove(LOCK);owner=false}
function speak(s){$("#grem-dialogue").textContent=s}
root.innerHTML=[
"<div class='grem-room'>",
"<div class='grem-kicker'>CAT.EXE // WORLD ID: GREMELKIN-ONE // HOME: LENORE STUDIO</div>",
"<h2>Gremelkin <span aria-hidden='true'>🐾</span></h2>",
"<p class='grem-note'>Feed him, cuddle him, brush his fur, and chase a pixel mouse together. Your travel-friendly little night cat.</p>",
"<div class='grem-status'><span id='grem-location' class='grem-chip live'>HOME</span><span id='grem-save' class='grem-chip'>LOCAL SAVE</span><span class='grem-chip limited'>WORLD CAT DOORS: NOT CONNECTED</span></div>",
"<div class='grem-layout'><div class='grem-stage'><div id='grem-sprite'></div><div class='grem-shadow' aria-hidden='true'></div><div id='grem-mood' class='grem-stage-caption' aria-live='polite'>Checking whiskers…</div></div>",
"<div class='grem-controls'><div class='grem-vitals' aria-label='Gremelkin needs'>",
"<div class='grem-vital' data-stat='hunger'><div class='grem-vital-label'><span>🐟 FULL</span><output>--</output></div><div class='grem-track'><div class='grem-fill'></div></div></div>",
"<div class='grem-vital' data-stat='energy'><div class='grem-vital-label'><span>🌙 ENERGY</span><output>--</output></div><div class='grem-track'><div class='grem-fill'></div></div></div>",
"<div class='grem-vital' data-stat='fun'><div class='grem-vital-label'><span>✦ FUN</span><output>--</output></div><div class='grem-track'><div class='grem-fill'></div></div></div>",
"<div class='grem-vital' data-stat='clean'><div class='grem-vital-label'><span>✧ FLUFF</span><output>--</output></div><div class='grem-track'><div class='grem-fill'></div></div></div>",
"</div><div id='grem-actions' class='grem-actions' aria-label='Care and play'>",
"<button type='button' data-act='feed'>🐟 FEED</button><button type='button' data-act='pet'>💖 PET</button><button type='button' data-act='brush'>✧ BRUSH</button>",
"<button type='button' data-act='nap'>🌙 NAP</button><button type='button' data-act='talk'>♫ TALK</button><button type='button' data-act='laser'>🐭 CHASE!</button></div>",
"<div id='grem-dialogue' class='grem-dialogue' role='status' aria-live='polite'>*mrrp*</div>",
"<div id='grem-game' class='grem-game' hidden><div class='grem-game-heading'><span>CATCH FIVE MICE!</span><span id='grem-score'>0/5 • 18s</span></div><div id='grem-mouse-board' class='grem-mouse-board' role='group' aria-label='Laser mouse grid'></div><button type='button' id='grem-cancel' class='grem-cancel'>END GAME</button></div>",
"<div class='grem-tools'><button type='button' id='grem-export'>💾 SAVE BACKPACK</button><button type='button' id='grem-import'>↩ RESTORE SAVE</button><input id='grem-file' type='file' accept='.json,application/json' aria-label='Choose Gremelkin local save'></div>",
"<p id='grem-memory' class='grem-note'>Bond • Visits • Games</p></div></div>",
"<div class='grem-footer'><span>He never dies while you travel. No payment, login, or tracking. ♡</span><span>Director blueprint R001 on GitHub • Live care saved in THIS browser</span></div></div>"
].join("");
const header=document.querySelector(".pixel-cat-wrap"),base=document.querySelector(".pixel-cat-wrap .pixel-cat");
if(base){const sprite=base.cloneNode(true);sprite.classList.add("grem-avatar");sprite.removeAttribute("aria-label");sprite.setAttribute("aria-hidden","true");$("#grem-sprite").append(sprite)}else $("#grem-sprite").textContent="🐈‍⬛";
if(header){
 header.setAttribute("role","button");header.setAttribute("tabindex","0");header.setAttribute("aria-label","Visit and play with Gremelkin");header.title="Click to play with Gremelkin";
 const hint=document.createElement("span");hint.className="grem-header-hint";hint.textContent="PLAY WITH ME";header.append(hint);
 const jump=()=>{document.getElementById("gremelkin-home").scrollIntoView({behavior:window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});$("#grem-actions").querySelector("button").focus({preventScroll:true})};
 header.addEventListener("click",jump);header.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();jump()}});
}
function bounce(){const el=$(".grem-avatar");if(!el)return;el.classList.remove("bounce");void el.getBoundingClientRect();el.classList.add("bounce");setTimeout(()=>el.classList.remove("bounce"),950)}
function render(){
 state=P.tick(state);const mood=P.mood(state),sprite=$(".grem-avatar");
 if(sprite){sprite.classList.remove("sleepy","hungry","scruffy","glowing");if(["sleepy","hungry","scruffy","glowing"].includes(mood.name))sprite.classList.add(mood.name)}
 $("#grem-mood").textContent=(owner?"♥ ":"◌ ")+mood.name.toUpperCase()+" • "+mood.line;
 for(const stat of ["hunger","energy","fun","clean"]){const el=root.querySelector("[data-stat='"+stat+"']"),n=Math.round(state[stat]);el.querySelector("output").textContent=n+"%";el.querySelector(".grem-fill").style.width=n+"%"}
 $("#grem-location").textContent=owner?"STUDIO • HERE WITH YOU":"VISITING ANOTHER TAB";$("#grem-location").classList.toggle("live",owner);
 $("#grem-save").textContent=storageOK?"AUTO-SAVED ON THIS DEVICE":"TEMPORARY • STORAGE BLOCKED";
 $("#grem-memory").textContent="💖 BOND "+Math.round(state.affection)+"%  •  VISITS "+state.visits+"  •  FISH "+state.meals+"  •  MOUSE GAMES "+state.games+"  •  BADGES "+state.achievements.length;
 root.querySelectorAll("[data-act],#grem-export,#grem-import").forEach(b=>b.disabled=!owner);
}
function perform(act){
 if(!owner)return speak("Gremelkin is in another tab. Bring that tab to the foreground to visit.");
 if(game)return speak("Finish the mouse chase first!");
 try{state=P.care(state,act);save();render();speak(state.lastAction);bounce()}catch(e){speak(e.message)}
}
root.querySelectorAll("[data-act]").forEach(btn=>btn.addEventListener("click",()=>btn.dataset.act==="laser"?startGame():perform(btn.dataset.act)));
function randomSpot(exclude){let n=Math.floor(Math.random()*16);if(n===exclude)n=(n+1+Math.floor(Math.random()*15))%16;return n}
function drawBoard(){
 if(!game)return;$("#grem-score").textContent=game.hits+"/5 • "+Math.max(0,Math.ceil((game.until-Date.now())/1000))+"s";
 const board=$("#grem-mouse-board");board.innerHTML="";
 for(let i=0;i<16;i++){
  const b=document.createElement("button");b.type="button";b.className="grem-mouse "+(i===game.spot?"target":"empty");b.textContent=i===game.spot?"🐭":"·";
  b.setAttribute("aria-label",i===game.spot?"Catch the mouse":"Empty square "+(i+1));b.addEventListener("click",()=>catchMouse(i));board.append(b)
 }
}
function startGame(){
 if(!owner)return speak("The cat is in another tab.");
 if(game)return;
 if(state.energy<8)return speak("Tiny paws need a nap first.");
 game={hits:0,spot:randomSpot(-1),until:Date.now()+18000};$("#grem-game").hidden=false;drawBoard();
 speak("CHASE TIME! Catch the mouse five times before the timer.");
 clearInterval(timer);timer=setInterval(()=>{if(!game)return;if(Date.now()>=game.until)endGame(false);else $("#grem-score").textContent=game.hits+"/5 • "+Math.ceil((game.until-Date.now())/1000)+"s"},500);
}
function catchMouse(i){
 if(!game||!owner)return;
 if(Date.now()>game.until){endGame(false);return}
 if(i!==game.spot){speak("Missed! Look for the little mouse.");return}
 game.hits++;if(game.hits>=5){endGame(true);return}
 game.spot=randomSpot(game.spot);drawBoard();speak("Caught one! Here comes another!");
}
function endGame(won,silent){
 if(!game)return;clearInterval(timer);timer=null;game=null;$("#grem-game").hidden=true;
 if(silent)return;
 try{state=P.care(state,won?"game-win":"game-miss");save();render();speak(state.lastAction);if(won)bounce()}catch(e){speak(e.message)}
}
$("#grem-cancel").addEventListener("click",()=>endGame(false));
$("#grem-export").addEventListener("click",()=>{
 if(!owner)return;const body=JSON.stringify(P.exportBackpack(state),null,2)+"\n",url=URL.createObjectURL(new Blob([body],{type:"application/json"})),a=document.createElement("a");
 a.href=url;a.download="GREMELKIN_LOCAL_SAVE_"+new Date().toISOString().slice(0,10)+".json";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
 speak("Backpack saved in Downloads. Take his memories to your next browser!");
});
$("#grem-import").addEventListener("click",()=>$("#grem-file").click());
$("#grem-file").addEventListener("change",async e=>{
 const file=e.target.files&&e.target.files[0];e.target.value="";if(!file||!owner)return;
 if(file.size>65536){speak("That file is much too big for a cat backpack.");return}
 try{state=P.importBackpack(JSON.parse(await file.text()));save();render();speak("MEMORIES RESTORED. Welcome back, little traveler.");bounce()}
 catch(err){speak("Backpack rejected: "+String(err.message).slice(0,125))}
});
function visible(){
 if(document.hidden){release();endGame(false,true)}
 else{claim();if(owner){state=load();if(!visitCounted){state=P.visit(state);save();visitCounted=true}}}
 render()
}
window.addEventListener("storage",e=>{
 if(e.key===DATA&&!owner){state=load();render()}
 if(e.key===LOCK){const before=owner;claim();if(before&&!owner)endGame(false,true);render()}
});
document.addEventListener("visibilitychange",visible);window.addEventListener("pagehide",release);
state=load();claim();if(owner){state=P.visit(state);save();visitCounted=true}
render();speak(owner?"*MRRP!* Feed me, pet me, or catch a mouse with me.":"Gremelkin is visiting another tab. One tab at a time here.");
setInterval(()=>{
 if(document.hidden)return;
 if(owner){
  const l=lease();
  if(storageOK&&l&&l.id!==tid&&l.expire>Date.now()){owner=false;endGame(false,true)}
  else write(LOCK,JSON.stringify({id:tid,expire:Date.now()+9000}));
  if(owner){state=P.tick(state);save()}
 }else{claim();if(owner){state=load();if(!visitCounted){state=P.visit(state);save();visitCounted=true}}else state=load()}
 render()
},3000);
})();
