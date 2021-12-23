import React, {useState} from "react";
import { useStyles } from "./style";
import HelpIcon from "@mui/icons-material/Help";
import { FormControl, Modal, Box, Grid, Button, InputLabel, MenuItem, Select, Stepper, Step, StepButton, Typography } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { format } from 'date-fns'
import { TextField } from '@material-ui/core';
import FlightsCluster from "../flightsCluster"
import { toast } from 'react-toastify';
import SelectSeats from "../SelectSeats";
import { ArrowForward } from '@mui/icons-material';

const steps = [
  'Choose Your Flight',
  'Choose Flight Seats',
  'Payment',
];

function ChangeFlightModal({
  oldFlight,
  flightType,
  otherDate,
  oldSeats,
  oldCabin,
  open,
  setOpen,
  setNewFlight,
  setNewSeats,
  setConfirmNewFlight,
}) {
  const styles = useStyles();

  const [filtered, setFiltered] = useState(false)

  const [departure, setDeparture] = useState(new Date())
  const [cabin, setCabin] = useState('')
  const [criteria, setCriteria] = useState(null)

  const [departureErr, setDepartureErr] = useState()
  const [cabinErr, setCabinErr] = useState(false)

  const handleDepartureChange = (event) => {
    setDeparture(format(new Date(event), 'yyyy-MM-dd'))
    setDepartureErr(false)
    if(departure === null || format(new Date(departure), 'yyyy-MM-dd')<(format(new Date(), 'yyyy-MM-dd'))){
      setDepartureErr(true)
    }
    if(flightType==="dep" && format(new Date(departure), 'yyyy-MM-dd')>(format(new Date(otherDate), 'yyyy-MM-dd'))){
      setDepartureErr(true)
    }
    if(flightType==="ret" && format(new Date(departure), 'yyyy-MM-dd')<(format(new Date(otherDate), 'yyyy-MM-dd'))){
      setDepartureErr(true)
    }
  }

  const handleCabinChange = (event) => {
    setCabin(event.target.value)
    setCabinErr(false)
  }

  const handleFilter = () => {   
    if(departure === null){
      setDepartureErr(true)
    }
    if(cabin === ''){
      setCabinErr(true)
    }
    if(!departureErr && !cabinErr && cabin!==''){
      const data = {
        from: oldFlight.from,
        to: oldFlight.to,
        departure,
        adults: oldSeats.length,
        children: 0,
        cabin
      }
      setCriteria(data)
      setFiltered(true)
    }
  }

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    //setConfirmNewFlight(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.modal}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
        {filtered ? <SelectingModal handleParentClose={handleClose} criteria={criteria} oldFlight={oldFlight} oldSeats={oldSeats} oldCabin={oldCabin} newCabin={cabin} open={filtered} setOpen={setFiltered} setFlight={setNewFlight} setSeats={setNewSeats} finalConfirm={setConfirmNewFlight} />
          : <div className={styles.alignment}>
          <Box
            className={styles.box1}
            sx={{
              boxShadow: 7,
              minHeight: "2.5em",
              borderTopLeftRadius: "1em",
              borderTopRightRadius: "1em",
            }}
          >
            <HelpIcon sx={{ color: "#017A9B" }} className={styles.help} />
            <span className={styles.text1}>Find another Flight</span>
          </Box>
          <Box
            className={styles.box2}
            sx={{
              width: "40em",
              borderBottomLeftRadius: "1em",
              borderBottomRightRadius: "1em",
            }}
          >
            <Grid sx={{minHeight: 80}} container direction="row" justifyContent="space-evenly" alignItems="center" >
              <Grid item sx={{ maxWidth: 155}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="Departure Date"
                    inputFormat="yyyy-MM-dd"
                    value={departure}
                    onChange={handleDepartureChange}
                    format="YYYY-MM-DD"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={departureErr ? true : false}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <FormControl fullWidth variant = "standard" sx={{  minWidth: 130 }} error={cabinErr?true:false}>
                  <InputLabel>Cabin</InputLabel>
                  <Select
                  value={cabin}
                  label="Cabin"
                  onChange={handleCabinChange}
                  autoWidth
                  >
                    <MenuItem value = "First">First Class</MenuItem>
                    <MenuItem value = "Business">Business</MenuItem>
                    <MenuItem value = "Economy">Economy</MenuItem>                           
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                <Button onClick={handleClose}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button onClick={handleFilter}>Find Flight</Button>
              </Grid>
            </Grid>
          </Box>
      </div>}
    </Modal>
  );
}

