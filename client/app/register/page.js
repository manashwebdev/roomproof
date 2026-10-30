'use client';import{useState}from'react';import{useRouter}from'next/navigation';import Link from'next/link';import{api}from'../../lib/api';
export default function Reg(){const r=useRouter(),[f,setF]=useState({name:'',email:'',password:'',city:''}),[e,setE]=useState('');
const set=k=>x=>setF({...f,[k]:x.target.value});
const go=async x=>{x.preventDefault();try{const d=await api('/auth/register',{method:'POST',body:f});localStorage.setItem('rp_token',d.token);r.push('/dashboard')}catch(z){setE(z.message)}};
return(<form className="stack" onSubmit={go}><h2>Create account</h2><label>Name<input required value={f.name} onChange={set('name')}/></label><label>City<input value={f.city} onChange={set('city')}/></label>
<label>Email<input type="email" required value={f.email} onChange={set('email')}/></label><label>Password (6+ characters)<input type="password" minLength={6} required value={f.password} onChange={set('password')}/></label>
{e&&<p className="err">{e}</p>}<button className="btn seal">Create account</button><Link className="mute" href="/login">Already registered? Log in</Link></form>)}
