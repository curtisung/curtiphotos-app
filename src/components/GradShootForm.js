import React from "react";
import { useState, useEffect } from "react";

import "./GradShootForm.css";
import { bookAppointment, getBookedAppointments, deleteAllBookedAppointments } from "../AppointmentHelperFunctions.js";

import { validEmail } from "../Regex";
import { Checkbox, TextField } from "@mui/material";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";


export default function GradShootForm() {
    const [page, setPage] = useState(1);
    const [bookedDates, setBookedDates] = useState([]);
    const [isCurrentPageValid, setIsCurrentPageValid] = useState(false);
    const [formData, setFormData] = useState({
        firstName: null,
        lastName: null,
        pronouns: null,
        otherPronouns: null,
        school: null,
        contactMethod: "email",
        email: null,
        phone: null,
        photoPackage: null,
        date: new Date(),
        locations: [],
    });

    const formPages = [
      <ContactEntry formData={formData} setFormData={setFormData} setIsCurrentPageValid={setIsCurrentPageValid}/>,
      <PackageSelect formData={formData} setFormData={setFormData} setIsCurrentPageValid={setIsCurrentPageValid}/>,
      <DateSelect formData={formData} setFormData={setFormData} bookedDates={bookedDates} setIsCurrentPageValid={setIsCurrentPageValid}/>,
      <LocationSelect formData={formData} setFormData={setFormData} setIsCurrentPageValid={setIsCurrentPageValid}/>,
      <ReviewPage formData={formData} setFormData={setFormData} setIsCurrentPageValid={setIsCurrentPageValid}/>,
      <ConfirmationPage formData={formData}/>
    ];

    useEffect(() => {
        getBookedAppointments().then((bookedAptsArr) => {
          var bookedDates = bookedAptsArr.map((apt) => {
            return apt.date.toDate()
          })
          setBookedDates(bookedDates);
        })
    }, []);

    const changePage = (increment) => {
      // Page cannot be less than 1 and more than num of pages
      if (increment === -1 && page === 1){
        return;
      }
      if (increment === 1) {
        // do nothing if current page's form isn't valid
        if (!isCurrentPageValid) {
          return;
        }
        // check if we're reviewing to book
        // TODO: Move booking functionality to the Review page
        if (page === formPages.length-1){
            bookAppointment(formData);
        }
      }
      setPage(page+increment);
    }

    const leftButtonText = "Back";    
    const rightButtonText = page === formPages.length-1 ? "Submit" : "Next";

    return (
      <div className="gradShootForm">
        <div className="gradShootForm formSection">
            <div className="formSectionContainer">
              {formPages[page-1]}
            </div>
            <hr className="separationBorder"/>
            <div className="navigationButtons">
              {(page > 1 && page < formPages.length) && <Button className="bookShootPage__Button back" variant="outlined" onClick={() => changePage(-1)}>{leftButtonText}</Button>}
              {(page < formPages.length) && <Button className="bookShootPage__Button next" variant="contained" disabled={!isCurrentPageValid} onClick={() => changePage(1)}>{rightButtonText}</Button>}
            </div>
        </div>
      </div>
    );
}


