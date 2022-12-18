import Link from 'next/link';
import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { useState } from 'react';
import Image from 'next/image'
import LandingPreview from '../components/LandingPreview';

const Home: NextPage = () => {

  const [username, setUsername] = useState("");
  return (
    <div className='grid grid-cols-[2fr_3fr] grid-rows-3 px-20 h-full py-14 dark:bg-dark-primary-background'>
      <h1 className="text-5xl font-bold text-primary-pink">owo.bio</h1>
      <div className="row-span-3 justify-self-center self-center	">
        <LandingPreview />
      </div>
      <h1 className="text-7xl font-bold max-w-m text-primary-pink self-end">Get all your links in one place.</h1>
      
      <div className='self-center'>
        <div className='flex items-baseline'>
        <div className="border-solid border-2 px-2 border-primary-pink rounded-lg text-primary-pink w-72 flex text-xl focus-within:border-[#6a2b2b]">

        <label className="py-2" htmlFor="register">owo.bio/</label>
        <input  id="register" className='py-2 bg-inherit grow min-w-0 focus:outline-none' placeholder="username" type="text" onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <Link className="text-white dark:bg-dark-primary-background ml-2 border-2 border-primary-pink bg-primary-pink py-2 px-4 rounded-lg hover:bg-[#6a2b2b] hover:border-[#6a2b2b]" href={"/register?username=" + username}>Register</Link>

        </div>
      <div className='p-2 font-medium text-primary-pink'>
        <Link href="/login"> Already have an account? Log in.</Link>
      </div>
      </div>
      
      </div>
    )

}

export default Home
