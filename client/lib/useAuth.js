'use client';
import{useEffect}from'react';import{useRouter}from'next/navigation';import{getToken}from'./api';
export default function useAuth(){const r=useRouter();useEffect(()=>{if(!getToken())r.replace('/login')},[r])}
