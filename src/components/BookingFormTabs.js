import React from "react";
import { useState } from "react";

import "./BookingFormTabs.css";

import { TextField } from "@mui/material";
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

export default function BookingFormTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="bookingFormTabs">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={setValue}>
            <Tab label="Graduation" value={0} />
            <Tab label="Weddings/Events" value={1} />
          </Tabs>
        </Box>
      </Box>
      ;
    </div>
  );
}

function GradShootForm() {
  const [school, setSchool] = useState();
  const [contactMethod, setContactMethod] = useState("email");

  const handleSchoolChange = (event) => {
    setSchool(event.target.value);
  };

  const handleContactMethodChange = (event) => {
    setContactMethod(event.target.value);
  };
  return (
    <div className="clientInputFieldsContainer">
      <h2>Contact Information</h2>
      <div className="clientInputFields">
        <FormControl fullWidth>
          <TextField
            id="clientFirstName"
            label="First Name"
            variant="standard"
            required="true"
          />
          <TextField
            id="clientLastName"
            label="Last Name"
            variant="standard"
            required="true"
          />
          <TextField
            id="clientPronouns"
            label="Pronouns"
            variant="standard"
            required="true"
          />
        </FormControl>
        <FormControl fullWidth>
          <div className="contactContainer">
            <div className="contactRadioButtonsContainer">
              <FormLabel id="demo-radio-buttons-group-label">
                Preferred Contact Method
              </FormLabel>
              <RadioGroup
                row="true"
                className="contactRadioButtons"
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="email"
                name="radio-buttons-group"
                onChange={handleContactMethodChange}
              >
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
                <FormControlLabel
                  value="phone"
                  control={<Radio />}
                  label="Phone"
                />
              </RadioGroup>
            </div>

            {contactMethod === "phone" && (
              <TextField
                id="contactInput"
                label="Phone"
                variant="standard"
                required="true"
              />
            )}
            {contactMethod === "email" && (
              <TextField
                id="contactInput"
                label="Email"
                variant="standard"
                required="true"
              />
            )}
          </div>
        </FormControl>
        <FormControl className="selectDropDown" fullWidth>
          <InputLabel id="demo-simple-select-label">School</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={school}
            label="school"
            onChange={handleSchoolChange}
          >
            <MenuItem value={"UC Irvine"}>UC Irvine</MenuItem>
            <MenuItem value={"UC Los Angeles"}>UC Los Angeles</MenuItem>
            <MenuItem value={"UC Riverside"}>UC Riverside</MenuItem>
            <MenuItem value={"UC San Diego"}>UC San Diego</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

function WeddingsAndEventsForm() {}
