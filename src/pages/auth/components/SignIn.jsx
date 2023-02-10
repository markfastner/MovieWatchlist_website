import React from "react";
// import "../App.css";

export default function SignInPage() {
    return(
    <div className="flex justify-end relative min-h-screen bg-no-repeat w-full bg-cover bg-blue-200">
        <form action="/auth/login" method="GET" className="relative-right-[15%] bg-white shadow-md rounded px-8 pt-6 mb-4">    
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
            <div class="mb-6">
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
                
                
        <button type="submit" style={{background: 'black', color : 'white'}} class="btn btn-primary">Submit</button>
        <br></br>
        <a href='/signup' className="text-blue">Don't have an account? Sign Up!</a>
        </form>
    </div>    
    )
}