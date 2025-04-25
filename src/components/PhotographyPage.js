import React from "react";
import "./PhotographyPage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function PhotographyPage() {
    const navigate = useNavigate();

    return (
        <div className="photographyPage">
            <h1>Photography</h1>
            <Button onClick={() => navigate("/")}>Back to home</Button>
        </div>
    );
}

export default PhotographyPage;