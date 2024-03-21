import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function LandingPage() {
    const navigate = useNavigate();

    const clickContact = () => {
        navigate("/contact");
    };
    
    const clickBookGradShoot = () => {
        navigate("/grad-shoot-booking");
    };
      
    
    return (
        <div className="landingPage">
            <h1>Landing Page</h1>
            <Button onClick={clickContact}>Contact Me</Button>
            <Button onClick={clickBookGradShoot}>Book a Grad Shoot</Button>
        </div>
    );
}

export default LandingPage;