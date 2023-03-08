import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import '../App.css';
import { useAuth } from "./auth/contexts/AuthContext";
import { auth, db } from '../firebase';
import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function App() {
    return (
        <div className="App">
            <header>


            </header>

            <section>
                <ChatRoom />
            </section>
        </div>
    );
}

function ChatRoom() {

    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'})

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: db.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('');
    }

    return (
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

                <button type="submit" disabled={!formValue}>Submit</button>

            </form>
        </>
    )
}

function ChatMessage(props) {
    const { text, uid } = props.message; 
    
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            {/* <img src={photoURL} alt='x' /> */}
            <p>{text}</p>
        </div>
    );
}