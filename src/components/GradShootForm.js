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
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        school: null,
        contactMethod: "email",
        photoPackage: null,
        locations: null,
    });

    /**
      * Page cannot be less than 1 and more than 3 for now
      */
    const changePage = (increment) => {
      if ((increment === -1 && page === 1) || (increment === 1 && page === 3)){
        return;
      }
      setPage(page+increment);
      console.log(page+increment);
    }

    return (
        <div className="gradShootForm formSection">
            <div className="formFieldContainer">
              {page === 1 && <PackageSelect formData={formData} setFormData={setFormData}/>}
              {page === 2 && <LocationSelect formData={formData} setFormData={setFormData}/>}
            </div>
            <div className="navigationButtons">
              <Button className="bookShootPage__Button back" variant="outlined" onClick={() => changePage(-1)}>Back</Button>
              <Button className="bookShootPage__Button next" variant="contained" onClick={() => changePage(1)}>Next</Button>
            </div>
        </div>
    );
}


function PackageSelect({ formData, setFormData }) {
  return (
    <div className="packageSelect formSection">
      <h2>Select a Photo Package</h2>
      <RadioGroup
        className="photoPackageRadioButtons"
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={null}
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
    var locationSet = new Set(formData["locations"]);
    
    if (e.target.checked) {
      locationSet.add(e.target.value);
    } else {
      locationSet.delete(e.target.value);
    }

    setFormData({
      ...formData, 
      locations: locationSet
    });
  }

  return (
    <div className="locationSelect">
      <h2>Select a Location</h2>
      <FormControl
              className="locationCheckboxes"
              aria-labelledby="location-select-checkbox-group"
              defaultValue={null}
              name="location-select-checkbox-group"
              onChange={(e) => {handleLocationChange(e); console.log(formData)}}
      >
        <FormControlLabel defaultValue="unchecked" control={<Checkbox/>} value="Location 1" label="Location 1"/>
        <FormControlLabel defaultValue="unchecked" control={<Checkbox/>} value="Location 2" label="Location 2"/>
        <FormControlLabel defaultValue="unchecked" control={<Checkbox/>} value="Location 3" label="Location 3"/>
      </FormControl>
    </div>
  );
}
//   return (
//     <div className="clientInputFieldsContainer">
//       <h2>Contact Information</h2>
//       <div className="clientInputFields">
//         <FormControl className="selectDropDown" fullWidth>
//           <InputLabel id="demo-simple-select-label">School</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={school}
//             label="school"
//             onChange={handleSchoolChange}
//           >
//             <MenuItem value={"UC Irvine"}>UC Irvine</MenuItem>
//             <MenuItem value={"UC Los Angeles"}>UC Los Angeles</MenuItem>
//             <MenuItem value={"UC Riverside"}>UC Riverside</MenuItem>
//             <MenuItem value={"UC San Diego"}>UC San Diego</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <TextField
//             id="clientFirstName"
//             label="First Name"
//             variant="standard"
//             required="true"
//           />
//           <TextField
//             id="clientLastName"
//             label="Last Name"
//             variant="standard"
//             required="true"
//           />
//           <TextField
//             id="clientPronouns"
//             label="Pronouns"
//             variant="standard"
//             required="true"
//           />
//         </FormControl>
//         <FormControl fullWidth>
//           <div className="contactContainer">
//             <div className="contactRadioButtonsContainer">
//               <FormLabel id="demo-radio-buttons-group-label">
//                 Preferred Contact Method
//               </FormLabel>
//               <RadioGroup
//                 row="true"
//                 className="contactRadioButtons"
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 defaultValue="email"
//                 name="radio-buttons-group"
//                 onChange={handleContactMethodChange}
//               >
//                 <FormControlLabel
//                   value="email"
//                   control={<Radio />}
//                   label="Email"
//                 />
//                 <FormControlLabel
//                   value="phone"
//                   control={<Radio />}
//                   label="Phone"
//                 />
//               </RadioGroup>
//             </div>

//             {contactMethod === "phone" && (
//               <TextField
//                 id="contactInput"
//                 label="Phone"
//                 variant="standard"
//                 required="true"
//               />
//             )}
//             {contactMethod === "email" && (
//               <TextField
//                 id="contactInput"
//                 label="Email"
//                 variant="standard"
//                 required="true"
//               />
//             )}
//           </div>
//         </FormControl>
//       </div>
//     </div>
//   );
