import logo from './logo.svg';
import './App.css';
import HelloGuest from './HelloGuest/HelloGuest';
import Management from './Management/Management';
import OneOrder from './AllOrders/OneOrder';

function App() {
  return (
   
    <div >
      <HelloGuest roomNumber={105} name={"מוטי"}/>   
      {/* <Management/> */}
      {/* <OneOrder/> */}
    </div>
    
  );
}

export default App;
