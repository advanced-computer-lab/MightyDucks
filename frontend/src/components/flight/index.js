import React from 'react'
import { Grid } from "@mui/material"
import { ArrowForward, DepartureBoardTwoTone } from "@mui/icons-material"
import EditFlightModal from "../editFlightModal"
import DeleteFlightModal from "../deleteFlightModal"
import "./style.css"

function Flight({flightDetails, getFlights}) {

    const departureTime = (new Date(flightDetails.departureTime).toString()).split(" ")
    const arrivalTime = (new Date(flightDetails.arrivalTime).toString()).split(" ")

    var depHr = departureTime[4].substring(0, 2)
    var arrHr = arrivalTime[4].substring(0, 2)

    if(depHr==="00"){
        depHr = "12:"+departureTime[4].substring(3,5)+" AM"
    }
    else if(depHr==="12"){
        depHr = "12:"+departureTime[4].substring(3,5)+" PM"
    }
    else if(parseInt(depHr)>12){
        let value1 = ((parseInt(depHr)-12)+"")
        if(value1.length===2){
        depHr = value1+":"+departureTime[4].substring(3,5)+" PM"
        }
        else{
            depHr = "0"+value1+":"+departureTime[4].substring(3,5)+" PM"   
        }
    }
    else{
        depHr = departureTime[4].substring(0,5)+" AM"
    }

    if(arrHr==="00"){
        arrHr = "12:"+arrivalTime[4].substring(3, 5)+" AM"
    }
    else if(arrHr==="12"){
        arrHr = "12:"+arrivalTime[4].substring(3, 5)+" PM"
    }
    else if(parseInt(arrHr)>12){
        let value1 = ((parseInt(arrHr)-12)+"")
        if(value1.length===2){
        arrHr = value1+":"+arrivalTime[4].substring(3, 5)+" PM"
        }
        else{
            arrHr = "0"+value1+":"+arrivalTime[4].substring(3, 5)+" PM"   
        }
    }
    else{
        arrHr = arrivalTime[4].substring(0, 5)+" AM"
    }

    const dateString = `${departureTime[0]}, ${departureTime[1]} ${departureTime[2]}, ${departureTime[3]}`

    return (
        <Grid
            className="main"
            container
            direction="column">
            <Grid item className="date">{dateString}</Grid>
            <Grid
                container
                direction="row"
                justifyContent="space-between">
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    style={{width: "auto"}}
                    className="airports">
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        style={{width: "auto"}}>
                        <Grid item className="airport"><h2>{flightDetails.from}</h2></Grid>
                        <Grid item className="hour"><div>{depHr}</div></Grid>
                    </Grid>
                    <Grid 
                        container
                        direction="column"
                        justifyContent="center"
                        style={{width: "auto"}}>
                        <Grid item className="arrow"><ArrowForward fontSize="large" /></Grid>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{width: "auto"}}>
                        <Grid item className="airport"><h2>{flightDetails.to}</h2></Grid>
                        <Grid item className="hour"><div>{arrHr}</div></Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    style={{width: "auto"}}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        style={{width: "auto"}}
                        className="detailsOut details">
                        <Grid item><div>Flight No.</div></Grid>
                        <Grid item><div>{flightDetails.flightNumber}</div></Grid>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{width: "auto"}}>
                        <Grid item className="detailsIn details"><div>
                            <div>Available Seats</div>
                            <p className="p">{flightDetails.first>0 && flightDetails.first}</p>
                            <p className="p">{flightDetails.business>0 && flightDetails.business}</p>
                            <p className="p">{flightDetails.economy>0 && flightDetails.economy}</p>
                            <p className="p">{(flightDetails.economy<=0 && flightDetails.business<=0 && flightDetails.first<=0) && "Out of seats"}</p>
                        </div></Grid>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{width: "auto"}}
                        className="detailsOut details">
                        <Grid item><div>Cabin Class</div></Grid>
                        <Grid item><div>{flightDetails.first>0 && "First"}</div></Grid>
                        <Grid item><div>{flightDetails.business>0 && "Business"}</div></Grid>
                        <Grid item><div>{flightDetails.economy>0 && "Economy"}</div></Grid>
                        <Grid item><div>{(flightDetails.economy<=0 && flightDetails.business<=0 && flightDetails.first<=0) && "Out of seats"}</div></Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    style={{width: "auto"}}>
                    <Grid item><EditFlightModal flightDetails={flightDetails} getFlights={getFlights} /></Grid>
                    <Grid item><DeleteFlightModal flightNumber={flightDetails.flightNumber} getFlights={getFlights} /></Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Flight