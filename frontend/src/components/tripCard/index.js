import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStyles from './style'
import { Grid, Button } from '@material-ui/core';
import TripDetails from '../tripDetails';
import CircularProgress from '@mui/material/CircularProgress';

function TripCard({user, reservation, upcoming, setDeleted}) {
    const styles = useStyles()
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [departure, setDeparture] = useState(null)
    const [returnD, setReturnD] = useState(null)
    const [depFlight, setDepFlight] = useState({})
    const [retFlight, setRetFlight] = useState({})
    const [open, setOpen] = useState(false)

    var flight1 = {flightNumber: reservation.split(' ')[0]}
    var flight2 = {flightNumber: reservation.split(' ')[2]}
    
    const getFlight1=async(data)=>{
        await axios.post('http://localhost:5000/flight/getFlight', data)
        .then((res) => {
            setDepFlight((res.data)[0])
        }).catch((error) => {
            console.log(error)
        });
    };
    
    const getFlight2=async(data)=>{
        await axios.post('http://localhost:5000/flight/getFlight', data)
        .then((res) => {
            setRetFlight((res.data)[0])
        }).catch((error) => {
            console.log(error)
        });
    };
    useEffect(() => {
        getFlight1(flight1)
        getFlight2(flight2)     
    }, [])

    useEffect(() => {  
        const timeDeparture = (new Date(depFlight.departureTime).toString()).split(" ")
        const timeReturn = (new Date(retFlight.departureTime).toString()).split(" ")
        
        setFrom(depFlight.from)
        setTo(depFlight.to)
        setDeparture(`${timeDeparture[0]}, ${timeDeparture[1]} ${timeDeparture[2]}, ${timeDeparture[3]}`)
        setReturnD(`${timeReturn[0]}, ${timeReturn[1]} ${timeReturn[2]}, ${timeReturn[3]}`)    

        
    }, [depFlight, retFlight])

    const handleClick = () => {
        setOpen(true)
    }
    
    return (
        <div className={styles.grid}>
            <Grid container direction = "column" justifyContent="center">
                <Grid container direction = "row" justifyContent="space-between">
                    <Grid item>
                        <div className={styles.dates}>
                            {departure === "Invalid, Date undefined, undefined" ? <CircularProgress />: departure} 
                        </div>
                        
                    </Grid>
                    <Grid item>
                        <div className={styles.dates}>
                            {returnD === "Invalid, Date undefined, undefined" ? <CircularProgress />: returnD} 
                        </div>
                    </Grid>
                </Grid>

                <Grid container direction = "row" justifyContent="space-evenly" spacing ={7}>
                    <Grid item>
                        <div className={styles.terminals}>
                            {from || <CircularProgress />} 
                        </div>
                    </Grid>
                    <Grid item>
                        <div className={styles.terminals}>
                            {to || <CircularProgress />} 
                        </div>
                    </Grid>
                </Grid>

                <Grid container direction = "row" justifyContent="flex-end">
                    <Grid item>
                        <Button variant="contained" className={styles.button} onClick={handleClick}>More Info</Button>
                    </Grid>
                </Grid>
            </Grid>
            {open && <TripDetails open={open} setOpen={setOpen} setDeleted={setDeleted} bookingId={reservation.split(' ')[4]} departureFlight={depFlight} departingFlightSeats={reservation.split(' ')[1].split(',')} returnFlight={retFlight} returningFlightSeats={reservation.split(' ')[3].split(',')} create={false} upcoming={new Date(depFlight.departureTime)>=new Date()} user={user}/>}
        </div>
    )
}

export default TripCard
