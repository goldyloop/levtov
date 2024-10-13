import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OneRoom from "./OneRoom";
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "../All.css"
import "./RoomsMap.css"

const RoomsMap = (props) => {

    let roomArr = props.arr;

    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        axios.get('https://localhost:7279/api/Room/getAll').then(res => {
            setRooms(res.data);
        })
            .catch(err => {
                alert( err)
            })
    }, [rooms])

    return (
        <div id="rooms-maps-body">
            <div id="top">
                <Logo></Logo>
                {/* <div id="div-img">
                    <img id='logoLev' src={LogoLev} alt="Description of the image" />
                </div> */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <IconButton id='hIcon'>
                        <HomeIcon sx={{ fontSize: 60 }} />
                    </IconButton>
                </Link>
                <h1>מפת חדרים</h1>
            </div>

            <div id="daily-task">
                כאן יהיה כתוב מה צריך לעשות היום
            </div>

            <div id="allRooms">
                {roomArr.map((item) => {
                    return <OneRoom room={item}></OneRoom>
                })}
            </div>

            <div>
                <h1>Room List</h1>
                <ul>
                    {rooms.map((room) => (
                         <li key={room.roomId}>{room.roomStatus}</li> // עדכני את השדות בהתאם
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RoomsMap;