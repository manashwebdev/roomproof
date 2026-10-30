'use client';import{useEffect,useState}from'react';import Link from'next/link';import{api,short,fmt,img}from'../../../lib/api';import useAuth from'../../../lib/useAuth';
export default function T({params}){useAuth();const[d,setD]=useState(null),[m,setM]=useState('');
const load=()=>api('/tenancies/'+params.id).then(setD);useEffect(()=>{load()},[]);
if(!d)return<p className="mute">Loading…</p>;const{tenancy:t,inspections:ins,evidence:ev,chain}=d;const link=typeof window!=='undefined'?`${location.origin}/share/${t.shareToken}`:'';
const out=async()=>{await api(`/tenancies/${t._id}/inspections`,{method:'POST',body:{type:'move_out'}});load()};
return(<><p className="mono mute">{t.address}</p><h2>{t.title}</h2>
<div className="card row between" style={{borderColor:chain.ok?'var(--seal)':'var(--warn)',margin:'16px 0'}}><b>{chain.ok?'Chain intact':`Chain broken at photo ${chain.brokenAt}`}</b><span className="mono mute">{ev.length} photos</span></div>
<div className="row" style={{marginBottom:20}}>{ins.map(i=>(<Link key={i._id} className="btn" href={`/tenancy/${t._id}/inspect?i=${i._id}`}>{i.type.replace('_','-')} · {i.status==='sealed'?'sealed':'continue'}</Link>))}
{!ins.some(i=>i.type==='move_out')&&<button className="btn" onClick={out}>Start move-out</button>}<Link className="btn seal" href={`/tenancy/${t._id}/diff`}>Damage Diff</Link></div>
<div className="card"><b>Landlord link</b><p className="mono mute" style={{wordBreak:'break-all'}}>{link}</p><button className="btn" onClick={()=>{navigator.clipboard.writeText(link);setM('Copied')}}>{m||'Copy link'}</button></div>
<h2 style={{marginTop:32}}>Timeline</h2><div className="grid">{ev.map((e,n)=>(<div key={e._id} className="card"><div className="photo" style={{backgroundImage:`url(${img(e.imageUrl)})`}}/>
<p className="mono mute">#{n+1} · {t.spots.find(s=>s.key===e.spotKey)?.label}<br/>{fmt(e.capturedAt)}<br/><span style={{color:'var(--text)'}}>{short(e.chainHash)}</span></p><span className={'chip '+(e.severity==='damage'?'bad':'')}>{e.severity}</span></div>))}</div></>)}
