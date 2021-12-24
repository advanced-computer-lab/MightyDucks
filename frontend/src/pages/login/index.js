import React, {useState, useEffect} from 'react'
import axios from 'axios';
import useStyles from './style'
import { Grid, Button, Typography} from '@mui/material';
import { TextField } from '@material-ui/core';
import {InputAdornment} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../../components/navbar';
import Logo from '../../assets/Images/logo.svg'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Icon from '@mui/material/Icon';
import { IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Navigate } from 'react-router-dom';

function Login() {

    const styles = useStyles()

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameErr, setUsernameErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)
    const [data, setData] = useState("");
    const [token, setToken] = useState("");
    const [toHome, setToHome] = useState(false)

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleUsername = (e) => {
        setUsername(e.target.value)
        setUsernameErr(false)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        setPasswordErr(false)
    }

    

    const handleSubmit = () => {
        if(username === "") {
            setUsernameErr(true)
        }

        if(password === "") {
            setPasswordErr(true)
        }

        if(usernameErr || passwordErr) {
            toast.error("Enter missing data", {position: toast.POSITION.BOTTOM_RIGHT})
        }

        else {
            setData({
                userName: username,
                password: password
            })
        }
    }

    useEffect(() => {
    if(data !== ""){
        axios.post("http://localhost:5000/login", data)
        .then ((res) => {        
            if(!(res.data.message === "Invalid username or Password")){
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.setItem("token", res.data.token)
                setToken(res.data.token)
            axios.post("http://localhost:5000/user/getUser", data, {
            headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
            }
            })
        .then ((res) => {
            toast.success(`Logged in successfully. Welcome ${username}`, {position: toast.POSITION.BOTTOM_RIGHT})
            localStorage.setItem("user", JSON.stringify(res.data))
            setToHome(true)
        })
        .catch((error) => {
            console.log(error)
        })
            }
        else {
            toast.error("Invalid account details", {position: toast.POSITION.BOTTOM_RIGHT})
        }
        })
        .catch((error) => {
            toast.error("Invalid account details", {position: toast.POSITION.BOTTOM_RIGHT})
            console.log(error)
        })
    }
        
    }, [data])




    return (
         <div className = {styles.grid}>
            <Grid container direction = "column" justifyContent = "center" alignItems = "center" spacing = {3} >

                <Grid item>
                  <img src={Logo} alt = "logo" className={styles.image} href="/"/>
                </Grid>

                <Grid container direction = "column" justifyContent = "center" alignItems = "center" spacing = {5} >

                <Grid item>
                    <TextField label = 'Username' required error = {usernameErr? true: false} variant = 'outlined' onChange = {handleUsername} className = {styles.textField} size = "small" InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon className={styles.icons} sx={{fontSize:"1.3em"}}/>
                        </InputAdornment>
                    ),
                    }}>
                    </TextField>
                </Grid>

                <Grid item>
                    <TextField label = 'Password' required error = {passwordErr? true: false} type={showPassword ? "text" : "password"} variant = 'outlined' onChange = {handlePassword} className = {styles.textField} size = "small" InputProps={{
                        startAdornment: (
                        <InputAdornment position="start" >
                            <LockIcon className={styles.icons} sx={{fontSize:"1.3em"}}/>
                        </InputAdornment>
                    ),
                        endAdornment: (
                              <InputAdornment position="end"> <IconButton onClick={handleClickShowPassword}>
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                        )}}>
                    </TextField>
                </Grid>
                </Grid>
                <Grid item className = {styles.typography}>
                    <a href='/signup' style = {{color: "#017A9B"}}>
                        <Typography>
                            Don't have an account? Sign up
                        </Typography>
                    </a> 
                </Grid>

                <Grid item>
                <Button onClick = {handleSubmit}
                style = {{
                    backgroundColor: "#017A9B",
                    color: "#FFFFFF",
                    textTransform: "none",
                    width: "8em",
                    borderRadius: "0.5em",
                    boxShadow: "0.1em 0.2em 0.35em  black"
                }}>
                    Login
                </Button>
            </Grid>
            {toHome  && <Navigate to="/"/>}
            </Grid>
        </div>
    )
}

export default Login
