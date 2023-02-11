import React from "react";
// import "../App.css";

export default function SignInPage() {
    return(
    <div className="flex justify-center items-center relative min-h-screen bg-no-repeat w-full bg-cover bg-blue-200">
        <form action="/auth/login" method="GET" className="relative-right-[15%] bg-white shadow-md rounded px-8 pt-6 mb-4">    
            <div className="flex justify-center">
                <img src="[url('/public/images/Logo.png')]" alt="Logo" className="w-14 h-14"></img>
            </div>
            <div className="mb-4">
                <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email-reg">
                Email Address
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email address"
                    type="text"
                    placeholder="Email Address">
                </input>
            </div>
            <div class="mb-4">
                <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password">
                Password
                </label>
                <input
                    class="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password">
                </input>
            </div>

            <button type="submit" class="btn btn-primary my-2 w-full duration-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Sign In</button>
            <br></br>
            <a href='/signup' className="text-black">Don't have an account? Sign Up!</a>
            <p class="text-center text-gray-500 text-xs">
            &copy;Runtime Group
            </p>
        </form>
    </div>    
    )
}