import React from 'react'
import LoginImg from '../assets/HomeLoginImages.jpg'

export default function LandingPage(){
    return(
        <div class = 'grid gird-cols-1 sm:grid-cols-2'>
            <div>
                <img src={LoginImg} alt="Login Image"/>
            </div>

            <div>
                <form>
                    <h2>SIGN IN</h2>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username"/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="text" name="password" placeholder="Password"/>
                    </div>
                    <button>Sign in</button>
                </form>
            </div>
        </div>
    )
}