'use client';import{useEffect,useState}from'react';import Link from'next/link';import{api}from'../../lib/api';import useAuth from'../../lib/useAuth';
export default function Dash(){useAuth();const[l,setL]=useState(null);useEffect(()=>{api('/tenancies').then(setL).catch(()=>setL([]))},[]);
return(<><div className="row between"><h2>My rooms</h2><Link className="btn seal" href="/tenancy/new">Add a room</Link></div>
{l&&!l.length&&<div className="card"><b>No rooms yet.</b><p className="mute">Add the room you are renting, then photograph it spot by spot on move-in day.</p></div>}
<div className="grid">{(l||[]).map(t=>(<Link key={t._id} href={`/tenancy/${t._id}`} className="card"><div className="row between"><b>{t.title}</b><span className={'chip '+(t.status==='active'?'ok':'')}>{t.status.replace('_',' ')}</span></div>
<p className="mute">{t.address}</p><p className="mono mute">{t.photos} sealed photos · deposit Rs {t.depositAmount||0}</p></Link>))}</div></>)}
