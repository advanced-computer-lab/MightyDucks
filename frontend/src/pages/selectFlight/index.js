import React, {useEffect} from 'react'
import "./style.css"
import SelectFlightSteps from "../../components/SelectFlightSteps"
import { Navigate } from "react-router-dom"
import axios from 'axios'

function SelectFlight({criteria}) {
  const [user, setUser] = React.useState(null)
  const [booked, setBooked] = React.useState(false)
   const data = {}
    const header = { headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
    }}
    useEffect(() => {
        axios.post('http://localhost:5000/user/getUser', data, header)
        .then((res) => {
          if(!(res.data.message === "Incorrect Token Given")){
            setUser(res.data)
          }
          else{
            setUser(null)
          }
        }).catch((error) => {
            console.log(error)
        });
    },[])

    useEffect(() => {
      if(booked){
      axios.post('http://localhost:5000/user/getUser', data, header)
      .then((res) => {
        if(!(res.data.message === "Incorrect Token Given")){
          setUser(res.data)
        }
        else{
          setUser(null)
        }
      }).catch((error) => {
          console.log(error)
      });
      setBooked(false)
    }
  },[booked])


  if(criteria===null){
    return(
      <Navigate to='/'/>
    )
  }

  

  
  
  return (
    <>
    <div className="container">
      <SelectFlightSteps from={criteria.from} to={criteria.to} depDate={criteria.depDate} retDate={criteria.retDate} adults={criteria.adults} children={criteria.children} cabin={criteria.cabin} user={user} setBooked={setBooked} />
    </div>
    </>
  );
}

export default SelectFlight
