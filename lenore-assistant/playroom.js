/* LENORE.EXE TOYBOX V3
 * Original client-side toys. No APIs, analytics, paid calls or remote media.
 * Project records are never changed by this module.
 */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const reduce=!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let tickets=0;
  const prize=(n=1)=>{tickets+=n;$('arcadeScore').textContent=String(tickets).padStart(4,'0')};
  const pick=a=>a[Math.floor(Math.random()*a.length)];

  /* 01 — HOOK-O-MATIC. Phrase fragments, not copied song lyrics. */
  const places=[
    'A 24-HOUR LAUNDROMAT','A CLOSED ICE RINK','THE LAST TRAIN CAR',
    'A FLOODED ARCADE','AN EMPTY PHOTOGRAPH BOOTH','BEHIND THE BOWLING ALLEY',
    'THE WRONG WEDDING','A GAS STATION AT 4 AM','A HOTEL LOBBY WITH NO CLOCK',
    'THE MUNICIPAL LOST-AND-FOUND','A ROOFTOP ANTENNA','A DISCONNECTED PAYPHONE',
    'A NIGHT BUS IN REVERSE','THE BASEMENT OF A DANCE SCHOOL'];
  const objects=[
    'A MISSING MOTEL KEY','A FURIOUS WEATHER REPORT','ONE UNSENT POSTCARD',
    'A HAUNTED VENDING MACHINE','THE SUBSTITUTE DRUMMER','A RECEIPT FOR A GHOST',
    'AN UNOPENED BIRTHDAY CAKE','YOUR EX IN A MASCOT SUIT','THE LAST CLEAN COFFEE CUP',
    'A PLASTIC TROPHY','A NAME SCRATCHED OFF A LIST','A BROKEN NEON LETTER',
    'THE WOMAN WHO KEEPS THE LIGHTS ON','A TAPE LABELED DO NOT PLAY'];
  const twists=[
    'REFUSES TO GO HOME','CAN ONLY TELL THE TRUTH IN RHYME','WANTS ITS MONEY BACK',
    'IS SECRETLY RUNNING THE PLACE','KNOWS EVERYONE IS LYING','HAS BEEN WAITING ELEVEN YEARS',
    'INSISTS THIS IS THE FUTURE','IS AFRAID OF THE DAWN','ASKS FOR A SECOND CHANCE',
    'STOLE THE WRONG IDENTITY','MISTAKES THE EXIT FOR AN ENTRANCE',
    'STARTS A ONE-PERSON RIOT','LEAVES THE LIGHT ON FOR NOBODY','ALWAYS SINGS THE WRONG VERSE'];
  const constraints=['NO WORDS RHYMING WITH NIGHT','MAKE THE CHORUS A QUESTION',
    'ONE CONCRETE SOUND PER VERSE','KEEP THE VERSES UNDER 12 SECONDS',
    'NO SKY, FIRE OR SHADOW METAPHORS','USE A SINGLE UNEXPECTED OBJECT AS THE HOOK',
    'MAKE THE PRE-CHORUS FEEL LIKE AN INTERRUPTED CALL'];
  const hookFields=[$('hookWhere'),$('hookWho'),$('hookTwist')];
  let hookSpinning=false,lastHook=-1,hookConstraint=constraints[0];
  function hookSet(){
    const arrays=[places,objects,twists];
    hookFields.forEach((el,i)=>el.textContent=pick(arrays[i]));
    hookConstraint=pick(constraints);
  }
  $('hookRoll').addEventListener('click',()=>{
    if(hookSpinning)return;
    hookSpinning=true;
    $('hookRoll').disabled=true;
    $('hookStatus').textContent='REELS RUNNING / PLEASE DO NOT SHAKE THE MACHINE';
    if(reduce){hookSet();finishHook();return}
    $('hookRoll').closest('.toy').querySelector('.slot-machine').classList.add('spinning');
    let rolls=0;
    const timer=setInterval(()=>{
      hookSet();rolls++;
      if(rolls>=7){clearInterval(timer);finishHook()}
    },65);
  });
  function finishHook(){
    $('hookRoll').closest('.toy').querySelector('.slot-machine').classList.remove('spinning');
    hookSpinning=false;$('hookRoll').disabled=false;
    $('hookStatus').textContent='BONUS RULE: '+hookConstraint;
    prize(5);
  }
  $('hookCopy').addEventListener('click',async()=>{
    const idea=hookFields.map(e=>e.textContent).join(' / ')+'\nConstraint: '+hookConstraint;
    try {if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(idea);$('hookStatus').textContent='IDEA COPIED. USE IT TO WRITE YOUR OWN SONG.';prize(2)}
    catch {$('hookStatus').textContent='CLIPBOARD BLOCKED. SELECT THE THREE REELS INSTEAD.'}
  });

  /* 02 — Eight-step beatbox. All sounds are short, ORIGINAL procedural bleeps.
   * AudioContext is only initialized inside the user's explicit PLAY click. */
  const rows=['KICK','SNARE','HAT','CHIP'];
  const pattern=[
    [1,0,0,0,1,0,0,0],
    [0,0,1,0,0,0,1,0],
    [1,1,1,1,1,1,1,1],
    [0,0,0,1,0,0,0,1]
  ];
  const grid=$('beatGrid');
  let ctx=null,beatTimer=0,beatIndex=0,beatPlaying=false;
  let bpm=120,volume=.18;
  const beatButtons=[];
  function renderBeatGrid(){
    grid.replaceChildren();beatButtons.length=0;
    for(let row=0;row<4;row++){
      const label=document.createElement('span');label.className='beat-label';label.textContent=rows[row];grid.appendChild(label);
      const buttons=[];
      for(let step=0;step<8;step++){
        const button=document.createElement('button');button.type='button';button.className='beat-step';
        button.dataset.row=rows[row].toLowerCase();button.dataset.on=String(!!pattern[row][step]);
        const name=`${rows[row]} step ${step+1}`;
        button.setAttribute('aria-label',`${name}: ${pattern[row][step]?'on':'off'}`);
        button.setAttribute('aria-pressed',String(!!pattern[row][step]));
        button.addEventListener('click',()=>{
          pattern[row][step]=pattern[row][step]?0:1;
          syncBeatButtons();prize(1);
        });
        buttons.push(button);grid.appendChild(button);
      }
      beatButtons.push(buttons);
    }
  }
  function syncBeatButtons(){
    for(let row=0;row<4;row++)for(let step=0;step<8;step++){
      const el=beatButtons[row][step],on=!!pattern[row][step];
      el.dataset.on=String(on);el.setAttribute('aria-pressed',String(on));
      el.setAttribute('aria-label',`${rows[row]} step ${step+1}: ${on?'on':'off'}`);
    }
  }
  function beatLight(){for(let row=0;row<4;row++)for(let step=0;step<8;step++)beatButtons[row][step].dataset.current=String(beatPlaying&&step===beatIndex)}
  function tone(freq,duration,type,gain,fall=0){
    const t=ctx.currentTime,osc=ctx.createOscillator(),amp=ctx.createGain();
    osc.type=type;osc.frequency.setValueAtTime(freq,t);
    if(fall)osc.frequency.exponentialRampToValueAtTime(Math.max(35,fall),t+duration);
    amp.gain.setValueAtTime(Math.max(.0001,gain*volume),t);
    amp.gain.exponentialRampToValueAtTime(.0001,t+duration);
    osc.connect(amp).connect(ctx.destination);osc.start(t);osc.stop(t+duration+.01);
  }
  function noise(duration,gain,filterFreq){
    const length=Math.max(1,Math.floor(ctx.sampleRate*duration));
    const buffer=ctx.createBuffer(1,length,ctx.sampleRate),samples=buffer.getChannelData(0);
    for(let i=0;i<length;i++)samples[i]=Math.random()*2-1;
    const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),amp=ctx.createGain();
    source.buffer=buffer;filter.type='highpass';filter.frequency.value=filterFreq;
    amp.gain.setValueAtTime(Math.max(.0001,gain*volume),ctx.currentTime);
    amp.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);
    source.connect(filter).connect(amp).connect(ctx.destination);source.start();source.stop(ctx.currentTime+duration+.01);
  }
  function playStep(){
    if(!ctx||!beatPlaying)return;
    const i=beatIndex;
    if(pattern[0][i])tone(130,.18,'sine',.7,48);
    if(pattern[1][i])noise(.12,.24,1000);
    if(pattern[2][i])noise(.055,.09,5500);
    if(pattern[3][i])tone([220,247,294,330,392,330,294,247][i],.11,'square',.18);
    beatLight();beatIndex=(beatIndex+1)%8;
  }
  function startClock(){clearInterval(beatTimer);beatTimer=setInterval(playStep,60000/bpm/2)}
  function stopBeat(){
    clearInterval(beatTimer);beatTimer=0;beatPlaying=false;
    beatButtons.flat().forEach(b=>b.dataset.current='false');
    $('beatPlay').textContent='▶ PLAY BEAT';$('beatState').textContent='■ STOPPED / SOUND OFF';
    if(ctx&&ctx.state==='running')ctx.suspend().catch(()=>{});
  }
  $('beatPlay').addEventListener('click',async()=>{
    if(beatPlaying){stopBeat();return}
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)throw Error('No WebAudio');
      if(!ctx)ctx=new Audio();
      await ctx.resume();
      beatPlaying=true;beatIndex=0;
      $('beatPlay').textContent='■ STOP BEAT';$('beatState').textContent='▶ PLAYING / ORIGINAL 8-BIT LOOP';
      playStep();startClock();prize(6);
    }catch{stopBeat();$('beatState').textContent='AUDIO BLOCKED IN THIS BROWSER';}
  });
  $('beatRandom').addEventListener('click',()=>{
    for(let row=0;row<4;row++)for(let step=0;step<8;step++){
      const density=row===0?.36:row===1?.24:row===2?.68:.25;
      pattern[row][step]=Math.random()<density?1:0;
    }
    pattern[0][0]=1;syncBeatButtons();prize(4);
  });
  $('beatClear').addEventListener('click',()=>{for(const row of pattern)row.fill(0);syncBeatButtons();prize(1)});
  $('beatBpm').addEventListener('input',e=>{bpm=Number(e.target.value);$('bpmDisplay').textContent=bpm;if(beatPlaying)startClock()});
  $('beatVolume').addEventListener('input',e=>{volume=Number(e.target.value)/100;$('volumeDisplay').textContent=Math.round(volume*100)+'%'});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&beatPlaying)stopBeat()});
  renderBeatGrid();

  /* 03 — Cat-o-matic. Another original low-resolution frame-loop. */
  const petCanvas=$('petCanvas'),petCtx=petCanvas.getContext('2d');
  petCtx.imageSmoothingEnabled=false;
  let pets=0,fish=0,sleeping=false,petFrame=0,heartFrames=0;
  const box=(x,y,w,h,c)=>{petCtx.fillStyle=c;petCtx.fillRect(x,y,w,h)};
  function renderPet(){
    const t=petFrame;
    box(0,0,160,112,'#14122b');
    for(let i=0;i<17;i++)if((i+t)%8<6)box((i*43)%160,(i*19)%68,2,2,i%2?'#ffdf77':'#76efd5');
    box(0,89,160,23,'#3b2449');for(let x=0;x<160;x+=17)box(x,91,9,3,'#7a467f');
    const bob=sleeping?9:(!reduce&&Math.floor(t/5)%2?2:0),y=37+bob;
    box(48,y-13,17,26,'#080914');box(96,y-13,17,26,'#080914');
    box(52,y-8,10,10,'#9b65a2');box(99,y-8,10,10,'#9b65a2');
    box(43,y,73,51,'#090916');box(49,y+42,61,12,'#090916');
    if(sleeping){box(60,y+22,17,3,'#ffe570');box(88,y+22,17,3,'#ffe570')}
    else {box(62,y+18,13,12,'#ffe570');box(90,y+18,13,12,'#ffe570');box(68,y+18,4,12,'#080914');box(96,y+18,4,12,'#080914')}
    box(79,y+32,5,4,'#ff78b6');box(73,y+39,5,2,'#9f67a2');box(85,y+39,5,2,'#9f67a2');
    box(46,y+36,17,2,'#72588f');box(105,y+36,17,2,'#72588f');
    const tail=sleeping?0:(t%12<6?6:0);box(109,y+49-tail,21,6,'#080914');box(127,y+31-tail,6,23,'#080914');
    if(heartFrames>0){for(let i=0;i<5;i++){
      const x=35+i*21,y0=26-(heartFrames*2+i*7)%41;
      box(x,y0,5,4,'#ff78b6');box(x+7,y0,5,4,'#ff78b6');box(x+2,y0+4,8,6,'#ff78b6');box(x+5,y0+10,3,3,'#ff78b6');
    }}
    if(fish>0) {box(119,79,22,8,'#71f5db');box(136,75,8,16,'#71f5db');box(124,82,3,3,'#080914')}
  }
  function mood(text,status){$('petMood').textContent=text;$('petStatus').textContent=status;renderPet()}
  function pet(){
    sleeping=false;pets++;heartFrames=22;$('petCount').textContent=pets;
    const moods=['PURRING LOUDLY','YOU MAY STAY','SECRETLY IMPRESSED','MORE PETS, LESS MEETINGS','ART DIRECTOR APPROVES'];
    mood(moods[pets%moods.length],'GREMBLE HAS APPROVED YOUR TOUCH.');prize(2);
  }
  $('petPat').addEventListener('click',pet);petCanvas.addEventListener('click',pet);
  $('petFeed').addEventListener('click',()=>{sleeping=false;fish++;heartFrames=12;mood('STUFFED WITH FISH','A FISH WAS CONVERTED INTO CREATIVE ENERGY.');prize(3)});
  $('petNap').addEventListener('click',()=>{sleeping=!sleeping;heartFrames=0;mood(sleeping?'DO NOT DISTURB':'BACK ON SHIFT',sleeping?'SHHH. PIXEL CAT IS OFF THE CLOCK.':'THE CAT HAS RETURNED TO MANAGEMENT.');prize(1)});
  renderPet();
  if(!reduce){let last=0;const loop=now=>{if(!document.hidden&&now-last>100){last=now;petFrame++;heartFrames=Math.max(0,heartFrames-1);renderPet()}requestAnimationFrame(loop)};requestAnimationFrame(loop)}

  /* 04 — A tiny standalone pixel-sticker canvas. PNG save is user initiated. */
  const sticker=$('stickerCanvas'),paint=sticker.getContext('2d');
  paint.imageSmoothingEnabled=false;
  const colors=[
    ['INK','#0d0b1a'],['PINK','#ff69b7'],['MINT','#66f3d3'],
    ['GOLD','#ffe36b'],['LILAC','#aaa0ff'],['WHITE','#fff4ea'],
    ['PLUM','#70417c'],['ERASE',null]
  ];
  const pixels=new Array(256).fill(null);
  let selected=1,paintCount=0;
  function redrawSticker(){
    paint.clearRect(0,0,16,16);
    for(let i=0;i<256;i++)if(pixels[i]){paint.fillStyle=pixels[i];paint.fillRect(i%16,Math.floor(i/16),1,1)}
  }
  function stampPattern(type){
    pixels.fill(null);
    const put=(x,y,c)=>{if(x>=0&&x<16&&y>=0&&y<16)pixels[y*16+x]=c};
    const rect=(x,y,w,h,c)=>{for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)put(xx,yy,c)};
    if(type==='cat'){
      rect(3,4,2,4,'#0d0b1a');rect(11,4,2,4,'#0d0b1a');rect(4,6,8,8,'#0d0b1a');
      rect(5,9,2,2,'#ffe36b');rect(9,9,2,2,'#ffe36b');put(6,9,'#0d0b1a');put(10,9,'#0d0b1a');
      rect(7,12,2,1,'#ff69b7');rect(4,6,2,1,'#ff69b7');rect(10,6,2,1,'#ff69b7');
    }else if(type==='heart'){
      for(let y=4;y<13;y++)for(let x=2;x<14;x++){
        const left=(x-5)*(x-5)+(y-6)*(y-6)<14,right=(x-10)*(x-10)+(y-6)*(y-6)<14;
        if(y<8&&(left||right)||y>=8&&Math.abs(x-7.5)<(14-y)*1.12)put(x,y,'#ff69b7');
      }
      rect(5,5,2,2,'#fff4ea');
    }else if(type==='record'){
      for(let y=1;y<15;y++)for(let x=1;x<15;x++){
        const d=(x-7.5)**2+(y-7.5)**2;
        if(d<49)put(x,y,d<8?'#ffe36b':(d<23?'#70417c':'#0d0b1a'));
      }
      rect(7,7,2,2,'#0d0b1a');
    }else{
      for(let y=2;y<14;y++)for(let x=2;x<14;x++)if(x===7||x===8||y===7||y===8||Math.abs(x-7.5)+Math.abs(y-7.5)<6)put(x,y,(x+y)%3===0?'#ffe36b':'#66f3d3');
    }
    redrawSticker();
  }
  const swatches=$('stickerSwatches');
  colors.forEach(([label,color],i)=>{
    const button=document.createElement('button');button.type='button';button.className='swatch';
    button.style.background=color||'#141122';button.title=label;
    button.setAttribute('aria-label',`Paint ${label.toLowerCase()}`);button.setAttribute('aria-pressed',String(i===selected));
    button.addEventListener('click',()=>{selected=i;[...swatches.children].forEach((el,j)=>el.setAttribute('aria-pressed',String(j===i)));$('stickerStatus').textContent='SELECTED '+label+'. DRAW SOME PIXELS.'});
    swatches.appendChild(button);
  });
  const drawPointer=e=>{
    const b=sticker.getBoundingClientRect(),x=Math.floor((e.clientX-b.left)/b.width*16),y=Math.floor((e.clientY-b.top)/b.height*16);
    if(x<0||x>15||y<0||y>15)return;
    pixels[y*16+x]=colors[selected][1];redrawSticker();paintCount++;
    if(paintCount%8===0)prize(1);
  };
  sticker.addEventListener('pointerdown',e=>{sticker.setPointerCapture?.(e.pointerId);drawPointer(e)});
  sticker.addEventListener('pointermove',e=>{if(e.buttons&1)drawPointer(e)});
  $('stickerStamp').addEventListener('click',()=>{const type=pick(['cat','heart','record','star']);stampPattern(type);$('stickerStatus').textContent='STAMPED '+type.toUpperCase()+'. PERSONALIZE IT!';prize(5)});
  $('stickerClear').addEventListener('click',()=>{pixels.fill(null);redrawSticker();$('stickerStatus').textContent='BLANK CANVAS. ANYTHING COULD HAPPEN.';prize(1)});
  $('stickerSave').addEventListener('click',()=>{
    try{
      const link=document.createElement('a');link.href=sticker.toDataURL('image/png');link.download='lenore-pixel-sticker.png';link.click();
      $('stickerStatus').textContent='PNG SENT TO YOUR DOWNLOADS. NICE PIXELS!';prize(8);
    }catch{$('stickerStatus').textContent='DOWNLOAD UNAVAILABLE; YOUR STICKER IS STILL HERE.'}
  });
  stampPattern('cat');

  /* Bonus: human-scale side quests. Suggestions only, never task mutations. */
  const quests=[
    'DRAW A PIXEL MOTH. GIVE IT A JOB TITLE.','REPLACE ONE BORING RHYME WITH A STREET ADDRESS.',
    'DESIGN AN ALBUM COVER USING ONLY FOUR COLORS.','WRITE A CHORUS ABOUT A STOLEN PARKING TICKET.',
    'MAKE AN INSTRUMENT SOUND LIKE A TEAPOT ARGUING.','NAME A NIGHTCLUB THAT ONLY OPENS AT NOON.',
    'GIVE A GHOST A VERY SPECIFIC COMPLAINT.','FIND A SOUND THAT FEELS LIKE RED VELVET.',
    'MAKE THE DRUM MACHINE DO SOMETHING IMPOLITE.','IMAGINE WHAT THE CAT DOES WHEN NOBODY IS HERE.'
  ];
  let lastQuest=-1;
  $('questRoll').addEventListener('click',()=>{
    let i=Math.floor(Math.random()*quests.length);if(i===lastQuest)i=(i+1)%quests.length;lastQuest=i;
    $('questText').textContent=quests[i];prize(3);
  });
})();
