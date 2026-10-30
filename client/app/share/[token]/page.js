'use client';import{useEffect,useState}from'react';import{api,img,short,fmt}from'../../../lib/api';
export default function Share({params}){const[d,setD]=useState(null),[err,setErr]=useState(''),[name,setName]=useState(''),[com,setCom]=useState(''),[ok,setOk]=useState(false);
useEffect(()=>{api('/share/'+params.token).then(setD).catch(e=>setErr(e.message))},[]);if(err)return<p className="err">{err}</p>;if(!d)return<p className="mute">Loading…</p>;
const sealed=d.inspections.filter(i=>i.status==='sealed');
const ack=async id=>{try{await api(`/share/${params.token}/acknowledge`,{method:'POST',body:{inspectionId:id,landlordName:name,landlordComment:com,comment:com}});setOk(true)}catch(e){setErr(e.message)}};
return(<><p className="mono mute">Read-only sealed record</p><h2>{d.tenancy.title}</h2><p className="mute">{d.tenancy.address}</p>
<div className="card row between" style={{borderColor:d.chain.ok?'var(--seal)':'var(--warn)',margin:'16px 0'}}><b>{d.chain.ok?'Chain intact':'Chain broken: this record was altered'}</b><span className="mono mute">{d.evidence.length} photos</span></div>
<div className="grid">{d.evidence.map((e,n)=>(<div className="card" key={e._id}><div className="photo" style={{backgroundImage:`url(${img(e.imageUrl)})`}}/><p className="mono mute">#{n+1} · {d.tenancy.spots.find(s=>s.key===e.spotKey)?.label}<br/>{fmt(e.capturedAt)}<br/>{short(e.sha256)}</p></div>))}</div>
{sealed.length>0&&!ok&&<div className="stack" style={{marginTop:24}}><h2>Acknowledge this record</h2><p className="mute">This logs your name and the time. You do not need an account.</p><label>Your name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Comment (optional)<textarea value={com} onChange={e=>setCom(e.target.value)}/></label><button className="btn seal" onClick={()=>ack(sealed[0]._id)}>Acknowledge record</button></div>}
{ok&&<p className="card" style={{borderColor:'var(--seal)',marginTop:24}}>Acknowledged. Thank you.</p>}</>)}
