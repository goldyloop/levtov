import { Form, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import HelloGuest from './HelloGuest/HelloGuest';
import Management from './Management/Management';
import Login from './Login/Login';
import NewOrder from './NewOrder/NewOrder';
import RoomsMap from './RoomsMap/RoomsMap';
import { NavLink } from "react-router-dom";

import './App.css';
import CustomizedTables from './AllOrders/AllOrders';


function App() {
  let rooms= [{id: 103, status: 1},{id: 105, status: 2},{id: 108, status: 2},{id: 115, status: 3},{id: 116, status: 1},{id: 117, status: 2},{id: 118, status: 4},{id: 119, status: 4}]
  return (

    <div >


      <div className="App">
        {/* <Login></Login> */}
        {/* <NewOrder arr={[1, 2, 3, 4, 5]}></NewOrder> */}
        {/* <RoomsMap arr={rooms}></RoomsMap> */}
        {/* <HelloGuest roomNumber={105} name={"מוטי"} /> */}
        {/* <Management/> */}
        {/* <CustomizedTables/> */}
      </div>
      

      <Routes>
          <Route path='' element={<Login></Login>} />
          <Route path='manager' element={<Management></Management>} />
          <Route path='roomsMap' element={<RoomsMap arr={rooms}></RoomsMap>} />
          <Route path='guest' element={<HelloGuest roomNumber={105} name={"מוטי"} />} />
          <Route path='newOrder' element={<NewOrder arr={[1, 2, 3, 4, 5]}></NewOrder> } />
          <Route path='allOrders' element={<CustomizedTables/> } />
        </Routes>
    </div>
  )
}





export default App;
