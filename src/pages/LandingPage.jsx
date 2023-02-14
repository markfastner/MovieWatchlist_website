import React from "react";
import { Card } from "react-bootstrap";
//import { useNavigate } from "react-router";
import "../App.css";
// import '../LandingPage.css';

// Landing page component export function
function LandingPage() {
  return (
    <div
      className="flex relative min-h-screen bg-no-repeat w-full bg-cover 
        bg-[url('/public/images/HomeLoginImages.jpg')]">
        
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Pryj0g7DUDo?start=108" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
  );
}

export default LandingPage;
// card name for the activity status card or tutorial card


{/* <Card className="w-full max-w-sm p-4 bg-blue-200 border-blue-400 shadow sm:p-6 md:p-100">
          <Card.Body>
            <h2 className="text-center mb-4 text-black">Tutorial Here</h2>
          </Card.Body>
        </Card> */}