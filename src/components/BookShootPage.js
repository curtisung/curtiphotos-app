import React from "react";
import "./BookShootPage.css";
import GradShootForm from "./GradShootForm";

function BookShootPage() {
  const bookingPageDescription = "Fill out and submit the form below to submit your interest in a Gradutation shoot! Once you have, I will reach out to you to give a quote. Let's capture some memories!";
  const bookingPageRedirectText = "\nTo book me for other types of photoshoots or wedding/event coverage, go to the Contact page and send a message for a quote.";


  return (
    <div className="bookShootPage">
      <div className="pageHeader">
        <h1 className="pageTitle">Graduation Shoot Booking Form</h1>
        <div className="bookingPageDescription">{bookingPageDescription}</div>
        <div className="bookingPageRedirectText">{bookingPageRedirectText}</div>
      </div>
      <GradShootForm />
    </div>
  );
}

export default BookShootPage;
