import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
//import LogoLev from '../LogoLev.png';
import Logo from '../Logo/Logo';
// import "../All.css"
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
    checkInDate: yup.date()
        .typeError("הכנס תאריך תקין")
        .required('יש לבחור תאריך')
        .min(new Date(), 'התאריך שבחרת כבר עבר'), // תאריך לא יכול להיות בעבר,
    numOfNights: yup
        .number().typeError("הכנס מספר לילות")
        .min(1, 'מספר הלילות חייב להיות לפחות 1')
        .required('מספר הלילות הוא שדה חובה')
    ,
    room: yup.string().required('יש לבחור חדר'),
});

const NewOrder = (props) => {

    let { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: "onBlur", resolver: yupResolver(schema)
    })

    const send = (data) => {
        alert("הפרטים נשמרו");
    }



    const [room, setRoom] = React.useState('');

    // const handleChange = (event) => {
    //     setRoom(event.target.value);
    // };

    return (
        <div id='new-order-body'>
            <Logo></Logo>
            <Link to="/manager" style={{ textDecoration: 'none' }}>
                <IconButton id='hIcon'>
                    <ArrowBackIosIcon sx={{ fontSize: 60 }} />
                </IconButton>
            </Link>
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                            name="checkInDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    className='text-filds'
                                    {...field}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    {errors.checkInDate && <p>{errors.checkInDate.message}</p>}
                </div>

                <div className='div-inputs'>
                    <TextField className='text-filds' type="number" defaultValue="2" label="מספר הלילות" variant="outlined"  {...register("numOfNights")} />
                    {errors.numOfNights && <p>{errors.numOfNights.message}</p>}
                </div>

                {/* <div className='div-inputs'>
                    <FormControl className='text-filds' >
                        <InputLabel id="demo-simple-select-helper-label">חדר </InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            // id="demo-simple-select-helper"
                            value={room}
                            label="חדר "
                            onChange={handleChange}
                        // required
                        // variant="outlined"
                        >
                            {props.arr && props.arr != [] ? props.arr.map((item) => (
                                <MenuItem value={item}> {item}</MenuItem>
                            )) : 'אין חדרים פנויים ביום זה...'}
                        </Select>
                        {errors.room && <p>{errors.room.message}</p>}
                    </FormControl>
                </div> */}
                <div className='div-inputs'>
                    <FormControl className='text-filds'>
                        <InputLabel id="room-select-label">חדר</InputLabel>
                        <Controller
                            name="room"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    labelId="room-select-label"
                                    value={field.value || ''}
                                    label="חדר"
                                    onChange={field.onChange}
                                >
                                    {props.arr && props.arr.length > 0 ? props.arr.map((item) => (
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    )) : <MenuItem value="">אין חדרים פנויים ביום זה...</MenuItem>}
                                </Select>
                            )}
                        />
                        {errors.room && <p>{errors.room.message}</p>}
                    </FormControl>
                </div>
                <Button type='submit' variant="contained" id='submit'>צור הזמנה</Button>
            </form>
        </div>
    );
}

export default NewOrder;