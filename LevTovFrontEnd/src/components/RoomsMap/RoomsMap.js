import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OneRoom from "./OneRoom";
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "../All.css";
import "./RoomsMap.css";

import { useSelector } from 'react-redux';//redux
import { Task } from '@mui/icons-material';

const RoomsMap = () => {


    const phonePosition = useSelector((state) => state.currentPhone.phonePosition);//redux
    const userPosition = useSelector((state) => state.currentUser.userPosition);//redux
    // console.log(phonePosition);
    // console.log(userPosition); 

    const [rooms, setRooms] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        const getTask = async () => {
            try {
                let response = await fetch("https://localhost:7279/api/Room/DailyTask");
                if (response.ok) {
                    response = await response.text();
                    setTask(response)
                    console.log("response", response);
                }
                else {
                    console.log("ddddddddddd");

                }
            }
            catch (err) {
                console.error(err);
            }
        }
        getTask()
    }, [])

    //redux
    useEffect(() => {
        console.log('User Position:', userPosition);
    }, [userPosition]);
    useEffect(() => {
        console.log('phone Position:', phonePosition);
    }, [phonePosition]);
    const getAllRooms = async () => {
        try {
            let response = await fetch('https://localhost:7279/api/Room/getAll')
            let arr = await response.json();
            setRooms(arr);
            console.log(rooms);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getAllRooms()
    }, [])

    const updateRoomStatus = (updatedRoom) => {
        // עדכון חדר במערך rooms
        // console.log(updatedRoom)
        setRooms((prevRooms) =>
            prevRooms.map((room) =>
                room.roomId === updatedRoom.roomId ? updatedRoom : room
            )
        );
    };

    return (
        <div id="rooms-maps-body">
            <div id="top">
                <Logo></Logo>

                {userPosition == 'worker' ?
                    (<Link to="/" style={{ textDecoration: 'none' }}>
                        <IconButton id='hIcon'>
                            <HomeIcon sx={{ fontSize: 60 }} />
                        </IconButton>
                    </Link>)
                    : (<Link to="/manager" style={{ textDecoration: 'none' }}>
                        <IconButton id='hIcon'>
                            <ArrowBackIosIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                    </Link>)
                }

                <h1>מפת חדרים</h1>
            </div>

            <div id="daily-task">
                {task}
            </div>

            <div id="allRooms">
                {rooms.map((item) => {
                    return <OneRoom room={item} updateRoomStatus={updateRoomStatus}></OneRoom>
                })}
            </div>
        </div>
    );
}

export default RoomsMap;
