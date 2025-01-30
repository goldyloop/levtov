import { Form, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import HelloGuest from './components/HelloGuest/HelloGuest'
import Management from './components/Management/Management';
import Login from './components/Login/Login';
import NewOrder from './components/NewOrder/NewOrder';
import RoomsMap from './components/RoomsMap/RoomsMap';
import { NavLink } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import './App.css';
import CustomizedTables from './components/AllOrders/AllOrders';
import { Provider } from 'react-redux';
import userSlice from './features/userSlice';
import userReducer from './features/userSlice';
import phoneReducer from './features/phoneSlice';
import ManagerSettings from './components/ManagerSettings/ManagerSettings';

// const store=configureStore({
//    reducer:{userSlice}
//   reducer: {
//     currentUser: userSlice.reducer // כאן אתה משתמש ב-reducer של ה-slice
//   }
// })
const store = configureStore({
  reducer: {
    currentUser: userReducer,
    currentPhone: phoneReducer,
  },
});

function App() {
  let rooms = [{ id: 103, status: 1 }, { id: 105, status: 2 }, { id: 108, status: 2 }, { id: 115, status: 3 }, { id: 116, status: 1 }, { id: 117, status: 2 }, { id: 118, status: 4 }, { id: 119, status: 4 }]
  return (
    // <Management/>
    //  <Login/>
    // <HelloGuest/>
    // <NewOrder/>

    <Provider store={store}>
      <Routes>
        <Route path='' element={<Login></Login>} />
        <Route path='manager' element={<Management></Management>} />
        <Route path='roomsMap' element={<RoomsMap></RoomsMap>} />
        <Route path='guest' element={<HelloGuest roomNumber={105} name={"מוטי"} />} />
        <Route path='newOrder' element={<NewOrder arr={[1, 2, 3, 4, 5]}></NewOrder>} />
        <Route path='allOrders' element={<CustomizedTables />} />
        <Route path='managerSettings' element={<ManagerSettings></ManagerSettings>} />
      </Routes>
    </Provider>
  )
}
export default App;
