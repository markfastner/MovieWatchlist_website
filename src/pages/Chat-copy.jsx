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

function ChatRoom = ({ userId, friendId }) => {
    const [messages, setMessages] = useState([]);   
    useEffect(() => {
      const unsubscribe = db
        .users
        .doc(userId)
        .collection("friends")
        .doc(friendId)
        .collection("messages")
        .onSnapshot((snapshot) => {
            const messagesList = snapshot.docs.map((doc) => doc.data().message);
            setMessages(messagesList);
        });
        return unsubscribe;
    }, [userId, friendId]);

    const sendMessage = async(e) => {
        e.preventDefault();

        const { uid } = currentUser.uid;

        await messagesRef.add({
            text: formValue,
            createdAt: db.FieldValue.serverTimestamp(),
            uid,
        })

        setFormValue('');
    }

    return (
        <>
        <div>
        <h2>Messages List</h2>
        <ul>
        {messages.map((message) => (
            <li key={message}>{message}</li>
        ))}
        </ul>
        </div>
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
