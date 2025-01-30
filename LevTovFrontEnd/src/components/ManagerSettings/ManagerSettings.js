import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import { UpdateManagerOrWorker, AddNewManager, DeleteExistingManager, UsersTable } from './Actions'
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
                <div
                    className='option-body'
                    id={action === 1 && "selected-option-body"}
                >
                    {/* {action === 1 ? <ExpandLessIcon /> : <ExpandMoreIcon />} */}
                    {/* <IconButton>
                        {action === 1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton> */}
                    <button
                        id={action === 1 && "selected-option"}
                        className="options"
                        onClick={() => { changeAction(1) }}>

                        שינוי סיסמת מנהל / עובד קיים
                    </button>
                    {action === 1 && <UpdateManagerOrWorker />}
                </div>
                <div
                    className='option-body'
                    id={action === 2 && "selected-option-body"}
                >
                    <button
                        id={action === 2 && "selected-option"}
                        className="options"
                        onClick={() => { changeAction(2) }}>
                        הוספת מנהל / עובד
                    </button>
                    {action === 2 && <AddNewManager />}
                </div>
                <div
                    className='option-body'
                    id={action === 3 && "selected-option-body"}
                >
                    <button
                        id={action === 3 && "selected-option"}
                        className="options"
                        onClick={() => { changeAction(3) }}>
                        מחיקת מנהל / עובד
                    </button>
                    {action === 3 && <DeleteExistingManager />}
                </div>
                <div
                    className='option-body'
                    id={action === 4 && "selected-option-body"}
                >
                    <button
                        id={action === 4 && "selected-option"}
                        className="options"
                        onClick={() => { changeAction(4) }}>
                        פרטי עובדים ומנהלים
                    </button>
                    {action === 4 && <UsersTable />}
                </div>
                {/* <button
                    id={action === 1 && "selected-option"}
                    className="options"
                    onClick={() => { changeAction(1) }}>
                    שינוי סיסמת מנהל / עובד קיים
                </button>
                {action === 1 && <UpdateManagerOrWorker />}
                <button
                    id={action === 2 && "selected-option"}
                    className="options"
                    onClick={() => { changeAction(2) }}>
                    הוספת מנהל / עובד
                </button>
                {action === 2 && <AddNewManager />}
                <button
                    id={action === 3 && "selected-option"}
                    className="options"
                    onClick={() => { changeAction(3) }}>
                    מחיקת מנהל / עובד
                </button>
                {action === 3 && <DeleteExistingManager />} */}
            </div>
        </div>
    );
}

export default ManagerSettings;