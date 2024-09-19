import './HelloGuest.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import LogoLev from '../LogoLev.png';

import '../All.css';

const HelloGuest = (props) => {
    return (
        <div id='hello-Gust'>
        <div id='body'>
            <img id='logoLev' src={LogoLev} alt="Description of the image" />


            <logoLev />
            <IconButton id='hIcon' >
                <HomeIcon sx={{ fontSize: 60 }} />
            </IconButton>

            <h2 >
                <div id='name'>  שלום {props.name},
                </div>הנך רשום בחדר מספר {props.roomNumber}
            </h2>
            <h3 id='greetingTxt'>אנו מאחלים לך שהות נעימה ומועילה,
                <br /> בתקווה לבשורות טובות.</h3>
            <h3 id='exitTxt'>בעזיבתך את דירת הארוח - נא הקש על יציאה</h3>
            <Button id='exit' variant="contained">יציאה</Button>
        </div>
    );
}

export default HelloGuest;