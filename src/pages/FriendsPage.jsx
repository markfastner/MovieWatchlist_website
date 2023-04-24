import 'firebase/database';
import 'firebase/auth';
import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import { useAuth } from "./auth/contexts/AuthContext";
import { auth, db } from '../firebase';
import FriendsList from './FriendsList';
import Chat from '../components/chat/Chat.jsx';
import emailjs from 'emailjs-com'

export default function FriendsPage() {

  const usernameRef = useRef() // Create a reference to the username input element
  const {currentUser} = useAuth() // Get the current user from the authentication context
  const [inputValue, setInputValue] = useState('') // Create state for the input value
  const formRef = useRef(); // Create a reference to the form element



  const [addFriendError, setAddFriendError] = useState('') // Create state for the add friend error message
  const user = auth.currentUser; // Get the current user
  const userRef = db.users.doc(currentUser.uid); // Get the user's reference in the database
  const [senderUsername, setSenderUsername] = useState('') // Create state for the sender's username
  const [acceptFriendError, setAcceptFriendError] = useState('') // Create state for the accept friend error message
  const [userEmail, setUserEmail] = useState('') // Create state for the user's email  
  
  const sendEmail = (e) => { // Function to send an email using emailjs-com
    e.preventDefault();
  
    emailjs.sendForm('service_suja8ie', 'template_3ydzvgp', formRef.current, 'aTcrb5DqFR0itcrPi')
      .then((result) => {
          console.log(result.text);
          console.log("message sent")
          e.target.reset() // Reset the form
      }, (error) => {
          console.log(error.text);
          console.log("unable to send message")
          e.target.reset() // Reset the form
      });
    }
  
  const handleSubmit = (e) => { // Function to handle form submission
    e.preventDefault();
  }
  
  const handleInputChange = (event) => { // Function to handle input changes
      setInputValue(event.target.value);
  };
  
  userRef.get().then((doc) => { // Get the sender's username from the database
      if(doc.exists) {setSenderUsername(doc.data().username)}
  })
  async function handleAddFriend(e) { // Function to handle adding a friend
      e.preventDefault()
      const queriedUsername = usernameRef.current.value; // Get the queried username from the input field
      const recipientSnapshot = await db.users.where("username", "==", queriedUsername).get(); // Get the recipient's snapshot from the database
      
      if(!(recipientSnapshot.empty)) { // If the recipient exists
          const recipientId = recipientSnapshot.docs[0].id // Get the recipient's ID
            const recipientPendingRequest = await db.users.doc(recipientId).collection('pending-friends').where('pending', '==', senderUsername).get()
            const friend_exists = (await db.users.doc(auth.currentUser.uid).collection('friends').where('friend', '==', queriedUsername).get())
            if(!friend_exists.empty) // If the user exists in the current user's friends subcollection, error
            {
                setAddFriendError("User is in your friends list.")
                return
            }
            if(senderUsername === queriedUsername) // If the user is attempting to send themselves a friend request
            {
                setAddFriendError("That is you.") // Error
                return
            }
            if((recipientPendingRequest.empty)) // If the user exists, but does not show up in the pending list
            {
                const pendingCollection = db.users.doc(recipientId).collection('pending-friends'); // Get pending friends reference
                pendingCollection.add({pending: senderUsername}) // Add the pending-friend's username to the recipients 'pending-friends'
                setUserEmail((await db.users.doc(recipientId).get()).data().email) // Sets the useremail 
                sendEmail(e) // Sends the friend request notification email 
                setAddFriendError("Request Sent!") 
            } else { // The user is already in the pending list
                setAddFriendError("Your friend request is pending, please wait.") 
                return
            }
        } else {
            setAddFriendError("User does not exist.")
            return
        }
      }

    const [friendRequests, setFriendRequests] = useState([]); // Create state for the friend request list
    
    // Use effect to populate the friend request list
    useEffect(() => {
        const unsubscribe = db
          .users
          .doc(currentUser.uid)
          .collection("pending-friends")
          .onSnapshot((snapshot) => {
            const pendingList = snapshot.docs.map((doc) => 
            {
                
                const data = doc.data();
                data.id = doc.id; // Add the document ID to the data object
                return data;
            });
            setFriendRequests(pendingList);
        });
        return unsubscribe;
      }, [currentUser.uid]);

    // Handle accept the friend request
    const acceptFriendRequest = async (friendRequest) => {
        const recipientSnapshot = await db.users.where("username", "==", friendRequest.pending).get();
        const recipientId = recipientSnapshot.docs[0].id
        db.users.doc(currentUser.uid).collection('friends').add({friend: friendRequest.pending})
        db.users.doc(recipientId).collection('friends').add({friend: senderUsername})
      db.users.doc(currentUser.uid).collection('pending-friends').doc(friendRequest.id).delete();
      setAcceptFriendError("Friend Added.")
      };

    // Handle decline the friend request
    const declineFriendRequest = async (friendRequest) => {
      db.users.doc(currentUser.uid).collection('pending-friends').doc(friendRequest.id).delete();
      setAcceptFriendError("Friend Declined.")
    };

    return (
        <div className="container mx-auto">
  <h1 className="text-3xl font-bold text-center mt-8 mb-4">Friends</h1>
  <div className="flex flex-col items-center justify-end md:flex-row md:justify-between">
    <div className="w-full md:w-1/2 flex flex-col items-center md:order-3">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>
      <Chat/>
    </div>
    <div className="md:order-2">
      <RenderFriendsList />
    </div>
    <div className="w-full md:w-1/2 flex flex-col items-center md:order-1">
      <h2 className="text-xl font-semibold mb-4">Add a Friend</h2>
      {addFriendError && <p className="text-red-600 mb-4">{addFriendError}</p>}
      {userEmail}
      <form onSubmit={handleAddFriend} className="flex flex-col items-center">
        <input
          type="text"
          ref={usernameRef}
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Friend's Username"
          className="border border-gray-300 p-2 rounded-md mb-4 w-full md:w-4/5 lg:w-3/5"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          Add Friend
        </button>
      </form>
           <form ref={formRef} onSubmit={handleSubmit} style={{display:'none'}}>
        <input type="email" value={userEmail} name="email" />
        <input type="text" defaultValue={senderUsername} name="name" />
      </form>
      {acceptFriendError && <p className="text-red-600 mb-4">{acceptFriendError}</p>}
      {friendRequests.length > 0 && (
        <div className="w-full md:w-4/5 lg:w-3/5 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
          {friendRequests.map((friendRequest) => (
            <div key={friendRequest.pending} className="border border-gray-300 p-2 rounded-md mb-4 w-full flex items-center justify-between">
              <p>{friendRequest.pending}</p>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => acceptFriendRequest(friendRequest)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-md mr-2 focus:outline-none focus:shadow-outline"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => declineFriendRequest(friendRequest)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md focus:outline-none focus:shadow-outline"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>

      );
      
    }

      export function RenderFriendsList() {
        const { currentUser } = useAuth();
        const userId = currentUser.uid;
        return (
            <div className="flex items-center">
              <FriendsList userId={userId} />
              {/* <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-4 focus:outline-none focus:ring focus:ring-blue-200"
                style={{ boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18.293 7.293a1 1 0 0 0-1.414 0L10 13.586 5.707 9.293a1 1 0 1 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414z" />
                </svg>
                Find Friends
              </button> */}
            </div>
          );
      }
