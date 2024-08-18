import logo from './logo.svg';
import './App.css';
import NewOrder from './NewOrder/NewOrder';
import RoomsMap from './RoomsMap/RoomsMap';

function App() {
  return (
    <div className="App">
      <NewOrder arr={[1,2,3,4,5]}></NewOrder>
      {/* <RoomsMap arr={[{id: 103, status: 1},{id: 105, status: 2},{id: 108, status: 2},{id: 115, status: 3}]}></RoomsMap> */}
    </div>
  );
}

export default App;
