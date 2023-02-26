// import styles from '../style'
import React from 'react';
import WebFont from 'webfontloader';
// import font from '../components/landingpage/Font.css';


const Hero = () => (
    <section id="home" className = "flex md:flex-row flex-col font-title ">
        <div
            className="flex relative min-h-screen bg-no-repeat w-full bg-cover 
            bg-[url('/public/images/movie.png')]">
            <div className="flex relative mx-auto items-center flex-col space-y-4 justify-center">
                <h1 className="text-white text-9xl font-serif font-bold">Entertainment Awaits</h1>
                <div className=""> 
                    <button className = "border-white text-white text-3xl inset-x-10 outline outline-white rounded px-10 py-5 hover:bg-white hover:text-blue-900 hover:outline-white hover:text-bold">
                        Get Started Now
                    </button>
                    
                </div>
            </div>
        </div>
    </section>
)
    

export default Hero;
