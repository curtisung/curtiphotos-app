import React from "react";
import "./ContactPage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function ContactPage() {
    const navigate = useNavigate();

    return (
        <div className="contactPage">
            <h1>Contact Me</h1>
            <Button onClick={() => navigate("/")}>Back to home</Button>
        </div>
    );
}

export default ContactPage;