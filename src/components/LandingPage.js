import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
// import michaelPortrait from "./michael-portrait.jpg";
// import nateChristinaPortrait from "./nate-christina-portrait.jpg";

function LandingPage() {
  const navigate = useNavigate();

  const navigateToChooseShootPage = () => { navigate("/choose-shoot");};
  const navigateToPhotography = () => { navigate("/photography"); };
  const navigateToContact = () => { navigate("/contact"); }
  const navigateToAboutPage = () => { navigate("/about"); }
  const navigateToVideography = () => { navigate("/videography"); }

  return (
    <div className="landingPage">
      <div className="greetingCard">
        <h1 className="greetingCardHeading"><span className="greetingCardHeading__hello">Hello,</span><span className="greetingCardHeading__curtis"> I'm Curtis!</span></h1>
        <p className="greetingCardTagline">photographer, videographer, and your friendly neighborhood camera guy.</p>
      </div>
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
        <div className="navLink" onClick={navigateToChooseShootPage}>book with me</div>
        <div className="navLink" onClick={navigateToPhotography}>photography</div>
        <div className="navLink" onClick={navigateToVideography}>videography</div>
      </div>
    </div>
  );
}

export default LandingPage;
