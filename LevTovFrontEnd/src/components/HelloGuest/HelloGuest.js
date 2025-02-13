
// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
//import LogoLev from '../LogoLev.png';
import Logo from '../Logo/Logo';
import '../All.css';
import './HelloGuest.css';
import { useSelector } from 'react-redux';//redux
import Swal from 'sweetalert2';


const HelloGuest = (props) => {

    const phonePosition = useSelector((state) => state.currentPhone.phonePosition);//redux
    const userPosition = useSelector((state) => state.currentUser.userPosition);//redux

    //redux
    useEffect(() => {
        console.log('User Position:', userPosition);
    }, [userPosition]);
    useEffect(() => {
        console.log('phone Position:', phonePosition);
    }, [phonePosition]);



    useEffect(() => {
        handleGuestRoomAndGuestUserName()
    }, []);

    let [userData, setUserData] = useState({});
    let [orderByPhonPosition, setOrderByPhonPosition] = useState();
    let [eemail, setEmail] = useState('');
    let [errorMesage, setErrorMesage] = useState('');
    let [iinput, setIinput] = useState(true);
    let [orderIsForToday, setOrderIsForToday] = useState(false);
    // let [room, setRoom] = useState([{}]);

    useEffect(() => {
        console.log('userData:', userData);
    }, [userData]);

    // useEffect(() => {
    //     changeStatus(1);
    // }, [orderByPhonPosition]);
    useEffect(() => {
        if(orderIsForToday)
            changeStatus(1);
    }, [orderIsForToday]);

    const handleChange = (event) => {
        setEmail(event.target.value);
        setErrorMesage(checkEmail(eemail));
        // console.log("הערך של ה-input הוא:", email);
    };

    async function handleClick() {
        // כאן את יכולה לגשת לערך של inputValue
        if (errorMesage == true) {
            const updatedData = { ...userData, email: eemail };
            try {
                console.log(eemail);
                console.log('נתוני העדכון:', updatedData);
                let response = await fetch(`https://localhost:7279/api/User/update/${phonePosition}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData)
                })
                console.log(response);
                if (response.ok) {
                    const result = await response.json();
                    // props.updateRoomStatus(result)
                    console.log('המייל עודכן בהצלחה', result);
                    setIinput(false);
                }
                else {
                    console.error('שגיאה בעדכון המייל');
                }
            }
            catch (error) {
                console.error("שגיאה בשרת" + error)
            }
        }
    };
    function checkEmail(email) {
        // בדיקת פורמט בסיסי
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return "פורמט אימייל לא תקין";
        }

        // בדיקת אורך
        if (email.length < 5 || email.length > 254) {
            return "אורך אימייל לא תקין";
        }

        // בדיקת דומיין (כדאי להוסיף בדיקה כזו)
        const domain = email.split('@')[1];
        if (!isDomainValid(domain)) {
            return "דומיין לא תקין";
        }
        return true;
        function isDomainValid(domain) {
            // כאן אפשר להוסיף בדיקות לדומיין (למשל, בדיקת קיום)
            return true; // דוגמה - החזר true
        }
    }

    async function handleGuestRoomAndGuestUserName() {
        try {
            let response = await fetch(`https://localhost:7279/api/User/get/${phonePosition}`);
            response = await response.json()
            setUserData(response);
            console.log(userData);
        }

        catch (error) {
            alert(error);
        }

        try {
            let response = await fetch(`https://localhost:7279/api/Order/GetRoomIdByUserIdAndForToday/${phonePosition}`)
            if (response.ok) {
                response = await response.json()
                setOrderByPhonPosition(response);
                console.log(orderByPhonPosition);
                setOrderIsForToday(true);
            }
        }
        catch (error) {
            alert(error);
        }
        console.log(userData.userId);
        console.log(userData.userName);
        console.log(orderByPhonPosition);

        changeStatus(1);
    }

    const changeStatus = async (statusNumber) => {
        if (orderIsForToday == true) {
            const newRoom = {
                roomId: orderByPhonPosition.roomId,
                roomStatus: statusNumber
            }
            // console.log("roommmmm", room);
            try {
                let response = await fetch(`https://localhost:7279/api/Room/update/${orderByPhonPosition.roomId}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newRoom)
                })
                // console.log('response', response);
                if (response.ok) {
                    const result = await response.json();
                    //  updateRoomStatus(result)
                    console.log('החדר עודכן בהצלחה', result);
                }
                else {
                    console.error('שגיאה בעדכון החדר');
                }

            } catch (err) {
                console.error("שגיאה בשרת" + err)
            }
        }
    };
    const handelExit = async (r) => {
        Swal.fire({
            title: "האם אתם בטוחים שברצונכם לצאת?",
            text: "שימו לב לא תוכלו להכנס שנית",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "ביטול",
            confirmButtonColor: "#09e914",
            cancelButtonColor: "#d33",
            confirmButtonText: "כן, ברצוני לצאת"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "יציאה",
                    text: "צאתכם לשלום",
                    icon: "success"
                });
                changeStatus(2);
            }
        });
    }
    return (
        <div id='hello-gust-body'>




            <Logo></Logo>

            {/* <logoLev /> */}

            <Link to="/" style={{ textDecoration: 'none' }}>
                <IconButton id='hIcon' >
                    <HomeIcon sx={{ fontSize: 60 }} />
                </IconButton>
            </Link>


            <h2 id='hello-title'>
                <div id='name'>  שלום {userData.userName},

                </div>
            </h2>
            {

            }
            {orderByPhonPosition ? <> <h2>הנך בחדר מס {orderByPhonPosition.roomId}</h2>
                <h3 id='greetingTxt'>אנו מאחלים לך שהות נעימה ומועילה,
                    <br /> בתקווה לבשורות טובות.</h3>
                {iinput && (
                    <>  <h3>נשמח אם תשאירו לנו את המייל שלכם       <input
                        type="email"
                        value={eemail}
                        onChange={handleChange}
                        placeholder="הכנס ערך"
                    /></h3>
                        <span>{errorMesage}</span>
                        <input type="Button" value="הוסף למערכת" onClick={handleClick} />

                    </>)}

                <h3 id='exitTxt'>בעזיבתך את דירת הארוח - נא הקש על יציאה</h3>
                <Button id='exit' variant="contained" onClick={() => { handelExit(orderByPhonPosition.roomId) }}>יציאה</Button>
            </>
                : <h2>אין לכם חדר מוזמן להיום</h2>}
        </div>
    );
}

export default HelloGuest;