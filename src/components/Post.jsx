import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import Link from "next/link"
import Icons from './Icons'
export default function Post({post,id}) {
  return (
    <div className="flex p-3 border-b border-gray-200 hover:bg-gray-50">
        <img src={post?.profileImage} alt="user-img" className=" h-11 w-11 rounded-full mr-4"/>
        <div className="flex-1">
            <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-1 whitespace-nowrap">
                    <h4 className="font-bold text-sm truncate">{post?.name}</h4>
                    <span className="text-xs truncate">@{post.username}</span>
                </div>
                <HiDotsHorizontal className="text-sm"/>
            </div>
            <Link href={`/posts/${id}`}>
            <p className="text-gray-800 text-sm my-3">{post?.text}</p>
            </Link>
            <div className="text-gray-800 text-xs my-3">
                {post?.tags.map((tag, index) => (
                <span 
                     key={index} 
                    className="text-sm bg-gray-200 px-2 py-1 mr-2 rounded-full inline-block"
                > #{tag} </span>
                 ))}
            </div>

            <Link href ={`/posts/${id}`}>
            <img
            src={post?.image} 
            className="rounded-2xl mr-2 cursor-pointer"
            />
             </Link>
             <Icons id={id} uid={post.uid}/>
             
        </div>
    </div>
  )
}
