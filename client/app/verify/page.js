'use client';import{useState}from'react';import{api,fmt}from'../../lib/api';
export default function Verify(){const[r,setR]=useState(null),[e,setE]=useState(''),[b,setB]=useState(false);
const go=async f=>{if(!f)return;setB(true);setE('');setR(null);try{const fd=new FormData();fd.append('image',f);setR(await api('/verify',{method:'POST',form:fd}))}catch(z){setE(z.message)}setB(false)};
return(<div className="stack" style={{maxWidth:560}}><h2>Verify a photo</h2><p className="mute">Choose a photo file. We hash it and check whether it matches a sealed record.</p>
<label className="card" style={{borderStyle:'dashed',textAlign:'center'}}>{b?'Checking…':'Choose photo'}<input type="file" accept="image/*" hidden onChange={x=>go(x.target.files[0])}/></label>{e&&<p className="err">{e}</p>}
{r&&(r.match?<div className="card" style={{borderColor:'var(--seal)'}}><b>Match found</b><p className="mute">Room: {r.room}<br/>Type: {r.inspectionType.replace('_','-')} · {r.sealed?'sealed':'not yet sealed'}<br/>Captured: {fmt(r.capturedAt)}</p><p className="mono mute" style={{wordBreak:'break-all'}}>{r.sha256}</p></div>
:<div className="card" style={{borderColor:'#5a3d22'}}><b>No match</b><p className="mute">This exact file is not in any record. A re-saved, edited or compressed copy will not match.</p></div>)}</div>)}
