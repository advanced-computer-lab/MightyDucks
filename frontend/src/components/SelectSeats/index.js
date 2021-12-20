import React from 'react'
import { Button, Grid, Tooltip } from '@mui/material';
import { EventSeat } from "@mui/icons-material"
import { toast } from 'react-toastify';

function SelectSeats({flight, cabin, noSeats, flightSeats, setFlightSeats, oldSeats, changing, setNewSeats}) {
    const [changeSeats, setChangeSeats] = React.useState(flightSeats)
    const handleClick = (seat) => {
        if(!changing){
            if(flightSeats.includes(seat)){
            const res = flightSeats.filter((s)=> {
                return s!==seat
            })
            setFlightSeats(res)
            }
            else if(flightSeats.length<noSeats){
                if(flight.bookedSeats.includes(seat)){
                    toast.error("This seat is already booked", {position: toast.POSITION.BOTTOM_RIGHT})
                }
                else{
                    const res = flightSeats.concat([seat])
                    setFlightSeats(res)
                }
            }
            else{
                toast.warn("You've selected all your required seats", {position: toast.POSITION.BOTTOM_RIGHT})
            }
        }
        else{
            if(changeSeats.includes(seat)){
                const res = changeSeats.filter((s)=> {
                    return s!==seat
                })
                setChangeSeats(res)
                setNewSeats(res)
            }
            else if(changeSeats.length<noSeats){
                if(flight.bookedSeats.includes(seat) && !oldSeats.includes(seat)){
                    toast.error("This seat is already booked", {position: toast.POSITION.BOTTOM_RIGHT})
                }
                else{
                    const res = changeSeats.concat([seat])
                    setChangeSeats(res)
                    setNewSeats(res)
                }
            }
            else{
                toast.warn("You've selected all your required seats", {position: toast.POSITION.BOTTOM_RIGHT})
            }
        }
    }

    var val = 1

    const seats = cabin==="Economy" ? flight.economy+flight.bookedSeats.length : (cabin==="Business" ? flight.business+flight.bookedSeats.length : flight.first+flight.bookedSeats.length)
    const columns = 6;
    const rows = (seats%columns===0) ? seats/columns : Math.floor(seats/columns)+1
    const lastRow = (seats%columns===0) ? columns : ((seats/columns)%1)*columns

    const row0 = ["A", "B", "C", "D", "E", "F"]
    const getSeats = (row) => {
        let disRow = [cabin.charAt(0)+"A"+row, cabin.charAt(0)+"B"+row, cabin.charAt(0)+"C"+row, cabin.charAt(0)+"D"+row, cabin.charAt(0)+"E"+row, cabin.charAt(0)+"F"+row]
        if(row===rows && lastRow!==columns){
            disRow = disRow.slice(0, lastRow)
        }
        return disRow
    }

    const getJet = () => {
        let disJet =[]
        for (let i = 1; i <= rows; i++) {
            disJet.push(getSeats(i));
        }
        return disJet;
    }

    const Jet = getJet();
    
    return (
        <div>
            <Grid container alignContent="center" direction="column" justifyContent="center">
                <Grid container alignContent="center" direction="row" justifyContent="center">
                    <Button>-</Button>
                    {row0.slice(0,3).map((element) => {
                        return (<Button key={element+'1'}>{element}</Button>)
                    })}
                    <div style={{width:"2em"}}></div>
                    {row0.slice(3).map((element) => {
                        return (<Button key={element+'1'}>{element}</Button>)
                    })}
                    <Button>-</Button>
                </Grid>
            </Grid>
            {Jet.map((row) => {
                return( <Grid container alignContent="center" direction="row" justifyContent="center">
                    <Button>{val}</Button>
                    {row.slice(0,Math.ceil(row.length/2)).map((element) => {
                        return (<Tooltip key={element} title={element}><Button onClick={()=>handleClick(element)} id={element}>
                            {changing? (changeSeats.includes(element)
                                ? <EventSeat fontSize="large" />
                                : (oldSeats.includes(element)
                                    ? <EventSeat color="warning" fontSize='large' />
                                    : (flight.bookedSeats.includes(element)
                                        ? <EventSeat color="error" fontSize="large" />
                                        : <EventSeat color="disabled" fontSize="large" />)))
                                : (flight.bookedSeats.includes(element)
                                    ? <EventSeat color="error" fontSize="large" />
                                    : (flightSeats.includes(element)
                                        ? <EventSeat fontSize="large" />
                                        : <EventSeat color="disabled" fontSize="large" />))}
                        </Button></Tooltip>)
                    })}
                    <div style={{width:"2em"}}></div>
                    {row.slice(Math.ceil(row.length/2)).map((element) => {
                        return (<Tooltip key={element} title={element}><Button onClick={()=>handleClick(element)} id={element}>
                            {changing? (changeSeats.includes(element)
                                ? <EventSeat fontSize="large" />
                                : (oldSeats.includes(element)
                                    ? <EventSeat color="warning" fontSize='large' />
                                    : (flight.bookedSeats.includes(element)
                                        ? <EventSeat color="error" fontSize="large" />
                                        : <EventSeat color="disabled" fontSize="large" />)))
                                : (flight.bookedSeats.includes(element)
                                    ? <EventSeat color="error" fontSize="large" />
                                    : (flightSeats.includes(element)
                                        ? <EventSeat fontSize="large" />
                                        : <EventSeat color="disabled" fontSize="large" />))}
                        </Button></Tooltip>)
                    })}
                    <Button>{val++}</Button>
                </Grid>)
            })}
            <Grid container alignContent="center" direction="column" justifyContent="center">
                <Grid container alignContent="center" direction="row" justifyContent="center">
                    <Button>-</Button>
                    {row0.slice(0,3).map((element) => {
                        return (<Button key={element+'2'}>{element}</Button>)
                    })}
                    <div style={{width:"2em"}}></div>
                    {row0.slice(3).map((element) => {
                        return (<Button key={element+'2'}>{element}</Button>)
                    })}
                    <Button>-</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default SelectSeats
