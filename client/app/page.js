import Link from'next/link';import Reveal from'../components/Reveal';
const H=['9f3a…c21e','b71d…04aa','5c8e…77f0','e204…9b13','7ad1…f6c8','03bb…a5d2'];
export default function Home(){return(<>
<section className="hero2"><div><Reveal><p className="mono" style={{color:'var(--seal)'}}>Move-in photos that cannot be edited later</p></Reveal>
<Reveal delay={100}><h1>Your deposit, on the record.</h1></Reveal>
<Reveal delay={200}><p className="mute" style={{fontSize:20,maxWidth:500,margin:'0 0 36px'}}>Photograph your rented room on day one. Each photo is hashed and chained, so nobody can say the stain was not there.</p></Reveal>
<Reveal delay={300} className="row"><Link className="btn seal" href="/register">Seal my room</Link><Link className="btn" href="/verify">Verify a photo</Link></Reveal></div>
<Reveal delay={150}><div className="heroimg"><img src="/img/hero.svg" alt="A room with a cracked tile and a sealed photo hash"/><div className="scan"/></div></Reveal></section>
<div className="mq" aria-hidden="true"><div>{[...H,...H,...H,...H].map((h,i)=><span key={i}><b>#{i%6+1}</b> {h}</span>)}</div></div>
<section className="sect"><Reveal><h2>Three steps, one record</h2><p className="mute" style={{maxWidth:520}}>No app to install. It works in your phone browser.</p></Reveal>
<div className="steps" style={{marginTop:32}}>{[['steps-capture','Capture','Walk through 12 guided spots and take one photo for each.'],['steps-seal','Seal','Each photo is hashed in your browser and chained to the one before it.'],['steps-diff','Compare','At move-out, slide between then and now to see exactly what changed.']].map(([i,t,d],n)=>(
<Reveal key={i} delay={n*120}><div className="card step"><img src={`/img/${i}.svg`} alt=""/><h2 style={{fontSize:28}}>{n+1}. {t}</h2><p className="mute">{d}</p></div></Reveal>))}</div></section>
<section className="sect"><Reveal><h2>Every spot, on record</h2></Reveal><div className="shots" style={{marginTop:28}}>{['room-wall','room-bath','room-floor'].map((i,n)=><Reveal key={i} delay={n*120}><div data-par={n===1?-.04:.03}><img src={`/img/${i}.svg`} alt=""/></div></Reveal>)}</div></section>
<Reveal><section className="cta"><h2>Do not lose your deposit to old damage.</h2><p style={{fontSize:19,margin:'0 0 28px'}}>Free for tenants. Landlords need no account.</p><Link className="btn" href="/register">Create my record</Link></section></Reveal></>)}
