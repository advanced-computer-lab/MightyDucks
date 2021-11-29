import React, {useState} from 'react'
import { Box, Stepper, Step, StepButton, Button, Typography } from "@mui/material"
import { toast } from 'react-toastify';
import FlightsCluster from "../flightsCluster"
import SelectSeats from '../SelectSeats';
import TripDetails from '../tripDetails';

const steps = [
    'Choose Your Departing Flight',
    'Choose Your Returning Flight',
    'Choose Departing Flight Seats',
    'Choose Returning Flight Seats',
];

const elprops = {
  from: "FRA",
  to: "MUN",
  depDate: "2021-12-30",
  retDate: "2022-01-01",
  adults: 1,
  children: 0,
  cabin: "First"
}

function SelectFlightSteps(props) {
  const dep = {
    from: props.from,
    to: props.to,
    departure: props.depDate,
    adults: parseInt(props.adults),
    children: parseInt(props.children),
    cabin: props.cabin
  }
  console.log("ch", props.children)
  console.log("p", props.adults)
  
  const ret = {
    from: props.to,
    to: props.from,
    departure: props.retDate,
    adults: parseInt(props.adults),
    children: parseInt(props.children),
    cabin: props.cabin
  }

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [open, setOpen] = useState(false);
  const [bookingId, setBookingId] = useState(new Date().getTime());
  const [departingFlight, setDepartingFlight] = useState("");
  const [returningFlight, setReturningFlight] = useState("");
  const [departingFlightSeats, setDepartingFlightSeats] = useState([]);
  const [returningFlightSeats, setReturningFlightSeats] = useState([]);

  const handleNext = () => {
    if (activeStep === 0) {
      if (departingFlight === "") {
        toast.error("Please choose a departure flight.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.success(`Departure flight ${departingFlight.flightNumber} selected!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setActiveStep(1);
      }
    } else if (activeStep === 1) {
      if (returningFlight === "") {
        toast.error("Please choose a return flight.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.success(`Return flight ${returningFlight.flightNumber} selected!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setActiveStep(2);
      }
    } else if (activeStep === 2) {
      if (departingFlightSeats.length < (parseInt(props.adults) + parseInt(props.children))) {
        toast.error(
          `Please choose ${
            parseInt(props.adults) + parseInt(props.children) - parseInt(departingFlightSeats.length)
          } more seat(s).`,
          { position: toast.POSITION.BOTTOM_RIGHT }
        );
      } else {
        setActiveStep(3);
      }
    } else if (activeStep === 3) {
      if (returningFlightSeats.length < (parseInt(props.adults) + parseInt(props.children))) {
        toast.error(
          `Please choose ${
            parseInt(props.adults) + parseInt(props.children) - parseInt(returningFlightSeats.length)
          } more seat(s).`,
          { position: toast.POSITION.BOTTOM_RIGHT }
        );
      } else {
        setOpen(true)
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div>
      {open && <TripDetails user={props.user} open={open} setOpen={setOpen} bookingId={bookingId} departureFlight={departingFlight} departingFlightSeats={departingFlightSeats} returnFlight={returningFlight} returningFlightSeats={returningFlightSeats} create={true} upcoming={false}/>}
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
                {activeStep === 0 && <FlightsCluster criteria={dep} handleChosen={setDepartingFlight} currentChosen={departingFlight} />}
                {activeStep === 1 && <FlightsCluster criteria={ret} handleChosen={setReturningFlight} currentChosen={returningFlight} />}
                {activeStep === 2 && <SelectSeats flightSeats={departingFlightSeats} setFlightSeats={setDepartingFlightSeats} noSeats={parseInt(dep.adults)+parseInt(dep.children)} cabin={dep.cabin} flight={departingFlight}/>}
                {activeStep === 3 && <SelectSeats flightSeats={returningFlightSeats} setFlightSeats={setReturningFlightSeats} noSeats={parseInt(ret.adults)+parseInt(ret.children)} cabin={ret.cabin} flight={returningFlight}/>}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  {activeStep===3 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
        </div>
      </Box>
    </div>
  );
}

export default SelectFlightSteps
