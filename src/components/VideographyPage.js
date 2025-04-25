import React from "react";
import "./VideographyPage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function VideographyPage() {
    const navigate = useNavigate();

    return (
        <div className="videographyPage">
            <h1>Videography</h1>
            <Button onClick={() => navigate("/")}>Back to home</Button>
        </div>
    );
}

export default VideographyPage;