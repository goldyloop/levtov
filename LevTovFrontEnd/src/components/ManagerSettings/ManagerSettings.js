import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import Logo from "../Logo/Logo";
import "../All.css";
import './ManagerSettings.css'

const ManagerSettings = () => {
    let [action, setAction] = useState(0)
    const changeAction = (act) => {
        if (action != act) {
            setAction(act)
        }
        else setAction(0)
    }
    let action1 = (
        <div id='option-body'>
            <h2 id="action-titel">שינוי סיסמת מנהל קיים</h2>
            <input type="text" placeholder="הכנס את הסיסמה הנוכחית"></input>
        </div>
    )
    let action2 = (
        <div id='option-body'>
            <h2 id="action-titel">הוספת מנהל חדש</h2>
            <input type="text" placeholder="הכנס את הסיסמה הנוכחית"></input>
        </div>
    )
    let action3 = (
        <div id='option-body'>
            <h2 id="action-titel">מחיקת מנהל קיים</h2>
            <input type="text" placeholder="הכנס את הסיסמה הנוכחית"></input>
        </div>
    )
    let action4 = (
        <div id='option-body'>
            <h2 id="action-titel">שינוי סיסמת עובד קיים</h2>
            <input type="text" placeholder="הכנס את הסיסמה הנוכחית"></input>
        </div>
    )
    let action5 = (
        <div id='option-body'>
            <h2 id="action-titel">הוספת עובד חדש</h2>
            <input type="text" placeholder="הכנס את הסיסמה הנוכחית"></input>
        </div>
    )
    let action6 = (
        <div id='option-body'>
            <h2 id="action-titel">מחיקת עובד קיים</h2>
            <input type="text" placeholder="הכנס את הסיסמה הנוכחית"></input>
        </div>
    )
    return (
        <div id="manager-settings-body">
            <Logo></Logo>
            <Link to="/manager" style={{ textDecoration: 'none' }}>
                <IconButton id='hIcon'>
                    <ArrowBackIosIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </Link>
            <h1 id="settings-title">אפשרויות נוספות</h1>
            <div id="options-and-option">
                {/* <div id="all-options"> */}
                <input type="button" className="options" value="שינוי סיסמת מנהל קיים" onClick={() => { changeAction(1) }}></input>
                {action === 1 && action1}
                <input type="button" className="options" value='הוספת מנהל' onClick={() => { changeAction(2) }}></input>
                {action === 2 && action2}
                <input type="button" className="options" value='מחיקת מנהל' onClick={() => { changeAction(3) }}></input>
                {action === 3 && action3}
                <input type="button" className="options" value='שינוי סיסמת עובד תחזוקה קיים' onClick={() => { changeAction(4) }}></input>
                {action === 4 && action4}
                <input type="button" className="options" value='הוספת עובד תחזוקה' onClick={() => { changeAction(5) }}></input>
                {action === 5 && action5}
                <input type="button" className="options" value='מחיקת עובד תחזוקה' onClick={() => { changeAction(6) }}></input>
                {action === 6 && action6}
                {/* </div> */}

            </div>
        </div>
    );
}

export default ManagerSettings;