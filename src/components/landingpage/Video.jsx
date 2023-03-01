import React from 'react'
// import YoutubeEmbed from './components/landingpage/YoutubeEmbed' // import YoutubeEmbed component

const Video = () => (
    <section id="home" className = "relative flex md:flex-row flex-col items-center justify-center">
        <div className="flex relative min-h-screen bg-no-repeat w-full bg-cover justify-center
            bg-[url('/public/images/HomeLoginImages.jpg')]">
            <div className="items-center relative flex justify-center ">
                <iframe className ="justify-center"
                width="900" 
                height="500" 
                src="https://www.youtube.com/embed/aYsgsSo1aow" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen/>
            </div>
        </div>
    </section>
)

// implementing movie tutorial in this page
export default Video;