'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const Core=require('./pet-core.js'),D=require('./pet-delights.js');
test('new visitor begins with locked treasures',()=>{
 const finds=D.collection(Core.create(10000));
 assert.equal(finds.length,8);assert.equal(finds.filter(x=>x.unlocked).length,0);
 assert.equal(new Set(finds.map(x=>x.id)).size,finds.length);
});
test('ordinary R001 counters unlock treasures without mutating state',()=>{
 const s=Core.create(10000);s.meals=5;s.games=3;s.visits=3;s.affection=65;s.achievements.push('night-owl');
 const before=JSON.stringify(s);assert.equal(D.collection(s).filter(x=>x.unlocked).length,8);
 assert.equal(JSON.stringify(s),before);
});
test('partial progress unlocks only the proper discoveries',()=>{
 const s=Core.create(10000);s.meals=1;s.affection=36;
 assert.deepEqual(D.collection(s).filter(x=>x.unlocked).map(x=>x.id),['tuna','purr']);
});
test('a normal pet backpack retains collectible progress',()=>{
 const s=Core.create(10000);s.meals=7;s.games=3;s.visits=4;s.affection=72;
 const before=D.collection(s).filter(x=>x.unlocked).map(x=>x.id);
 const imported=Core.importBackpack(Core.exportBackpack(s,12000),12000);
 assert.deepEqual(D.collection(imported).filter(x=>x.unlocked).map(x=>x.id),before);
});
test('no new fields are added to the R001 pet save',()=>{
 const s=Core.create(10000);D.collection(s);D.postcard(10000);
 assert.deepEqual(Object.keys(s).sort(),Object.keys(Core.create(10000)).sort());
});
test('a day gets one repeatable original postcard',()=>{
 const now=Date.parse('2026-10-28T13:00:00Z');
 assert.deepEqual(D.postcard(now),D.postcard(now));assert.equal(typeof D.postcard(now).message,'string');
 assert.ok(D.postcard(now).message.length>15);
});
test('a future day has a valid postcard with no streak penalty',()=>{
 assert.match(D.postcard(Date.parse('2027-07-11T12:00:00Z')).day,/^\d{4}-\d{2}-\d{2}$/);
 assert.equal(D.collection(Core.create()).length,8);
});
test('invalid postcard dates and missing state reject safely',()=>{
 assert.throws(()=>D.postcard(NaN),/Invalid/);assert.throws(()=>D.collection(null),/Missing/);
});
