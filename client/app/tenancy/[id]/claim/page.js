'use client';import{useEffect,useState}from'react';import{useSearchParams}from'next/navigation';import{api}from'../../../../lib/api';import useAuth from'../../../../lib/useAuth';
export default function Claim({params}){useAuth();const q=useSearchParams(),keys=(q.get('s')||'').split(',').filter(Boolean);const[t,setT]=useState(null),[rows,setRows]=useState(keys.map(k=>({spotKey:k,deductionAmount:0,note:''}))),[c,setC]=useState(null),[e,setE]=useState('');
useEffect(()=>{api('/tenancies/'+params.id).then(x=>setT(x.tenancy))},[]);if(!t)return<p className="mute">Loading…</p>;
const up=(i,k,v)=>setRows(rows.map((r,j)=>j===i?{...r,[k]:v}:r));
const go=async()=>{try{setC(await api(`/tenancies/${params.id}/claim`,{method:'POST',body:{items:rows}}))}catch(z){setE(z.message)}};
return(<div className="stack" style={{maxWidth:640}}><h2>Deposit letter</h2>{!rows.length&&<p className="mute">Pick spots on the Damage Diff first.</p>}
{rows.map((r,i)=>(<div className="card stack" key={r.spotKey}><b>{t.spots.find(s=>s.key===r.spotKey)?.label}</b><label>Deduction you accept (Rs)<input type="number" value={r.deductionAmount} onChange={x=>up(i,'deductionAmount',x.target.value)}/></label><label>Your note<input value={r.note} onChange={x=>up(i,'note',x.target.value)}/></label></div>))}
{rows.length>0&&<button className="btn seal" onClick={go}>Generate letter</button>}{e&&<p className="err">{e}</p>}{c&&<><pre>{c.letterText}</pre><button className="btn" onClick={()=>navigator.clipboard.writeText(c.letterText)}>Copy letter</button></>}</div>)}
