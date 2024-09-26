import OneRoom from "./OneRoom";
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "../All.css"
import "./RoomsMap.css"

const RoomsMap = (props) => {

    let roomArr = props.arr;

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
        </div>
    );
}

export default RoomsMap;