import * as React from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import "./OneRoom.css"



const OneRoom = (props) => {

    const [status, setStatus] = React.useState('');
    let newRoom={}

    const changeStatus = (event) => {
        setStatus(event.target.value);
        newRoom={roomId:1, roomStatus:{status}}
        axios.put('https://localhost:7279/api/Room/update/1',newRoom,
        {headers: {
            'Content-Type': 'application/json', // הגדרת סוג התוכן
        },}
    ).then(res => {
            
        })
            .catch(err => {
                alert(err)
            })
    };

    let room = props.room
    let id = room.status == "f" ? "full" : room.status == "e" ? "empty-not-cleen" : room.status == "c" ? "empty-cleen-not-ready" : "ready";
    let remark = room.status == "f" ? "החדר מלא" : room.status == "e" ? "החדר פנוי וזקוק לניקיון" : room.status == "c" ? "החדר נקי ללא מצעים" : "החדר מוכן";

    

    // const changeStatus = (event) => {
    // let newRoom={roomId:1, roomStatus:"e"}
    //     axios.put('https://localhost:7279/api/Room/update/1',newRoom,
    //     {headers: {
    //         'Content-Type': 'application/json', // הגדרת סוג התוכן
    //     },}
    // ).then(res => {
            
    //     })
    //         .catch(err => {
    //             alert(err)
    //         })
    // }
   
    return (
        <div className="rooms" id={id}>
     
            <h3 id="room-title">{`חדר ${room.id}`}</h3>
            <h4 id="room-remark">{remark}</h4>

            {/* <div id='room-condition'> */}
            <FormControl sx={{
                m: 1, minWidth: 15, '& .MuiSelect-icon': {
                    color: 'white', // שנה כאן לצבע הרצוי
                },
            }}>

                <Select
                    id="edit-buttom"
                    value=""
                    onChange={changeStatus}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // שנה כאן את הצבע
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // צבע בזמן ריחוף
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // צבע בזמן פוקוס
                        },
                    }}
                >
                    <MenuItem value="">
                        <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </MenuItem>
                    <MenuItem onClick={changeStatus} className='situations' id='if-full' value={"f"}>מלא</MenuItem>
                    <MenuItem onClick={changeStatus} className='situations' id='if-need-clean' value={"e"}>פנוי וזקוק לניקיון</MenuItem>
                    <MenuItem onClick={changeStatus} className='situations' id='if-clean' value={"c"}>החדר נקי ללא מצעים</MenuItem>
                    <MenuItem onClick={changeStatus} className='situations' id='if-ready' value={"r"}>החדר מוכן</MenuItem>
                </Select>
            </FormControl>

            {/* </div> */}
        </div>
    );
}

export default OneRoom;