import styles from './index.module.css';
import { ContainedButton , TextFields} from '../buttons/styledButtons';
import {Modal,Box ,Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import {InputAdornment, IconButton,Button } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const EditUser=(props)=>{
    const [user, setUser] = React.useState(props.user)
    const [userName,setUserName]=React.useState(user.userName);
    const [firstName,setFirstName]=React.useState(user.firstName);
    const [lastName,setLastName]=React.useState(user.lastName);
    const [email,setEmail]=React.useState(user.email);
    const [passportNumber, setPassportNumber] = React.useState(user.passportNumber);
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
    const [telephone,setTelephone]=React.useState(user.telephoneNumber);     
    const [homeAddress, setHomeAddress] = React.useState(user.homeAddress);
    const [open, setOpen] = React.useState(true);
    const [updateSuccess, setUpdatesSuccess] = React.useState(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = React.useState(false);

     const header = { headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
    }}

    const handleClose = () =>{  
        
        axios.post("http://localhost:5000/login", {userName: userName, password: localStorage.getItem("not password")})
        .then ((res) => {        
            if(!(res.data.message === "Invalid username or Password")){
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.setItem("token", res.data.token)
        axios.post("http://localhost:5000/user/getUser", {}, {
            headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
            })
        .then ((res) => {
            if(res.data.isAdmin) {
                localStorage.setItem("admin", true)
            }
            setUser(res.data)
            setOpen(false);
            props.onEdit(false)
        })
        .catch((error) => {
            console.log(error)
        })
            }
        })
        .catch((error) => {
            console.log(error)
        })
        
        
    } 
    const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const notify = (text) => toast.success(text, {position: toast.POSITION.BOTTOM_RIGHT})
   

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
            localStorage.setItem("not password", newPassword)
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
        setOldPassErr((oldPassword && passChange) ?"":"old password error val")
        setNewPassErr((newPassword!==oldPassword) && (passChange) && (newPassword) ?"":"new password error val")
        if(!userName || !firstName || !lastName || !email || !passportNumber ){
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
            var curUser= {oldUserName:user.userName ,userName:userName,firstName:firstName ,lastName:lastName,email:email,passportNumber:passportNumber,flights: user.flights, homeAddress:homeAddress, telephoneNumber:telephone}
            if (!passChange){
                updateUser(curUser);
                if(updateSuccess){
                    handleClose();
                }
            }else{
                passwordChange({"userName":curUser.userName,"oldPassword":oldPassword, "newPassword":newPassword});
                updateUser(curUser);
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
    }
    const handleHomeAddress=(e)=>{
        setHomeAddress(e.target.value);
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
                        <TextFields label="Home Address" value={homeAddress} variant="outlined" size="small" type="text" style={{width:400}} onChange={handleHomeAddress} />
                    </div>

                    <div className={styles["textfields"]}>
                        <TextFields label="Telephone Number" value={telephone} variant="outlined" size="small" type="text" style={{width:400}} onChange={handleTelephone} />
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