import './App.css';
import {Routes, Route} from "react-router-dom"
import HomePage from './HomePage';
import CreateTicket from './CreateTicket';
import Tickets from './Tickets';
import Login from './Login';
import SignUp from './SignUp';

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path="/"  element={<HomePage />} /> 
        <Route path="/login"  element={<Login />} /> 
        <Route path="/signUp"  element={<SignUp />} /> 
        <Route path="/createTicket"  element={<CreateTicket />} /> 
        <Route path="/tickets"  element={<Tickets/>} /> 
      </Routes>
    </div>
  );
}

export default App;