function ContactEntry({formData, setFormData, setIsCurrentPageValid}) {
  const isFirstNameValid = (firstName) => {
    return firstName !== "" && firstName !== null && firstName !== undefined;
  }

  const isLastNameValid = (lastName) => {
    return lastName !== "" && lastName !== null && lastName !== undefined;
  }

  const isPronounsValid = (pronouns) => {
    return pronouns !== "" && pronouns !== null && pronouns !== undefined;
  }

  const isEmailValid = (email) => {
    return email !== "" && validEmail.test(email);
  }

  const isPhoneValid = (phone) => {
    return phone !== "" && phone !== null && phone !== undefined;
  }

  const isContactMethodValid = (contactMethod) => {;
    return contactMethod === "email" || contactMethod === "phone";
  }


  const checkIsPageValid = () => {
    if (!isFirstNameValid(formData.firstName)){
      setIsCurrentPageValid(false);
      // add alert like "please fill out the required fields"
      return;
    }
    if (!isLastNameValid(formData.lastName)){
      setIsCurrentPageValid(false);
      return;
    }
    if (!isPronounsValid(formData.pronouns)){
      setIsCurrentPageValid(false);
      return;
    }
    if (!isEmailValid(formData.email)){
      setIsCurrentPageValid(false);
      return;
    }
    if (!isPhoneValid(formData.phone)){
      setIsCurrentPageValid(false);
      return;
    }
    if (!isContactMethodValid(formData.contactMethod)){
      setIsCurrentPageValid(false);
      return;
    }

    setIsCurrentPageValid(true);
  };
  

  const handleChangeFirstName = (e) => {
    setFormData({...formData, firstName: e.target.value}); 
    checkIsPageValid(); 
    console.log(formData);
  };

  const handleChangeLastName = (e) => {
    setFormData({...formData, lastName: e.target.value}); 
    checkIsPageValid();
    console.log(formData);  
  };

  const handleChangePronouns = (e) => {
    setFormData({...formData, pronouns: e.target.value});
    checkIsPageValid();
    console.log(formData);
  }

  const handleChangeEmail = (e) => {
    setFormData({...formData, email: e.target.value});
    checkIsPageValid();
    console.log(formData);
  }

  const handleChangePhone = (e) => {
    setFormData({...formData, phone: e.target.value});
    checkIsPageValid();
    console.log(formData);
  }

  const handleChangeContactMethod = (e) => {
    setFormData({...formData, contactMethod: e.target.value});
    checkIsPageValid();
    console.log(formData);
  }

  checkIsPageValid();
  
  return (
    <div className="contactEntry page">
      <h2 className="formSectionHeader">Contact Information</h2>
      <div className="formSectionBody">
        <FormControl fullWidth>
          <div className="formSectionRow">
            <TextField className="formSectionItem" id="clientFirstName" label="First Name" variant="standard" required={true} onChange={(e) => handleChangeFirstName(e)} defaultValue={formData.firstName}/>
            <TextField className="formSectionItem" id="clientLastName" label="Last Name" variant="standard" required={true} onChange={(e) => handleChangeLastName(e)} defaultValue={formData.lastName}/>
          </div>
           <div className="pronouns selectDropDownContainer">
            {/* <FormControl className="pronouns selectDropDown" fullWidth>
              <InputLabel id="demo-simple-select-label" required={true}>Pronouns</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Pronouns" defaultValue={formData.pronouns} onChange={(e) => handleChangePronouns(e)}>
                <MenuItem value={"He/Him"}>He/Him</MenuItem>
                <MenuItem value={"She/Her"}>She/Her</MenuItem>
                <MenuItem value={"They/Them"}>They/Them</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl> */}
            <TextField className="formSectionItem" id="clientPronouns" label="Pronouns" variant="standard" required={true} defaultValue={formData.pronouns} onChange={(e) => handleChangePronouns(e)}/>
          </div>
          <FormControl fullWidth>
            <div className="contactMethodContainer">
              <TextField className="contactMethodInput" id="contactInput" label="Email" variant="standard" required={true} defaultValue={formData.email} onChange={(e) => handleChangeEmail(e)}/>
              <TextField className="contactMethodInput" id="contactInput" label="Phone" variant="standard" required={true} defaultValue={formData.phone} onChange={(e) => handleChangePhone(e)}/>
            </div>
            <div className="contactMethodRadioButtonsContainer">
              <FormLabel id="demo-radio-buttons-group-label" required={true}>Preferred Contact Method</FormLabel>
              <RadioGroup className="contactRadioButtons" aria-labelledby="demo-radio-buttons-group-label" value={formData.contactMethod} name="controlled-radio-buttons-group" onChange={(e) => handleChangeContactMethod(e)}>
                <FormControlLabel value="email" control={<Radio />} label="Email"/>
                <FormControlLabel value="phone" control={<Radio />} label="Phone"/>
              </RadioGroup>
            </div>
          </FormControl>
        </FormControl>
      </div>
    </div>
  );
}


function PackageSelect({ formData, setFormData }) {
  return (
    <div className="packageSelect page">
      <h2 className="formSectionHeader">Select a Photo Package</h2>
      <div className="formSectionBody">
        <RadioGroup
          className="photoPackageRadioButtons"
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={formData.photoPackage}
          name="radio-buttons-group"
          onChange={(e) => {
            setFormData({
              ...formData,
              photoPackage: e.target.value,
            });
            console.log(formData);
          }}
        >
          <FormControlLabel value="Package 1" control={<Radio />} label="Package 1"/>
          <FormControlLabel value="Package 2" control={<Radio />} label="Package 2"/>
        </RadioGroup>
      </div>
    </div>
  );
}


function DateSelect({formData, setFormData, bookedDates}) {
  const changeDate = (newDate) => {setFormData({
    ...formData,
    date: new Date(newDate),
  });}
  
  const shouldDisableDate = (date) => {
    var isBooked = bookedDates.find((bookedDate) => {
      return date.year() === bookedDate.getFullYear() &&
            date.month() === bookedDate.getMonth() &&
            date.date() === bookedDate.getDate();
    })
    return isBooked !== undefined;
  };

  /**
   * I would start by getting all the appointment days so far
   * and converting it to a format that can be compared to the 
   * date calendar days
   * 
   * find a way to access the days from a calendar and change
   * its enable, disable, clickable properies. Figure out what 
   * mui properties it has to make it unselectable
   * 
   * disable every date in the calendar, maybe have a legend 
   * indicating that greyed-out means no apts available
   */
  return (
    <div className="dateSelect page">
      <h2 className="formSectionHeader">Select a Shoot Date</h2>
      <div className="formSectionBody">
        <div className="calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker valueAsDate={formData.date} onChange={changeDate} shouldDisableDate={shouldDisableDate}/>
          </LocalizationProvider>
        </div>
      </div>    
    </div>
  );
}


