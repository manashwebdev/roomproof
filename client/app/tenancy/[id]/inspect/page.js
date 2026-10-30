'use client';import{useEffect,useState}from'react';import{useRouter,useSearchParams}from'next/navigation';import{api,sha256,short}from'../../../../lib/api';import useAuth from'../../../../lib/useAuth';
export default function Inspect({params}){useAuth();const r=useRouter(),q=useSearchParams();const[d,setD]=useState(null),[n,setN]=useState(0),[sev,setSev]=useState('ok'),[note,setNote]=useState(''),[busy,setBusy]=useState(false),[e,setE]=useState(''),[last,setLast]=useState(null),[ins,setIns]=useState(null);
useEffect(()=>{api('/tenancies/'+params.id).then(x=>{setD(x);const i=x.inspections.find(i=>i._id===q.get('i'))||x.inspections.find(i=>i.status==='draft');setIns(i);
 if(i){const done=x.evidence.filter(v=>v.inspectionId===i._id).map(v=>v.spotKey);const nx=x.tenancy.spots.findIndex(s=>!done.includes(s.key));setN(nx<0?x.tenancy.spots.length:nx)}})},[]);
if(!d)return<p className="mute">Loading…</p>;if(!ins)return<p>No open inspection. Start a move-out from the room page.</p>;
const spots=d.tenancy.spots,sp=spots[n];
const pick=async f=>{if(!f)return;setBusy(true);setE('');try{const h=await sha256(f);const fd=new FormData();fd.append('image',f);fd.append('sha256',h);fd.append('spotKey',sp.key);fd.append('severity',sev);fd.append('note',note);fd.append('capturedAt',new Date().toISOString());
 await new Promise(ok=>{if(!navigator.geolocation)return ok();navigator.geolocation.getCurrentPosition(p=>{fd.append('lat',p.coords.latitude);fd.append('lng',p.coords.longitude);fd.append('acc',p.coords.accuracy);ok()},()=>ok(),{timeout:4000})});
 const ev=await api(`/inspections/${ins._id}/evidence`,{method:'POST',form:fd});setLast(ev);setSev('ok');setNote('');setN(n+1)}catch(z){setE(z.message)}setBusy(false)};
const seal=async()=>{try{await api(`/inspections/${ins._id}/seal`,{method:'POST'});r.push('/tenancy/'+params.id)}catch(z){setE(z.message)}};
return(<div className="stack" style={{maxWidth:480}}><p className="mono mute">{ins.type.replace('_','-')} · {Math.min(n+1,spots.length)} / {spots.length}</p><div className="bar">{spots.map((s,i)=><i key={s.key} className={i<n?'on':''}/>)}</div>
{sp?(<><h2>{sp.label}</h2><p className="mute">Frame the spot, including edges and corners. Hold steady.</p><div className="cam"><b/><span className="mono mute">Camera opens when you tap Take photo</span></div>
<div className="row">{['ok','minor','damage'].map(s=><button key={s} type="button" className={'btn'+(sev===s?' seal':'')} onClick={()=>setSev(s)}>{s}</button>)}</div>
<label>Note (optional)<input value={note} onChange={x=>setNote(x.target.value)} placeholder="Old scratch near hinge"/></label>
<label className="btn seal" style={{color:'var(--bg)'}}>{busy?'Sealing…':'Take photo and seal'}<input type="file" accept="image/*" capture="environment" disabled={busy} hidden onChange={x=>pick(x.target.files[0])}/></label></>)
:(<><h2>All spots captured</h2><p className="mute">Sealing locks this inspection. Nobody can add or change photos after that.</p><button className="btn seal" onClick={seal}>Seal inspection</button></>)}
{last&&<p className="mono mute">Last hash {short(last.sha256)} → chain {short(last.chainHash)}</p>}{e&&<p className="err">{e}</p>}</div>)}
