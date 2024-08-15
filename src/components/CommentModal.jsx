"use client";
import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Modal from "react-modal";
const { useSession } = require("next-auth/react");
import { toggleModal } from '@/redux/slices/modalSlice';
import {app} from '../firebase';
import {useRouter} from "next/navigation"
import {addDoc,serverTimestamp, getFirestore, onSnapshot,doc, collection} from 'firebase/firestore';
export default function CommentModel() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.modalState);
    const postid = useSelector((state) => state.postId.postId); 
    const {data: session} = useSession();
    const [post, setPost] = useState({});
    const [input,setInput] = useState("");
    const db = getFirestore(app);
    const router = useRouter();
    useEffect(() => {
        if(postid != ''){
            const postRef = doc(db,'posts', postid);
            const unsubscribe = onSnapshot(
                postRef,
                (snapshot)=> {
                    if(snapshot.exists()){
                        setPost(snapshot.data());
                    }
                    else{
                        console.log("No such document!");
                    }
                }
            );
            return () => unsubscribe();
        }
    },[postid]);
    const sendComment = async () => {
        addDoc(collection(db,'posts',postid,'comments'),{
            name: session.user.name,
            username: session.user.username,
            userImg: session.user.image,
            comment:input,
            timestamp: serverTimestamp(),
        }).then(() => {
            setInput('');
            setOpen(false);
            router.push(`/posts/${postid}`);
        }).catch((error) => {
            console.error('Error adding document: ', error);
        })

    }
    return (
        <div>
            {
                open && (
                    <Modal
                    isOpen={open}
                    onRequestClose = { (tag)=> dispatch(toggleModal(tag))}
                    ariaHideApp={false}
                    className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md"
                    >
                        <div className="p-4">
                            <div className="border-b border-gray-200 py-2 px-1.5">
                                <h className=" text-xl text-gray-700 p-1  cursor-pointer"
                                onClick={ (tag)=> dispatch(toggleModal(tag))}
                                >Git Social</h>
                            </div>
                            <div className="p-2 flex items-center space-x-1 relative">
                                <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"/>
                                <img src={post?.profileImage} alt="user-img"
                                className="h-11 w-11 rounded-full mr-4"/>
                                 <h4 className="font-bold sm:text-[16px] text-[15px] hover:underline truncate">{post?.name}</h4>
                                 <span className="text-sm sm:text-[15px] truncate">@{post?.username}</span>
                            </div>
                            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">{post.text}</p>
                        </div>
                        <div className="flex p-3 space-x-3">
                            <img src={session.user.image} alt="user-img"
                             className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"/>
                             <div className=" w-full divide-y divide-gray-500 ">
                                <div>
                                <textarea
                                placeholder="Whats hapenning"
                                rows="2"
                                className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 placeholder:text-gray-500"
                                value={input}
                                onChange={(e)=> setInput(e.target.value)}
                                />
                                </div>
                                <div className="flex items-center justify-end pt-2.5">
                                <button 
                                className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                                disabled={input.trim() === ''}
                                onClick={sendComment}
                                >
                                    Reply
                                </button>

                                </div>

                             </div>

                        </div>
                        

                    </Modal>

                )
            }
        </div>
    );
}
