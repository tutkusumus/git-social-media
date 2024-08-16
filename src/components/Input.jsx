"use client"

import { useSession } from "next-auth/react"
import { HiOutlinePhotograph } from "react-icons/hi";
import React, { useRef, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {app} from "../firebase"
import {addDoc, collection, getFirestore, serverTimestamp} from 'firebase/firestore';

export default function Input() {
    const {data: session} = useSession();
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags] = useState([
        'AI', 'Machine Learning', 'Web Development', 'GitHub', 'DevOps', 
        'Backend', 'Frontend', 'JavaScript', 'Next.js', 'TypeScript','Go','Deep Learning'
    ]);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); //[1]
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [postLoading,setPostLoading] = useState(false); 
    const [text, setText] = useState('');
    const imagePickRef = useRef(null);//referans değer oluşturuldu
    //referans <input> elemanına bağlanacak böylece doğrudan erişim
    const db = getFirestore(app);

    const addImageToPost = (e) =>{
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
            setImageFileUrl(URL.createObjectURL(file));//img kullanabilmek için dosyayı urle dönüştür

        }

    }
    useEffect(() => {
        if(selectedFile){
            uploadImageToStorage();
        }
    },[selectedFile]);

    
    const uploadImageToStorage = () => {
        setImageFileUploading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + selectedFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log('Upload is '+ progress + '% done');
            },
            (error) => {
                console.log(error);
                setImageFileUploading(false);
                setImageFileUrl(null);
                setSelectedFile(null);

            },
            ()=> {
                getDownloadURL(uploadTask.snapshot.ref).then((dowloadURL) => {
                    setImageFileUrl(dowloadURL);
                    setImageFileUploading(false);
                });
            }
        );
    };
    
    const handleTagClick = (tag) => {
        setSelectedTags(prevTags => 
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
        console.log(selectedTags)
    };
    if(!session) return null;

    const handleSubmit = async () => {
        setPostLoading(true);
        const docRef = await addDoc(collection(db,'posts'), {
            uid: session.user.uid,
            name: session.user.name,
            username: session.user.username,
            text,
            profileImage: session.user.image,
            tags: selectedTags,
            timestamp: serverTimestamp(),
            image: imageFileUrl
        })
        setPostLoading(false);
        setText("");
        setImageFileUrl(null);
        setSelectedFile(null);
        setSelectedTags([]);
        location.reload();

    }
  return (
    <div className="border-b border-gray-200 p-3 space-x-3 w-full">
        <div className=" flex item-start gap-4 mt-2">
         <img 
        src={session.user.image} 
        alt="user-img" 
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
        />
         <div className="flex flex-wrap text-sm gap-2 mb-2">
                    {availableTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-3 py-1 rounded-full text-xs ${
                                selectedTags.includes(tag) ? 'bg-cyan-950 text-white' : 'bg-gray-100'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
            </div>
         </div>
        <div className="w-full divide-y divide-gray-200">
        <textarea 
            placeholder="Whats happening" 
            cols="30" rows="2" 
            className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
             {
                selectedFile && (
                    <img src={imageFileUrl} 
                    alt="image" 
                    className={`w-full max-h-[250px] object-cover cursor-pointer 
                    ${imageFileUploading ? 'animate-pulse' : '' }`}/>
                )
            }
            <div className="flex items-center justify-between pt-2">
            <HiOutlinePhotograph 
                onClick={()=> imagePickRef.current.click()}//referansın bağlı olduğu dom elemanını ifade eder.
                className="h-10 w-10 p-2  hover:bg-gray-100 rounded-full cursor-pointer"
                />
                  <input 
                type="file" 
                ref={imagePickRef} //referans verildi
                accept="image/*"
                onChange={addImageToPost}
                hidden
                />
                <button
                disabled  = {text.trim() === '' || postLoading || imageFileUploading || selectedTags.length === 0}
                className="mr-2 bg-cyan-950 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                onClick ={handleSubmit}>Post</button>
            </div>

        </div>

    </div>
  )
}
