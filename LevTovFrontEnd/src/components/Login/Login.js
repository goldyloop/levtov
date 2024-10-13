import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const Login = () => {
    return (
        <div id="Login-body">
            {/* <button><NavLink className={(data) => data.isActive ? "active" : ""} to="manager">מנהל</NavLink></button>
            <NavLink className={(data) => data.isActive ? "active" : ""} to="worker">עובד</NavLink>
            <NavLink className={(data) => data.isActive ? "active" : ""} to="guest">אורח</NavLink> */}
            <Link to="/manager" style={{ textDecoration: 'none' }}>
                <Button variant="contained">
                    מנהל
                </Button>
            </Link>
            <Link to="/roomsMap" style={{ textDecoration: 'none' }}>
                <Button variant="contained">
                    עובד
                </Button>
            </Link>
            <Link to="/guest" style={{ textDecoration: 'none' }}>
                <Button variant="contained">
                    אורח
                </Button>
            </Link>
        </div>
    );
}

export default Login;