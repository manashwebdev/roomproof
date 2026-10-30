'use client';import{useState}from'react';import{useRouter}from'next/navigation';import{api}from'../../../lib/api';import useAuth from'../../../lib/useAuth';
export default function New(){useAuth();const r=useRouter(),[f,setF]=useState({title:'',address:'',landlordName:'',landlordPhone:'',depositAmount:'',startDate:''}),[e,setE]=useState('');
const set=k=>x=>setF({...f,[k]:x.target.value});
const go=async x=>{x.preventDefault();try{const t=await api('/tenancies',{method:'POST',body:{...f,depositAmount:+f.depositAmount||0}});r.push(`/tenancy/${t._id}/inspect`)}catch(z){setE(z.message)}};
return(<form className="stack" onSubmit={go}><h2>Add a room</h2><label>Room name<input required placeholder="Room 2B, Sector 12" value={f.title} onChange={set('title')}/></label>
<label>Address<input value={f.address} onChange={set('address')}/></label><label>Landlord name<input value={f.landlordName} onChange={set('landlordName')}/></label>
<label>Landlord phone<input value={f.landlordPhone} onChange={set('landlordPhone')}/></label><label>Security deposit (Rs)<input type="number" value={f.depositAmount} onChange={set('depositAmount')}/></label>
<label>Move-in date<input type="date" value={f.startDate} onChange={set('startDate')}/></label>{e&&<p className="err">{e}</p>}<button className="btn seal">Save and start move-in photos</button></form>)}
