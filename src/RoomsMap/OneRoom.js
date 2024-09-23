import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const OneRoom = (props) => {

    const [status, setStatus] = React.useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    let room = props.room
    let id = room.status == 1 ? "full" : room.status == 2 ? "empty-not-cleen" : room.status == 3 ? "empty-cleen-not-ready" : "ready";
    let remark = room.status == 1 ? "החדר מלא" : room.status == 2 ? "החדר פנוי וזקוק לניקיון" : room.status == 3 ? "החדר נקי ללא מצעים" : "החדר מוכן";;
    return (
        <div className="rooms" id={id}>
            <h3 id="room-title">{`חדר ${room.id}`}</h3>
            <h4 id="room-remark">{remark}</h4>
            
            <FormControl sx={{
                m: 1, minWidth: 120, '& .MuiSelect-icon': {color: 'white', // שנה כאן לצבע הרצוי
                },
            }}>
                <Select
                    
                    id="demo-simple-select"
                    value=""
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // שנה כאן את הצבע
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // צבע בזמן ריחוף
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // צבע בזמן פוקוס
                        },
                    }}
                >
                    <MenuItem value="">
                        <em>עידכון מצב החדר</em>
                    </MenuItem>
                    <MenuItem className='situations' id='if-full' value={10}>מלא</MenuItem>
                    <MenuItem className='situations' id='if-need-clean' value={20}>פנוי וזקוק לניקיון</MenuItem>
                    <MenuItem className='situations' id='if-clean' value={30}>החדר נקי ללא מצעים</MenuItem>
                    <MenuItem className='situations' id='if-ready' value={40}>החדר מוכן</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default OneRoom;