// import styles from '../style'
import React from 'react';
import WebFont from 'webfontloader';
// import font from '../components/landingpage/Font.css';


const Hero = () => (
    <section id="home" className = "flex md:flex-row flex-col font-title ">
        <div
            className="flex relative min-h-screen bg-no-repeat w-full bg-cover 
            bg-[url('/public/images/HomeLoginImages.jpg')]">
            <div className="flex relative mx-auto items-center flex-col space-y-4 justify-center">
                <h1 className="text-blue-500 text-9xl font-serif font-bold">Entertainment Awaits</h1>
                
                <button className = "border-white text-blue-400 text-3xl">
                    Get Started for Free
                </button>
            </div>
        </div>
    </section>
)
    

export default Hero;