function SelectingModal({criteria, oldFlight, oldCabin, oldSeats, newCabin, open, setOpen, setFlight, setSeats, finalConfirm, handleParentClose}){
  const styles = useStyles();

  const [newFlight, setNewFlight] = useState("")
  const [NoOfFlights, setNoOfFlights] = useState(0)
  const [flightSeats, setFlightSeats] = useState([])
  const [paid, setPaid] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const completed = {}

  const handleClose = () => setOpen(false);

  const handleNext = () => {
    if (activeStep === 0) {
      if(newFlight===""){
        toast.error("Please choose a flight.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      else{
        setFlight(newFlight)
        toast.success(`Flight ${newFlight.flightNumber} selected!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setActiveStep(1);
      }
    } else if (activeStep === 1) {
      if(flightSeats.length<oldSeats.length){
        toast.error(`Please select ${oldSeats.length-flightSeats.length}  more seat(s)!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      else{
        setSeats(flightSeats)
        setPaid(false)
        setActiveStep(2);
      }
    } else if (activeStep === 2) {
        if(paid){
          finalConfirm(true)
          handleClose();
          handleParentClose();
        }
    }
  };

  const handleBack = () => {
    if(activeStep===0){
      handleClose();
    }
    else{
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };



  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.modal2}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className={styles.alignment2}>
        <Box
          className={styles.box1}
          sx={{
            boxShadow: 7,
            minHeight: "2.5em",
            borderTopLeftRadius: "1em",
            borderTopRightRadius: "1em",
          }}
          >
          <HelpIcon sx={{ color: "#017A9B" }} className={styles.help} />
          <span className={styles.text1}>Find another Flight</span>
        </Box>
        <Box
          className={styles.box2}
          sx={{
            width: "51em",
            minHeight: parseInt(NoOfFlights*10)+"em",
            borderBottomLeftRadius: "1em",
            borderBottomRightRadius: "1em",
          }}
          >
            <Box sx={{ width: "100%", textAlign: "-webkit-center" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {activeStep === 0 &&  <Grid container direction="column" sx={{minHeight: 100, minWidth: 1600, width: "100%"}}>
                                        <FlightsCluster criteria={criteria} handleChosen={setNewFlight} currentChosen={newFlight} changing={true} oldFlight={oldFlight} oldCabin={oldCabin} setNum={setNoOfFlights}/>
                                      </Grid>}
                {activeStep === 1 && <SelectSeats flight={newFlight} cabin={criteria.cabin} noSeats={oldSeats.length} oldSeats={[]} flightSeats={flightSeats} setFlightSeats={setFlightSeats} changing={false}/>}
                {activeStep === 2 && <PaymentLocation flight={newFlight} price={newFlight.price} oldFlight={oldFlight} paid={paid} setPaid={setPaid} oldSeats={oldSeats} flightSeats={flightSeats}/>}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  {activeStep===0 ? "Cancel" : "Back"}
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} disabled={!paid && activeStep===2} sx={{ mr: 1 }}>
                  {activeStep===2 ? "Confirm" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
        </div>
      </Box> 
        </Box>
      </div>
    </Modal>
  )
}

function PaymentLocation({price, paid, setPaid, flight, flightSeats, oldSeats, oldFlight}){

  if(price===0){
    setPaid(true)
  }

  const handlePayment = () => {
    setPaid(true)
  }

  const departureTime1 = (new Date(flight.departureTime).toString()).split(" ")
    const arrivalTime1 = (new Date(flight.arrivalTime).toString()).split(" ")
    
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

    const date1 = new Date(flight.departureTime);
    const date2 = new Date(flight.arrivalTime);
    const difftime = Math.abs(date1 - date2) / 36e5;

    var cabin1 = "Economy"
    var priceAddOn1 = 0;
    if(flightSeats[0].charAt(0)==="B"){
        priceAddOn1 = 100;
        cabin1 = "Business"
    }
    else if(flightSeats[0].charAt(0)==="F"){
        priceAddOn1 = 400;
        cabin1 = "First"
    }

    var cabin2 = "Economy"
    var priceAddOn2 = 0;
    if(oldSeats[0].charAt(0)==="B"){
        priceAddOn2 = 100;
        cabin2 = "Business"
    }
    else if(oldSeats[0].charAt(0)==="F"){
        priceAddOn2 = 400;
        cabin2 = "First"
    }


  return(
    <div>
      <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{background: "#E1E1E1"}}>
        <Grid container direction="column" style={{width: "60%"}} justifyContent="space-around">
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>{`Flight ${flight.flightNumber}`}</Grid>
            <Grid Grid item>{`${departureTime1[0]}, ${departureTime1[1]} ${departureTime1[2]}, ${departureTime1[3]}`}</Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-evenly">
            <Grid item>{flight.from}</Grid>
            <Grid item><ArrowForward fontSize="large"/></Grid>
            <Grid item>{flight.to}</Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-evenly">
            <Grid item>{depHr1}</Grid>
            <Grid item>{Math.floor(difftime)}h {((difftime%1)*60)>0 && parseInt((difftime%1)*60)+"m"}</Grid>
            <Grid item>{arrHr1}</Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>{`Seats: ${flightSeats}`}</Grid>
            <Grid item>{cabin1+" class"}</Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>Seats</Grid>
            <Grid item>Price difference($)</Grid>
            <Grid item>Total difference($)</Grid>
          </Grid>
          <Grid style={{textDecoration: "underline"}} container direction="row" justifyContent="space-between">
            <Grid item>{flightSeats.length}</Grid>
            <Grid item>{parseInt(price+priceAddOn1)-parseInt(oldFlight.price+priceAddOn2)}</Grid>
            <Grid item>{flightSeats.length*(parseInt(price+priceAddOn1)-parseInt(oldFlight.price+priceAddOn2))}</Grid>
          </Grid>
        </Grid>
      </Typography>
      
      {price===0? <Button variant="contained" disabled={true}>All paid up!</Button> : <Button variant="contained" onClick={handlePayment}>Proceed to Payment</Button>}
    </div>
  )
}

export default ChangeFlightModal;
