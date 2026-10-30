'use client';
import{useEffect}from'react';import Lenis from'lenis';
export default function Providers({children}){
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const l=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true});let id;
  const raf=t=>{l.raf(t);id=requestAnimationFrame(raf)};id=requestAnimationFrame(raf);
  const par=()=>document.querySelectorAll('[data-par]').forEach(e=>{const r=e.getBoundingClientRect();e.style.transform=`translateY(${(r.top-innerHeight/2)*(+e.dataset.par)}px)`});
  l.on('scroll',par);return()=>{cancelAnimationFrame(id);l.destroy()}},[]);
 return children}
