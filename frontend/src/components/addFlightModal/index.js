import {Modal,Box ,Typography, Button, Tooltip} from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import styles from './index.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { ContainedButton , TextFields} from '../buttons/styledButtons';
import axios from 'axios';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import AddIcon from '@mui/icons-material/Add';

const FlightModal =({getFlights})=>{
    const [flightNum,setFlightNum]=React.useState("");
    const [departureTime,setDepartureTime]=React.useState(Date);
    const [arrivalTime,setArrivalTime]=React.useState(Date);
    const [from,setFrom]=React.useState("");
    const [to,setTo]=React.useState("");
    const [economySeats,setEconomySeats]=React.useState();
    const [businessSeats,setBusinessSeats]=React.useState();
    const [firstSeats,setFirstSeats]=React.useState();
    const [blockButton, setblockButton] = React.useState(false)
    const [flightNumErr,setFlightNumErr]=React.useState("");
    const [arrivalTimeErr,setArrivalTimeErr]=React.useState("");
    const [departureErr,setDepartureErr]=React.useState("");
    const [economyErr,setEconomyErr]=React.useState("");
    const [businessErr,setBusinessErr]=React.useState("");
    const [firstErr,setFirstErr]=React.useState("");
    const [fromErr,setFromErr]=React.useState("");
    const [toErr,setToErr]=React.useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const Add=()=>{
        setDepartureErr("");
        var result = validateFields();
        console.log("====>",departureTime)
        
        if (result){
            var Flightdetails={
                from:from, to:to, departureTime: departureTime,arrivalTime:arrivalTime,economy:economySeats,business:businessSeats, first:firstSeats,flightNumber:flightNum
            }
            setblockButton(true);
            createFlight(Flightdetails)
        }
    }
    const validateFields=()=>{
        setFlightNumErr(flightNum?"":"flightNum error");
        setFromErr(from && from.length===3?"":"from error");
        setToErr(to && to.length===3?"":"to error");
        setEconomyErr(economySeats && economySeats>-1?"":"economy error");
        setBusinessErr(businessSeats && businessSeats>-1?"":"business error");
        setFirstErr(firstSeats && firstSeats>-1?"":"first error");
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
    const createFlight=async(data)=>{
        await axios.post('http://localhost:5000/flight/create', data)
        .then((res) => {
            console.log(res.data)
            console.log(`Flight ${res.data} was added successfully!`)
            getFlights();
            notify(`Flight ${res.data} was added successfully!`)
            resetFields()
            handleClose()
        }).catch((error) => {
            setblockButton(false);
            console.log(error)
        });
    };
    const resetFields=()=>{
        setFlightNum(""); setFrom(""); setTo(""); setFromErr(""); setToErr(""); setblockButton(false);
        setDepartureTime(new Date()); setArrivalTime(new Date()); setEconomySeats(""); setBusinessSeats("");setFirstSeats(""); setFlightNumErr("");
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
        setDepartureErr(( departureTime.length!==0 && new Date(departureTime)>=new Date())?"":"departure error change");  
    }
    const handleArrivalTime=(newValue)=>{
        setArrivalTime(newValue);
        setArrivalTimeErr(( arrivalTime.length!==0 && new Date(departureTime)<new Date(arrivalTime))?"":"arrivalTime error change"); 
    }
    const handleEconomy=(e)=>{
        setEconomySeats(e.target.value);
        setEconomyErr(e.target.value && e.target.value>=0?"":"economy error");
    }
    const handleBusiness=(e)=>{
        setBusinessSeats(e.target.value);
        setBusinessErr(e.target.value && e.target.value>=0?"":"business error");
    }
    const handleFirst=(e)=>{
        setFirstSeats(e.target.value);
        setFirstErr(e.target.value && e.target.value>=0?"":"first error");
    }
    const notify = (text) => toast.success(text, {position: toast.POSITION.BOTTOM_RIGHT})
    return (
      <div>
        <Tooltip title="Add Flight">
            <Button onClick={handleOpen} ><AddIcon fontSize="large"/></Button>   
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
                Add Flight Details
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
                        <MobileDateTimePicker renderInput={(params) => <TextFields {...params}  error={departureErr?true:false} label="Departure Time"  variant="outlined" size="small" style={{width:400}}/>} value={departureTime} onChange={handleDepTime} />
                    </LocalizationProvider>
                    </div>
                    <div className={styles["datetimepicker"]}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <MobileDateTimePicker renderInput={(params) => <TextFields {...params} error={arrivalTimeErr?true:false} label="Arrival Time" variant="outlined" size="small" style={{width:400}}/>}  value={arrivalTime} onChange={handleArrivalTime} />
                    </LocalizationProvider>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="Economy Seats" value={economySeats} variant="outlined" size="small" type="number" required style={{width:400}} onChange={handleEconomy} error={economyErr?true:false}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="Business Class Seats" value={businessSeats} variant="outlined" size="small" type="number" required style={{width:400}} onChange={handleBusiness} error={businessErr?true:false}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="First Class Seats" value={firstSeats} variant="outlined" size="small" type="number" required style={{width:400}} onChange={handleFirst} error={firstErr?true:false}/>
                    </div>
                    <div className={styles["button"]} >
                        <ContainedButton style={{width:400}} disabled={blockButton} onClick={Add}>Add</ContainedButton>
                    </div>
                </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
}
export default FlightModal;