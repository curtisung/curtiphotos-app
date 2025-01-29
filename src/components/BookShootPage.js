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

import {getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../index.js";

function BookShootPage() {
  const bookingPageDescription = "Fill out and submit the form below to submit your interest in a Gradutation shoot! Once you have, I will reach out to you to give a quote. Let's capture some memories!";
  const bookingPageRedirectText = "\nTo book me for other types of photoshoots or wedding/event coverage, go to the Contact page and send a message for a quote.";
  
  // const q = query(collection(db, "appointments"));
  // const appointmentsTest = getDocs(q);
  // console.log(appointmentsTest);
  // var apmtList = [];
  
  // appointmentsTest.forEach( (apmt) => {
  //   apmtList.push(<li>{apmt}</li>);
  //   console.log(apmt);
  // })

  return (
    <div className="bookShootPage">
      <div className="pageHeader">
        <h1 className="pageTitle">Graduation Shoot Booking Form</h1>
        <div className="bookingPageDescription">{bookingPageDescription}</div>
        <div className="bookingPageRedirectText">{bookingPageRedirectText}</div>
        {/* <ul className="bookingPageAppointmentsTest">{apmtList}</ul> */}
      </div>
      <GradShootForm />
    </div>
  );
}

export default BookShootPage;
