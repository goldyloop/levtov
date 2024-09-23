import OneRoom from "./OneRoom";

import LogoLev from '../LogoLev.png';
import "../All.css"
import "./RoomsMap.css"

const RoomsMap = (props) => {

    let roomArr = props.arr;

    return (
        <div id="rooms-maps-body">
            <div id="top">
                <div id="div-img">
                    <img id='logoLev' src={LogoLev} alt="Description of the image" />
                </div>
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