import React from "react";
import "./AboutPage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function AboutPage() {
    const navigate = useNavigate();

    return (
        <div className="aboutPage">
            <h1>About Me</h1>
            <Button onClick={() => navigate("/")}>Back to home</Button>
        </div>
    );
}

export default AboutPage;