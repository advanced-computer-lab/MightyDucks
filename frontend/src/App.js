import React from "react"
import Admin from "./pages/admin"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



function App() {
  return (
  
    <div className="App" >
      <ToastContainer />
      <Admin />
    </div>
  );
}

export default App;