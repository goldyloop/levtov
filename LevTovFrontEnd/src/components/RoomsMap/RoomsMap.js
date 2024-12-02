import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OneRoom from "./OneRoom";
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "../All.css"
import "./RoomsMap.css"

const RoomsMap = () => {


    const [rooms, setRooms] = useState([]);
    // let rooms=[];

    const getAllRooms= async()=>{
        try{
            let response=await fetch('https://localhost:7279/api/Room/getAll')
            let arr=await response.json();
            setRooms(arr)
            console.log(rooms);
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        getAllRooms()
    }, [])

    return (
        <div id="rooms-maps-body">
            <div id="top">
                <Logo></Logo>
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
                {rooms.map((item) => {
                    return <OneRoom room={item}></OneRoom>
                })}
            </div>

            {/* <div>
                <h1>Room List</h1>
                <ol>
                    {rooms.map((room) => (
                         <li key={room.roomId}>{room.roomStatus}</li> // עדכני את השדות בהתאם
                    ))}
                </ol>
            </div> */}
        </div>
    );
}

export default RoomsMap;
