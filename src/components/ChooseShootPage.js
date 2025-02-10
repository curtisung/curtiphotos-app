import React from "react";
import "./ChooseShootPage.css";
import { useNavigate } from "react-router-dom";

import nateChristinaPortrait from "./nate-christina-portrait.jpg";
import joshJumpingPortrait from "../resources/joshjumping.jpg";
import callumUppiesPortrait from "../resources/callum-uppies.jpg";


export default function ChooseShootPage() {
    const navigate = useNavigate();

    const navigateToGradBookingPage = () => {
        navigate("/book-grad-shoot");
    }

    return (
        <div className="ChooseShootPage">
            <div className="imageContainer">
                <img className="weddingPhoto photo" onClick={navigateToGradBookingPage} src={nateChristinaPortrait} alt="Wedding Bookings"/>
                <img className="gradPhoto photo" onClick={navigateToGradBookingPage} src={joshJumpingPortrait} alt="Grad Bookings"/>
                <img className="otherPhoto photo" onClick={navigateToGradBookingPage} src={callumUppiesPortrait} alt="Grad Bookings"/>
            </div>
        </div>
        
    )
}