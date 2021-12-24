import styles from './index.module.css';
import { ContainedButton , TextFields} from '../buttons/styledButtons';
import {Modal,Box ,Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import {InputAdornment, IconButton,Button } from "@material-ui/core";
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
    const [telephone,setTelephone]=React.useState(props.user.telephoneNumber);     
    const [homeAddress, setHomeAddress] = React.useState(props.user.homeAddress);
    const [telephoneErr,setTelephoneErr]=React.useState("");
    const [homeAddressErr,setHomeAddressErr]=React.useState("");
    const [open, setOpen] = React.useState(true);
    const [updateSuccess, setUpdatesSuccess] = React.useState(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = React.useState(false);
    const handleClose = () =>{
        setOpen(false);
        props.onEdit(false)
    } 
    const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const notify = (text) => toast.success(text, {position: toast.POSITION.BOTTOM_RIGHT})
    const header = { headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
    }}

    const updateUser=async(data)=>{
        await axios.post('http://localhost:5000/user/update', data, header)
        .then((res) => {
            setUpdatesSuccess(true)
        }).catch((error) => {
            console.log(error)
        });
    };
    const passwordChange=async(data)=>{
        await axios.post('http://localhost:5000/user/changePassword', data, header)
        .then((res) => {
            if(res.data.message==='Success'){
            setPasswordChangeSuccess(true)
            }else{
                toast.error("Wrong password", {position: toast.POSITION.BOTTOM_RIGHT})
            }
        }).catch((error) => {
            console.log(error)
        });
    };
    React.useEffect(()=>{
        if(!passChange && updateSuccess){
            handleClose();
            notify(`User ${userName} was updated successfully!`)
            setUpdatesSuccess(false);
            setPasswordChange(false);
        }else if( passChange && updateSuccess && passwordChangeSuccess){
            handleClose();
            notify(`User ${userName} was updated successfully!`)
            setUpdatesSuccess(false);
            setPasswordChangeSuccess(false);
            setPasswordChange(false);
        }
    },[passwordChangeSuccess,updateSuccess,passChange])
    const validateFields=()=>{
        setUserNameErr(userName?"":"username error")
        setFirstNameErr(firstName?"":"firstname error")
        setLastNameErr(lastName?"":"lastname error")
        setEmailErr(email?"":"email error");
        setPassportNumErr(passportNumber?"":"passport error")
        setHomeAddressErr(homeAddress?"":"home add error")
        setTelephoneErr(telephone?"":"telephone error")
        setOldPassErr((oldPassword && passChange) ?"":"old password error val")
        setNewPassErr((newPassword!==oldPassword) && (passChange) && (newPassword) ?"":"new password error val")
        if(!userName || !firstName || !lastName || !email || !passportNumber || !telephone || !homeAddress ){
            return false;
        }
        if((passChange && (!oldPassword  || !newPassword || oldPassword===newPassword))){
            return false;
        }
        else{
        return true;
        }
    }
    const handleEdit=()=>{
        var result = validateFields(); 
        if (result){
            var user= {oldUserName:props.user.userName ,userName:userName,firstName:firstName ,lastName:lastName,email:email,passportNumber:passportNumber,flights: props.user.flights, homeAddress:homeAddress, telephoneNumber:telephone}
            if (!passChange){
                console.log("oldusername ",props.user.userName,"  ","username ",userName,"   firstname ",firstName,"   lastname",lastName, "   email ",email,"   passportNo ",passportNumber,"  homeadd ",homeAddress,"  telephone ",telephone)
                updateUser(user);
                console.log("success",updateSuccess)
                if(updateSuccess){
                    handleClose();
                }
            }else{
                passwordChange({"userName":props.user.userName,"oldPassword":oldPassword, "newPassword":newPassword});
                updateUser(user);
            }
           
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
        setOldPassErr("");
       
    }
    const handleNewPassword=(e)=>{
        setNewPassword(e.target.value)
        setNewPassErr(((e.target.value!==oldPassword) && (passChange) && (e.target.value)) ?"":"new password error onchange")
    }
    const handleChangePassword=()=>{
        setPasswordChange(true);
    }
    const handleTelephone=(e)=>{
        setTelephone(e.target.value)
        setTelephoneErr("")
    }
    const handleHomeAddress=(e)=>{
        setHomeAddress(e.target.value);
        setHomeAddressErr("");
    }
    console.log(homeAddress)
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
            <Typography >
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

                    <div className={styles["textfields"]}>
                        <TextFields label="Home Address" value={homeAddress} variant="outlined" size="small" type="text" required style={{width:400}} onChange={handleHomeAddress} error={homeAddressErr?true:false}/>
                    </div>

                    <div className={styles["textfields"]}>
                        <TextFields label="Telephone Number" value={telephone} variant="outlined" size="small" type="text" required style={{width:400}} onChange={handleTelephone} error={telephoneErr?true:false}/>
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