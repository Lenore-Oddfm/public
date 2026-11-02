/* LENORE STUDIO / GREMELKIN R009 — NIGHT ROOM
   Ambient scenery and two tiny toys. R001 pet state is untouched.
   No external requests, save fields, audio, or competing pet engine. */
(()=>{
 'use strict';
 const app=document.getElementById('gremelkin-app');
 const room=app?.querySelector('.grem-r008');
 const stage=app?.querySelector('#grem-stage');
 if(!room||!stage||room.classList.contains('grem-r009'))return;
 room.classList.add('grem-r009');
 const old=stage.querySelector('.grem-r008-decor');
 if(old)old.remove();
 const scene=document.createElement('div');
 scene.className='grem-r009-scene';
 scene.innerHTML=
 '<div class="grem-r009-window" aria-hidden="true"><div class="grem-r009-moon"></div><i></i><i></i><i></i><i></i><i></i><div class="grem-r009-sill"></div></div>'+
 '<div class="grem-r009-shelf" aria-hidden="true"><div class="grem-r009-book"></div><div class="grem-r009-book"></div><div class="grem-r009-plant"><i></i></div></div>'+
 '<div class="grem-r009-rug" aria-hidden="true"></div>'+
 '<button type="button" class="grem-r009-stereo" aria-label="Tune Gremelkin’s little radio" title="Tune the radio"><span aria-hidden="true">♫</span><small>TUNE IN</small><i></i></button>'+
 '<button type="button" class="grem-r009-yarn" aria-label="Bat the yarn" title="Bat the yarn"><span aria-hidden="true">◉</span></button>'+
 '';
 stage.prepend(scene);
 let station=0;
 const radio=['Now playing: the mysterious purr frequency.','A signal from the moon: more fish, please.','One cat has stolen the best cassette.','Someone tuned in to static. Gremelkin approves.'];
 function chatter(line){
  const dialogue=app.querySelector('#grem-dialogue');
  if(dialogue)dialogue.textContent=line;
 }
 scene.querySelector('.grem-r009-stereo').addEventListener('click',()=>chatter('♫ '+radio[station++%radio.length]));
 scene.querySelector('.grem-r009-yarn').addEventListener('click',()=>{
  const yarn=scene.querySelector('.grem-r009-yarn');
  yarn.classList.remove('grem-r009-roll');
  void yarn.offsetWidth;
  yarn.classList.add('grem-r009-roll');
  chatter('✦ Gremelkin bats the yarn. The yarn files a complaint.');
 });
})();