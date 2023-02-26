import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { auth, db } from "../../../firebase"
import "firebase/firestore"
import firebase from "firebase"
import ProfileUpload from "../../../features/profile/components/ProfileUpload"
import { CirclePicker } from "react-color";

// profile creation page from the sign in page
// rerouting from the sign in page to the profile creation page
// the user will be able to add their first name, last name, username, and their favorite genre before heading to their profile page

export default function SetProfile() {

    const {currentUser, updateEmail} = useAuth()
    const navigate = useNavigate()

    const user = auth.currentUser;
    const userRef = db.users.doc(user.uid)
    //added
    const friendRef = db.friends.doc(user.uid)

    const emailRef = useRef()
    const [email, setEmail] = useState()

    const firstNameRef = useRef()
    const [firstName, setFirstName] = useState()

    const lastNameRef = useRef()
    const [lastName, setLastName] = useState()
    
    const usernameRef = useRef()
    const [username, setUsername] = useState()

    const genreRef = useRef()
    const [genre, setGenre] = useState()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [usernameError, setUsernameError] = useState("")

    function isAlphanumeric(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
      }      
    
    userRef.get().then((doc) => {
        if(doc.exists) {
            console.log("Document data:", doc.data());
            setEmail(doc.data().email)
            setFirstName(doc.data().firstName)
            setLastName(doc.data().lastName)
            setUsername(doc.data().username)
            setGenre(doc.data().genre)
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
    //added
    friendRef.get().then((doc) => {
        if(doc.exists) {
            console.log("Document data:", doc.data());
            setUsername(doc.data().username)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    

    // Submission handler
    async function handleSubmit(e) {
    e.preventDefault()

    const promises = []
    setError("")
    setLoading(true)

    if(emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value))
    }
    
    const snapshot = await db.users.where("username", "==", usernameRef.current.value).get();
   if(isAlphanumeric(usernameRef.current.value)) {
       if(snapshot.empty || usernameRef.current.value == username) {
           promises.push(userRef.update({
               email: emailRef.current.value,
               firstName: firstNameRef.current.value,
               lastName: lastNameRef.current.value,
               username: usernameRef.current.value,
               genre: genreRef.current.value,
               uid: user.uid
           }))
           Promise.all(promises).then(() => {
               navigate('/dashboard')
           }).catch(() => {
               setError('Failed to update acccount')
           }).finally(() =>  {
               setLoading(false)
           })
       } else {
           setUsernameError("Username taken")
       }
   } else {
    setUsernameError("Username must consist of letters and numbers only (no spaces).")
   }

    
    }

    return(
    <div className="flex justify-center items-center relative min-h-screen bg-no-repeat w-full bg-cover bg-blue-200">
        <form onSubmit={handleSubmit} className="relative-right-[15%] bg-white shadow-md rounded px-8 pt-6 mb-4">    
            {/* <div className="flex justify-center">
                <img src="[url('/public/images/Logo.jpg')]" alt="Logo" className="w-14 h-14"></img>
            </div> */}
                <h1>Additional Information</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="mb-4">
                <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email address">
                    
                Email 
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="first name"
                    type="text"
                    placeholder="Email Address"
                    ref={emailRef} required
                    defaultValue={currentUser.email}>
                </input>
            </div>
            <div className="mb-4">
                <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="first name">
                First Name
                {/* {db.users.doc(user.uid).get({source: 'cache'})} */}
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="first name"
                    type="text"
                    placeholder="First name"
                    ref={firstNameRef}
                    defaultValue={firstName}
                    required>
                </input>
            </div>
            <div class="mb-4">
                <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password">
                Last Name
                </label>
                <input
                    class="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="last name"
                    type="text"
                    placeholder="Last name"
                    ref={lastNameRef}
                    defaultValue={lastName}
                    required>
                </input>
            </div>
            <div class="mb-4">
                <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username">
                Username
                </label>
                <input
                    class="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    ref={usernameRef}
                    defaultValue={username}
                    required>
                </input>
                {usernameError && <Alert variant="danger">{usernameError}</Alert>}
            </div>
            {/* Dropdown menu for form to allow users to pick their favorite genre and get recommendations for them*/}
            <div className="relative w-full lg:max-w-sm">
            <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="movie genre">
                Favorite Movie Genre
                </label>
            <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none focus:shadow-outline appearance-none focus:border-indigo-600"
            ref={genreRef}>
                {genre !="" ? <option selected disabled>{genre} </option>
                :
                <option selected>None</option>}
                <option>Action</option>
                <option>Adventure</option>
                <option>Comedy</option>
                <option>Documentary</option>
                <option>Drama</option>
                <option>Horror</option>
                <option>Mystery</option>
                <option>Romance</option>
                <option>Sci-Fi</option>
                <option>Thriller</option>
            </select>
        </div>
            <button type="submit" class="btn btn-primary my-6 w-full duration-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" >Set Profile</button>
            {/* <div className="mb-4 text-center mt-2">
                <Link to="/dashboard">Cancel</Link>
            </div> */}
            <br></br>
            {/* <p class="text-center text-gray-500 text-xs">
            &copy;Runtime Group
            </p> */}
        </form>
        

        <section>
            <div>
                <ProfileUpload/>
            </div>
        </section>

        <section className="bg-green-400 py-3 px-5 rounded-xl">
            <div>
                <CirclePicker/>
            </div>
        </section>
        
    </div>    
    )
}