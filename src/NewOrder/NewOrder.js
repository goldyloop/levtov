import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import "./NewOrder.css"
import LogoLev from '../LogoLev.png';


const NewOrder = (props) => {

    const [room, setRoom] = React.useState('');

    const handleChange = (event) => {
        setRoom(event.target.value);
    };


    return (
        <div id='new-order-body'>
            <div>
                <img id='logoLev' src={LogoLev} alt="Description of the image" />
            </div>
            <div id='new-order-form'>

                <h1>הזמנה חדשה</h1>

                <div className='div-inputs'>
                    <TextField className='text-filds' id="guest-name" label="שם המזמין" />
                </div>

                <div className='div-inputs'>
                    <TextField className='text-filds' required id="guest-phone" type="phone" label="טלפון" />
                </div>

                <div className='div-inputs'>
                    <TextField className='text-filds' id="guest-email" type="email" label="מייל" />
                </div>

                <div className='div-inputs'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker className='text-filds' />
                    </LocalizationProvider>
                </div>

                <div className='div-inputs'>
                    <TextField className='text-filds' type="number" defaultValue="2" id="num-of-days" label="מספר הלילות" />
                </div>

                <div className='div-inputs'>
                    <FormControl className='text-filds'>
                        <InputLabel id="demo-simple-select-helper-label">חדר </InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={room}
                            label="חדר "
                            onChange={handleChange}
                        >
                            {props.arr && props.arr != [] ? props.arr.map((item) => (
                                <MenuItem value={item}> {item}</MenuItem>
                            )) : 'אין חדרים פנויים ביום זה...'}
                        </Select>
                    </FormControl>
                </div>
                <Button variant="contained" id='submit'>צור הזמנה</Button>
            </div>
        </div>
    );
}

export default NewOrder;