import Link from 'next/link';
import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { useState } from 'react';


const Home: NextPage = () => {

  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Layout>
      <div className="pt-48 pb-24"><h1 className="text-4xl font-bold">{isHovered ? "owo" : "uwu"}</h1></div>
      <div style={{marginBottom: "16px"}}><Link href="/login"><a className='button wide' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>login</a></Link></div>
      <div><Link href="/register"><a className='button wide'>make your own page</a></Link></div>
    </Layout>
    )

}

export default Home
