import logo from './logo.svg';
import './App.css';
// <<<<<<< HEAD
import HelloGuest from './HelloGuest/HelloGuest';
import Management from './Management/Management';
import OneOrder from './AllOrders/OneOrder';
import NewOrder from './NewOrder/NewOrder';
import RoomsMap from './RoomsMap/RoomsMap';

function App() {
  return (
   
    <div >
      <HelloGuest roomNumber={105} name={"מוטי"}/>   
      {/* <Management/> */}
      {/* <OneOrder/> */}
      <div className="App">
      <NewOrder arr={[1,2,3,4,5]}></NewOrder>
      {/* <RoomsMap arr={[{id: 103, status: 1},{id: 105, status: 2},{id: 108, status: 2},{id: 115, status: 3}]}></RoomsMap> */}
{/* >>>>>>> 9e4653433c0c9452a995a08bb62869950eca8655 */}
    </div>
    </
{/* ======= */}





export default App;
