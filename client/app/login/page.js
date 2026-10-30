'use client';import{useState}from'react';import{useRouter}from'next/navigation';import Link from'next/link';import{api}from'../../lib/api';
export default function Login(){const r=useRouter(),[f,setF]=useState({email:'',password:''}),[e,setE]=useState('');
const go=async x=>{x.preventDefault();try{const d=await api('/auth/login',{method:'POST',body:f});localStorage.setItem('rp_token',d.token);r.push('/dashboard')}catch(z){setE(z.message)}};
return(<form className="stack" onSubmit={go}><h2>Log in</h2><label>Email<input type="email" required value={f.email} onChange={x=>setF({...f,email:x.target.value})}/></label>
<label>Password<input type="password" required value={f.password} onChange={x=>setF({...f,password:x.target.value})}/></label>{e&&<p className="err">{e}</p>}
<button className="btn seal">Log in</button><Link className="mute" href="/register">New here? Create an account</Link></form>)}
