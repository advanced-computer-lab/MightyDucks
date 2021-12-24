import React, {useState, useEffect} from "react"
import {Navigate, BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Admin from "./pages/admin"
import SelectFlight from "./pages/selectFlight"
import Dashboard from "./pages/dashboard"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Itinerary from "./pages/itinerary"
import Signup from "./pages/signup"
import Login from "./pages/login"
import Navbar from "./components/navbar"

function App() {

  const [criteria, setCriteria] = useState(null)
  
  return (
  
    <div className="App" >
      <ToastContainer />
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Dashboard setCriteria={setCriteria}/>} />
          <Route path="/admin" element={localStorage.getItem("admin") ? <Admin/>: <Navigate to="/" replace={true}/>} />
          <Route path="/select-flights" element={<SelectFlight criteria={criteria}/>} />
          <Route path="/itinerary" element = {<Itinerary/>}/>
          <Route path="/signup" element = {<Signup/>}/>
          <Route path="/login" element = {<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;