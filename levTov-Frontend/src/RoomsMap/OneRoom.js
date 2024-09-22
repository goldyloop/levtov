import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Swal from 'sweetalert2'

const OneRoom = (props) => {

    const [status, setStatus] = React.useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const saveStatusChanges = () => {
        Swal.fire({
            // title: "<strong>HTML <u>example</u></strong>",
            // icon: "info",
            // html: `
            // <Button id='is-full' variant="contained" >החדר תפוס/Button>
            // <Button id='if-need-clean' variant="contained" >עידכון מצב החדר</Button>
            // <Button id='if-cleen' variant="contained" >עידכון מצב החדר</Button>
            // <Button id='if-ready' variant="contained" >עידכון מצב החדר</Button>

            // `,
            //     showCloseButton: true,
            //     showCancelButton: true,
            //     focusConfirm: false,
            //     confirmButtonText: `
            //       <i class="fa fa-thumbs-up"></i> Great!
            //     `,
            //     confirmButtonAriaLabel: "Thumbs up, great!",
            //     cancelButtonText: `
            //       <i class="fa fa-thumbs-down"></i>
            //     `,
            //     cancelButtonAriaLabel: "Thumbs down"
        });
    }


    let room = props.room
    let id = room.status == 1 ? "full" : room.status == 2 ? "empty-not-cleen" : room.status == 3 ? "empty-cleen-not-ready" : "ready";
    let remark = room.status == 1 ? "החדר מלא" : room.status == 2 ? "החדר פנוי וזקוק לניקיון" : room.status == 3 ? "החדר נקי ללא מצעים" : "החדר מוכן";;
    return (
        <div className="rooms" id={id}>
            <h3 id="room-title">{`חדר ${room.id}`}</h3>
            <h4 id="room-remark">{remark}</h4>
            {/* <Button id='change-status' variant="contained">עידכון מצב החדר</Button> */}
            <Box id='change-status'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">עידכון מצב החדר</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="עידכון מצב החדר"
                        onChange={handleChange}
                        sx={{
                            '& .MuiSelect-select': {
                                borderColor: 'red', // צבע המסגרת
                                border : '0px solid green'
                            },
                            '&:before': {
                                borderColor: 'red', // צבע המסגרת לפני שהאינפוט נלחץ
                                border : '0px solid green'
                            },
                            '&:after': {
                                borderColor: 'red', // צבע המסגרת אחרי שהאינפוט נלחץ
                                border : '0px solid green'

                            }
                        }}
                    >
                        <MenuItem className='situations' id='if-full' value={10}>מלא</MenuItem>
                        <MenuItem className='situations' id='if-need-clean' value={20}>פנוי וזקוק לניקיון</MenuItem>
                        <MenuItem className='situations' id='if-clean' value={30}>החדר נקי ללא מצעים</MenuItem>
                        <MenuItem className='situations' id='if-ready' value={30}>החדר מוכן</MenuItem>
                    </Select>
                </FormControl>


                {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">עידכון מצב החדר</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={status}
                        onChange={handleChange}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl> */}
            </Box>
            {/* <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select> */}
        </div>
    );
}

export default OneRoom;