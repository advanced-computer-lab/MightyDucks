import styles from './index.module.css';
import { ContainedButton , TextFields} from '../buttons/styledButtons';
import {Modal,Box ,Typography, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import {InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const EditUser=(props)=>{
    const [userName,setUserName]=React.useState(props.user.userName);
    const [firstName,setFirstName]=React.useState(props.user.firstName);
    const [lastName,setLastName]=React.useState(props.user.lastName);
    const [email,setEmail]=React.useState(props.user.email);
    const [passportNumber, setPassportNumber] = React.useState(props.user.passportNumber);
    const [password, setPassword] = React.useState(props.user.password);
    const [usernameErr,setUserNameErr]=React.useState("");
    const [firstNameErr,setFirstNameErr]=React.useState("");
    const [lastNameErr,setLastNameErr]=React.useState("");
    const [emailErr,setEmailErr]=React.useState("");
    const [passportNumErr,setPassportNumErr]=React.useState("");
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPassErr,setNewPassErr]= React.useState("");
    const [oldPassErr,setOldPassErr]= React.useState("");
    const [passChange,setPasswordChange]= React.useState(false);
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);

    const [open, setOpen] = React.useState(true);
    const handleClose = () =>{
        setOpen(false);
        props.onEdit(false)
    } 
    const notify = (text) => toast.success(text, {position: toast.POSITION.BOTTOM_RIGHT})
   
    const updateUser=async(data)=>{
        await axios.post('http://localhost:5000/user/update', data)
        .then((res) => {
            notify(`User ${userName} was updated successfully!`)
            handleClose();
        }).catch((error) => {
            console.log(error)
        });
    };

    const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);

    
    const validateFields=()=>{
        setUserNameErr(userName?"":"username error")
        setFirstNameErr(firstName?"":"firstname error")
        setLastNameErr(lastName?"":"lastname error")
        setEmailErr(email?"":"email error");
        setPassportNumErr(passportNumber?"":"passport error")
        setOldPassErr((oldPassword===password) && (passChange) ?"":"old password error val")
        setNewPassErr((newPassword!==oldPassword) && (passChange) && (newPassword) ?"":"new password error val")
        if(!userName || !firstName || !lastName || !email || !passportNumber ){
            return false;
        }
        if((passChange && (!oldPassword  || !newPassword || oldPassword!==password || oldPassword===newPassword))){
            return false;
        }
        else{
        return true;
        }
    }
    const handleEdit=()=>{
        var result = validateFields(); 
        if (result){
            if (newPassword){
                var user= {oldUserName:props.user.userName ,userName:userName,firstName:firstName ,lastName:lastName,email:email,passportNumber:passportNumber,password:newPassword, flights: props.user.flights}
            }else{
            var user= {oldUserName:props.user.userName ,userName:userName,firstName:firstName ,lastName:lastName,email:email,passportNumber:passportNumber,password:password, flights: props.user.flights}
            }
            updateUser(user);
        }
    }
    const handleUserName=(e)=>{
        setUserName(e.target.value)
        setUserNameErr("")
    }
    const handleFirstName=(e)=>{
        setFirstName(e.target.value)
        setFirstNameErr("")
    }
    const handleLastName=(e)=>{
        setLastName(e.target.value)
        setLastNameErr("")
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value)
        setEmailErr("");
    }
    const handlePassportNum=(e)=>{
        setPassportNumber(e.target.value)
        setPassportNumErr("")
    }
    const handleOldPassword=(e)=>{
        setOldPassword(e.target.value)
        setOldPassErr((e.target.value===password) && (passChange) ?"":"old password error onchange")
       
    }
    const handleNewPassword=(e)=>{
        setNewPassword(e.target.value)
        setNewPassErr(((e.target.value!==oldPassword) && (passChange) && (e.target.value)) ?"":"new password error onchange")
    }
    const handleChangePassword=()=>{
        setPasswordChange(true);
    }
    return(
    <div>
        <Modal className={styles["Modal"]}
          open={true}
          onClose={handleClose}
        >
          <Box className={styles["ModalBox"]}>
            <div className={styles["icon"]}> 
                <CloseIcon onClick={handleClose} /> 
            </div>
            <div className={styles["text"]}>
               Edit Profile
            </div>
            <Typography>
                <div className={styles["container"]}>
                    <div className={styles["textfields"]}>
                        <TextFields label="UserName" value={userName} variant="outlined" size="small" type="text" required style={{width:400}} onChange={handleUserName} error={usernameErr?true:false}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="FirstName" value={firstName} variant="outlined" size="small" type="text" required style={{width:400}} onChange={handleFirstName} error={firstNameErr?true:false}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="LastName" value={lastName} variant="outlined" size="small" type="text" required style={{width:400}} onChange={handleLastName} error={lastNameErr?true:false}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="Email" value={email} variant="outlined" size="small" type="email" required style={{width:400}} onChange={handleEmail} error={emailErr?true:false}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="Passport Number" value={passportNumber} variant="outlined" size="small" type="text" required style={{width:400}} onChange={handlePassportNum} error={passportNumErr?true:false}/>
                    </div>
                    {!passChange?
                    <div className={styles["buttonPass"]}>
                        <Button onClick={handleChangePassword}>Change Password</Button>
                    </div>:
                    <>
                    <div className={styles["textfields"]}>
                        <TextFields label="Old Password" value={oldPassword} variant="outlined" size="small" type={showOldPassword ? "text" : "password"} required style={{width:400}} onChange={handleOldPassword} error={oldPassErr?true:false}
                         InputProps={{  endAdornment: (
                            <InputAdornment position="end"> <IconButton onClick={handleClickShowOldPassword}>
                                {showOldPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                      ) }}/>
                    </div>
                    <div className={styles["textfields"]}>
                        <TextFields label="New Password" value={newPassword} variant="outlined" size="small" type={showNewPassword ? "text" : "password"} required style={{width:400}} onChange={handleNewPassword} error={newPassErr?true:false}
                         InputProps={{  endAdornment: (
                            <InputAdornment position="end"> <IconButton onClick={handleClickShowNewPassword}>
                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                      ) }}/>
                    </div>
                </>}
                   
                    

                    <div className={styles["button"]} >
                        <ContainedButton style={{width:400}} onClick={handleEdit}>Save</ContainedButton>
                    </div>
                </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    )
}
export default EditUser;