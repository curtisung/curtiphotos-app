import React from "react";
import "./BookGradShootPage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


function BookGradShootPage() {
    const navigate = useNavigate();
    return (
        <div className="bookGradShootPage">
            <h1>Book a Grad Shoot</h1>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
    );
}

export default BookGradShootPage;