function LocationSelect({formData, setFormData}) {
  const handleLocationChange = (e) => {
    var locations = [...formData.locations];
    if (e.target.checked) {
      locations.push(e.target.value);
    } else {
      locations = locations.filter((location) => { return location === e.target.value });
    }
    setFormData({
      ...formData, 
      locations: locations,
    });
  }

  return (
    <div className="locationSelect page">
      <h2 className="formSectionHeader">Select Shoot Location</h2>
      <div className="formSectionBody">
        <FormControl className="selectDropDownContainer" fullWidth>
          <InputLabel id="demo-simple-select-label">School</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label="school" defaultValue={formData.school} onChange={(e) => setFormData({...formData, school: e.target.value,})}>
            <MenuItem value={"UC Irvine"}>UC Irvine</MenuItem>
            <MenuItem value={"UC Los Angeles"}>UC Los Angeles</MenuItem>
            <MenuItem value={"UC Riverside"}>UC Riverside</MenuItem>
            <MenuItem value={"UC San Diego"}>UC San Diego</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="locationCheckboxes" aria-labelledby="location-select-checkbox-group" defaultValue={null} name="location-select-checkbox-group" onChange={(e) => handleLocationChange(e)}>
          <h3>Campus Spots:</h3>
          <FormControlLabel control={<Checkbox defaultChecked={formData.locations.includes("Location 1")}/>} value="Location 1" label="Location 1"/>
          <FormControlLabel control={<Checkbox defaultChecked={formData.locations.includes("Location 2")}/>} value="Location 2" label="Location 2"/>
          <FormControlLabel control={<Checkbox defaultChecked={formData.locations.includes("Location 3")}/>} value="Location 3" label="Location 3"/>
        </FormControl>
      </div>
    </div>
  );
}


/**
  * Displays the details of the appointment to the user.
  * Need dynamic displays for pronouns & locations
  */
function ReviewPage({formData, setFormData}) {
  
  const arrayShootSpots = [];
  formData.locations.forEach((location) => {
    arrayShootSpots.push(<li>{location}</li>);
  });
  
  return (
    <div className="reviewPage page">
      <h2 className="formSectionHeader">Review Appointment Details</h2>
      <div className="appointmentDetailsContainer">
        <h3 className="reviewPage__contactHeader">Contact Details:</h3>
        <div className="reviewPage__firstNameContainer appointmentDetailSection">
          <h4 className="reviewPage__firstName">First Name:</h4>
          <p>{formData?.firstName}</p>
        </div>
        <div className="reviewPage__lastNameContainer appointmentDetailSection">
          <h4 className="reviewPage__lastName">Last Name:</h4>
          <p>{formData?.lastName}</p>
        </div>
        <div className="reviewPage__pronounsContainer appointmentDetailSection">
          <h4 className="reviewPage__pronouns">Pronouns:</h4>
          <p>{formData?.pronouns !== "Other" ? formData?.pronouns : formData?.otherPronouns}</p>
        </div>
        <div className="reviewPage__phoneNumberContainer appointmentDetailSection">
          <h4 className="reviewPage__phone">Phone:</h4>
          <p>{formData?.phone}</p>
        </div>
        <div className="reviewPage__emailContainer appointmentDetailSection">
          <h4 className="reviewPage__email">Email:</h4>
          <p>{formData?.email}</p>
        </div>
        <div className="reviewPage__phoneNumberContainer appointmentDetailSection">
          <h4 className="reviewPage__contactMethod">Preferred Contact Method:</h4>
          <p>{formData?.contactMethod}</p>
        </div>
        <h3 className="reviewPage_locationsTitle">Location:</h3>
        <div className="reviewPage__locationsContainer appointmentDetailSection">
          <h4 className="reviewPage__school">School:</h4>
          <p>{formData?.school}</p>
        </div>
        <div className="reviewPage__locationsContainer appointmentDetailSection">
          <h4 className="reviewPage__spots">Selected Spots:</h4>
        </div>
        <ul className="reviewPage__spotsList">{arrayShootSpots}</ul>
        <h3 className="reviewPage_dateTitle">Date:</h3>
        <div className="reviewPage__dateContainer appointmentDetailSection">
          <h4 className="reviewPage_dateTitle">Shoot Date:</h4>
          <p>{formData?.date?.toString()}</p>
        </div>
      </div>
    </div>
  );
}


function ConfirmationPage({ formData }){
  return (
    <div className="ConfirmationPage">
      Your appointment for {formData?.date?.toDateString()} has been booked. You will receive a confirmation email shortly.
    </div>
  );
}