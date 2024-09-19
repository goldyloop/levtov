import OneRoom from "./OneRoom";
import "./RoomsMap.css"
import LogoLev from '../LogoLev.png';

const RoomsMap = (props) => {

    let roomArr = props.arr;


    return (
        <div id="rooms-maps-body">
            <div id="top">
                <img id='logoLev' src={LogoLev} alt="Description of the image" />
                <h1>מפת חדרים</h1>
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