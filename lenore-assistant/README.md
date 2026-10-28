# Lenore / Expedition — public Diary · To-Do · Planner

Open the **visual planner**: [Lenore / Expedition on GitHub Pages](https://lenore-oddfm.github.io/public/lenore-assistant/).

This folder provides the read-only public presentation for Lenore Expedition's ODD FM **lyrics writer** project. **V4, the C.LINK appliance**, encloses the animated pixel-motion Art Department in a fixed one-screen utility terminal with eleven station tabs and three flyout panels. The original V3 gadgets and useful planner records remain intact:

- A foundry project radar and four-stage writing roadmap.
- Searchable, status-filtered project registry.
- Open/done task filters (read-only; no persistent task changes).
- Curated public diary excerpts and explicit routing rules.
- A responsive design independent from [Studio Lenore's planner](../lenore/).
- An original 512×248-pixel, nearest-neighbor animated night studio: dancing Lenore sprite, tiny bat companion, spinning record, blinking marquee, and bouncing CRT equalizer.
- DANCE and PAUSE/PLAY controls; reduced-motion preference is respected and no sound/autoplay audio is used.
- Flat colors, chunky 8-bit borders, no gradients, no external animation libraries or network calls.

## V3 Arcade Toy Room

The separate `playroom.js` and `playroom.css` add **five local, optional gadgets**, without modifying the project data or private GitHub records:

1. **HOOK-O-MATIC** — slot-machine-style original song-premise generator, with a challenge constraint and optional copy button. No AI or API requests.
2. **8-BIT BEATBOX** — a fully editable four-voice eight-step rhythm grid, tempo/volume controls, randomized patterns and opt-in synthesized audio. AudioContext is created only after a direct PLAY click. No prerecorded songs/samples.
3. **CAT-O-MATIC 3000** — pet, feed or let the animated pixel cat nap; temporary happiness/pet counter.
4. **16×16 STICKER LAB** — touch/mouse pixel drawing, palette, surprise stamps and user-initiated transparent PNG export.
5. **SIDE QUEST ROULETTE** — silly micro-prompts for the Art Department, plus a session-only arcade-ticket counter.

No toys modify Foundry briefs, lyric drafts, official task completions, Quin installations or central Switchboard decisions. Toy data is local to the loaded page and is not uploaded to servers. Motion pauses according to reduced-motion preference; beatbox sound is explicitly started/stopped by the user.

## V4 C.LINK terminal shell

Two new static files, `terminal.css` and `terminal.js`, upgrade the complete existing page into a deliberately **non-scrolling hardware-style appliance** when JavaScript is available. Original V3 remains the fallback if the enhancement cannot load.

- Eleven tab ports: Lounge, Hook, Beat, Cat, Pixel, Quest, Radar, Files, Tasks, Diary, Rules.
- Three utility flyouts: verified Status, actual beatbox Quick Mixer, and keyboard Help; Escape, overlay-click, and Close return to the screen.
- Hard viewport frame, pixel indicator lamps, session ticket counter, live local device clock, direct-launch hardware keys and footer buttons; no CSS gradients.
- One-at-a-time paged records, task entries, and diary notes, with original search and status filters still usable. No scroll-to-anchor website navigation.
- Native tab semantics and ARIA state updates, focus management for drawers, ALT+1…9 quick tabs and arrow keys when a tab is focused.
- Responsive compact variants for tablet and phone. On exceptionally tiny displays or text zoom, controlled overflow inside the help drawer may be necessary to keep all controls accessible; the outer document remains fixed.
- No persistent storage, analytics, paid API, external media, or publication change beyond the public planner itself.

The private operational records remain separately in `Lenore-Oddfm/lenore-animation-studio/planner/lenore-assistant/`; they are **not automatically synchronized** to this public page. Screenshots, unreleased songs, keys, private lyrics, code and ZIP archives do not belong here. Statuses represent a manually reviewed snapshot, not a real-time source of deployment truth.

The other Lenore's lyrics scraper is a different project. Foundry's Quin installation and its central ownership are still unverified/pending coordination. No public page can authorize a release.

**Design history:** v1 established a useful searchable planner but looked like a generic gradient dashboard. At the Queen's request, v2 gave the Art Department some actual pixel life. For v3 she demanded toys and gizmos everywhere—so the Toy Room was born. In v4 the Queen insisted it behave like a C.LINK terminal appliance, not a website, so the full page became a tab-operated switchboard. All project facts, task filters, and diary records remain available.
