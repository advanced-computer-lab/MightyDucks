import React from 'react'
import {Modal,Box , Grid, Button} from '@mui/material';
import { useStyles } from './style'
import SelectSeats from "../SelectSeats"
import HelpIcon from '@mui/icons-material/Help';

function ChangeSeatsModal({flight, cabin, oldFlightSeats, setFlightSeats, open, setOpen, setNewSeats, setConfirmNewSeats}) {
    const styles = useStyles()

    const handleClose = () => setOpen(false);

    const handleConfirm = () => {
      setConfirmNewSeats(true)
    }

    return (
        
      <Modal
      open={open}
      onClose={handleClose}
      className={styles.modal}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className={styles.alignment}>
        <Box className = {styles.box1} sx={{ boxShadow: 7,  minHeight: "2.5em", borderTopLeftRadius: "1em", borderTopRightRadius: "1em" }}>
          <HelpIcon sx={{ color: "#017A9B"}} className={styles.help}/>
          <span className = {styles.text1}>Change Flight {flight.flightNumber.toUpperCase()} Seats</span>
        </Box> 
        <Box className = {styles.box2} sx={{width:"40em", borderBottomLeftRadius: "1em", borderBottomRightRadius: "1em" }}>
          <SelectSeats flight={flight} cabin={cabin} noSeats={oldFlightSeats.length} oldSeats={oldFlightSeats} flightSeats={[]} setNewSeats={setNewSeats} setFlightSeats={setFlightSeats} changing={true}/>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item><Button onClick={handleClose}>Cancel</Button></Grid>
            <Grid item><Button onClick={handleConfirm}>Confirm Change</Button></Grid>
          </Grid>
        </Box>
      </div>
    </Modal>
    )
}

export default ChangeSeatsModal
