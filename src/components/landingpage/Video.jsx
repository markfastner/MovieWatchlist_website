import React from 'react'
// import YoutubeEmbed from './components/landingpage/YoutubeEmbed' // import YoutubeEmbed component

// this is the video component that will be used in the landing page and will feature our tutorial video
// the video will be embedded in the page and will be responsive to the screen size


const Video = () => (
    <section id="home" className = "relative flex md:flex-row flex-col items-center justify-center">
        <div className="flex relative min-h-screen bg-no-repeat w-full bg-cover justify-center
            bg-[url('/public/images/HomeLoginImages.jpg')]">
            <div className="items-center relative flex justify-center ">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/s6lPfuqcdsM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
    </section>
)

// implementing movie tutorial in this page
export default Video;