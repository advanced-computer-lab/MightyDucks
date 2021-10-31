import React from 'react'
import { Grid, Button } from "@mui/material"
import { ArrowForward, Edit, DeleteForever } from "@mui/icons-material"
import "./style.css"

function Flight({flightDetails}) {

    const flightDateArray = flightDetails.date.split("-")
    const date = new Date(flightDateArray[2], flightDateArray[1], flightDateArray[0])
    const days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"]
    const months = ["December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "November"]


    const dateString = `${days[date.getDay()]}, ${months[date.getMonth()]} ${flightDateArray[0]}, ${flightDateArray[2]}`

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
                        <Grid item className="hour"><div>{flightDetails.departureTime}</div></Grid>
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
                        <Grid item className="hour"><div>{flightDetails.arrivalTime}</div></Grid>
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
                            {flightDetails.availableSeats}
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
                        <Grid item><div>{flightDetails.cabin}</div></Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    style={{width: "auto"}}>
                    <Grid item><Button><Edit /></Button></Grid>
                    <Grid item><Button className="button"><DeleteForever /></Button></Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Flight