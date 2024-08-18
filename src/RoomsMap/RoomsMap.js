import OneRoom from "./OneRoom";
import "./RoomsMap.css"

const RoomsMap = (props) => {

    let roomArr = props.arr;
    

    return (
        <div className="allRooms">
            {roomArr.map((item)=>{
                return <OneRoom room={item}></OneRoom>
            })}
        </div>
    );
}

export default RoomsMap;