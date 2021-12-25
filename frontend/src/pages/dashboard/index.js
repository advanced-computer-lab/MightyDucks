import React from 'react'
import FlightFilter from '../../components/flightFilter'
import useStyles from './style'
function Dashboard({setCriteria}) {
    const styles = useStyles()

    return (
        <div className={styles.main} style={{overflow:'hidden'}}>
            <div className={styles.filter}>
                <div className={styles.title}>Flight Booking</div>
                <FlightFilter setCriteria={setCriteria}/>
            </div>
        </div>
    )
}

export default Dashboard
