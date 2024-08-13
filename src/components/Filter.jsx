
"use client";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTag } from '../redux/slices/tagsSlice';

export default function Filter() {
    const dispatch = useDispatch();
    const selectedTags = useSelector((state) => state.tags.selectedTags);
    const availableTags = [
        'AI', 'Machine Learning', 'Web Development', 'GitHub', 'DevOps', 
        'Backend', 'Frontend', 'JavaScript', 'Next.js', 'TypeScript', 'Go', 'Deep Learning'
    ];

    const handleTagClick = (tag) => {
        dispatch(toggleTag(tag));
    };

    return (
        <div>
            <h3 className="font-bold text-xl pl-8 border-b">Filter your feed</h3>
            <ul className="text-m">
                {availableTags.map((tag, index) => (
                    <li
                        key={index}
                        className={`border rounded-l-lg m-2 cursor-pointer pl-8 bg-amber-300 border-r-8 border-amber-500
                            ${selectedTags.includes(tag) ? 'opacity-50' : 'bg-amber-400'} 
                            hover:opacity-70`}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
    );
}
