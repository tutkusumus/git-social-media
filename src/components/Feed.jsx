"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '../firebase';
import Post from '@/components/Post';

export default function Feed() {
    const selectedTags = useSelector((state) => state.tags.selectedTags);
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        const fetchPosts = async () => {
            const db = getFirestore(app);
            const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });

            // Filter posts based on selected tags
            if (selectedTags.length > 0) {
                data = data.filter(post =>
                    post.tags.some(tag => selectedTags.includes(tag))
                );
            }

            setPosts(data);
        };

        fetchPosts();
    }, [selectedTags]);

    return (
        <div>
            {posts.map((post) => (
                <Post key={post.id} post={post} id={post.id} />
            ))}
        </div>
    );
}
