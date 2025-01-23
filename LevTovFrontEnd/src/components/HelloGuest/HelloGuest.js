
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
    let [dataName, setDataName] = useState(123);
    let [dataRoomNumber, setDataRoomNumber] = useState([]);
    useEffect(() => {
        console.log('dataName:', dataName);
    }, [dataName]);
    
    useEffect(() => {
        console.log('dataRoomNumber:', dataRoomNumber);
    }, [dataRoomNumber]);
    

    async function handleGuestRoomAndGuestUserName() {
        try {
            let response = await fetch(`https://localhost:7279/api/User/get/${phonePosition}`);
            response = await response.json()
            setDataName(response);
            console.log(dataName);
        }

        catch (error) {
            alert(error);
        }

        try {
            let response = await fetch(`https://localhost:7279/api/Order/GetRoomIdByUserId/${phonePosition}`)
            response = await response.json()
            setDataRoomNumber(response);
            console.log(dataRoomNumber);
        }
        catch (error) {
            alert(error);
        }

         console.log(dataName.userId);
         console.log(dataName.userName);
         console.log(dataRoomNumber);
         let stringData="000";
         if(dataRoomNumber.length==0){
            stringData = "אין חדר נא לפנות למנהל";
         }
         else if(dataRoomNumber.length==1){
            stringData = `הנך נמצא בחדר${dataRoomNumber[0].room}`
         }
    }

    return (
        <div id='ello-gust-body'>

            {/* <img id='logoLev' src={LogoLev} alt="Description of the image" /> */}

            <Logo></Logo>
            {/* <logoLev /> */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <IconButton id='hIcon' >
                    <HomeIcon sx={{ fontSize: 60 }} />
                </IconButton>
            </Link>


            <h2 id='hello-title'>
                <div id='name'>  שלום {dataName.userName},
                
                </div> {dataRoomNumber.length > 0 ?`הנך רשום בחדר מס ${dataRoomNumber[0].roomId}`  :'אין חדר זמין ליום זה נא לפנות למנהל'}
            </h2>
            <h3 id='greetingTxt'>אנו מאחלים לך שהות נעימה ומועילה,
                <br /> בתקווה לבשורות טובות.</h3>
            <h3 id='exitTxt'>בעזיבתך את דירת הארוח - נא הקש על יציאה</h3>
            <Button id='exit' variant="contained">יציאה</Button>
        </div>
    );
}

export default HelloGuest;