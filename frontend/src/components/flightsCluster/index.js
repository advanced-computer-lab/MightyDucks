import React, {useState, useEffect} from 'react'
import Flight from "../flight"
import styles from './index.module.css';
import axios from 'axios';
import {RingLoader} from "react-spinners"

function FlightsCluster({criteria, handleChosen, currentChosen}) {
    const [flights, setFlights] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const findFlights=()=>{
        var Flightdetails={
            from:criteria.from,
            to:criteria.to,
            departure: criteria.departure, //2022-01-01
            children:criteria.children,
            adults:criteria.adults,
            cabin:criteria.cabin,
        }
        console.log("departure====", Flightdetails.departure)
        filterFlights(Flightdetails)
    }

    const filterFlights=async(data)=>{
        await axios.post('http://localhost:5000/flight/filterFlights', data)
        .then((res) => {
            setLoading(false)
            setFlights(res.data)
        }).catch((error) => {
            console.log(error)
        });
    };

    useEffect(() => {
        findFlights();
    }, [])

    return (
    <div
        style={{
          backgroundColor: "#E5E5E5",
          width: "50%",
          padding: "0.5em",
        }}
      >
        {isLoading && <div className={styles["divElement"]}><RingLoader color="#017A9B" /></div>}
        {flights.length>0 && <div className={styles["stat"]}>Showing {flights.length} flights</div>}
        {flights.length===0 && !isLoading && <div>Sorry we couldn't find any flights with this criteria... :/</div>}
        {flights.length > 0 &&
          flights.map((flight) => {
            return (
              <div>
                <Flight
                  flightDetails={flight}
                  isAdmin={false}
                  cabin={criteria.cabin}
                  handleChosen={handleChosen}
                  currentChosen={currentChosen}
                />
                <br />
              </div>
            );
          })}
      </div>
    );
}

export default FlightsCluster
