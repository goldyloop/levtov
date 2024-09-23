import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import LogoLev from '../LogoLev.png';
import "../All.css"
import "./NewOrder.css"



const schema = yup.object({
    guestName: yup.string().required('שם המזמין הוא שדה חובה'),
    guestPhone: yup
        .string()
        .required('טלפון הוא שדה חובה')
        .matches(/^\d{10}$/, 'טלפון חייב להיות 10 ספרות'), // ניתן לשנות לפי הפורמט הנדרש
    guestEmail: yup
        .string()
        .email('מייל לא תקין')
    // .required('מייל הוא שדה חובה')
    ,
    checkInDate: yup.date().typeError("הכנס תאריך תקין").required('יש לבחור תאריך'),
    numOfNights: yup
        .number().typeError("הכנס מספר לילות")
        .min(1, 'מספר הלילות חייב להיות לפחות 1')
    // .required('מספר הלילות הוא שדה חובה')
    ,
    room: yup.string().required('יש לבחור חדר'),
});



const NewOrder = (props) => {

    let { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit", resolver: yupResolver(schema)
    })

    const send = (data) => {
        alert("הפרטים נשמרו")
    }

    const [room, setRoom] = React.useState('');

    const handleChange = (event) => {
        setRoom(event.target.value);
    };


    return (
        <div id='new-order-body'>
            <div>
                <img id='logoLev' src={LogoLev} alt="Description of the image" />
            </div>
            <form onSubmit={handleSubmit(send)} id='new-order-form'>

                <h1>הזמנה חדשה</h1>

                <div className='div-inputs'>
                    <TextField className='text-filds' id="guest-name" label="שם המזמין" variant="outlined" {...register("guestName")} />
                    {errors.guestName && <p>{errors.guestName.message}</p>}
                </div>

                <div className='div-inputs'>
                    <TextField className='text-filds' id="guest-phone" type="phone" label="טלפון" variant="outlined" {...register("guestPhone")} />
                    {errors.guestPhone && <p>{errors.guestPhone.message}</p>}
                </div>

                <div className='div-inputs'>
                    <TextField className='text-filds' id="guest-email" type="email" label="מייל" variant="outlined"  {...register("guestEmail")} />
                    {errors.guestEmail && <p>{errors.guestEmail.message}</p>}
                </div>

                <div className='div-inputs'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker className='text-filds' variant="outlined" {...register("checkInDate")}/>
                    </LocalizationProvider>
                    {errors.checkInDate && <p>{errors.checkInDate.message}</p>}
                </div>

                <div className='div-inputs'>
                    <TextField className='text-filds' type="number" defaultValue="2" label="מספר הלילות" variant="outlined"  {...register("numOfNights")} />
                    {errors.numOfNights && <p>{errors.numOfNights.message}</p>}
                </div>

                <div className='div-inputs'>
                    <FormControl className='text-filds' >
                        <InputLabel id="demo-simple-select-helper-label">חדר </InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            // id="demo-simple-select-helper"
                            value={room}
                            label="חדר "
                            onChange={handleChange}
                            variant="outlined"
                            {...register("room")}
                        >
                            {props.arr && props.arr != [] ? props.arr.map((item) => (
                                <MenuItem value={item}> {item.number}</MenuItem>
                            )) : 'אין חדרים פנויים ביום זה...'}
                        </Select>
                        {errors.room && <p>{errors.room.message}</p>}
                    </FormControl>
                </div>
                <Button type='submit' variant="contained" id='submit'>צור הזמנה</Button>
            </form>
        </div>
    );
}

export default NewOrder;