import React, {useState, useEffect} from 'react'
import axios from 'axios';
import useStyles from './style'
import { Grid, Button, Typography} from '@mui/material';
import { TextField } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import Navbar from '../navbar';

function SignUp({}) {
    const styles = useStyles()

    const [userName, setUserName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [passportNumber, setPassportNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [home, setHome] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState([])
    const [countryCode, setCountryCode] = useState("")

    const [userNameErr, setUserNameErr] = useState(false)
    const [firstNameErr, setFirstNameErr] = useState(false)
    const [lastNameErr, setLastNameErr] = useState(false)
    const [passportNumberErr, setPassportNumberErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)
    const [telephoneNumberErr, setTelephoneNumberErr] = useState(false)
    const [countryCodeErr, setCountryCodeErr] = useState(false)

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

        if(telephoneNumber !== "" && !(/^\d+$/).test(telephoneNumber)){
            setTelephoneNumberErr(true)
        }
        
        if(countryCode !== "" && countryCode.charAt(0) !=='+'){
            console.log(countryCode.substring(1))
            setCountryCodeErr(true)
        }

        if(!userNameErr && !firstNameErr && !lastNameErr && !emailErr && !passwordErr && !passportNumberErr && !telephoneNumberErr && !countryCodeErr){
            setData({
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                passportNumber: passportNumber,
                password: password,
                homeAddress: home,
                telephoneNumbers: telephoneNumber,
                countryCode: countryCode
            })
            
            
        }
    }

    useEffect(() => {
        if(data !==""){
            console.log(data)
        axios.post("http://localhost:5000/user/add", data)
            .then (() => {
                toast.success(`User created successfully. Welcome ${userName}`, {position: toast.POSITION.BOTTOM_RIGHT})
            })
            .catch((error) => {
                toast.error("An error occurred while trying to create your account", {position: toast.POSITION.BOTTOM_RIGHT})
                console.log(error)
            })
        }
        
    }, [data])

    return (
    <div className ={styles.grid}>
        <Navbar/>
        <Grid container className ={styles.grid} direction = "column" justifyContent = "center" alignItems = "center" spacing = {3} className='styles.relativity'>
            
        <Grid item>
                <TextField label = 'Username' error = {userNameErr? true: false} value = {userName} onChange = {handleUsername} variant = 'outlined' className = {styles.textField} size = "small">
                </TextField>
            </Grid>

            
            <Grid item>
                <Grid container direction = "row" alignItems = "center" spacing = {4} >
                    <Grid item>
                        <TextField label = 'First Name' error = {firstNameErr? true: false} value = {firstName} onChange = {handleFirstName} variant = 'outlined' className = {styles.textFieldRow} size = "small">
                        </TextField>
                    </Grid>
                    
                    <Grid item>
                        <TextField label = 'Last Name' error = {lastNameErr? true: false} value = {lastName} onChange = {handleLastName} variant = 'outlined' className = {styles.textFieldRow} size = "small">
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <TextField label = 'Email' error = {emailErr? true: false} value = {email} onChange = {handleEmail} variant = 'outlined' className = {styles.textField} size = "small">
                </TextField>
            </Grid>

            <Grid item>
                <TextField label = 'Password' error = {passwordErr? true: false} value = {password} onChange = {handlePassword} variant = 'outlined' className = {styles.textField} size = "small">
                </TextField>
            </Grid>

            <Grid item>
                <TextField label = 'Passport Number' error = {passportNumberErr? true: false} value = {passportNumber} onChange = {handlePassportNumber}variant = 'outlined' className = {styles.textField}  size = "small">
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

export default SignUp
