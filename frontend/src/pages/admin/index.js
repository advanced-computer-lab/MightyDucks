import React from 'react';
import Flight from "../../components/flight"
import AddFlightModal from '../../components/addFlightModal';
import styles from './index.module.css';


const flight = {
    flightNumber: "91234",
    departureTime: "11/4/2021 12:51 pm",
    arrivalTime: "11/4/2021 9:51 am",
    from: "CAI",
    to: "LAX",
    economy: 21,
    business: 3,
    first: 5,
  }

const Admin=()=>{
    return(
        <>
        <div className={styles["flightModal"]}>
        <br />
      <br />
      <br />
    <Flight flightDetails={flight} />
    <br />
      <Flight flightDetails={flight} />
      <br />
    <Flight flightDetails={flight} />
    <br />
      <Flight flightDetails={flight} />
      <br />
    <Flight flightDetails={flight} />
    <br />
      <Flight flightDetails={flight} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <AddFlightModal />
        </div>
        </>
    )
}
export default Admin;