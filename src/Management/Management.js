import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
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
        <Button id='bu' className='button'  variant="contained">להזמנה חדשה</Button>
            <Button id='bu' className='button'  variant="contained">לכל ההזמנות</Button>
            <Button id='bu' className='button'  variant="contained">למפת איכלוס חדרים</Button>
    
        </div>
    </div>);
}

export default Management;