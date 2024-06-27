import React from "react";
import { useState } from "react";
import "./GradShootForm.css";
import { Checkbox, TextField } from "@mui/material";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormControlGroup from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


export default function GradShootForm() {
    const numPages = 4;
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        pronouns: "",
        school: "",
        contactMethod: "email",
        email: "",
        phone: null,
        photoPackage: null,
        locations: new Set(),
    });

    const leftButtonText = "Back";    
    const rightButtonText = page === numPages ? "Submit" : "Next";

    /**
      * Page cannot be less than 1 and more than 3 for now
      */
    const changePage = (increment) => {
      if ((increment === -1 && page === 1) || (increment === 1 && page === numPages)){
        return;
      }
      setPage(page+increment);
      console.log(page+increment);
    }

    return (
        <div className="gradShootForm formSection">
            <div className="formSectionContainer">
              {page === 1 && <NameEntry formData={formData} setFormData={setFormData}/>}
              {page === 2 && <PackageSelect formData={formData} setFormData={setFormData}/>}
              {page === 3 && <LocationSelect formData={formData} setFormData={setFormData}/>}
              {page === numPages && <ReviewPage formData={formData} setFormData={setFormData}/>}
            </div>
            <div className="navigationButtons">
              <Button className="bookShootPage__Button back" variant="outlined" onClick={() => changePage(-1)}>{leftButtonText}</Button>
              <Button className="bookShootPage__Button next" variant="contained" onClick={() => changePage(1)}>{rightButtonText}</Button>
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
    <div className="NameEntry">
      <FormControl fullWidth>
        <h2 className="formSectionHeader">Contact Information</h2>
        <TextField id="clientFirstName" label="First Name" variant="standard" required={true} onBlur={(e) => handleChangeFirstName(e)} defaultValue={formData.firstName}/>
        <TextField id="clientLastName" label="Last Name" variant="standard" required={true} onBlur={(e) => handleChangeLastName(e)} defaultValue={formData.lastName}/>
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
          <div className="contactMethodRadioButtonsContainer">
            <FormLabel id="demo-radio-buttons-group-label" required={true}>Contact Method</FormLabel>
            <RadioGroup className="contactRadioButtons" aria-labelledby="demo-radio-buttons-group-label" value={formData.contactMethod} name="controlled-radio-buttons-group" onChange={(e) => handleChangeContactMethod(e)}>
              <FormControlLabel value="email" control={<Radio />} label="Email"/>
              <FormControlLabel value="phone" control={<Radio />} label="Phone"/>
            </RadioGroup>
          </div>
          <TextField className="contactMethodInput" id="contactInput" label="Email" variant="standard" required={true} defaultValue={formData.email} onBlur={(e) => handleChangeEmail(e)}/>
          <TextField className="contactMethodInput" id="contactInput" label="Phone" variant="standard" required={true} defaultValue={formData.phone} onBlur={(e) => handleChangePhone(e)}/>
        </div>
      </FormControl>

      </FormControl>
    </div>
  );
}


function PackageSelect({ formData, setFormData }) {
  return (
    <div className="packageSelect formSection">
      <h2 className="formSectionHeader">Select a Photo Package</h2>
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
    <div className="locationSelect">
      <h2 className="formSectionHeader">Select a Location</h2>
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
  );
}


function ReviewPage({formData, setFormData}) {
  return (
    <div className="reviewPage">
      <h2 className="formSectionHeader">Review Appointment Details</h2>
      <p>{formData.locations.toString()}</p>
    </div>
  );
}