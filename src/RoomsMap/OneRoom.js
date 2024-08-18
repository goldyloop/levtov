const OneRoom = (props) => {
    let room=props.room
    let id = room.status==1?"full":room.status==2?"empty-not-cleen":room.status==3?"empty-cleen-not-ready":"ready";
    let remark = room.status==1?"החדר מלא":room.status==2?"החדר פנוי וזקוק לניקיון":room.status==3?"החדר נקי ללא מצעים":"החדר מוכן";;
    return (
        <div className="rooms" id={id}>
            <h3>{`חדר ${room.id}`}</h3>
            <h4>{remark}</h4>
        </div>
    );
}

export default OneRoom;