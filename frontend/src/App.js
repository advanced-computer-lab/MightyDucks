import React, {useState} from "react"
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
import Page404 from "./pages/404"

function App() {

  const [criteria, setCriteria] = useState(null)
  
  return (
  
    <div className="App" >
      <ToastContainer />
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Dashboard setCriteria={setCriteria}/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/select-flights" element={<SelectFlight criteria={criteria}/>} />
          <Route path="/itinerary" element = {<Itinerary/>}/>
          <Route path="/signup" element = {<Signup/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path={"*"} element={<Page404 />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;