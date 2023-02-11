import React from 'react'

export default function SignUp(){
    return(
        <div className="flex justify-center items-center relative min-h-screen bg-no-repeat w-full bg-cover bg-blue-200">
            <div className="">
                <h1>Signup</h1>
            </div>
            <form action="/auth/signup" method="POST" className="relative-right-[15%] bg-white shadow-md rounded px-8 pt-6 mb-4">
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
                <div class="mb-4">
                    <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="password">
                    Confirm Password
                    </label>
                    <input
                        class="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password">
                    </input>
                </div>
                <button type="submit" class="btn btn-primary my-2 w-full duration-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Sign Up</button>
                <br></br>
                <a className="m-4" href='/signin'>Already have an account? Sign In.</a>
            </form>
        </div>
    )
}

{/* <button type="submit" style={{background: 'black', color : 'white'}} class="btn btn-primary">Submit</button>
<a href='/signin'>Already have an account? Sign In.</a> */}