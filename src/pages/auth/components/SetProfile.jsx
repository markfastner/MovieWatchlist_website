import React from "react";
import { Link, useNavigate } from "react-router-dom"

// profile creation page from the sign in page
// rerouting from the sign in page to the profile creation page
// the user will be able to add their first name, last name, username, and their favorite genre before heading to their profile page

export default function SetProfile() {

    const navigate = useNavigate()
    function handleSubmit(){
        navigate('/dashboard')
        // pass all account creation details here
    }

    return(
    <div className="flex justify-center items-center relative min-h-screen bg-no-repeat w-full bg-cover bg-blue-200">
        <form action="/auth/setprofile" method="GET" className="relative-right-[15%] bg-white shadow-md rounded px-8 pt-6 mb-4">    
            {/* <div className="flex justify-center">
                <img src="[url('/public/images/Logo.jpg')]" alt="Logo" className="w-14 h-14"></img>
            </div> */}
            <h1>Additional Information</h1>
            <div className="mb-4">
                <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="first name">
                First Name
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="first name"
                    type="text"
                    placeholder="First name">
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
                    placeholder="Last name">
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
                    placeholder="Username">
                </input>
            </div>
            {/* Dropdown menu for form to allow users to pick their favorite genre and get recommendations for them*/}
            <div className="relative w-full lg:max-w-sm">
            <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="movie genre">
                Favorite Movie Genre
                </label>
            <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none focus:shadow-outline appearance-none focus:border-indigo-600">
                <option>None</option>
                <option>Action</option>
                <option>Horror</option>
                <option>Drama</option>
                <option>Thriller</option>
                <option>Comedy</option>
                <option>Sci-Fi</option>
                <option>Romance</option>
                <option>Adventure</option>
                <option>Documentary</option>
                <option>Mystery</option>

            </select>
        </div>
            <button type="submit" onClick={handleSubmit} class="btn btn-primary my-6 w-full duration-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" >Create Account</button>
            <br></br>
            {/* <p class="text-center text-gray-500 text-xs">
            &copy;Runtime Group
            </p> */}
        </form>
    </div>    
    )
}