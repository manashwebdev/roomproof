export const API=process.env.NEXT_PUBLIC_API||'http://localhost:5000';
export const getToken=()=>typeof window!=='undefined'?localStorage.getItem('rp_token'):null;
export async function api(path,{method='GET',body,form}={}){
 const h={};const t=getToken();if(t)h.Authorization='Bearer '+t;if(body)h['Content-Type']='application/json';
 const r=await fetch(API+'/api'+path,{method,headers:h,body:form||(body?JSON.stringify(body):undefined)});
 const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'Request failed');return d}
export async function sha256(file){const b=await file.arrayBuffer();const h=await crypto.subtle.digest('SHA-256',b);return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('')}
export const short=h=>h?h.slice(0,4)+'…'+h.slice(-4):'';
export const fmt=d=>d?new Date(d).toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}):'';
export const img=u=>u?API+u:'';
