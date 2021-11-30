import React from 'react'
import {Modal, Typography, Button, Box, Grid} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import axios from "axios"
import { toast } from 'react-toastify';
import { NavLink, Navigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ChildModal(props) {
    const handleOpen = () => {
      props.setOpen(true);
    };
    const handleClose = () => {
      props.setOpen(false);
    };
    console.log("child", props.open)
  
    return (
      <React.Fragment>
        <Modal
          hideBackdrop
          open={props.open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Your are not logged in</h2>
            <p id="child-modal-description">
              Please <NavLink style={{color:"#017A9B"}} to={{pathname: "/"}}>Sign In</NavLink> to continue your reservation.
            </p>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

export default function TripDetails({open, setOpen, setDeleted, bookingId, departureFlight, departingFlightSeats, returnFlight, returningFlightSeats, create, upcoming, user}) {
    const handleClose = () => setOpen(false);

    const departureTime1 = (new Date(departureFlight.departureTime).toString()).split(" ")
    const arrivalTime1 = (new Date(departureFlight.arrivalTime).toString()).split(" ")
    
    var depHr1 = departureTime1[4].substring(0, 2)
    var arrHr1 = arrivalTime1[4].substring(0, 2)

    if(depHr1==="00"){
        depHr1 = "12:"+departureTime1[4].substring(3,5)+" AM"
    }
    else if(depHr1==="12"){
        depHr1 = "12:"+departureTime1[4].substring(3,5)+" PM"
    }
    else if(parseInt(depHr1)>12){
        let value1 = ((parseInt(depHr1)-12)+"")
        if(value1.length===2){
        depHr1 = value1+":"+departureTime1[4].substring(3,5)+" PM"
        }
        else{
            depHr1 = "0"+value1+":"+departureTime1[4].substring(3,5)+" PM"   
        }
    }
    else{
        depHr1 = departureTime1[4].substring(0,5)+" AM"
    }

    if(arrHr1==="00"){
        arrHr1 = "12:"+arrivalTime1[4].substring(3, 5)+" AM"
    }
    else if(arrHr1==="12"){
        arrHr1 = "12:"+arrivalTime1[4].substring(3, 5)+" PM"
    }
    else if(parseInt(arrHr1)>12){
        let value1 = ((parseInt(arrHr1)-12)+"")
        if(value1.length===2){
        arrHr1 = value1+":"+arrivalTime1[4].substring(3, 5)+" PM"
        }
        else{
            arrHr1 = "0"+value1+":"+arrivalTime1[4].substring(3, 5)+" PM"   
        }
    }
    else{
        arrHr1 = arrivalTime1[4].substring(0, 5)+" AM"
    }

    const date1 = new Date(departureFlight.departureTime);
    const date2 = new Date(departureFlight.arrivalTime);
    const difftime = Math.abs(date1 - date2) / 36e5;




    const departureTime2 = (new Date(returnFlight.departureTime).toString()).split(" ")
    const arrivalTime2 = (new Date(returnFlight.arrivalTime).toString()).split(" ")

    var depHr = departureTime2[4].substring(0, 2)
    var arrHr = arrivalTime2[4].substring(0, 2)

    if(depHr==="00"){
        depHr = "12:"+departureTime2[4].substring(3,5)+" AM"
    }
    else if(depHr==="12"){
        depHr = "12:"+departureTime2[4].substring(3,5)+" PM"
    }
    else if(parseInt(depHr)>12){
        let value1 = ((parseInt(depHr)-12)+"")
        if(value1.length===2){
        depHr = value1+":"+departureTime2[4].substring(3,5)+" PM"
        }
        else{
            depHr = "0"+value1+":"+departureTime2[4].substring(3,5)+" PM"   
        }
    }
    else{
        depHr = departureTime2[4].substring(0,5)+" AM"
    }

    if(arrHr==="00"){
        arrHr = "12:"+arrivalTime2[4].substring(3, 5)+" AM"
    }
    else if(arrHr==="12"){
        arrHr = "12:"+arrivalTime2[4].substring(3, 5)+" PM"
    }
    else if(parseInt(arrHr)>12){
        let value1 = ((parseInt(arrHr)-12)+"")
        if(value1.length===2){
        arrHr = value1+":"+arrivalTime2[4].substring(3, 5)+" PM"
        }
        else{
            arrHr = "0"+value1+":"+arrivalTime2[4].substring(3, 5)+" PM"   
        }
    }
    else{
        arrHr = arrivalTime2[4].substring(0, 5)+" AM"
    }

    var cabin = "Economy"
    var priceAddOn = 0;
    if(departingFlightSeats[0].charAt(0)==="B"){
        priceAddOn = 100;
        cabin = "Business"
    }
    else if(departingFlightSeats[0].charAt(0)==="F"){
        priceAddOn = 400;
        cabin = "First"
    }

    const date11 = new Date(departureFlight.departureTime);
    const date22 = new Date(departureFlight.arrivalTime);
    const difftime1 = Math.abs(date11 - date22) / 36e5;


    const [checker, setChecker] = React.useState(false)
    const [checker2, setChecker2] = React.useState(false)

    const handleCancel = () => {
        console.log("cancel reservation")
        //update user
        
        const userNewFlights = user.flights.filter((flight) => {
            return flight.split(' ')[4] !== bookingId
        })
        var userDUDE = {oldUserName:user.userName ,userName:user.userName,firstName:user.firstName ,lastName:user.lastName,email:user.email,passportNumber:user.passportNumber,password:user.password, flights: userNewFlights}
        updateUser(userDUDE);

        //updateflight dep
        const depNewSeats = departureFlight.bookedSeats.filter((seat) => {
            return !departingFlightSeats.includes(seat)
        })
        var departureFlightdetails={from:departureFlight.from, to:departureFlight.to, departureTime: departureFlight.departureTime,arrivalTime:departureFlight.arrivalTime,economy:(cabin==="Economy"? departureFlight.economy+departingFlightSeats.length : departureFlight.economy),business:(cabin==="Business"? departureFlight.business+departingFlightSeats.length : departureFlight.business), first:(cabin==="First"? departureFlight.first+departingFlightSeats.length : departureFlight.first),flightNumber:departureFlight.flightNumber, oldFlightNumber: departureFlight.flightNumber, baggageAllowance: departureFlight.baggageAllowance, price:departureFlight.price, bookedSeats: depNewSeats}
        updateFlight(departureFlightdetails)
        
        //updateflight ret
        const retNewSeats = returnFlight.bookedSeats.filter((seat) => {
            return !returningFlightSeats.includes(seat)
        })
        var returnFlightdetails={from:returnFlight.from, to:returnFlight.to, departureTime: returnFlight.departureTime,arrivalTime:returnFlight.arrivalTime,economy:(cabin==="Economy"? returnFlight.economy+returningFlightSeats.length : returnFlight.economy),business:(cabin==="Business"? returnFlight.business+returningFlightSeats.length : returnFlight.business), first:(cabin==="First"? returnFlight.first+returningFlightSeats.length : returnFlight.first),flightNumber:returnFlight.flightNumber, oldFlightNumber: returnFlight.flightNumber, baggageAllowance: returnFlight.baggageAllowance, price:returnFlight.price, bookedSeats: retNewSeats}
            updateFlight(returnFlightdetails)

            
        //check all updates success
        if(!checker2){
                toast.success("Trip cancelled successfully!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                setDeleted(true)
                handleClose()
                //Send mail to user with cancellation details
        }
    }

    const [child, setChild] = React.useState(false)
    const [Redirect, setRedirect] = React.useState(false)

    const handleConfirm = () => {
        console.log("confirm reservation")
        if(user===null){
            setChild(true)
        }
        else{
            var returnFlightdetails={
                from:returnFlight.from, to:returnFlight.to, departureTime: returnFlight.departureTime,arrivalTime:returnFlight.arrivalTime,economy:(cabin==="Economy"? returnFlight.economy-returningFlightSeats.length : returnFlight.economy),business:(cabin==="Business"? returnFlight.business-returningFlightSeats.length : returnFlight.business), first:(cabin==="First"? returnFlight.first-returningFlightSeats.length : returnFlight.first),flightNumber:returnFlight.flightNumber, oldFlightNumber: returnFlight.flightNumber, baggageAllowance: returnFlight.baggageAllowance, price:returnFlight.price, bookedSeats: returnFlight.bookedSeats.concat(returningFlightSeats)
            }
            updateFlight(returnFlightdetails)
            var departureFlightdetails={
                from:departureFlight.from, to:departureFlight.to, departureTime: departureFlight.departureTime,arrivalTime:departureFlight.arrivalTime,economy:(cabin==="Economy"? departureFlight.economy-departingFlightSeats.length : departureFlight.economy),business:(cabin==="Business"? departureFlight.business-departingFlightSeats.length : departureFlight.business), first:(cabin==="First"? departureFlight.first-departingFlightSeats.length : departureFlight.first),flightNumber:departureFlight.flightNumber, oldFlightNumber: departureFlight.flightNumber, baggageAllowance: departureFlight.baggageAllowance, price:departureFlight.price, bookedSeats: departureFlight.bookedSeats.concat(departingFlightSeats)
            }
            updateFlight(departureFlightdetails)
            const usernewflights = departureFlight.flightNumber+" "+departingFlightSeats+" "+returnFlight.flightNumber+" "+returningFlightSeats+" "+bookingId
            var userDUDE= {oldUserName:user.userName ,userName:user.userName,firstName:user.firstName ,lastName:user.lastName,email:user.email,passportNumber:user.passportNumber,password:user.password, flights: user.flights.concat([usernewflights])}
            updateUser(userDUDE);
            if(!checker){
                toast.success("Trip booked successfully!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                setRedirect(true);
            }
        }
    }

    const updateFlight=async(data)=>{
        await axios.post('http://localhost:5000/flight/update', data)
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
            create ? setChecker(true) : setChecker2(true)
        });
    };

    const updateUser=async(data)=>{
        await axios.post('http://localhost:5000/user/update', data)
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
            create ? setChecker(true) : setChecker2(true)
        });
    };

    return (
        <div>
            {child && <ChildModal open={child} setOpen={setChild} />}
            {Redirect && <Navigate to='/'/>}
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Mighty Ducks Airline
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Reservation Id <span style={{textDecoration: "underline"}}>{bookingId}</span>
                </Typography>
                <br/>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Grid container direction="column" justifyContent="space-around">
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item>{`Departure Flight ${departureFlight.flightNumber}`}</Grid>
                            <Grid item>{`${departureTime1[0]}, ${departureTime1[1]} ${departureTime1[2]}, ${departureTime1[3]}`}</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-evenly">
                            <Grid item>{departureFlight.from}</Grid>
                            <Grid item><ArrowForward fontSize="large"/></Grid>
                            <Grid item>{departureFlight.to}</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-evenly">
                            <Grid item>{depHr1}</Grid>
                            <Grid item>{Math.floor(difftime)}h {((difftime%1)*60)>0 && parseInt((difftime%1)*60)+"m"}</Grid>
                            <Grid item>{arrHr1}</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item>{`Seats: ${departingFlightSeats}`}</Grid>
                            <Grid item>{cabin+" class"}</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item>Seats</Grid>
                            <Grid item>Price($)</Grid>
                            <Grid item>Total($)</Grid>
                        </Grid>
                        <Grid style={{textDecoration: "underline"}} container direction="row" justifyContent="space-between">
                            <Grid item>{departingFlightSeats.length}</Grid>
                            <Grid item>{departureFlight.price+priceAddOn}</Grid>
                            <Grid item>{departingFlightSeats.length*(departureFlight.price+priceAddOn)}</Grid>
                        </Grid>
                    </Grid>
                </Typography>
                <br />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Grid container direction="column" justifyContent="space-around">
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item>{`Returning Flight ${returnFlight.flightNumber}`}</Grid>
                            <Grid item>{`${departureTime2[0]}, ${departureTime2[1]} ${departureTime2[2]}, ${departureTime2[3]}`}</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-evenly">
                            <Grid item>{returnFlight.from}</Grid>
                            <Grid item><ArrowForward fontSize="large"/></Grid>
                            <Grid item>{returnFlight.to}</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-evenly">
                            <Grid item>{depHr}</Grid>
                            <Grid item>{Math.floor(difftime1)}h {((difftime1%1)*60)>0 && parseInt((difftime1%1)*60)+"m"}</Grid>
                            <Grid item>{arrHr}</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item>{`Seats: ${returningFlightSeats}`}</Grid>
                            <Grid item>{cabin+" class"}</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item>Seats</Grid>
                            <Grid item>Price($)</Grid>
                            <Grid item>Total($)</Grid>
                        </Grid>
                        <Grid style={{textDecoration: "underline"}} container direction="row" justifyContent="space-between">
                            <Grid item>{returningFlightSeats.length}</Grid>
                            <Grid item>{returnFlight.price+priceAddOn}</Grid>
                            <Grid item>{returningFlightSeats.length*(returnFlight.price+priceAddOn)}</Grid>
                        </Grid>
                    </Grid>
                </Typography>
                <br/>
                <Typography style={{backgroundColor: "#017A9B", color: "white"}} id="modal-modal-title" variant="h6" component="h2">
                    <Grid container direction="row" justifyContent="space-evenly">
                        <Grid item>Total Price:</Grid>
                        <Grid item>{departingFlightSeats.length*(departureFlight.price+priceAddOn) + returningFlightSeats.length*(returnFlight.price+priceAddOn)}</Grid>
                    </Grid>
                </Typography>
                <br/>
                {!create && upcoming && <Grid item style={{ fontSize:"15px", textDecoration: "underline", cursor: "pointer" }} onClick={handleCancel}>cancel reservation</Grid>}
                {create && !upcoming && <Button variant="outlined" style={{ color: "#017A9B"}} onClick={handleConfirm}>Confirm reservation</Button>}
            </Box>
            </Modal>
        </div>
    );
}
