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
import 'react-toastify/dist/ReactToastify.css'

const FlightModal =({flightDetails, getFlights})=>{
    const [flightNum,setFlightNum]=React.useState(flightDetails.flightNumber);
    const [departureTime,setDepartureTime]=React.useState(flightDetails.departureTime);
    const [arrivalTime,setArrivalTime]=React.useState(flightDetails.arrivalTime);
    const [from,setFrom]=React.useState(flightDetails.from);
    const [to,setTo]=React.useState(flightDetails.to);
    const [economySeats,setEconomySeats]=React.useState(flightDetails.economy);
    const [businessSeats,setBusinessSeats]=React.useState(flightDetails.business);
    const [firstSeats,setFirstSeats]=React.useState(flightDetails.first);
    const [error,setError]=React.useState("");
    const [fromErr,setFromErr]=React.useState("");
    const [toErr,setToErr]=React.useState("");
    const [departureErr,setDepartureErr]=React.useState("");
    const [depChange, setDepChange] = React.useState(false);
    const [arrChange, setArrChange] = React.useState(false);
    const [blockButton, setblockButton] = React.useState(false)
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if(arrChange || depChange){
            setDepartureErr((departureTime>=new Date() && arrivalTime>departureTime)?"":"date error")
        }
      });

      const handleArrChange = (newValue) => {
        setArrChange(true)
        setArrivalTime(newValue);

    }

    const handleDepChange = (newValue) => {
        setDepChange(true)
        setDepartureTime(newValue);

    }

    const Add=()=>{
        setDepartureErr("");
        var result = validateFields();
        if (result){
            var Flightdetails={
                from:from, to:to, departureTime: departureTime,arrivalTime:arrivalTime,economy:economySeats,business:businessSeats, first:firstSeats,flightNumber:flightNum, oldFlightNumber: flightDetails.flightNumber
            }
            updateFlight(Flightdetails)
        }
    }
    const validateFields=()=>{
        if(flightNum && departureTime  && arrivalTime && from && to && economySeats!==-1 && businessSeats!==-1 && firstSeats!==-1){
            setError("");
            setFromErr(from.length===3?"":"error")
            setToErr(to.length===3?"":"error")
            console.log(flightNum, error)
            console.log(departureTime)
            console.log(arrivalTime)
            if(depChange || arrChange){
            }
            console.log("dep err",departureErr.length)
            if(error.length===0 && fromErr.length===0 && toErr.length===0 && departureErr.length===0){
                console.log("then")
                return true;
            }else{
                console.log("else")
                return false;
            }
        }else{
            setError("Required fields are empty");
            return false;
        }
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
        setFromErr(""); setToErr(""); setError("");
        setDepartureErr(""); setblockButton(false);
    }
    const handleFromErr=(e)=>{
        setFrom(e.target.value);
        setFromErr(e.target.value.length===3?"":"error")
    }
    const handleToErr=(e)=>{
        setTo(e.target.value);
        setToErr(e.target.value.length===3?"":"error")
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
                        <TextFields label="Flight Number" value={flightNum} variant="outlined" size="small" type="text" required style={{width:400}} onChange={(e)=>setFlightNum(e.target.value)}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="From" value={from} variant="outlined" size="small" required style={{width:400}} onChange={handleFromErr} error={fromErr?true:false} />
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="To" value={to} variant="outlined" size="small" required style={{width:400}} onChange={handleToErr} error={toErr?true:false}/>
                    </div>
                   <div className={styles["datetimepicker"]}> 
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <MobileDateTimePicker renderInput={(params) => <TextFields {...params} label="Departure Time"  variant="outlined" size="small" style={{width:400}}/>} value={departureTime} onChange={(newValue) => {handleDepChange(newValue); }}/>
                    </LocalizationProvider>
                    </div>
                    <div className={styles["datetimepicker"]}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <MobileDateTimePicker renderInput={(params) => <TextFields {...params} label="Arrival Time" variant="outlined" size="small" style={{width:400}}/>}  value={arrivalTime} onChange={(newValue) => {handleArrChange(newValue); }}/>
                    </LocalizationProvider>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="Economy Seats" value={economySeats} variant="outlined" size="small" type="number" required style={{width:400}} onChange={(e)=>setEconomySeats(e.target.value)}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="Business Class Seats" value={businessSeats} variant="outlined" size="small" type="number" required style={{width:400}} onChange={(e)=>setBusinessSeats(e.target.value)}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="First Class Seats"  value={firstSeats} variant="outlined" size="small" type="number" required style={{width:400}} onChange={(e)=>setFirstSeats(e.target.value)}/>
                    </div>
                    <div className={styles["button"]} >
                        <ContainedButton style={{width:400}}  disabled={blockButton} onClick={Add}>Submit</ContainedButton>
                    </div>
                    <div className={styles["error"]} >
                       {error}
                    </div>
                </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
}
export default FlightModal;