import React, {useState} from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Admin from "./pages/admin"
import SelectFlight from "./pages/selectFlight"
import Dashboard from "./pages/dashboard"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Itinerary from "./pages/itinerary"

function App() {

  const [criteria, setCriteria] = useState(null)
  
  return (
  
    <div className="App" >
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard setCriteria={setCriteria}/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/select-flights" element={<SelectFlight criteria={criteria}/>} />
          <Route path="/itinerary" element = {<Itinerary/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;