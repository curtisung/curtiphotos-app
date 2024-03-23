import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import michaelPortrait from "./michael-portrait.jpg";
import nateChristinaPortrait from "./nate-christina-portrait.jpg";

function LandingPage() {
    const navigate = useNavigate();
    
    const clickBookGradShoot = () => {
        navigate("/grad-shoot-booking");
    };

    const navigateToWorks = () => {
        navigate("/works");
    };

    return (
        <div className="landingPage">
            <div className="landingPage__photos">
                <div className="landingPage__imageContainer">
                    <img className="landingPage__image1 photo" onClick={navigateToWorks} src={michaelPortrait} alt="michaelPortrait"/>
                    <div className="landingPage__image1Text">Graduation</div>
                </div>
                <img className="landingPage__nateChristinaPhoto photo" onClick={navigateToWorks} src={nateChristinaPortrait} alt="Nate and Christina"/>
            </div>
            
            <div className="landingPage__bookButtonContainer">
                <Button className="landingPage__bookButton" variant="contained" onClick={clickBookGradShoot}>Book Shoot With Me!</Button>
            </div>
        </div>
    );
}

export default LandingPage;