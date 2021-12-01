import React from 'react'
import "./style.css"
import SelectFlightSteps from "../../components/SelectFlightSteps"
import Navbar from "../../components/navbar"
import { Navigate } from "react-router-dom"

function SelectFlight({criteria}) {
  const [user, setUser] = React.useState(null)
  if(criteria===null){
    return(
      <Navigate to='/'/>
    )
  }
  
  return (
    <>
    <Navbar setUser={setUser}/>
    <div className="container">
      <SelectFlightSteps from={criteria.from} to={criteria.to} depDate={criteria.depDate} retDate={criteria.retDate} adults={criteria.adults} children={criteria.children} cabin={criteria.cabin} user={user} />
    </div>
    </>
  );
}

export default SelectFlight
