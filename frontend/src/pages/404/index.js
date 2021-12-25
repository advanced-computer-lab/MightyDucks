import { Grid } from '@mui/material'
import React from 'react'
import { NavLink } from "react-router-dom"
import Gif404 from '../../assets/Images/gif404.gif'

function Page404() {
    return (
        <Grid container direction="row" justifyContent="space-between" style={{fontFamily: "roboto"}}>
            <Grid direction="column" container style={{width: "50%"}}>
                <Grid item><h1 style={{marginTop: "3em", marginLeft: "2em", textAlign: "left", fontSize: "2em", }}>404 Page Not Found</h1></Grid>
                <Grid item><h2 style={{marginLeft: "2em", textAlign: "left", fontSize: "2em", }}>This route doesn't exist. Click <NavLink style={{color:"#017A9B"}} to={{pathname: "/"}}>Here</NavLink> to go to the Dashboard</h2></Grid>
                <Grid item><h4 style={{marginTop: "6em", textAlign: "right", fontSize: "2em", }}>Vincent Vega is lost... So are You.</h4></Grid>
            </Grid>
            <Grid item style={{marginTop: "6em", marginRight: "15em"}}><img width={300} src={Gif404} alt="Vincent Vega is lost... So is You."/></Grid>
        </Grid>
    )
}

export default Page404
