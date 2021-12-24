import React, {useState, useEffect} from 'react';
import axios from 'axios';
import useStyles from './style';
import { Grid, Button, Typography, TextField} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {InputAdornment} from '@mui/material';
import { useNavigate } from "react-router-dom"

function Signup({}) {
    const styles = useStyles()

    const [userName, setUserName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [passportNumber, setPassportNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [home, setHome] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState("")
    const [countryCode, setCountryCode] = useState("")

    const [userNameErr, setUserNameErr] = useState(false)
    const [firstNameErr, setFirstNameErr] = useState(false)
    const [lastNameErr, setLastNameErr] = useState(false)
    const [passportNumberErr, setPassportNumberErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)
    const [telephoneNumberErr, setTelephoneNumberErr] = useState(false)
    const [countryCodeErr, setCountryCodeErr] = useState(false)
    const [toLogin, setToLogin] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate()
    const [data, setData] = useState("")

    const handleUsername = (e) => {
        setUserName(e.target.value)
        setUserNameErr(false)
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
        setFirstNameErr(false)
    }
    
    const handleLastName = (e) => {
        setLastName(e.target.value)
        setLastNameErr(false)
    }

    const handlePassportNumber = (e) => {
        setPassportNumber(e.target.value)
        setPassportNumberErr(false)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailErr(false)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        setPasswordErr(false)
    }

    const handleHome = (e) => {
        setHome(e.target.value)
    }

    const handleTelephoneNumber = (e) => {
        setTelephoneNumber(e.target.value)
        setTelephoneNumberErr(false)
    }

    const handleCountryCode = (e) => {
        setCountryCode(e.target.value)
        setCountryCodeErr(false)
    }

    const handleSubmit = () => {
        if(userName === ""){
            setUserNameErr(true)
        }

        if(firstName === "" || (/\d/.test(firstName) || (/[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/).test(firstName))){
            setFirstNameErr(true)
        }

        if(lastName === "" || (/\d/.test(lastName) || (/[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/).test(lastName))){
            setLastNameErr(true)
        }

        if(email === "" || !(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email))){
            setEmailErr(true)
        }

        if(password === ""){
            setPasswordErr(true)
        }

        if(passportNumber === "" || (/[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/).test(passportNumber)){
            setPassportNumberErr(true)
        }

        if(telephoneNumber.length !==0 && !(/^\d+$/).test(telephoneNumber)){
            setTelephoneNumberErr(true)
        }
        
        if(countryCode !== "" && countryCode.charAt(0) !=='+'){
            setCountryCodeErr(true)
        }
        if(userNameErr || firstNameErr || lastNameErr || emailErr || passwordErr || passportNumberErr || telephoneNumberErr || countryCodeErr){
            toast.error("Make sure all data entries are valid", {position: toast.POSITION.BOTTOM_RIGHT})
        }
        else {
            setData({
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                passportNumber: passportNumber,
                password: password,
                homeAddress: home,
                telephoneNumber: telephoneNumber,
                countryCode: countryCode
            }) 
        }
    }

    useEffect(() => {
        if(data !== ""){
        axios.post("http://localhost:5000/user/add", data)
            .then (() => {
                toast.success(`User created successfully. Welcome ${userName}. Login to your account to proceed`, {position: toast.POSITION.BOTTOM_RIGHT})
                navigate("../login", {replace: true})
            })
            .catch((error) => {
                toast.error("An error occurred while trying to create your account", {position: toast.POSITION.BOTTOM_RIGHT})
                console.log(error)
            })
        }
    }, [data])

    return (
    <div className = {styles.grid}>
        <Grid container direction = "column" justifyContent = "center" alignItems = "center" spacing = {3} >
            
            <Grid item>
                <TextField label = 'Username' required error = {userNameErr? true: false} value = {userName} onChange = {handleUsername} variant = 'outlined' className = {styles.textField} size = "small">
                </TextField>
            </Grid>

            
            <Grid item>
                <Grid container direction = "row" alignItems = "center" spacing = {4} >
                    <Grid item>
                        <TextField label = 'First Name' required error = {firstNameErr? true: false} value = {firstName} onChange = {handleFirstName} variant = 'outlined' className = {styles.textFieldRow} size = "small">
                        </TextField>
                    </Grid>
                    
                    <Grid item>
                        <TextField label = 'Last Name' required error = {lastNameErr? true: false} value = {lastName} onChange = {handleLastName} variant = 'outlined' className = {styles.textFieldRow} size = "small">
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <TextField label = 'Email' required error = {emailErr? true: false} value = {email} onChange = {handleEmail} variant = 'outlined' className = {styles.textField} size = "small">
                </TextField>
            </Grid>

            <Grid item>
                <TextField label = 'Password' required type={showPassword ? "text" : "password"} error = {passwordErr? true: false} value = {password} onChange = {handlePassword} variant = 'outlined' className = {styles.textField} size = "small" InputProps={{
                        endAdornment: (
                              <InputAdornment position="end"> <IconButton onClick={handleClickShowPassword}>
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                        )}}>
                </TextField>
            </Grid>

            <Grid item>
                <TextField label = 'Passport Number' required error = {passportNumberErr? true: false} value = {passportNumber} onChange = {handlePassportNumber}variant = 'outlined' className = {styles.textField}  size = "small">
                </TextField>
            </Grid>

            <Grid item>
                <TextField label = 'Home Address' value = {home} onChange = {handleHome} variant = 'outlined' className = {styles.textField} size = "small">
                </TextField>
            </Grid>


            <Grid item>
                <Grid container direction = "row" alignItems = "center" spacing = {4} >
                <Grid item>
                        <TextField label = 'Country Code' error={countryCodeErr?true:false} value = {countryCode} onChange = {handleCountryCode} variant = 'outlined' className = {styles.textFieldRow2} size = "small">
                        </TextField>
                    </Grid>
                    
                    <Grid item>
                        <TextField label = 'Telephone Number' error={telephoneNumberErr?true:false} value = {telephoneNumber} onChange = {handleTelephoneNumber} variant = 'outlined' className = {styles.textFieldRow3} size = "small">
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
            
            
            <Grid item className = {styles.typography}>
            <a href='/login' style = {{color: "#017A9B"}}>
                <Typography>
                    Already have an account? Login
                </Typography>
                </a> 
            </Grid>

            <Grid item>
                <Button onClick = {handleSubmit}
                style = {{
                    backgroundColor: "#017A9B",
                    color: "#FFFFFF",
                    textTransform: "none",
                    width: "10em",
                    borderRadius: "0.5em",
                    boxShadow: "0.1em 0.2em 0.35em  black"
                }}>
                    Create Account
                </Button>
            </Grid>
        </Grid>
      </div>
    );
}

export default Signup
