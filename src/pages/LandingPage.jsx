import React from "react";
import { Card } from "react-bootstrap";
//import { useNavigate } from "react-router";
import "../App.css";
// import '../LandingPage.css';
import Hero from '../components/landingpage/Hero.jsx';

// Landing page component export function
function LandingPage() {
  return (
    <Hero/>
    // <div
    //   className="flex relative min-h-screen bg-no-repeat w-full bg-cover 
    //     bg-[url('/public/images/HomeLoginImages.jpg')]">
      
    //   </div>
  );
}

export default LandingPage;
// card name for the activity status card or tutorial card


{/* <Card className="w-full max-w-sm p-4 bg-blue-200 border-blue-400 shadow sm:p-6 md:p-100">
          <Card.Body>
            <h2 className="text-center mb-4 text-black">Tutorial Here</h2>
          </Card.Body>
        </Card> */}