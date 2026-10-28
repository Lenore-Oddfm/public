/* Offline Node tests for Gremelkin core; no browser/network */
const assert=require("node:assert/strict");
const p=require("./pet-core.js"),now=Date.UTC(2026,9,28,12);
let n=0;function test(name,f){f();n++;console.log("PASS "+name)}
test("singleton character ID",()=>assert.equal(p.create(now).id,p.ID));
test("travel-friendly offline decay without death",()=>{const o=p.tick(p.create(now),now+86400000*30);assert.equal(o.hunger>=0,true);assert.equal(o.energy>=0,true);assert.equal(o.id,p.ID)});
test("feed and affection",()=>{let a=p.create(now);a.hunger=10;a=p.care(a,"feed",now+2000);assert.equal(a.hunger>10,true);assert.equal(a.meals,1);a=p.care(a,"pet",now+3000);assert.equal(a.affection>16,true)});
test("feeding cooldown",()=>{let a=p.care(p.create(now),"feed",now+1000);assert.throws(()=>p.care(a,"feed",now+1200))});
test("game succeeds",()=>{let a=p.care(p.create(now),"game-win",now+2000);assert.equal(a.games,1);assert(a.achievements.includes("first-game"))});
test("game miss only minor fun",()=>{let a=p.care(p.create(now),"game-miss",now+2000);assert(a.fun<=83)});
test("wrong project import rejected",()=>assert.throws(()=>p.importBackpack({kind:"other",format:1,pet:p.create(now)},now)));
test("wrong cat rejected",()=>assert.throws(()=>p.validate({...p.create(now),id:"OTHERCAT"},now)));
test("malformed values constrained",()=>{let a=p.validate({...p.create(now),fun:999,energy:-5,affection:"BAD",visits:-20},now);assert.equal(a.fun,100);assert.equal(a.energy,0);assert.equal(a.visits,0)});
test("local round trip",()=>{let a=p.care(p.create(now),"brush",now+1000);const pack=p.exportBackpack(a,now+3000);const b=p.importBackpack(pack,now+4000);assert.equal(b.id,p.ID);assert(Math.abs(b.clean-a.clean)<0.01)});
test("visit count",()=>assert.equal(p.visit(p.create(now),now+1000).visits,1));
test("mood returns display-safe state",()=>assert(["curious","content","glowing","hungry","sleepy","scruffy","bored"].includes(p.mood(p.create(now)).name)));
console.log(n+" PET CORE TESTS PASSED");
