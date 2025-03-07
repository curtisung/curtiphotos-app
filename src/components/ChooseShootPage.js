import React from "react";
import "./ChooseShootPage.css";
import { useNavigate } from "react-router-dom";

import nateChristinaPortrait from "../resources/nate-christina-portrait-scale-down.jpg";
import joshJumpingPortrait from "../resources/joshjumping-scale-down.jpg";
import callumUppiesPortrait from "../resources/callum-uppies-scale-down.jpg";

export default function ChooseShootPage() {
  const navigate = useNavigate();

  const navigateToGradBookingPage = () => {
    navigate("/book-grad-shoot");
  };

  return (
    <div className="ChooseShootPage">
      <div className="imageContainer">
        <div className="photoContainer">
          <img className="weddingPhoto photo" onClick={navigateToGradBookingPage} src={nateChristinaPortrait} alt="Wedding Bookings"/>
          <div className="shootOptionFlexContainer"><div className="shootOptionText">Weddings</div></div>
        </div>
        <div className="photoContainer">
          <img className="gradPhoto photo" onClick={navigateToGradBookingPage} src={joshJumpingPortrait} alt="Grad Bookings"/>
          <div className="shootOptionFlexContainer"><div className="shootOptionText">Graduation</div></div>
        </div>
        <div className="photoContainer">
          <img className="otherPhoto photo" onClick={navigateToGradBookingPage} src={callumUppiesPortrait} alt="Grad Bookings"/>
          <div className="shootOptionFlexContainer"><div className="shootOptionText">Other</div></div>
        </div>
      </div>
    </div>
  );
}
