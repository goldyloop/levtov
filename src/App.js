
import logo from './logo.svg';
// import './App.css';

import HelloGuest from './HelloGuest/HelloGuest';
import Management from './Management/Management';
import OneOrder from './AllOrders/OneOrder';
import NewOrder from './NewOrder/NewOrder';
import RoomsMap from './RoomsMap/RoomsMap';
import logo from './logo.svg';
import './App.css';
import CustomizedTables from './AllOrders/AllOrders';

function App() {
  let rooms= [{id: 103, status: 1},{id: 105, status: 2},{id: 108, status: 2},{id: 115, status: 3},{id: 116, status: 1},{id: 117, status: 2},{id: 118, status: 4},{id: 119, status: 4}]
  return (

    <div >


      <div className="App">
        {/* <NewOrder arr={[1, 2, 3, 4, 5]}></NewOrder> */}
        <RoomsMap arr={rooms}></RoomsMap>
        {/* <HelloGuest roomNumber={105} name={"מוטי"} /> */}
        {/* <Management/> */}
        {/* <OneOrder/> */}
      </div>
    </div>
  )
}
      {/* <HelloGuest roomNumber={105} name={"מוטי"}/>    */}
      {/* <Management/> */}
      {/* <OneOrder/> */} 
      {/* <NewOrder arr={[1,2,3,4,5]}></NewOrder> */}
      {/* <RoomsMap arr={[{id: 103, status: 1},{id: 105, status: 2},{id: 108, status: 2},{id: 115, status: 3}]}></RoomsMap> */}
      {/* <CustomizedTables/> */}
    </div>
  )}
export default App;
