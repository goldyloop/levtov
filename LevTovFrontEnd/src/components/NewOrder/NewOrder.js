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
import { format } from 'date-fns';
import Swal from 'sweetalert2'
import Logo from '../Logo/Logo';
import "../All.css"
import "./NewOrder.css"
import { DateTimeField } from '@mui/x-date-pickers';

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
        .test('min-today', 'התאריך שבחרת כבר עבר', value => {
            return value >= new Date().setHours(0, 0, 0, 0); // מוודא שהתאריך הוא היום או עתידי
        }),
    numOfNights: yup
        .number().typeError("הכנס מספר לילות")
        .min(1, 'מספר הלילות חייב להיות לפחות 1')
        .required('*מספר הלילות הוא שדה חובה')
    ,
    room: yup.number().required('יש לבחור חדר'),
});

const NewOrder = (props) => {

    const { register, handleSubmit, control, setValue, formState: { errors }, trigger, getValues } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    // שלב הנוכחי של הטופס
    const [step, setStep] = React.useState(1);
    // let rooms = [{ id: 103, status: 1 }, { id: 105, status: 2 }, { id: 108, status: 2 }, { id: 115, status: 3 }, { id: 116, status: 1 }, { id: 117, status: 2 }, { id: 118, status: 4 }, { id: 119, status: 4 }]

    let [rooms, setRooms] = React.useState([]);
    let [userName, setUserName] = React.useState('');
    let [userPosition, setUserPosition] = React.useState(3);

    // React.useEffect(()=>{
    //     // console.log("userPosition,,,,,,,,,,,,", userPosition);
    //     nextStep()
    // },userPosition)

    // המידע שנשמר בטופס
    const [formData, setFormData] = React.useState({
        guestName: '',
        guestPhone: '',
        guestEmail: '',
        checkInDate: '',
        numOfNights: '',
        room: null,
    });

    // מעבר לשלבים
    const nextStep = async () => {
        const isValid = await trigger(getStepFields(step)); // בודק רק את השדות של השלב הנוכחי
        console.log("possssssssss", userPosition);
        if (step === 2) {
            if (isValid && userPosition === 3) {
                setStep(step + 1)
            }
        }
        else if (isValid) {
            setStep(step + 1);
        }
    };

    const getStepFields = (step) => {
        switch (step) {
            case 1:
                return ["guestPhone"]; // בשלב 1 נבדוק רק את טלפון
            case 2: {
                if (userName) {
                    return []
                }
                return ["guestName"]; // בשלב 2 נבדוק רק את שם המזמין
            }
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



    const send = async () => {
        // alert("הפרטים נשמרו");

        // קבלת הערכים ישירות מהטופס
        const formValues = getValues();
        // עדכון ה-formData עם הערכים החדשים
        setFormData((prevData) => ({
            ...prevData,
            guestName: userName == '' ? formValues.guestName : userName,
            guestPhone: formValues.guestPhone,
            // guestEmail: formValues.guestEmail,
            checkInDate: formValues.checkInDate,
            // numOfNights: formValues.numOfNights,
            room: formValues.room,
        }));
    }
    // שימוש ב-useEffect שיתבצע לאחר ש- formData יתעדכן
    React.useEffect(() => {
        if (formData.guestName && formData.guestPhone && formData.checkInDate && formData.room) {
            // אם כל הנתונים בטופס זמינים, נבצע את הפונקציות האסינכרוניות
            const performAsyncTasks = async () => {
                // קודם נבדוק אם המשתמש חדש או קיים
                if (userName === '') {
                    await createNewUser(); // אם המשתמש חדש, ניצור אותו
                    await createNewOrder();
                }
                else {
                    await createNewOrder(); // בשני המקרים, ניצור את ההזמנה
                }
            };

            Swal.fire({
                title: "פרטי ההזמנה נכונים?",
                // text: "You won't be able to revert this!",
                html: `<b>שם המזמין:</b> ${formData.guestName}</br>
                <b>מספר טלפון:</b> ${formData.guestPhone}</br>
                <b>תאריך:</b> ${format(new Date(formData.checkInDate), 'dd/MM/yyyy')}</br>
                <b>מספר חדר:</b> ${formData.room}`,
                // icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3a9633",
                cancelButtonColor: "#d33",
                confirmButtonText: "כן, שמור הזמנה",
                cancelButtonText: "ביטול"
            }).then((result) => {
                if (result.isConfirmed) {
                    performAsyncTasks();
                }
            });
            // קריאה לפונקציה האסינכרונית
        }
    }, [formData]); // effect יתבצע כאשר formData יתעדכן

    const createNewOrder = async () => {
        const newOrder = {
            "userId": formData.guestPhone,
            "userName": formData.guestName,
            "orderDate": formData.checkInDate,
            "roomId": formData.room
        }
        try {
            let response = await fetch('https://localhost:7279/api/Order/create', {
                method: 'POST', // סוג הקריאה
                headers: {
                    'Content-Type': 'application/json', // מגדירים שהנתונים שנשלחים הם בפורמט JSON
                },
                body: JSON.stringify(newOrder),
                // המרת הנתונים לפורמט JSON לפני השליחה
            }
            );
            if (!response.ok) {
                Swal.fire({
                    title: "תקלה בשמירת ההזמנה...",
                    text: "נסה שוב מאוחר יותר",
                    icon: "error"
                }).then(() => {
                    return;
                });
            }
            Swal.fire({
                title: "ההזמנה נוצרה",
                // text: "Your file has been deleted.",
                icon: "success",
                timer: 1700,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'http://localhost:3000/manager';
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    const createNewUser = async () => {
        const newUser = {
            "userId": formData.guestPhone,
            "userName": formData.guestName,
            "position": 3
        }
        try {
            const response = await fetch('https://localhost:7279/api/User/create', {
                method: 'POST', // סוג הקריאה
                headers: {
                    'Content-Type': 'application/json', // מגדירים שהנתונים שנשלחים הם בפורמט JSON
                },
                body: JSON.stringify(newUser), // המרת הנתונים לפורמט JSON לפני השליחה
            });
            if (!(response.ok)) {
                // alert("תקלה בשמירת המשתמש")
                return;
            }
            const result = await response.json()
            // alert("result.userName", result.userName)
        }
        catch (err) {
            console.error(err);
        }
    }

    const searchUser = async () => {
        console.log("נכנס לפונקציה חיפוש משתמש");
        let phone = document.getElementById("guest-phone").value;
        // let phone = userId;
        let user;
        try {
            const response = await fetch(`https://localhost:7279/api/User/get/${phone}`)
            if (response.status === 200) {
                user = await response.json()
                setUserPosition(user.position)
                setUserName(user.userName);
                console.log("jjjjjj", user.position);
            }
            else if (response.status === 204) {
                setUserPosition(3);
                setUserName('');
            }
        }
        catch (err) {
            console.log("לא התחבר");
        }

    }

    const step1 = (
        <div className='steps'>
            <div className='div-inputs'>
                {/* <TextField className='text-filds' id="guest-phone" type="phone" label="טלפון" variant="outlined" {...register("guestPhone")} /> */}
                <label>טלפון:</label><br />
                <input
                    type='phone'
                    // value={formData.guestPhone}
                    className='text-filds'
                    id="guest-phone"
                    // onChange={(e) => { setFormData((prevData) => ({ ...prevData, ["guestPhone"]: e.target.value })) }}
                    onChange={(e) => setValue("guestPhone", e.target.value)}  // עדכון הסטייט של react-hook-form
                    {...register("guestPhone")}>
                </input>
                <br />
                {errors.guestPhone && <p>{errors.guestPhone.message}</p>}
                {/* {(userPosition === 1 || userPosition === 2) && <p>אי אפשר להזמין על שם מנהל או עובד</p>} */}
            </div>

            <div id='buttons'>
                <Button
                    // onClick={searchUser}
                    onClick={async () => {
                        await searchUser();
                        console.log("99999");
                        nextStep();
                    }}
                    variant="outlined"
                    id='next'
                >
                    הבא
                </Button>
            </div>
        </div>
    )

    const step2 = (
        <div className='steps'>
            {!userName ? (
                <div className='div-inputs'>
                    {/* <TextField className='text-filds' id="guest-name" label="שם המזמין" variant="outlined" {...register("guestName")} /> */}
                    <label>שם המזמין:</label><br />
                    <input
                        type='text'
                        // value={formData.guestName}
                        className='text-filds'
                        id="guest-name"
                        // onChange={(e) => { setFormData((prevData) => ({ ...prevData, ["guestName"]: e.target.value })) }}
                        onChange={(e) => setValue("guestName", e.target.value)}
                        {...register("guestName")}></input><br />
                    {errors.guestName && <p>{errors.guestName.message}</p>}
                </div>
            ) : (userPosition === 3 ? (<div id='existing-user'>
                <label>המזמין נמצא במערכת</label>
                <label>שם המזמין: {userName}</label>
                <span>המשך למלא את שאר פרטי ההזמנה</span>
            </div>
            ) : (
                <h2 id='error-user-position'>אי אפשר ליצור הזמנה על שם מנהל או עובד</h2>
            ))
            }
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
                <input
                    type='date'
                    id="order-date"
                    className='text-filds'
                    // value={formData.checkInDate}
                    // onChange={(e) => { setFormData((prevData) => ({ ...prevData, ["checkInDate"]: e.target.value })) }}
                    // onChange={(e) => { setDate(e.target) }}
                    {...register("checkInDate")}></input><br
                />
                {errors.checkInDate && <p>{errors.checkInDate.message}</p>}
            </div>
            <div id='buttons'>
                <Button onClick={prevStep} variant="outlined" id='prev'>הקודם</Button>
                <Button onClick={async () => { await getEmptyRoomsToDate(); nextStep(); }} variant="outlined" id='next'>הבא</Button>
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
                <select
                    id='room'
                    className='text-filds'
                    {...register("room")}
                    // onChange={(e) => { console.log("e.target.value",e.target.value);setFormData((prevData) => ({ ...prevData, ["room"]: e.target.value })) }}
                    onChange={(e) => { console.log("e.target.value", e.target.value); setValue("room", e.target.value) }}
                >
                    {rooms && rooms.length > 0 ? rooms.map((item) => (
                        <option key={item.roomId} value={item.roomId}>{item.roomId}</option>
                    )) : <option value="">אין חדרים פנויים ביום זה...</option>}
                </select>
                {errors.room && <p>{errors.room.message}</p>}
            </div>
            <div id='buttons'>
                <Button onClick={prevStep} variant="outlined" id='prev'>הקודם</Button>
                <Button onClick={send} type='submit' variant="outlined" id='next'>שמירה</Button>
            </div>
        </div>
    )

    const getEmptyRoomsToDate = async () => {
        // alert("נכנס!!!!!!!!")
        let d = document.getElementById("order-date").value
        // setDate(d)
        // console.log("date", date);

        try {
            let response = await fetch(`https://localhost:7279/api/Room/getEmptyRoomTo/${d}T00:00:00Z`)
            if (!response) {
                console.error("לא הצליח להביא את הנתונים מהשרת");
                return;
            }
            response = await response.json()
            setRooms(response);
            console.log(rooms);

        }
        catch (err) {
            console.error("שגיאה בהתחברות לשרת", err);
        }
    }

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
