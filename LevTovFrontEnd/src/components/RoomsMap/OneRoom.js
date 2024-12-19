import * as React from 'react';
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import "./OneRoom.css"
import { json } from 'react-router';



const OneRoom = (props) => {


    let room = props.room;
    let id = room.roomStatus == 1 ? "full" : room.roomStatus == 2 ? "empty-not-cleen" : room.roomStatus == 3 ? "empty-cleen-not-ready" : "ready";
    let remark = room.roomStatus == 1 ? "החדר מלא" : room.roomStatus == 2 ? "החדר פנוי וזקוק לניקיון" : room.roomStatus == 3 ? "החדר נקי ללא מצעים" : "החדר מוכן";


    // const [status, setStatus] = React.useState();
    // let newRoom = {}

    const changeStatus = async (newStatus) => {
        // alert(newStatus)
        const updatedData = { ...room, roomStatus: newStatus };
        try {
            let response = await fetch(`https://localhost:7279/api/Room/update/${room.roomId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData)
            })
            if (response.ok) {
                const result = await response.json();
                props.updateRoomStatus(result)
                console.log('החדר עודכן בהצלחה', result);
            }
            else {
                console.error('שגיאה בעדכון החדר');
            }

        } catch (err) {
            console.error("שגיאה בשרת" + err)
        }
    };


    return (
        <div className="rooms" id={id}>
            <h3 id="room-title">{`חדר ${room.roomId}`}</h3>
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
                    <MenuItem value="" id='Select-situation'>
                        <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </MenuItem>
                    <MenuItem onClick={() => changeStatus(1)} className='situations' id='if-full' value={1}>החדר מלא</MenuItem>
                    <MenuItem onClick={() => changeStatus(2)} className='situations' id='if-need-clean' value={2}>החדר פנוי וזקוק לניקיון</MenuItem>
                    <MenuItem onClick={() => changeStatus(3)} className='situations' id='if-clean' value={3}>החדר נקי ללא מצעים</MenuItem>
                    <MenuItem onClick={() => changeStatus(4)} className='situations' id='if-ready' value={4}>החדר מוכן</MenuItem>
                </Select>
            </FormControl>
            

            {/* </div> */}
        </div>
    );
}

export default OneRoom;