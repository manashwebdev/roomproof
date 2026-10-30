import './globals.css';import Link from'next/link';
export const metadata={title:'RoomProof',description:'Tamper-evident move-in and move-out photo records for rented rooms'};
export default function L({children}){return(<html lang="en"><body><header className="top"><Link href="/" className="logo">RoomProof<i>.</i></Link><nav><Link href="/verify">Verify a photo</Link><Link href="/dashboard">My rooms</Link></nav></header><main>{children}</main></body></html>)}
