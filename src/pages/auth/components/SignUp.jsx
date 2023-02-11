import React from 'react'

export default function SignUp(){
    return(
        <div className="flex justify-center items-center relative min-h-screen bg-no-repeat w-full bg-cover bg-blue-200">
            
            <form action="/auth/signup" method="POST" className="bg-white shadow-md rounded px-8 pt-6 mb-4">
                <div className="">
                    <h1>Sign Up</h1>
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
                <div class="flex items-center">
                    <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </input>
                    <label
                    for="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500">
                    I agree with the{" "}
                    <a href="/terms-and-conditions" className="text-blue-600 dark:text-blue-500 hover:underline">
                    terms and conditions
                    </a>.
                    </label>
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