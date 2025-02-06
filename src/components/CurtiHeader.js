import React from "react";
import "./CurtiHeader.css";
import { useNavigate } from "react-router-dom";

function CurtiHeader() {
    const navigate = useNavigate();
    const navigateToLanding = () => {navigate("/");}
    return (
        <h1 className="curtiHeader" onClick={navigateToLanding}>CURTI.</h1>
    );
}

export default CurtiHeader;