import React from "react";
import { useState, useEffect } from "react";

import "./GradShootForm.css";
import { bookAppointment, getBookedAppointments } from "../AppointmentHelperFunctions.js";
import { GRAD_PACKAGE_INFO } from "../constants.js";

import { dianaTheme } from "../themes.js";
import { ThemeProvider } from "@mui/material/styles";

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
import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";


export default function GradShootForm() {
    const [page, setPage] = useState(1);
    const [bookedDates, setBookedDates] = useState([]);
    const [isCurrentPageValid, setIsCurrentPageValid] = useState(false);
    const [formData, setFormData] = useState({
        firstName: null,
        lastName: null,
        pronouns: null,
        school: null,
        contactMethod: "email",
        email: null,
        phone: null,
        photoPackageTitle: null,
        photoPackageID: null,
        date: null,
        locations: [],
    });

    const formPages = [
      <PackageSelect formData={formData} setFormData={setFormData} setIsCurrentPageValid={setIsCurrentPageValid}/>,
      <ContactEntry formData={formData} setFormData={setFormData} setIsCurrentPageValid={setIsCurrentPageValid}/>,
      <DateSelect formData={formData} setFormData={setFormData} bookedDates={bookedDates} setIsCurrentPageValid={setIsCurrentPageValid}/>,
      <LocationSelect formData={formData} setFormData={setFormData} setIsCurrentPageValid={setIsCurrentPageValid}/>,
      <ReviewPage formData={formData} setFormData={setFormData} setIsCurrentPageValid={setIsCurrentPageValid}/>,
      <ConfirmationPage formData={formData}/>
    ];

    useEffect(() => {
        getBookedAppointments().then((bookedAptsArr) => {
          var bookedDates = bookedAptsArr.map((apt) => {
            return apt.date;
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
      <ThemeProvider theme={dianaTheme}>
        <div className="gradShootForm">
          <div className="gradShootForm formSection">
              <div className="formSectionContainer">
                {formPages[page-1]}
              </div>
              <hr color="diana" className="separationBorder"/>
              <div className="navigationButtons">
                {(page > 1 && page < formPages.length) && <Button className="gradShootFormButton back" variant="outlined" color="diana" onClick={() => changePage(-1)}>{leftButtonText}</Button>}
                {(page < formPages.length) && <Button className="gradShootFormButton next" variant="contained" color="diana" disabled={!isCurrentPageValid} onClick={() => changePage(1)}>{rightButtonText}</Button>}
              </div>
          </div>
        </div>
      </ThemeProvider>
    );
}


function PackageSelect({ formData, setFormData, setIsCurrentPageValid}) {
  const handleChangePhotoPackage = (e) => {
    setFormData({...formData, photoPackageTitle: e.target.value, photoPackageID: e.target.id});
    checkIsPageValid();
  }

  const createbuttonMarkupList = () => {
    const buttons = [];
    for (let eachPackageData of GRAD_PACKAGE_INFO.values()) {
      buttons.push(
        <Button 
          id={eachPackageData.id} 
          className="packageButton" 
          variant={formData.photoPackageID === eachPackageData.id ? "contained" : "outlined"} 
          value={eachPackageData.title} 
          onClick={handleChangePhotoPackage}
          color="diana">
            {eachPackageData.title}
        </Button>
      );
    }    
    return buttons;
  }

  const isPackageSelected = (photoPackageTitle) => {
    return photoPackageTitle !== "" && photoPackageTitle !== null && photoPackageTitle !== undefined;
  }

  const checkIsPageValid = () => {
    if (!isPackageSelected(formData.photoPackageTitle)) {
      setIsCurrentPageValid(false);
      return;
    }
    setIsCurrentPageValid(true);
  }
  
  checkIsPageValid();

  const buttonMarkupList = createbuttonMarkupList();
  return (
    <div className="packageSelect page">
      <h2 className="formSectionHeader">Select a Photo Package</h2>
      <div className="formSectionBody packageSelectContainer">
        <ul className="packageList">{buttonMarkupList}</ul>
        <div className="packageDescriptionContainer">
          <div className="packageDescription title">{GRAD_PACKAGE_INFO.get(formData.photoPackageID)?.price} {formData.photoPackageID && "|"} {GRAD_PACKAGE_INFO.get(formData.photoPackageID)?.title}</div>
          {formData.photoPackageID && <ul className="packageDescription body">
            <li><div className="packageDescription numClients">{GRAD_PACKAGE_INFO.get(formData.photoPackageID)?.numClients}</div></li>
            <li><div className="packageDescription description">{GRAD_PACKAGE_INFO.get(formData.photoPackageID)?.description}</div></li>
            <li><div className="packageDescription duration">Time:{GRAD_PACKAGE_INFO.get(formData.photoPackageID)?.duration}</div></li>
          </ul>}
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
            <TextField className="formSectionItem" id="clientFirstName" label="First Name" variant="standard" required={true} onChange={handleChangeFirstName} defaultValue={formData.firstName}/>
            <TextField className="formSectionItem" id="clientLastName" label="Last Name" variant="standard" required={true} onChange={handleChangeLastName} defaultValue={formData.lastName}/>
          </div>
           <div className="pronouns selectDropDownContainer">
            <TextField className="formSectionItem" id="clientPronouns" label="Pronouns" variant="standard" required={true} defaultValue={formData.pronouns} onChange={handleChangePronouns}/>
          </div>
          <FormControl fullWidth>
            <div className="contactMethodContainer">
              <TextField className="contactMethodInput" id="contactInput" label="Email" variant="standard" required={true} defaultValue={formData.email} onChange={handleChangeEmail}/>
              <TextField className="contactMethodInput" id="contactInput" label="Phone" variant="standard" required={true} defaultValue={formData.phone} onChange={handleChangePhone}/>
            </div>
            <div className="contactMethodRadioButtonsContainer">
              <FormLabel id="demo-radio-buttons-group-label" required={true}>Preferred Contact Method</FormLabel>
              <RadioGroup className="contactRadioButtons" aria-labelledby="demo-radio-buttons-group-label" value={formData.contactMethod} name="controlled-radio-buttons-group" onChange={handleChangeContactMethod}>
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


function DateSelect({formData, setFormData, setIsCurrentPageValid, bookedDates}) {
  const isDateValid = (date) => {
    return date !== null;
  }
  
  const checkIsFormValid = () => {
    if (!isDateValid(formData.date)) {
      setIsCurrentPageValid(false);
      return;
    }
    setIsCurrentPageValid(true);
  }
  
  const handleChangeDate = (newDate) => {
    setFormData({...formData, date: newDate});
    checkIsFormValid();
    console.log(formData);
  }
  
  const shouldDisableDate = (date) => {
    const today = new dayjs();
    var isBooked = bookedDates.find((bookedDate) => {
      return date.isBefore(today) || (date.year() === bookedDate.year() && date.month() === bookedDate.month() && date.date() === bookedDate.date());
    })
    return isBooked !== undefined;
  };

  checkIsFormValid();

  return (
    <div className="dateSelect page">
      <h2 className="formSectionHeader">Select a Shoot Date</h2>
      <div className="formSectionBody">
        <div className="calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker  value={formData?.date} onChange={handleChangeDate} shouldDisableDate={shouldDisableDate}/>
          </LocalizationProvider>
        </div>
      </div>    
    </div>
  );
}

function DateContactEntry({formData, setFormData, setIsCurrentPageValid, bookedDates}) {
  
}

function LocationSelect({formData, setFormData, setIsCurrentPageValid}) {
  const schoolsList = [
    "UC Irvine",
    "UC Los Angeles",
    "UC Riverside",
    "UC San Diego"
  ];
  const schoolsDropdownListItems = schoolsList.map((schoolStr) => {
    return <MenuItem value={schoolStr}>{schoolStr}</MenuItem>;
  });

  const handleLocationChange = (e) => {
    var locations = [...formData.locations];
    if (e.target.checked) {
      locations.push(e.target.value);
    } else {
      locations = locations.filter((location) => { 
        return location !== e.target.value });
    }
    setFormData({...formData, locations: locations});
    checkIsFormValid()
  }

  const isSchoolValid = (school) => {
    return schoolsList.includes(school);
  }

  const isLocationsValid = (locations) => {
    return locations.length > 0;
  }

  const checkIsFormValid = () => {
    console.log(formData);
    console.log(formData.locations.length);

    if (!isSchoolValid(formData.school)) {
      setIsCurrentPageValid(false);
      return;
    }
    if (!isLocationsValid(formData.locations)) {
      setIsCurrentPageValid(false);
      return;
    }
    setIsCurrentPageValid(true);
  }

  checkIsFormValid();

  return (
    <div className="locationSelect page">
      <h2 className="formSectionHeader">Select Shoot Location</h2>
      <div className="formSectionBody">
        <FormControl className="selectDropDownContainer" fullWidth>
          <InputLabel id="demo-simple-select-label">School</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label="school" defaultValue={formData.school} onChange={(e) => setFormData({...formData, school: e.target.value,})}>
            {schoolsDropdownListItems}
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
          <p>{formData?.pronouns}</p>
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
      Your appointment for {formData?.date?.toString()} has been booked. You will receive a confirmation email shortly.
    </div>
  );
}