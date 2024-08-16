"use client"
import React, {useState} from 'react'
import { doc, getDoc, getFirestore} from "firebase/firestore";
import { HiArrowLeft } from 'react-icons/hi';
import Link from "next/link"
import Post from "@/components/Post"
import {app} from "../../firebase"
import { useSession } from "next-auth/react"
import UserPosts from '@/components/UserPosts';

export default function page() {
  const db = getFirestore(app);
  const {data: session} = useSession();
  const [postCount, setPostCount] = useState(0);
  return (
    <div>
      <div className= " flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <Link href={'/'} className="hover:bg-gray-100 rounded-full p-2">
          <HiArrowLeft className="h-5 w-5 "/>
        </Link>
        <h2 className="text-lg">Back</h2>
      </div>
      <div className="relative bg-teal-700 h-40 w-full">
        <img 
        src={session?.user?.image} 
        alt="user-img" 
        className="absolute bottom-0 left-4 transform translate-y-1/2 h-20 w-20 rounded-full border-2 border-black"
        />
      </div>
      <div className="flex-col">
      <div className="flex items-end ml-28 mt-2">
      <h4 className="font-bold text-left">{session?.user?.name}</h4>
      <p className="text-gray">@{session?.user?.username}</p>
      </div>
      <p className="text-gray-500 ml-28 text-sm">{postCount} Posts</p> 
      </div>
      <div className="border-t mt-5">
        <UserPosts setPostCount={setPostCount}/>
      </div>

    </div>
  )
}
