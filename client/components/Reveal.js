'use client';
import{useEffect,useRef}from'react';
export default function Reveal({children,delay=0,as:T='div',className='',...p}){const r=useRef();
 useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){e.target.classList.add('in');o.disconnect()}},{threshold:.15});o.observe(r.current);return()=>o.disconnect()},[]);
 return<T ref={r} className={'reveal '+className} style={{transitionDelay:delay+'ms'}} {...p}>{children}</T>}
