/* LENORE STUDIO / GREMELKIN R014 — an actual pixel-art tabletop radio.
 * Upgrades only the children of the existing radio button, preserving the
 * R009 click-to-commentary handler, keyboard semantics and R001 saved data. */
(()=>{
  'use strict';
  const room=document.querySelector('#gremelkin-app .grem-r009');
  const radio=room?.querySelector('.grem-r009-stereo');
  if(!radio || room.classList.contains('grem-r014'))return;
  room.classList.add('grem-r014');
  radio.setAttribute('aria-label','Play with Gremelkin’s little radio');
  radio.setAttribute('title','Play with Gremelkin’s radio');
  radio.dataset.station='0';
  // Decorative parts: an angled aerial, slotted speaker, analog frequency
  // window with needle, two knobs and a pilot light. No crosses or slogans.
  radio.innerHTML=`
    <span class="grem-radio-antenna" aria-hidden="true"></span>
    <span class="grem-radio-case" aria-hidden="true">
      <span class="grem-radio-speaker"><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <span class="grem-radio-controls">
        <span class="grem-radio-dial"><span class="grem-radio-scale"><b>88</b><b>108</b></span><i class="grem-radio-needle"></i></span>
        <span class="grem-radio-knobs"><i></i><i></i><span class="grem-radio-led"></span></span>
      </span>
    </span>`;
  // Tiny pointer shift reinforces that pressing the radio cycles its existing
  // comic commentary. This does not claim to stream actual audio.
  radio.addEventListener('click',()=>{
    radio.dataset.station=String((Number(radio.dataset.station)+1)%4);
  });
})();
