import {Modal,Box ,Typography, Tooltip} from '@mui/material';
import React, { useEffect } from 'react';
import styles from './index.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { ContainedButton , TextFields} from '../buttons/styledButtons';
import axios from 'axios';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { Button } from "@mui/material"
import { Edit } from "@mui/icons-material"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlightModal =({flightDetails, getFlights})=>{
    const [flightNum,setFlightNum]=React.useState(flightDetails.flightNumber);
    const [departureTime,setDepartureTime]=React.useState(flightDetails.departureTime);
    const [arrivalTime,setArrivalTime]=React.useState(flightDetails.arrivalTime);
    const [from,setFrom]=React.useState(flightDetails.from);
    const [to,setTo]=React.useState(flightDetails.to);
    const [economySeats,setEconomySeats]=React.useState(flightDetails.economy);
    const [businessSeats,setBusinessSeats]=React.useState(flightDetails.business);
    const [firstSeats,setFirstSeats]=React.useState(flightDetails.first);
    const [flightNumErr,setFlightNumErr]=React.useState("");
    const [arrivalTimeErr,setArrivalTimeErr]=React.useState("");
    const [departureErr,setDepartureErr]=React.useState("");
    const [economyErr,setEconomyErr]=React.useState("");
    const [businessErr,setBusinessErr]=React.useState("");
    const [firstErr,setFirstErr]=React.useState("");
    const [fromErr,setFromErr]=React.useState("");
    const [toErr,setToErr]=React.useState("");
    const [blockButton, setblockButton] = React.useState(false);
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const Add=()=>{
        setDepartureErr("");
        var result = validateFields();
        if (result){
            var Flightdetails={
                from:from, to:to, departureTime: departureTime,arrivalTime:arrivalTime,economy:economySeats,business:businessSeats, first:firstSeats,flightNumber:flightNum, oldFlightNumber: flightDetails.flightNumber, baggageAllowance: 45, price:200, bookedSeats: flightDetails.bookedSeats
            }
            updateFlight(Flightdetails)
        }
    }
    const validateFields=()=>{
        setFlightNumErr(flightNum?"":"flightNum error");
        setFromErr(from && from.length===3?"":"from error");
        setToErr(to && to.length===3?"":"to error");
        setEconomyErr(economySeats.length!==0 && economySeats>-1?"":"economy error");
        setBusinessErr(businessSeats.length!==0 && businessSeats>-1?"":"business error");
        setFirstErr(firstSeats.length!==0 && firstSeats>-1?"":"first error");
        setDepartureErr(( departureTime.length!==0 && new Date(departureTime)>=new Date())?"":"departure error val");
        setArrivalTimeErr(( arrivalTime.length!==0 && new Date(departureTime)<new Date(arrivalTime))?"":"arrivalTime error val");
        if(!flightNum || !departureTime ||departureTime.length===0 || arrivalTime.length===0 ||!arrivalTime || !from || !to || economySeats.length===0 || economySeats<=-1 || businessSeats.length===0 || businessSeats<=-1|| firstSeats.length===0 || firstSeats<=-1){
            console.log("empty fields");
            return false;
        }
        if(from.length!==3 || to.length!==3){
            console.log("error in lengths")
            return false;
        }
        if(economySeats<0 || businessSeats<0 || firstSeats<0){
            console.log("seats error")
            return false;
        }
        if(departureTime>=arrivalTime || departureTime<new Date()){
            console.log("date Errors")
            return false;
        }
        return true;
    }
    const updateFlight=async(data)=>{
        await axios.post('http://localhost:5000/flight/update', data)
        .then((res) => {
            console.log(res.data)
            notify(`Flight ${flightNum} was updated successfully!`)
            resetFields();
            handleClose();
            getFlights();
        }).catch((error) => {
            console.log(error)
        });
    };
    const resetFields=()=>{
         setFromErr(""); setToErr(""); setblockButton(false); setFlightNumErr("");
        setEconomyErr("");setBusinessErr("");setFirstErr("");setDepartureErr("");setArrivalTimeErr("");
    }
    const handleFlightNum=(e)=>{
        setFlightNum(e.target.value);
        setFlightNumErr("");
    }
    const handleFrom=(e)=>{
        setFrom(e.target.value);
        setFromErr(e.target.value.length===3?"":"error")
    }
    const handleTo=(e)=>{
        setTo(e.target.value);
        setToErr(e.target.value.length===3?"":"error")
    }
    const handleDepTime=(newValue)=>{
        setDepartureTime(newValue);
        setDepartureErr((newValue && new Date(newValue)>=new Date())?"":"departureTime error onchange");   
    }
    const handleArrivalTime=(newValue)=>{
        setArrivalTime(newValue);
        setArrivalTimeErr((newValue && new Date(departureTime)<new Date(newValue))?"":"arrivalTime error onchange");
    }
    const handleEconomy=(e)=>{
        setEconomySeats(e.target.value);
        setEconomyErr(e.target.value.length!==0 && e.target.value>-1?"":"economy error");
    }
    const handleBusiness=(e)=>{
        setBusinessSeats(e.target.value);
        setBusinessErr(e.target.value.length!==0 && e.target.value>-1?"":"business error");
    }
    const handleFirst=(e)=>{
        setFirstSeats(e.target.value);
        setFirstErr(e.target.value.length!==0 && e.target.value>-1?"":"first error");
    }
    const notify = (text) => toast.success(text, {position: toast.POSITION.BOTTOM_RIGHT})

    return (
      <div>
        <Tooltip title="Edit">
        <Button onClick={handleOpen}><Edit /></Button>
        </Tooltip>
        <Modal className={styles["Modal"]}
          open={open}
          onClose={handleClose}
        >
          <Box className={styles["ModalBox"]}>
            <div className={styles["icon"]}> 
                <CloseIcon onClick={handleClose} /> 
            </div>
            <div className={styles["text"]}>
                Edit Flight Details
            </div>
            <Typography >
                <div className={styles["container"]}>
                    <div className={styles["textfields"]}>
                        <TextFields label="Flight Number" value={flightNum} variant="outlined" size="small" type="text" required style={{width:400}} onChange={handleFlightNum} error={flightNumErr?true:false}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="From" value={from} variant="outlined" size="small" required style={{width:400}} onChange={handleFrom} error={fromErr?true:false} />
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="To" value={to} variant="outlined" size="small" required style={{width:400}} onChange={handleTo} error={toErr?true:false}/>
                    </div>
                   <div className={styles["datetimepicker"]}> 
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <MobileDateTimePicker renderInput={(params) => <TextFields  {...params} error={departureErr?true:false} label="Departure Time"  variant="outlined" size="small" style={{width:400}}/>} value={departureTime} onChange={handleDepTime}/>
                    </LocalizationProvider>
                    </div>
                    <div className={styles["datetimepicker"]}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <MobileDateTimePicker renderInput={(params) => <TextFields {...params} error={arrivalTimeErr?true:false} label="Arrival Time" variant="outlined" size="small" style={{width:400}}/>}  value={arrivalTime} onChange={handleArrivalTime}/>
                    </LocalizationProvider>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="Economy Seats" value={economySeats} variant="outlined" size="small" type="number" required style={{width:400}} onChange={handleEconomy} error={economyErr?true:false}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="Business Class Seats" value={businessSeats} variant="outlined" size="small" type="number" required style={{width:400}} onChange={handleBusiness} error={businessErr?true:false}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="First Class Seats"  value={firstSeats} variant="outlined" size="small" type="number" required style={{width:400}} onChange={handleFirst} error={firstErr?true:false}/>
                    </div>
                    <div className={styles["button"]} >
                        <ContainedButton style={{width:400}}  disabled={blockButton} onClick={Add}>Submit</ContainedButton>
                    </div>
                </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
}
export default FlightModal;