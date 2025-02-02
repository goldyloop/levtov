import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
//import LogoLev from '../../LogoLev.png';
// import HomeButton from '../BackButtons/HomeButton.js';
import Logo from '../Logo/Logo';
import '../All.css';
import './Management.css';



const Management = () => {
    return (
        <div id='managment-body'>
            <Logo></Logo>
            {/* <HomeButton></HomeButton> */}
            {/* <img id='logoLev' src={LogoLev} alt="Description of the image" /> */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <IconButton id='hIcon' >
                    <HomeIcon sx={{ fontSize: 60 }} />
                </IconButton>
            </Link>
            <div id='allButtons'>
                <Link id='links' to="/newOrder" style={{ textDecoration: 'none' }}>
                    <Button id='bu' className='button' variant="contained">להזמנה חדשה</Button>
                </Link>
                <Link id='links' to="/allOrders" style={{ textDecoration: 'none' }}>
                    <Button id='bu' className='button' variant="contained">לכל ההזמנות</Button>
                </Link>
                <Link id='links' to="/roomsMap" style={{ textDecoration: 'none' }}>
                    <Button id='bu' className='button' variant="contained">למפת איכלוס חדרים</Button>
                </Link>
                <Link id='links' to="/managerSettings" style={{ textDecoration: 'none' }}>
                    <Button id='bu' className='button' variant="contained">הגדרות נוספות</Button>
                </Link>

            </div>
        </div>);
}

export default Management;