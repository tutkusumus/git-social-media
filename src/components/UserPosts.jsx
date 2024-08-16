"use client"
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, getFirestore, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { app } from "../firebase"
import Post from "@/components/Post";

export default function UserPosts({ setPostCount }) {
  const db = getFirestore(app);
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (session?.user?.uid) {
        const q = query(collection(db, "posts"), where("uid", "==", session.user.uid));
        const querySnapshot = await getDocs(q);
        const userPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(userPosts);
        setPostCount(userPosts.length); 
      }
    };

    fetchUserPosts();
  }, [db, session?.user?.uid]);

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} id={post.id} />
      ))}
    </div>
  );
}
