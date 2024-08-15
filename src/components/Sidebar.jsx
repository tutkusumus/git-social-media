"use client"
import React,{ useState} from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { signIn, signOut, useSession } from 'next-auth/react';
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Sidebar() {
  const {data: session} = useSession();
  const router = useRouter()
  console.log(session);
  const [showOptions, setShowOptions] = useState(false);
 
  const toggleOptions = () => {
    setShowOptions(!showOptions);
    console.log(session);
  };
  const handleProfile = () => {
    router.push('/profile');
  };
  return (
    <div className="flex flex-col p-3 justify-between h-screen">
        <div className="flex flex-col gap-4 p-3">
        <Link href="/" className="w-16 h-16 cursor-pointer flex flex-col items-center ml-5 xl:flex-row justify-center">
            <span className="text-2xl font-bold  py-1 px-2 rounded-lg">GIT</span>
            <span className='text-xl '>Social</span>
        </Link>
        <Link href="/"  className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-full transition-all duration-200 w-fit">
        <AiOutlineHome  className="w-7 h-7"/>
        <span className="font-bold hidden xl:inline">Home</span>
        </Link>
        <Link href="/profile"  className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-full transition-all duration-200 w-fit">
        <CgProfile className="w-7 h-7"/>
        <span className="font-bold hidden xl:inline">Profile</span>
        </Link>
        <Link href="/settings"  className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-full transition-all duration-200 w-fit">
        <CiSettings className="w-7 h-7"/>
        <span className="font-bold hidden xl:inline">Settings </span>
        </Link>
        </div>
        {session ?  (
              <div className="text-gray-700 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-full transition-all duration-200">
                <img src= {session.user.image} alt="user-img" className="h-10 w-10 rounded-full xl:mr-2 "/>
                <div className="hidden xl:inline">
                  <h4 className="font-bold">{session.user.name}</h4>
                  <p className="text-gray">{session.user.username}</p>
                </div>
                <HiDotsHorizontal className="w-7 h-7 ml-auto xl:ml-8 hidden xl:inline" onClick={toggleOptions}/>
                {showOptions && (
                    <div className=" mt-2 p-2 bg-white border rounded  absolute shadow-lg pb-5">
                        <p className="text-gray-700 cursor-pointer rounded p-2 hover:bg-gray-200" onClick={handleProfile}>Profile</p>
                        <p className="text-gray-700 cursor-pointer rounded p-2 hover:bg-gray-200" onClick={() => signOut()}>Logout</p>
                    </div>
                )}
              </div>
            ):(
        <button className="font-semibold bg-amber-500 hover:brightness-95 shadow-md w-48 h-9 rounded-full text-white transition-all duration-200 hidden xl:inline"
        onClick ={() => signIn()}
        >Sign In</button>) 
        }
    
    </div>
  )
}
