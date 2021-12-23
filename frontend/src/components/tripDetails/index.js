import React from 'react'
import {Modal, Typography, Button, Box, Grid} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import axios from "axios"
import { toast } from 'react-toastify';
import { NavLink, Navigate } from 'react-router-dom';
import ConfirmationModal from "../confirmationModal"
import ChangeSeatsModal from "../changeSeatsModal"
import ChangeFlightModal from "../changeFlightModal"

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

    const handleClose = () => {
      props.setOpen(false);
    };
  
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

    const header = { headers:{
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
        }
    }

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

    var cabin1 = "Economy"
    var priceAddOn1 = 0;
    if(departingFlightSeats[0].charAt(0)==="B"){
        priceAddOn1 = 100;
        cabin1 = "Business"
    }
    else if(departingFlightSeats[0].charAt(0)==="F"){
        priceAddOn1 = 400;
        cabin1 = "First"
    }

    var cabin2 = "Economy"
    var priceAddOn2 = 0;
    if(returningFlightSeats[0].charAt(0)==="B"){
        priceAddOn2 = 100;
        cabin2 = "Business"
    }
    else if(returningFlightSeats[0].charAt(0)==="F"){
        priceAddOn2 = 400;
        cabin2 = "First"
    }

    const date11 = new Date(departureFlight.departureTime);
    const date22 = new Date(departureFlight.arrivalTime);
    const difftime1 = Math.abs(date11 - date22) / 36e5;


    const [checker, setChecker] = React.useState(false)
    const [checker2, setChecker2] = React.useState(false)
    const [cancelModal, setCancelModal] = React.useState(false);

    const handleCancelModal = () => {
        setCancelModal(true)
    }

    const handleCancel = () => {
        const userNewFlights = user.flights.filter((flight) => {
            return flight.split(' ')[4] !== bookingId
        })
        var userDUDE = {oldUserName:user.userName ,userName:user.userName,firstName:user.firstName ,lastName:user.lastName,email:user.email,passportNumber:user.passportNumber,password:user.password, flights: userNewFlights}
        updateUser(userDUDE);

        //updateflight dep
        const depNewSeats = departureFlight.bookedSeats.filter((seat) => {
            return !departingFlightSeats.includes(seat)
        })
        var departureFlightdetails={from:departureFlight.from, to:departureFlight.to, departureTime: departureFlight.departureTime,arrivalTime:departureFlight.arrivalTime,economy:(cabin1==="Economy"? departureFlight.economy+departingFlightSeats.length : departureFlight.economy),business:(cabin1==="Business"? departureFlight.business+departingFlightSeats.length : departureFlight.business), first:(cabin1==="First"? departureFlight.first+departingFlightSeats.length : departureFlight.first),flightNumber:departureFlight.flightNumber, oldFlightNumber: departureFlight.flightNumber, baggageAllowance: departureFlight.baggageAllowance, price:departureFlight.price, bookedSeats: depNewSeats}
        updateFlight(departureFlightdetails)
        
        //updateflight ret
        const retNewSeats = returnFlight.bookedSeats.filter((seat) => {
            return !returningFlightSeats.includes(seat)
        })
        var returnFlightdetails={from:returnFlight.from, to:returnFlight.to, departureTime: returnFlight.departureTime,arrivalTime:returnFlight.arrivalTime,economy:(cabin2==="Economy"? returnFlight.economy+returningFlightSeats.length : returnFlight.economy),business:(cabin2==="Business"? returnFlight.business+returningFlightSeats.length : returnFlight.business), first:(cabin2==="First"? returnFlight.first+returningFlightSeats.length : returnFlight.first),flightNumber:returnFlight.flightNumber, oldFlightNumber: returnFlight.flightNumber, baggageAllowance: returnFlight.baggageAllowance, price:returnFlight.price, bookedSeats: retNewSeats}
            updateFlight(returnFlightdetails)

            
        //check all updates success
        if(!checker2){
                toast.success("Trip cancelled successfully!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                setDeleted(true)
                const emailData={
                    firstName: user.firstName,
                    depdate: `${departureTime1[0]}, ${departureTime1[1]} ${departureTime1[2]}, ${departureTime1[3]}`,
                    depTime: depHr,
                    departureAirport: departureFlight.from,
                    arrivalAirport: departureFlight.to,
                    retDate: `${departureTime2[0]}, ${departureTime2[1]} ${departureTime2[2]}, ${departureTime2[3]}`,
                    retTime: arrHr,
                    refund: parseInt(departingFlightSeats.length*(departureFlight.price+priceAddOn1) + returningFlightSeats.length*(returnFlight.price+priceAddOn2)),
                    email: user.email,
                    type: "cancel"
                }
                sendCancelEmail(emailData)
                handleClose()
        }
    }

    const [child, setChild] = React.useState(false)
    const [Redirect, setRedirect] = React.useState(false)

    const handleConfirm = () => {
        if(localStorage.getItem("token")===null){
            setChild(true)
        }
        else{
            var returnFlightdetails={
                from:returnFlight.from, to:returnFlight.to, departureTime: returnFlight.departureTime,arrivalTime:returnFlight.arrivalTime,economy:(cabin2==="Economy"? returnFlight.economy-returningFlightSeats.length : returnFlight.economy),business:(cabin2==="Business"? returnFlight.business-returningFlightSeats.length : returnFlight.business), first:(cabin2==="First"? returnFlight.first-returningFlightSeats.length : returnFlight.first),flightNumber:returnFlight.flightNumber, oldFlightNumber: returnFlight.flightNumber, baggageAllowance: returnFlight.baggageAllowance, price:returnFlight.price, bookedSeats: returnFlight.bookedSeats.concat(returningFlightSeats)
            }
            updateFlight(returnFlightdetails)
            var departureFlightdetails={
                from:departureFlight.from, to:departureFlight.to, departureTime: departureFlight.departureTime,arrivalTime:departureFlight.arrivalTime,economy:(cabin1==="Economy"? departureFlight.economy-departingFlightSeats.length : departureFlight.economy),business:(cabin1==="Business"? departureFlight.business-departingFlightSeats.length : departureFlight.business), first:(cabin1==="First"? departureFlight.first-departingFlightSeats.length : departureFlight.first),flightNumber:departureFlight.flightNumber, oldFlightNumber: departureFlight.flightNumber, baggageAllowance: departureFlight.baggageAllowance, price:departureFlight.price, bookedSeats: departureFlight.bookedSeats.concat(departingFlightSeats)
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
        await axios.post('http://localhost:5000/flight/update', data, header)
        .then((res) => {
        }).catch((error) => {
            console.log(error)
            create ? setChecker(true) : setChecker2(true)
        });
    };

    const updateUser=async(data)=>{
        await axios.post('http://localhost:5000/user/update', data, header)
        .then((res) => {
        }).catch((error) => {
            console.log(error)
            create ? setChecker(true) : setChecker2(true)
        });
    };

    const sendCancelEmail=async(data)=>{
        await axios.post('http://localhost:5000/user/notify', data, header)
        .then(() => {
        }).catch((error) => {
            console.log(error)
        });
    };


    const [changeSeats, setChangeSeats] = React.useState(false)
    const [changeSeatsFlight, setChangeSeatsFlight] = React.useState(null)
    const [changeSeatsFlightSeats, setChangeSeatsFlightSeats] = React.useState(null)
    const [changeSeatsCabin, setChangeSeatsCabin] = React.useState(false)
    const [newSeats, setNewSeats] = React.useState([])
    const [confirmNewSeats, setConfirmNewSeats] = React.useState(false)
    const [changedSeatsFlight, setChangedSeatsFlight] = React.useState(false)
    
    

    const handleSendItinerary = () => {
        //send an email to user with their itinerary
        toast.success("Your trip itinerary has been sent to your email!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    const handleChangeSeats = (depFlight) => {
        setChangedSeatsFlight(depFlight)
        setNewSeats([]);
        setConfirmNewSeats(false);
        if(depFlight){
            setChangeSeatsFlight(departureFlight)
            setChangeSeatsFlightSeats(departingFlightSeats)
            setChangeSeatsCabin(cabin1)
            
        }
        else{
            setChangeSeatsFlight(returnFlight)
            setChangeSeatsFlightSeats(returningFlightSeats)
            setChangeSeatsCabin(cabin2)
            
        }
        setChangeSeats(true)
    }

    React.useEffect(() => {
        if(confirmNewSeats){
            if(newSeats.length===changeSeatsFlightSeats.length){
                handleChangeSeatsConfirm();
            }
            else{
                toast.warn("You haven't chosen enough seats!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            setConfirmNewSeats(false);
        }
    }, [confirmNewSeats])


    const handleChangeSeatsConfirm = () => {
        var userNewFlights = user.flights.filter((flight) => {
            return flight.split(' ')[4] !== bookingId
        })
        if(changedSeatsFlight){
            userNewFlights = userNewFlights.concat([departureFlight.flightNumber+" "+newSeats+" "+returnFlight.flightNumber+" "+returningFlightSeats+" "+bookingId])
            
            //updateflight dep

            const depNewSeats = departureFlight.bookedSeats.filter((seat) => {
                return !departingFlightSeats.includes(seat)
            })
            var departureFlightdetails={from:departureFlight.from, to:departureFlight.to, departureTime: departureFlight.departureTime,arrivalTime:departureFlight.arrivalTime,economy:departureFlight.economy, business:departureFlight.business, first:departureFlight.first ,flightNumber:departureFlight.flightNumber, oldFlightNumber: departureFlight.flightNumber, baggageAllowance: departureFlight.baggageAllowance, price:departureFlight.price, bookedSeats: depNewSeats.concat(newSeats)}
            updateFlight(departureFlightdetails)
        }
        else{
            userNewFlights = userNewFlights.concat([departureFlight.flightNumber+" "+departingFlightSeats+" "+returnFlight.flightNumber+" "+newSeats+" "+bookingId])
            
            //updateflight ret
            const retNewSeats = returnFlight.bookedSeats.filter((seat) => {
                return !returningFlightSeats.includes(seat)
            })
            var returnFlightdetails={from:returnFlight.from, to:returnFlight.to, departureTime: returnFlight.departureTime,arrivalTime:returnFlight.arrivalTime,economy:returnFlight.economy, business: returnFlight.business, first: returnFlight.first, flightNumber:returnFlight.flightNumber, oldFlightNumber: returnFlight.flightNumber, baggageAllowance: returnFlight.baggageAllowance, price:returnFlight.price, bookedSeats: retNewSeats.concat(newSeats)}
                updateFlight(returnFlightdetails)
        }
        var userDUDE = {oldUserName:user.userName ,userName:user.userName,firstName:user.firstName ,lastName:user.lastName,email:user.email,passportNumber:user.passportNumber,password:user.password, flights: userNewFlights}
        updateUser(userDUDE);
        

        if(changedSeatsFlight){
            toast.success("New Seats in departure flight have been successfully booked!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        else{
            toast.success("New Seats in return flight have been successfully booked!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        setChangeSeats(false);
        setDeleted(true)
    }



    const [changeFlight, setChangeFlight] = React.useState(false)
    const [flightType, setFlightType] = React.useState("")
    const [otherDate, setOtherDate] = React.useState("")
    const [changeFlightOldFlight, setChangeFlightOldFlight] = React.useState(null)
    const [changeFlightOldSeats, setChangeFlightOldSeats] = React.useState(null)
    const [changeFlightOldCabin, setChangeFlightOldCabin] = React.useState(null)
    const [changeFlightNewFlight, setChangeFlightNewFlight] = React.useState(null)
    const [changeFlightNewSeats, setChangeFlightNewSeats] = React.useState([])
    const [confirmNewFlight, setConfirmNewFlight] = React.useState(false)

    const handleChangeFlight = (depFlight) => {
        setChangeFlightNewFlight(null);
        setChangeFlightNewSeats([])
        setConfirmNewFlight(false);
        if(depFlight){
            setChangeFlightOldFlight(departureFlight)
            setFlightType("dep")
            setOtherDate(returnFlight.departureTime)
            setChangeFlightOldSeats(departingFlightSeats)
            setChangeFlightOldCabin(cabin1)
        }
        else{
            setChangeFlightOldFlight(returnFlight)
            setFlightType("ret")
            setOtherDate(departureFlight.departureTime)
            setChangeFlightOldSeats(returningFlightSeats)
            setChangeFlightOldCabin(cabin2)
        }
        setChangeFlight(true)
    }

    React.useEffect(() => {
        if(confirmNewFlight){
            handleChangeFlightConfirm();
            setConfirmNewSeats(false);
        }
    }, [confirmNewFlight])

    const handleChangeFlightConfirm = () => {
        console.log(changeFlightNewFlight)
        console.log(changeFlightNewSeats)



        var userNewFlights = user.flights.filter((flight) => {
            return flight.split(' ')[4] !== bookingId
        })
        if(flightType==="dep"){
            userNewFlights = userNewFlights.concat([changeFlightNewFlight.flightNumber+" "+changeFlightNewSeats+" "+returnFlight.flightNumber+" "+returningFlightSeats+" "+bookingId])
            
            //updateflight dep
            const depNewSeats = departureFlight.bookedSeats.filter((seat) => {
                return !departingFlightSeats.includes(seat)
            })
            var departureFlightdetails={from:departureFlight.from, to:departureFlight.to, departureTime: departureFlight.departureTime,arrivalTime:departureFlight.arrivalTime,economy:(cabin1==="Economy"? departureFlight.economy+departingFlightSeats.length : departureFlight.economy),business:(cabin1==="Business"? departureFlight.business+departingFlightSeats.length : departureFlight.business), first:(cabin1==="First"? departureFlight.first+departingFlightSeats.length : departureFlight.first),flightNumber:departureFlight.flightNumber, oldFlightNumber: departureFlight.flightNumber, baggageAllowance: departureFlight.baggageAllowance, price:departureFlight.price, bookedSeats: depNewSeats}
            updateFlight(departureFlightdetails)
        
        }
        else if(flightType==="ret"){
            userNewFlights = userNewFlights.concat([departureFlight.flightNumber+" "+departingFlightSeats+" "+changeFlightNewFlight.flightNumber+" "+changeFlightNewSeats+" "+bookingId])
            
            //updateflight ret
            const retNewSeats = returnFlight.bookedSeats.filter((seat) => {
                return !returningFlightSeats.includes(seat)
            })
            var returnFlightdetails={from:returnFlight.from, to:returnFlight.to, departureTime: returnFlight.departureTime,arrivalTime:returnFlight.arrivalTime,economy:(cabin2==="Economy"? returnFlight.economy+returningFlightSeats.length : returnFlight.economy),business:(cabin2==="Business"? returnFlight.business+returningFlightSeats.length : returnFlight.business), first:(cabin2==="First"? returnFlight.first+returningFlightSeats.length : returnFlight.first),flightNumber:returnFlight.flightNumber, oldFlightNumber: returnFlight.flightNumber, baggageAllowance: returnFlight.baggageAllowance, price:returnFlight.price, bookedSeats: retNewSeats}
            updateFlight(returnFlightdetails)
        }
        var userDUDE = {oldUserName:user.userName ,userName:user.userName,firstName:user.firstName ,lastName:user.lastName,email:user.email,passportNumber:user.passportNumber,password:user.password, flights: userNewFlights}
        updateUser(userDUDE);

        var newFlightdetails={
            from:changeFlightNewFlight.from, to:changeFlightNewFlight.to, departureTime: changeFlightNewFlight.departureTime,arrivalTime:changeFlightNewFlight.arrivalTime,economy:(changeFlightNewSeats[0].charAt(0)==="E"? changeFlightNewFlight.economy-changeFlightNewSeats.length : changeFlightNewFlight.economy),business:(changeFlightNewSeats[0].charAt(0)==="B"? changeFlightNewFlight.business-changeFlightNewSeats.length : changeFlightNewFlight.business), first:(changeFlightNewSeats[0].charAt(0)==="F"? changeFlightNewFlight.first-changeFlightNewSeats.length : changeFlightNewFlight.first),flightNumber:changeFlightNewFlight.flightNumber, oldFlightNumber: changeFlightNewFlight.flightNumber, baggageAllowance: changeFlightNewFlight.baggageAllowance, price:changeFlightNewFlight.price, bookedSeats: changeFlightNewFlight.bookedSeats.concat(changeFlightNewSeats)
        }
        updateFlight(newFlightdetails)
        

        if(flightType==="dep"){
            toast.success(`Your Departure flight changed to ${changeFlightNewFlight.flightNumber}!`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        else if(flightType==="ret"){
            toast.success(`Your Return flight changed to ${changeFlightNewFlight.flightNumber}!`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        setChangeFlight(false);
        setDeleted(true)
    }

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
                            <Grid item>{cabin1+" class"}</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item>Seats</Grid>
                            <Grid item>Price($)</Grid>
                            <Grid item>Total($)</Grid>
                        </Grid>
                        <Grid style={{textDecoration: "underline"}} container direction="row" justifyContent="space-between">
                            <Grid item>{departingFlightSeats.length}</Grid>
                            <Grid item>{departureFlight.price+priceAddOn1}</Grid>
                            <Grid item>{departingFlightSeats.length*(departureFlight.price+priceAddOn1)}</Grid>
                        </Grid>
                        {!create && upcoming && <Grid container direction="row" justifyContent="space-between">
                            <Grid item><Button style={{color: "#FF4500"}} onClick={()=> handleChangeSeats(true)}>Change Seats?</Button></Grid>
                            <Grid item><Button style={{color: "#FF4500"}} onClick={()=> handleChangeFlight(true)}>Find a different flight?</Button></Grid>
                        </Grid>}
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
                            <Grid item>{cabin2+" class"}</Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between">
                            <Grid item>Seats</Grid>
                            <Grid item>Price($)</Grid>
                            <Grid item>Total($)</Grid>
                        </Grid>
                        <Grid style={{textDecoration: "underline"}} container direction="row" justifyContent="space-between">
                            <Grid item>{returningFlightSeats.length}</Grid>
                            <Grid item>{returnFlight.price+priceAddOn2}</Grid>
                            <Grid item>{returningFlightSeats.length*(returnFlight.price+priceAddOn2)}</Grid>
                        </Grid>
                        {!create && upcoming && <Grid container direction="row" justifyContent="space-between">
                            <Grid item><Button style={{color: "#FF4500"}} onClick={()=> handleChangeSeats(false)}>Change Seats?</Button></Grid>
                            <Grid item><Button style={{color: "#FF4500"}} onClick={()=> handleChangeFlight(false)}>Find a different flight?</Button></Grid>
                        </Grid>}
                    </Grid>
                </Typography>
                <br/>
                <Typography style={{backgroundColor: "#017A9B", color: "white"}} id="modal-modal-title" variant="h6" component="h2">
                    <Grid container direction="row" justifyContent="space-evenly">
                        <Grid item>Total Price:</Grid>
                        <Grid item>${departingFlightSeats.length*(departureFlight.price+priceAddOn1) + returningFlightSeats.length*(returnFlight.price+priceAddOn2)}</Grid>
                    </Grid>
                </Typography>
                <br/>
                {!create && upcoming && <Grid container direction="row" justifyContent="space-between">
                    <Grid item style={{ fontSize:"15px", textDecoration: "underline", cursor: "pointer" }} onClick={handleCancelModal}>cancel reservation</Grid>
                    <Grid item style={{ fontSize:"15px", textDecoration: "underline", cursor: "pointer" }} onClick={handleSendItinerary}>Resend itinerary</Grid>
                </Grid>}
                {!create && upcoming && <Grid container direction="row" justifyContent="space-between">
                    {cancelModal && <ConfirmationModal bookingId={bookingId} open={cancelModal} setOpen={setCancelModal} setConfirm={handleCancel}/>}
                    {changeSeats && <ChangeSeatsModal setConfirmNewSeats={setConfirmNewSeats} setNewSeats={setNewSeats} flight={changeSeatsFlight} cabin={changeSeatsCabin} oldFlightSeats={changeSeatsFlightSeats} setFlightSeats={setChangeSeatsFlightSeats} open={changeSeats} setOpen={setChangeSeats}/>}
                    {changeFlight && <ChangeFlightModal setNewFlight={setChangeFlightNewFlight} setNewSeats={setChangeFlightNewSeats} setConfirmNewFlight={setConfirmNewFlight} oldFlight={changeFlightOldFlight} otherDate={otherDate} flightType={flightType} oldSeats={changeFlightOldSeats} oldCabin={changeFlightOldCabin} open={changeFlight} setOpen={setChangeFlight} />}
                </Grid>}
                {create && !upcoming && <Button variant="outlined" style={{ color: "#017A9B"}} onClick={handleConfirm}>Confirm reservation</Button>}
            </Box>
            </Modal>
        </div>
    );
}
