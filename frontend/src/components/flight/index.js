import React from 'react'
import { Grid, Button } from "@mui/material"
import { ArrowForward, DeleteForever } from "@mui/icons-material"
import EditFlightModal from "../editFlightModal"
import "./style.css"

function Flight({flightDetails}) {

    const date = new Date(flightDetails.departureTime)
    const days = ["Sun" ,"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "November"]

    const dateString = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

    const arrivalDate = new Date(flightDetails.arrivalTime)

    const overnight = arrivalDate.getDay()-date.getDay()

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
                        <Grid item className="hour"><div>{flightDetails.departureTime.split(" ")[1]+" "+flightDetails.departureTime.split(" ")[2].toUpperCase()}</div></Grid>
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
                        <Grid item className="hour"><div>{overnight>0? 
                            (flightDetails.arrivalTime.split(" ")[1]+" "+flightDetails.arrivalTime.split(" ")[2].toUpperCase()+" +"+overnight)
                            : (flightDetails.arrivalTime.split(" ")[1]+" "+flightDetails.arrivalTime.split(" ")[2].toUpperCase())
                        }</div></Grid>
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
                    <Grid item><EditFlightModal flightDetails={flightDetails} /></Grid>
                    <Grid item><Button className="button"><DeleteForever /></Button></Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Flight