import React from 'react';
import FlightModal from '../../components/flightModal';
import styles from './index.module.css';

const Flight=()=>{
    return(
        <>
        <div className={styles["flightModal"]}>
            <FlightModal />
        </div>
        </>
    )
}
export default Flight;