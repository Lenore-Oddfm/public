/* Node-only pure rules regression. No pet-core save mutation or browser required. */
const assert=require('node:assert/strict');
const g=require('./pet-boxes.js');
let n=0;const test=(name,fn)=>{fn();n++;console.log('PASS',name)};
test('first box lower bound',()=>assert.equal(g.choose(-1,()=>0),0));
test('first box middle',()=>assert.equal(g.choose(-1,()=>.4),1));
test('first box upper bound',()=>assert.equal(g.choose(-1,()=>.999999),2));
test('random out of range clamps',()=>assert.equal(g.choose(-1,()=>3),2));
test('NaN random safe',()=>assert.equal(g.choose(-1,()=>NaN),0));
test('never same hiding box in next round',()=>{for(let p=0;p<3;p++)for(let r of [0,.1,.5,.99])assert.notEqual(g.choose(p,()=>r),p)});
test('hit and miss',()=>{assert.equal(g.result(1,1),'found');assert.equal(g.result(1,0),'miss')});
test('bad boxes rejected',()=>{for(let p of [-1,3,1.5])assert.throws(()=>g.result(p,1));assert.throws(()=>g.result(0,9))});
test('no-document mount safely returns false',()=>assert.equal(g.mount({getElementById:()=>null}),false));
console.log(n+'/'+n+' box-rules tests PASS');
