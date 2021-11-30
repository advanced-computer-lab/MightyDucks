import React from 'react'
import {Modal,Box ,Typography} from '@mui/material';
import { useStyles } from './style'
import HelpIcon from '@mui/icons-material/Help';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Toolbar, AppBar, Grid } from '@mui/material';
import { Button } from '@material-ui/core';

function ConfirmationModal({bookingId, open, setOpen, setConfirm}) {
    const styles = useStyles()

    const handleClose = () => setOpen(false);

    const handleConfirm = () => {
        setConfirm()
        handleClose()
    }

    return (
        
        <Modal
          open={open}
          onClose={handleClose}
          className={styles.modal}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description">
          <div className={styles.alignment}>
        <Box className = {styles.box1} sx={{ boxShadow: 7,  minHeight: "2.5em", borderTopLeftRadius: "1em", borderTopRightRadius: "1em" }}>
          <HelpIcon sx={{ color: "#017A9B"}} className={styles.help}/>
          <span className = {styles.text1}>Confirmation Request</span>
        </Box> 
        <Box className = {styles.box2} sx={{ maxHeight: "14em", borderBottomLeftRadius: "1em", borderBottomRightRadius: "1em" }}>
          <Grid container direction = "column" justifyContent = "center" spacing = {3}>
            <Grid item>
            <Grid container direction = "row" justifyContent = "center">
            <Grid item >
             <div className = {styles.text2}>
                Are you sure you want to cancel booking number {bookingId}?
             </div>
            </Grid>
            </Grid>
            </Grid>
            <Grid item>
            <Grid container direction = "row" justifyContent = "center" spacing = {7} className={styles.row}>
            <Grid item >
            <Button onClick={handleConfirm} variant="outlined" className={styles.button}>
                <DoneIcon sx={{ color: "#017A9B", fontSize: "4em"}}/>
            </Button>
            </Grid>
            <Grid item >
            <Button onClick={handleClose} variant="outlined" className={styles.button}>
                <CloseIcon sx={{ color: "#017A9B", fontSize: "4em"}}/>
            </Button>
            </Grid>
            </Grid>
            </Grid>
          </Grid>
          </Box>  
          </div>
          </Modal>
    )
}

export default ConfirmationModal
