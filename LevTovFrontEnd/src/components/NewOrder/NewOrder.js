import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { yupResolver } from '@hookform/resolvers/yup';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Logo from '../Logo/Logo';
import "../All.css"
import "./NewOrder.css"

const schema = yup.object({
    guestName: yup.string().required('*שם המזמין הוא שדה חובה'),
    guestPhone: yup
        .string()
        .required('*טלפון הוא שדה חובה')
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
        .required('*מספר הלילות הוא שדה חובה')
    ,
    room: yup.string().required('יש לבחור חדר'),
});

const NewOrder = (props) => {

    let { register, handleSubmit, control, formState: { errors }, trigger } = useForm({
        mode: "onBlur", resolver: yupResolver(schema)
    })

    const send = () => {
        alert("הפרטים נשמרו");
    }

    // שלב הנוכחי של הטופס
    const [step, setStep] = React.useState(1);

    // המידע שנשמר בטופס
    const [formData, setFormData] = React.useState({
        guestName: '',
        guestPhone: '',
        guestEmail: '',
        checkInDate: '',
        numOfNights: '',
        room: '',
    });

    // מעבר לשלבים
    const nextStep = async () => {
        const isValid = await trigger(getStepFields(step)); // בודק רק את השדות של השלב הנוכחי
        if (isValid) {
            setStep(step + 1);
        }
    };

    const getStepFields = (step) => {
        switch (step) {
            case 1:
                return ["guestPhone"]; // בשלב 1 נבדוק רק את טלפון
            case 2:
                return ["guestName"]; // בשלב 2 נבדוק רק את שם המזמין
            case 3:
                return ["checkInDate"]; // בשלב 3 נבדוק רק את תאריך ההגעה
            case 4:
                return ["room"]; // בשלב 4 נבדוק רק את החדר
            default:
                return [];
        }
    };

    // חזרה לשלב הקודם
    const prevStep = () => {
        setStep(step - 1);
    };

    //חדרים זמניים
    let rooms = [{ id: 103, status: 1 }, { id: 105, status: 2 }, { id: 108, status: 2 }, { id: 115, status: 3 }, { id: 116, status: 1 }, { id: 117, status: 2 }, { id: 118, status: 4 }, { id: 119, status: 4 }]

    const step1 = (
        <div className='steps'>
            <div className='div-inputs'>
                {/* <TextField className='text-filds' id="guest-phone" type="phone" label="טלפון" variant="outlined" {...register("guestPhone")} /> */}
                <label>טלפון:</label><br />
                <input type='phone' className='text-filds' id="guest-phone"{...register("guestPhone")}></input><br />
                {errors.guestPhone && <p>{errors.guestPhone.message}</p>}
            </div>

            <div id='buttons'>
                <Button onClick={nextStep} variant="outlined" id='next'>הבא</Button>
            </div>
        </div>
    )

    const step2 = (
        <div className='steps'>
            <div className='div-inputs'>
                {/* <TextField className='text-filds' id="guest-name" label="שם המזמין" variant="outlined" {...register("guestName")} /> */}
                <label>שם המזמין:</label><br />
                <input type='phone' className='text-filds' {...register("guestName")}></input><br />
                {errors.guestName && <p>{errors.guestName.message}</p>}
            </div>
            <div id='buttons'>
                <Button onClick={prevStep} variant="outlined" id='prev'>הקודם</Button>
                <Button onClick={nextStep} variant="outlined" id='next'>הבא</Button>
            </div>
        </div>
    )

    const step3 = (
        <div className='steps'>
            <div className='div-inputs'>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                        name="checkInDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                className='text-filds'
                                {...field}
                                renderInput={(params) => <TextField {...params} />}
                            // onChange={changeDate}
                            />
                        )}
                    />
                </LocalizationProvider> */}
                <label>תאריך:</label><br />
                <input type='date' className='text-filds' {...register("checkInDate")}></input><br />
                {errors.checkInDate && <p>{errors.checkInDate.message}</p>}
            </div>
            <div id='buttons'>
                <Button onClick={prevStep} variant="outlined" id='prev'>הקודם</Button>
                <Button onClick={nextStep} variant="outlined" id='next'>הבא</Button>
            </div>
        </div>
    )
    const step4 = (
        <div className='steps'>
            <div className='div-inputs'>
                {/* <FormControl className='text-filds'>
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
                            // disabled={!selectedDate}
                            >
                                {rooms && rooms.length > 0 ? rooms.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.id}</MenuItem>
                                )) : <MenuItem value="">אין חדרים פנויים ביום זה...</MenuItem>}
                            </Select>
                        )}
                    />
                </FormControl> */}
                <label>חדר:</label><br />
                <select className='text-filds' {...register("room")}>
                    {rooms && rooms.length > 0 ? rooms.map((item) => (
                        <option key={item.id} value={item.id}>{item.id}</option>
                    )) : <option value="">אין חדרים פנויים ביום זה...</option>}
                </select>
                {errors.room && <p>{errors.room.message}</p>}
            </div>
            <div id='buttons'>
                <Button onClick={prevStep} variant="outlined" id='prev'>הקודם</Button>
                <Button type='submit' variant="outlined" id='next'>שמירה</Button>
            </div>
        </div>
    )

    // const searchUser = async () => {
    //     let phone=document.getElementById("guest-phone").value;
    //     try {
    //         const response = await fetch(`https://localhost:7279/api/User/get/${phone}`);
    //     }
    //     catch (err) {

    //         console.log("לא התחבר");
            
    //     }
    //     console.log(phone);

    
    // קריאה ל2 ביחד...................
    //onClick={()=>{searchUser();nextStep();}}
        
    // }

    return (
        <div id='new-order-body'>
            <Logo></Logo>
            <Link to="/manager" style={{ textDecoration: 'none' }}>
                <IconButton id='hIcon'>
                    <ArrowBackIosIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </Link>
            <form onSubmit={handleSubmit(send)} id='new-order-form'>

                <h3>הזמנה חדשה</h3>

                {/* <div className='div-inputs'>
                    <TextField className='text-filds' id="guest-email" type="email" label="מייל" variant="outlined"  {...register("guestEmail")} />
                    {errors.guestEmail && <p>{errors.guestEmail.message}</p>}
                </div> */}

                {step === 1 && step1}
                {step === 2 && step2}
                {step === 3 && step3}
                {step === 4 && step4}
            </form>
        </div>
    );
}

export default NewOrder;
