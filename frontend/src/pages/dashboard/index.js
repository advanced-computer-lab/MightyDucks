import React from 'react'
import Navbar from '../../components/navbar'
import FlightFilter from '../../components/flightFilter'
import useStyles from './style'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import wallpaper from "../../assets/Images/wallpaper.png"
import { Hidden } from '@mui/material';
function Dashboard({setCriteria}) {
    const theme = useTheme()
    const styles = useStyles()

    return (
        <div className={styles.main} style={{overflow:'hidden'}}>
            <Navbar/>
            <div className={styles.filter}>
                <div className={styles.title}>Flight Booking</div>
                <FlightFilter setCriteria={setCriteria}/>
            </div>
        </div>
    )
}

export default Dashboard
