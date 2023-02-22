// import styles from '../style'
import React from 'react'

const Hero = () => (
    <section id="home" className = "flex md:flex-row flex-col">
        <div
            className="flex relative min-h-screen bg-no-repeat w-full bg-cover 
            bg-[url('/public/images/HomeLoginImages.jpg')]">
            <div className="flex relative mx-auto items-center bg-red-400 flex-col space-y-4 justify-center">
                <h1 className="text-white text-9xl font-serif font-bold bg-green-500">Entertainment Awaits</h1>
                
                <button className = "bg-blue-500 border-white text-white text-5xl">
                    Get Started for Free
                </button>
            </div>
        </div>
    </section>
)
    

export default Hero;
