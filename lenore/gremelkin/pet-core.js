/* Gremelkin Pet Core R001 | ODD FM • Studio Lenore | deterministic, no network */
(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;root.GremelkinCore=api;})(typeof globalThis!=="undefined"?globalThis:this,function(){
"use strict";
const ID="ODDFM-GREMELKIN-ONE",VERSION=1,MAX_OFFLINE_MS=7*86400000;
const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,Number.isFinite(Number(n))?Number(n):a));
const safeTime=(v,now)=>Number.isFinite(Number(v))&&Number(v)>0?Math.min(Number(v),now):now;
function create(now=Date.now()){return {schema:VERSION,id:ID,name:"Gremelkin",bornAt:now,updatedAt:now,visits:0,meals:0,games:0,affection:16,hunger:82,energy:88,fun:78,clean:84,lastAction:"Woke up in the ODD FM studio",lastActionAt:0,achievements:[],favoriteToy:"Laser Mouse"};}
function validate(input,now=Date.now()){
 if(!input||typeof input!=="object"||input.id!==ID||input.schema!==VERSION)throw Error("This is not a compatible Gremelkin backpack.");
 const s=create(now);
 for(const k of ["hunger","energy","fun","clean","affection"])s[k]=clamp(input[k]??s[k]);
 for(const k of ["visits","meals","games"])s[k]=Math.min(1000000,Math.max(0,Number.isSafeInteger(input[k])?input[k]:0));
 s.bornAt=safeTime(input.bornAt,now);s.updatedAt=safeTime(input.updatedAt,now);
 s.lastAction=typeof input.lastAction==="string"?input.lastAction.slice(0,160):s.lastAction;
 s.lastActionAt=safeTime(input.lastActionAt||0,now);
 s.favoriteToy="Laser Mouse";s.achievements=Array.isArray(input.achievements)?[...new Set(input.achievements.filter(x=>["first-meal","first-game","ten-cuddles","night-owl","well-loved"].includes(x)))].slice(0,5):[];
 return s;
}
function tick(input,now=Date.now()){
 const s=validate(input,now),elapsed=Math.max(0,Math.min(MAX_OFFLINE_MS,now-s.updatedAt))/3600000;
 s.hunger=clamp(s.hunger-1.0*elapsed);
 s.energy=clamp(s.energy-0.38*elapsed);
 s.fun=clamp(s.fun-0.72*elapsed);
 s.clean=clamp(s.clean-0.40*elapsed);
 s.updatedAt=now;return s;
}
function mood(s){const avg=(s.hunger+s.energy+s.fun+s.clean)/4;
 if(s.energy<27)return {name:"sleepy",face:"◡ . ◡",line:"A tiny cat needs a nap."};
 if(s.hunger<26)return {name:"hungry",face:"• ᴥ •",line:"He's thinking about fish."};
 if(s.clean<23)return {name:"scruffy",face:"≧ ᴥ ≦",line:"He got tangled in tape again."};
 if(s.fun<26)return {name:"bored",face:"– ᴥ –",line:"He's plotting against the furniture."};
 if(avg>83&&s.affection>46)return {name:"glowing",face:"✦ ᴥ ✦",line:"You are his favorite human tonight."};
 return {name:avg>62?"content":"curious",face:"• ᴥ •",line:avg>62?"Soft purrs from the night shift.":"Gremelkin has opinions about this."};
}
const messages={
 feed:["A little pixel fish. A very loud purr.","He ate the fish and judged the plate.","The finest imaginary tuna in Robot World."],
 pet:["Gremelkin leans into your hand.","One blink. You have been accepted.","A tiny motor starts in his chest."],
 brush:["The whiskers are back in formation.","He pretends not to enjoy the brushing.","Now he's suspiciously magnificent."],
 nap:["Curled into a warm cassette-case nest.","A cat-sized recharge cycle begins.","He sleeps with one ear tuned to ODD FM."],
 talk:["Mrrp. Translation: the moon is upside down.","He says the synth needs more bass.","Gremelkin wants to know where your spaceship is."]
};
function care(input,action,now=Date.now()){
 const s=tick(input,now);
 if(now-s.lastActionAt<650)throw Error("Easy, Human. He is still reacting!");
 const say=(arr)=>arr[(s.visits+s.meals+s.games+Math.floor(now/3600000))%arr.length];
 switch(action){
 case "feed":s.hunger=clamp(s.hunger+24);s.clean=clamp(s.clean-3);s.meals++;s.lastAction=say(messages.feed);if(!s.achievements.includes("first-meal"))s.achievements.push("first-meal");break;
 case "pet":s.affection=clamp(s.affection+5);s.fun=clamp(s.fun+4);s.lastAction=say(messages.pet);if(s.affection>=65&&!s.achievements.includes("well-loved"))s.achievements.push("well-loved");break;
 case "brush":s.clean=clamp(s.clean+24);s.affection=clamp(s.affection+1);s.lastAction=say(messages.brush);break;
 case "nap":s.energy=clamp(s.energy+31);s.hunger=clamp(s.hunger-3);s.lastAction=say(messages.nap);break;
 case "talk":s.fun=clamp(s.fun+2);s.affection=clamp(s.affection+1);s.lastAction=say(messages.talk);break;
 case "game-win":s.fun=clamp(s.fun+24);s.energy=clamp(s.energy-12);s.hunger=clamp(s.hunger-5);s.affection=clamp(s.affection+6);s.games++;s.lastAction="LASER MOUSE CAUGHT! The tiny hunter is triumphant.";if(!s.achievements.includes("first-game"))s.achievements.push("first-game");break;
 case "game-miss":s.fun=clamp(s.fun+5);s.energy=clamp(s.energy-4);s.lastAction="The pixel mouse escaped. A rematch is demanded.";break;
 default:throw Error("Unknown Gremelkin action.");
 }
 s.lastActionAt=now;s.updatedAt=now;return s;
}
function visit(input,now=Date.now()){
 const s=tick(input,now);
 s.visits=Math.min(1000000,s.visits+1);
 if(new Date(now).getHours()<5&&!s.achievements.includes("night-owl"))s.achievements.push("night-owl");
 s.updatedAt=now;return s;
}
function exportBackpack(input,now=Date.now()){
 return {kind:"ODD_FM_GREMELKIN_LOCAL_BACKPACK",format:1,saved_at:new Date(now).toISOString(),notice:"LOCAL SAVE: this is not a global presence lease or a GitHub autosync.",pet:tick(input,now)};
}
function importBackpack(input,now=Date.now()){
 if(!input||input.kind!=="ODD_FM_GREMELKIN_LOCAL_BACKPACK"||input.format!==1||!input.pet)throw Error("Not a Gremelkin local save backup.");
 return tick(validate(input.pet,now),now);
}
return Object.freeze({ID,VERSION,create,validate,tick,care,visit,mood,exportBackpack,importBackpack});
});
