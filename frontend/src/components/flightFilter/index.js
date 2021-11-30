import React, { useState, useEffect } from 'react';
import { NavLink, } from 'react-router-dom'

import axios from 'axios';
import useStyles from './style'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { Button, TextField } from '@material-ui/core';
import { format } from 'date-fns'

function FlightFilter({ setCriteria }) {
    const theme = useTheme()
    const styles = useStyles()

    const [flights, setFlights] = useState([])
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [departure, setDeparture] = useState(new Date())
    const [returnD, setReturnD] = useState(new Date())
    const [cabin, setCabin] = useState(null)
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)

    const [fromErr, setFromErr] = useState(false)
    const [toErr, setToErr] = useState(false)
    const [departureErr, setDepartureErr] = useState(false)
    const [returnErr, setReturnErr] = useState(false)
    const [cabinErr, setCabinErr] = useState(false)
    const [valid, setValid] = useState(false)
    
    useEffect(() => {
        axios.get('http://localhost:5000/flight/getFlights')
        .then((res) => {
            setFlights(res.data)
        })
    }, [])
    var toArray = []
    var fromArray = []
    
    flights.map((flight) => {
        if(!toArray.includes(flight.to))
            toArray.push(flight.to)
        return toArray
    })

    flights.map((flight) => {
        if(!fromArray.includes(flight.from))
            fromArray.push(flight.from)
        return fromArray    
    })

    const handleFromChange = (event) => {
        setFrom(event.target.value);
        setFromErr(false)
    };
    
    const handleToChange = (event) => {
        setTo(event.target.value);
        setToErr(false)
    };

    const handleDepartureChange = (event) => {
        setDeparture(format(new Date(event), 'yyyy-MM-dd'))
        setDepartureErr(false)
    }

    const handleReturnChange = (event) => {
        setReturnD(format(new Date(event), 'yyyy-MM-dd'))
        setReturnErr(false)
    }

    const handleCabinChange = (event) => {
        setCabin(event.target.value)
        setCabinErr(false)
    }
    const handleAdultsChange = (event) => {
        if(event.target.value.match(/[-=+.]/)){
            event.target.value = ''
        }
        else
            setAdults(event.target.value);
    };
    
    const handleChildrenChange = (event) => {
        if(event.target.value.match(/[-=+.]/)){
            event.target.value = ''
        }
        else
        setChildren(event.target.value);
    };

    const handleFilter = () => {
        if(from === null){
            setFromErr(true)
        }
        if(to === null){
            setToErr(true)
        }    
        if(departure === null){
            setDepartureErr(true)
        }
        if(returnD === null){
            setReturnErr(true)
        }
        if(cabin === null){
            setCabinErr(true)
        }
        if(!fromErr && !toErr && !departureErr && !returnErr && !cabinErr){
            setCriteria({
                from: from,
                to: to,
                depDate: departure,
                retDate: returnD,
                adults: adults,
                children: children,
                cabin: cabin,
            })
            setValid(true)
        }
    }

    const handleNavLink = (e) => {
        if(from === null){
            setFromErr(true)
        }
        if(to === null){
            setToErr(true)
        }    
        if(departure === null){
            setDepartureErr(true)
        }
        if(returnD === null || returnD<departure){
            setReturnErr(true)
        }
        if(cabin === null){
            setCabinErr(true)
        }
        if(from === null || to === null || departure === null || returnD === null || cabin === null || returnD<departure ){
            e.preventDefault()
        }
    }

    return (
        <div>
        <Grid container className={styles.grid} direction = "column" justifyContent="center" spacing = {2}>
            <Grid item>
                <Grid container direction = "row" justifyContent="center" spacing ={3} className={styles.row}>
                    <Grid item>
                        <FormControl fullWidth variant = "standard" sx={{  minWidth: 130 }} error={fromErr?true:false}>
                        <InputLabel>From</InputLabel>
                        <Select
                        id="fromSelect"
                        value={from}
                        label="From"
                        onChange={handleFromChange}
                        autoWidth
                        >
                        {fromArray.map((from) => {
                            return <MenuItem key={from} value = {from}>{from}</MenuItem>
                        })}
                        </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl fullWidth variant = "standard" sx={{ minWidth: 130 }} error={toErr?true:false}>
                            <InputLabel>To</InputLabel>
                            <Select
                            value={to}
                            label="To"
                            onChange={handleToChange}
                            autoWidth
                            >
                            {toArray.map((to) => {
                                return <MenuItem key={to} value = {to}>{to}</MenuItem>
                            })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Grid container direction = "row" justifyContent="center" spacing ={3} className={styles.row}>
                    <Grid item sx = {{maxWidth: 155}}>
                       <LocalizationProvider dateAdapter={AdapterDateFns} >
                           <MobileDatePicker
                                label="Departure Date"
                                inputFormat="yyyy-MM-dd"
                                value={departure}
                                onChange={handleDepartureChange}
                                format="YYYY-MM-DD"    
                                renderInput={(params) => <TextField {...params} error={departureErr?true:false}/>}
                            />
                       </LocalizationProvider>
                    </Grid>

                  <Grid item sx = {{maxWidth: 155}}>
                       <LocalizationProvider dateAdapter={AdapterDateFns}>
                           <MobileDatePicker
                                label="Return Date"
                                inputFormat="yyyy-MM-dd"
                                value={returnD}
                                onChange={handleReturnChange}
                                format="YYYY-MM-DD"
                                renderInput={(params) => <TextField {...params} error={returnErr?true:false} />}
                            />
                       </LocalizationProvider>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Grid container direction = "row" justifyContent="center" spacing ={3} className={styles.row}>
                    <Grid item>
                         <TextField type="number" value={adults} inputProps={{ min: 1 }} className={styles.textField} label="Adults" variant="standard" onChange={handleAdultsChange}/>
                    </Grid>
                    <Grid item>
                         <TextField type="number" value={children} inputProps={{ min: 0 }} className={styles.textField} label="Children" variant="standard" onChange={handleChildrenChange}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>                    
                <Grid container direction = "row" justifyContent="center" spacing ={3} className={styles.row}>
                    <Grid item>
                        <FormControl fullWidth variant = "standard" sx={{  minWidth: 130 }} error={cabinErr?true:false}>
                            <InputLabel>Cabin</InputLabel>
                            <Select
                            value={cabin}
                            label="Cabin"
                            onChange={handleCabinChange}
                            autoWidth
                            >
                                <MenuItem value = "First">First Class</MenuItem>
                                <MenuItem value = "Business">Business</MenuItem>
                                <MenuItem value = "Economy">Economy</MenuItem>                           
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        
                        <Button variant="contained" size="medium" className={styles.button} onClick={handleFilter}>
                           <NavLink className={styles.navLink} to={{pathname: "/select-flights"}} onClick={handleNavLink}>
                            Find Flights
                            </NavLink>
                        </Button>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
     
        </div>
    )
}

export default FlightFilter
