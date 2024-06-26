import React from "react";
import "./BookShootPage.css";
import GradShootForm from "./GradShootForm";
// import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function BookShootPage() {
  const bookingPageInfo =
    "To book a graduation photoshoot, please fill out Grad Shoot form.\nTo book photo or video coverage for weddings and events, fill out the Weddings/Events form to get a quote.";

  return (
    <div className="bookShootPage">
      <div className="pageHeader">
        <h1 className="pageTitle">Book a Shoot</h1>
        <div className="bookingPageInformation">{bookingPageInfo}</div>
      </div>

      <GradShootForm />

    </div>
  );
}

export default BookShootPage;
