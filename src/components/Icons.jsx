"use client";
import {HiOutlineChat, HiOutlineHeart, HiOutlineTrash ,HiHeart} from 'react-icons/hi';
import { signIn, useSession } from 'next-auth/react';
import { doc, getFirestore, onSnapshot, serverTimestamp,setDoc, collection, deleteDoc} from 'firebase/firestore';
import {app} from "../firebase"
import React,{ useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/redux/slices/modalSlice';
import { setPostId } from '@/redux/slices/postIdSlice';

export default function Icons({id,uid}){
    const {data : session } = useSession();
    const db = getFirestore(app);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([])

    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.modalState); // Access modal state from Redux
    const handleClick = (tag) => {
        dispatch(toggleModal(tag));
        dispatch(setPostId(id));
    };
    const likePost = async () => {
        if(session){
            if(isLiked){
                await deleteDoc(doc(db,'posts', id, 'likes', session?.user.uid))
            }else{
                await setDoc(doc(db,'posts',id, "likes", session.user.uid), {
                    username: session.user.username,
                    timestamp: serverTimestamp(),
                });
            }
        }else{
            signIn();
        }
    }
    useEffect(() => {
        onSnapshot(
            collection(db,'posts', id, 'likes'),
            (snapshot) => {
            setLikes(snapshot.docs)
        }
    )
    }, [db]);

    useEffect (()=> {
        setIsLiked(likes.findIndex((like)=> like.id === session?.user?.uid) !== -1 );
    },[likes]);

    const deletePost = async () => {
        if(window.confirm('Do you want to delete this post? It can not be undone.')){
            if(session?.user?.uid=== uid){
                deleteDoc(doc(db,'posts',id)).then(() =>{
                    console.log('Document sucessfully deleted!');
                    window.location.reload();
                 }).catch((error) => {
                    console.error("Error removing document: ", error);
                 })
            }else{
                alert('You are not authorized to delete this post!')
            }
        }
    }

    return( 
     <div className="flex justify-between">
        <div className="flex">
        <div className="items-center flex">
            {isLiked ? (
                <HiHeart 
                 onClick={likePost}
                 className="h-8 w-8 cursor-pointer rounded-full transtion duration-500 ease-in-out text-red-600 p-2 hover:text-red-500 hover:bg-red-100"/>
                ):(
                <HiOutlineHeart 
                onClick={likePost}
                className="h-8 w-8 cursor-pointer rounded-full transtion duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"/>
                )}
                {likes.length > 0 && <span className={`text-sm ${isLiked && 'text-red-600'}`}>{likes.length}</span>}
        </div>
        <div className="flex items-center ">
            <HiOutlineChat 
             className="h-8 w-8 cursor-pointer rounded-full transtion duration-500 ease-in-out p-2 hover:text-amber-500 hover:bg-amber-100"
             onClick={handleClick}
            />  
        </div>
        </div>
        {session?.user?.uid === uid && (
            <HiOutlineTrash 
            className="h-8 w-8 cursor-pointer rounded-full transtion duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
            onClick={deletePost}
            />

        )}
        
     </div>
    )
}