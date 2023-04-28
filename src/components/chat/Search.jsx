import React, { useState } from 'react';
import { collection, query, where, doc, getDocs, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../pages/auth/contexts/AuthContext.js';
import { database } from '../../firebase.js';
import { data } from 'autoprefixer';

const Search = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const { currentUser } = useAuth();

    const handleSearch = async () => {
        const q = query(
            collection(database, "users"),
            where("username", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (error) {
            setError(true)
        }
    };

    const handleKey = e => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        // check whether the group (chats in firestore) exist or not
        const combinedId = currentUser.uid > user.uid 
            ? currentUser.uid + user.uid 
            : user.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(database, "chats", combinedId));

            if (!res.exists()) {
                await setDoc(doc, (database, "chats", combinedId), { messages: [] });
            }

            // create user chats
            await updateDoc(doc(database, "userChats", currentUser.uid), {
                [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName
                },
                [combinedId + ".date"]: serverTimestamp()
            });
            // create OTHER user chats
            await updateDoc(doc(database, "userChats", user.uid), {
                [combinedId + ".userInfo"]: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName
                },
                [combinedId + ".date"]: serverTimestamp()
            });

        } catch (error) {}

        setUser(null);
        setUsername('');
    };
    return (
        <div className='search'>
        <div className='searchForm'>
        <input 
        type='text' 
        placeholder='Find a user' 
        onKeyDown={handleKey} 
        onChange={e=>setUsername(e.target.value)}
        value={username}
        />
        </div>
        {error && <span>User not found</span>}
        {user && <div className='userChat' onClick={handleSelect}>
                <img src='' alt=''/>
                <div className='userChatInfo'>
                <span>{user.displayName}</span>
                </div>
                </div>}
        </div>
    )
}

export default Search
