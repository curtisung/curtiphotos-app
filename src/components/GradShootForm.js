import React from "react";
import { useState } from "react";
import "./GradShootForm.css";
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
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function GradShootForm() {
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        pronouns: "",
        school: "",
        contactMethod: "email",
        email: "",
        phone: null,
        photoPackage: "",
        locations: new Set(),
    });

    const formPages = [
      <NameEntry formData={formData} setFormData={setFormData}/>,
      <DateSelect formData={formData} setFormData={setFormData}/>,
      <PackageSelect formData={formData} setFormData={setFormData}/>,
      <LocationSelect formData={formData} setFormData={setFormData}/>,
      <ReviewPage formData={formData} setFormData={setFormData}/>
    ];

    const leftButtonText = "Back";    
    const rightButtonText = page === formPages.length ? "Submit" : "Next";

    /**
      * Page cannot be less than 1 and more than 3 for now
      */
    const changePage = (increment) => {
      if ((increment === -1 && page === 1) || (increment === 1 && page === formPages.length)){
        return;
      }
      setPage(page+increment);
    }

    return (
      <div className="gradShootForm">
        <div className="gradShootForm formSection">
            <div className="formSectionContainer">
              {formPages[page-1]}
            </div>
            <div className="separationBorder"></div>
            <div className="navigationButtons">
              <Button className="bookShootPage__Button back" variant="outlined" onClick={() => changePage(-1)}>{leftButtonText}</Button>
              <Button className="bookShootPage__Button next" variant="contained" onClick={() => changePage(1)}>{rightButtonText}</Button>
            </div>
        </div>
      </div>
    );
}


function NameEntry({formData, setFormData}) {
  const handleChangeFirstName = (e) => {
    setFormData({...formData, firstName: e.target.value}); 
    console.log(formData);
  };

  const handleChangeLastName = (e) => {
    setFormData({...formData, lastName: e.target.value}); 
    console.log(formData);
  };

  const handleChangePronouns = (e) => {
    setFormData({...formData, pronouns: e.target.value, otherPronouns: ""}); 
  };

  const handleChangeOtherPronouns = (e) => {
    setFormData({...formData, otherPronouns: e.target.value}); 
  };

  const handleChangeContactMethod = (e) => {
    setFormData({...formData, contactMethod: e.target.value});
  };

  const handleChangeEmail = (e) => {
    setFormData({...formData, email: e.target.value});
  }

  const handleChangePhone = (e) => {
    setFormData({...formData, phone: e.target.value});
  }
  
  return (
    <div className="nameEntry page">
      <h2 className="formSectionHeader">Contact Information</h2>
      <div className="formSectionBody">
        <FormControl fullWidth>
          <div className="formSectionRow">
            <TextField className="formSectionItem" id="clientFirstName" label="First Name" variant="standard" required={true} onBlur={(e) => handleChangeFirstName(e)} defaultValue={formData.firstName}/>
            <TextField className="formSectionItem" id="clientLastName" label="Last Name" variant="standard" required={true} onBlur={(e) => handleChangeLastName(e)} defaultValue={formData.lastName}/>
          </div>
          <div className="pronouns selectDropDownContainer">
            <FormControl className="pronouns selectDropDown" fullWidth>
              <InputLabel id="demo-simple-select-label" required={true}>Pronouns</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Pronouns" defaultValue={formData.pronouns} onChange={(e) => handleChangePronouns(e)}>
                <MenuItem value={"He/Him"}>He/Him</MenuItem>
                <MenuItem value={"She/Her"}>She/Her</MenuItem>
                <MenuItem value={"They/THem"}>They/Them</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            {(formData.pronouns === "Other") && <TextField className="otherPronouns" id="otherPronouns" label="Enter your pronouns" variant="standard" required={true} defaultValue={formData.otherPronouns} onBlur={(e) => handleChangeOtherPronouns(e)}/>}
          </div>
          <FormControl fullWidth>
            <div className="contactMethodContainer">
              <TextField className="contactMethodInput" id="contactInput" label="Email" variant="standard" required={true} defaultValue={formData.email} onBlur={(e) => handleChangeEmail(e)}/>
              <TextField className="contactMethodInput" id="contactInput" label="Phone" variant="standard" required={true} defaultValue={formData.phone} onBlur={(e) => handleChangePhone(e)}/>
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


function DateSelect({formData, setFormData}) {
  return (
    <div className="dateSelect page">
      <h2 className="formSectionHeader">Select an Appointment Date</h2>
      <div className="formSectionBody">
        <div className="calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar/>
          </LocalizationProvider>
        </div>
      </div>    
    </div>
  );
}


function LocationSelect({formData, setFormData}) {
  const handleLocationChange = (e) => {
    var locationSet = new Set(formData.locations);
    if (e.target.checked) {
      locationSet.add(e.target.value);
    } else {
      locationSet.delete(e.target.value);
    }
    setFormData({
      ...formData, 
      locations: locationSet,
    });
  }

  return (
    <div className="locationSelect page">
      <h2 className="formSectionHeader">Select Locations</h2>
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
          <FormControlLabel control={<Checkbox defaultChecked={formData.locations.has("Location 1")}/>} value="Location 1" label="Location 1"/>
          <FormControlLabel control={<Checkbox defaultChecked={formData.locations.has("Location 2")}/>} value="Location 2" label="Location 2"/>
          <FormControlLabel control={<Checkbox defaultChecked={formData.locations.has("Location 3")}/>} value="Location 3" label="Location 3"/>
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
  
  const arrayLocationItems = [];
  formData.locations.forEach((location) => {
    arrayLocationItems.push(<li>{location}</li>);
  });
  
  return (
    <div className="reviewPage page">
      <h2 className="formSectionHeader">Review Appointment Details</h2>
      <div className="appointmentDetailsContainer">
        <h3 className="reviewPage__contactHeader">Contact Details</h3>
        <div className="reviewPage__firstNameContainer appointmentDetailSection">
          <h4 className="reviewPage__firstName">First Name:</h4>
          <p>{formData.firstName}</p>  
        </div>
        <div className="reviewPage__lastNameContainer appointmentDetailSection">
          <h4 className="reviewPage__lastName">Last Name:</h4>
          <p>{formData.lastName}</p>  
        </div>
        <div className="reviewPage__pronounsContainer appointmentDetailSection">
          <h4 className="reviewPage__pronouns">Pronouns:</h4>
          <p>{formData.pronouns}</p>  
        </div>
        <div className="reviewPage__locationsContainer appointmentDetailSection">
          <h4 className="reviewPage_locationsTitle">Locations:</h4>
          <ul>{arrayLocationItems}</ul>
        </div>
      </div>
    </div>
  );
}