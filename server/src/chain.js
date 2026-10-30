const crypto=require('crypto');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const ZERO='0'.repeat(64);
const link=(prev,hash,spot,at)=>sha(prev+hash+spot+new Date(at).toISOString());
// Recompute the whole chain; returns {ok, brokenAt}
function verify(list){let prev=ZERO;for(let i=0;i<list.length;i++){const e=list[i];
 if(e.prevHash!==prev||e.chainHash!==link(prev,e.sha256,e.spotKey,e.capturedAt))return{ok:false,brokenAt:i+1};prev=e.chainHash}return{ok:true}}
module.exports={sha,link,verify,ZERO};
