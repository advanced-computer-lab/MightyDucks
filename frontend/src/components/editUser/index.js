import styles from './index.module.css';
import { ContainedButton , TextFields} from '../buttons/styledButtons';
import {Modal,Box ,Typography} from '@mui/material';
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
    const [passwordErr,setPasswordErr]=React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const [open, setOpen] = React.useState(true);
    const handleClose = () =>{
        setOpen(false);
        props.onEdit(false)
    } 
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const notify = (text) => toast.success(text, {position: toast.POSITION.BOTTOM_RIGHT})
    
    const header = { headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
    }}

    // React.useEffect(() => {
    //     axios.post('http://localhost:5000/user/getUser', data, header)
    //     .then((res) => {
    //         setCurUser(res.data)
    //         console.log(res.data)
    //         setFlag(!(res.data.message === "Incorrect Token Given"))
    //     }).catch((error) => {
    //         console.log(error)
    //     });
        
    // },[isEdit, deleted, localStorage.getItem("token")])

    const updateUser=async(data)=>{
        await axios.post('http://localhost:5000/user/update', data, header)
        .then((res) => {
            notify(`User ${userName} was updated successfully!`)
            handleClose();
        }).catch((error) => {
            console.log(error)
        });
    };
    
    const validateFields=()=>{
        setUserNameErr(userName?"":"username error")
        setFirstNameErr(firstName?"":"firstname error")
        setLastNameErr(lastName?"":"lastname error")
        setEmailErr(email?"":"email error");
        setPassportNumErr(passportNumber?"":"passport error")
        setPasswordErr(password?"":"password error")
        if(!userName || !firstName || !lastName || !email || !passportNumber || !password){
            return false;
        }
        return true;
    }
    const handleEdit=()=>{
        var result = validateFields();
        if (result){
            var user= {oldUserName:props.user.userName ,userName:userName,firstName:firstName ,lastName:lastName,email:email,passportNumber:passportNumber,password:"123", flights: props.user.flights}
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
    const handlePassword=(e)=>{
        setPassword(e.target.value)
        setPasswordErr("")
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
                        <TextFields label="Password"  value={password}  variant="outlined" size="small" type={showPassword ? "text" : "password"} required style={{width:400}} onChange={handlePassword} error={passwordErr?true:false}
                        InputProps={{  endAdornment: (
                              <InputAdornment position="end"> <IconButton onClick={handleClickShowPassword}>
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                        ) }}/>
                    </div>
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