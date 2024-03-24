import React from "react";
import "./BookGradShootPage.css";
import { useNavigate } from "react-router-dom";
import { Button, TextField, } from "@mui/material";
import { useState } from "react";
// import {  } from "@mui/base";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function BookGradShootPage() {
    const [school, setSchool] = useState();

    const navigate = useNavigate();

    const handleSchoolChange = (event) => {
        setSchool(event.target.value);
    };

    return (
        <div className="bookGradShootPage">
            <div className="pageTitleContainer">
                <h1 className="pageTitle">Book a Grad Shoot</h1>
            </div>
            <div className="clientInputFields">
                <TextField id="clientFirstName" label="First Name" variant="standard" />
                <TextField id="clientLastName" label="Last Name" variant="standard" />
                <Box className="clientSchool" sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>

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
                </Box>
            </div>

            <div className="landingPage__bookButtonContainer" onClick={(() => navigate("/"))}>
                <Button className="bookShootPage__homeButton" variant="contained">Back to Home</Button>
            </div>
        </div>
    );
}

export default BookGradShootPage;