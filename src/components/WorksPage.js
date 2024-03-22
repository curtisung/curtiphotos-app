import React from "react";
import "./WorksPage.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function WorksPage() {
    const navigate = useNavigate();

    return (
        <div className="worksPage">
            <h1>Works</h1>
            <Button onClick={() => navigate("/")}>Back to home</Button>
        </div>
    );
}

export default WorksPage;