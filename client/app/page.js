import Link from'next/link';
export default function Home(){return(<section className="hero"><div><p className="mono" style={{color:'var(--seal)'}}>Photos hashed and chained the moment you take them</p>
<h1>Your deposit, on the record.</h1><p className="mute" style={{fontSize:19,maxWidth:480}}>Photograph your rented room on day one. Nobody can later say the stain was not there, because the record cannot be changed without breaking it.</p>
<div className="row" style={{marginTop:32}}><Link className="btn seal" href="/register">Seal my room</Link><Link className="btn" href="/verify">Verify a photo</Link></div></div>
<div className="chain">{[['#1','Wall, north','9f3a…c21e'],['#2','Bathroom tap','b71d…04aa']].map(([n,l,h],i)=>(<div key={n}><div className="card row"><div className="photo" style={{width:120}}/><div className="mono mute">{n} · {l}<br/><span style={{color:'var(--text)'}}>{h}</span></div></div><div className="link"/></div>))}
<div className="card row between" style={{borderColor:'var(--seal)'}}><b>Sealed</b><span className="chip ok">ROOT 5c8e…77f0</span></div></div></section>)}
