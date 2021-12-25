import {Modal,Box ,Button, Grid, Tooltip} from '@mui/material';
import { Clear, Check, DeleteForever } from "@mui/icons-material"
import React from 'react';
import { toast } from 'react-toastify';
import styles from './index.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { ContainedButton} from '../buttons/styledButtons';
import axios from 'axios';

const DeleteFlightModal =({flightNumber, getFlights})=>{
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const header = { headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
    }}

    const deleter=()=>{
         var flightDetails={
            flightNumber
        }
        deleteFlight(flightDetails) 
    }
    const deleteFlight=async(data)=>{
        await axios.post('http://localhost:5000/flight/delete', data, header)
        .then((res) => {
          if(!(res.data.message === "Incorrect Token Given")){
              notify(`Flight ${flightNumber} has been deleted successfully!`)
              handleClose()
              getFlights()
          }
          else {
              toast.error("An error occurred", {position: toast.POSITION.BOTTOM_RIGHT})
          }
        }).catch((error) => {
            console.log(error)
        });
    }; 

    const notify = (text) => toast.success(text, {position: toast.POSITION.BOTTOM_RIGHT} )

    return (
      <div>
        <Tooltip title="Delete">
        <Button onClick={handleOpen}><DeleteForever /></Button> 
        </Tooltip>
        <Modal className={styles["Modal"]}
          open={open}
          onClose={handleClose}
        >
          <Box className={styles["ModalBox"]}>
            <div className={styles["icon"]}> 
                <CloseIcon onClick={handleClose} /> 
            </div>
            <div className={styles["text2"]}>
                Delete Confirmation Request
            </div>
            <div className={styles["text"]}>
                Are you sure you want to delete flight {flightNumber}?
            </div>
            <Grid container justifyContent= 'space-evenly'>
               <ContainedButton onClick={()=>deleter()}><Check /></ContainedButton>
                <ContainedButton onClick={()=>handleClose()}><Clear /></ContainedButton>
            </Grid>    
          </Box>
        </Modal>
      </div>
    );
}
export default DeleteFlightModal;