import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import LogoLev from '../LogoLev.png';
import '../All.css';
import './Management.css';



const Management = () => {
    return (<div>

        <img id='logoLev' src={LogoLev} alt="Description of the image" />
        <IconButton id='hIcon' >
            <HomeIcon sx={{ fontSize: 60 }} />
        </IconButton>
        <div id='allButtons'>
            <Link to="/newOrder" style={{ textDecoration: 'none' }}>
                <Button id='bu' className='button' variant="contained">להזמנה חדשה</Button>
            </Link>
            <Link to="/allOrders" style={{ textDecoration: 'none' }}>
                <Button id='bu' className='button' variant="contained">לכל ההזמנות</Button>
            </Link>
            <Link to="/roomsMap" style={{ textDecoration: 'none' }}>
                <Button id='bu' className='button' variant="contained">למפת איכלוס חדרים</Button>
            </Link>


        </div>
    </div>);
}

export default Management;