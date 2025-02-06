import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
// import michaelPortrait from "./michael-portrait.jpg";
// import nateChristinaPortrait from "./nate-christina-portrait.jpg";
import CurtiHeader from "./CurtiHeader";

function LandingPage() {
  const navigate = useNavigate();

  const navigateToBookingPage = () => { navigate("/book-a-shoot");};
  const navigateToPhotography = () => { navigate("/photography"); };
  const navigateToLanding = () => { navigate("/"); }
  const navigateToContact = () => { navigate("/contact"); }
  const navigateToAboutPage = () => { navigate("/about"); }
  const navigateToVideography = () => { navigate("/videography"); }

  return (
    <div className="landingPage">
      <h1 className="greetingCard"><span className="greetingCard__hello">Hello,</span><span className="greetingCard__curtis"> I'm Curtis!</span></h1>
      <p className="tagline">I'm a photographer, videographer, and your friendly neighborhood camera guy.</p>
      {/* <div className="landingPage__photos">
        <div className="landingPage__imageContainer" onClick={navigateToWorks}>
          <img
            className="landingPage__image1 photo"
            src={michaelPortrait}
            alt="michaelPortrait"
          />
          <div className="landingPage__image1Text">Graduation</div>
        </div>
        <div className="landingPage__imageContainer" onClick={navigateToWorks}>
          <img
            className="landingPage__nateChristinaPhoto photo"
            onClick={navigateToWorks}
            src={nateChristinaPortrait}
            alt="Nate and Christina"
          />
          <div className="landingPage__image1Text">Weddings</div>
        </div>
      </div> */}
      <div className="navLinkList">
        <div className="navLink" onClick={navigateToAboutPage}>about me</div>
        <div className="navLink" onClick={navigateToContact}>contact</div>
        <div className="navLink" onClick={navigateToBookingPage}>book with me</div>
        <div className="navLink" onClick={navigateToPhotography}>photography</div>
        <div className="navLink" onClick={navigateToVideography}>videography</div>
      </div>
      
    </div>
  );
}

export default LandingPage;
