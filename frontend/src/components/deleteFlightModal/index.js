import {Modal,Box ,Button, Grid} from '@mui/material';
import { Clear, Check, DeleteForever } from "@mui/icons-material"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import styles from './index.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { ContainedButton} from '../buttons/styledButtons';
import axios from 'axios';

const DeleteFlightModal =({flightNumber})=>{
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleter=()=>{
         var flightDetails={
            flightNumber
        }
        deleteFlight(flightDetails) 
    }
    const deleteFlight=async(data)=>{
        await axios.post('http://localhost:5000/flight/delete', data)
        .then((res) => {
            console.log(res.data)
            notify(`Flight ${flightNumber} has been deleted successfully!`)
            handleClose()
        }).catch((error) => {
            console.log(error)
        });
    }; 

    const notify = (text) => toast.success(text, {position: toast.POSITION.BOTTOM_RIGHT} )

    return (
      <div>
        <ToastContainer />
        <div className={styles["addFlightButton"]}>
        <Button onClick={handleOpen}><DeleteForever /></Button> 
        </div>
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