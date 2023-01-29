import React from 'react'
import LoginImg from '../assets/HomeLoginImages.jpg'

export default function LandingPage(){
    return(
        <div className = 'grid gird-cols-1 sm:grid-cols-2 h-full w-screen'>
            <div className = 'hidden sm:block'>
                <img src={LoginImg} alt="Login Image"/>
            </div>

            <div>
                <form>
                    <h2>Sign Into Runtime</h2>
                    <div>
                        <label>Username: </label>
                        <input type="text" name="username" placeholder="Username"/>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="text" name="password" placeholder="Password"/>
                    </div>
                    <div>
                        <p><input type="checkbox" name="rememberMe" id="rememberMe"/> Remember Me</p>
                        <p>Forget Password?</p>
                    </div>
                    <div>
                        <p>Don't have an account? <a href="/">Sign Up</a></p>
                    </div>
                    <button>Sign in</button>
                </form>
            </div>
        </div>
    )
}