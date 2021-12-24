import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import useStyles from './style'
import EditUser from '../editUser';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid'
import Logo from '../../assets/Images/logo.svg'
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@material-ui/core/styles";
import { Navigate, NavLink } from 'react-router-dom';
import { AdminPanelSettings } from '@mui/icons-material';
import {useLocation} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom"

function Navbar({deleted}){
    const [open, setOpen] = React.useState(false);
    const [isEdit,setIsEdit]=React.useState(false);
    const [edited,setEdited]=React.useState(false)
    const [flag,setFlag]= React.useState(false);
    const [curUser, setCurUser] = React.useState(null)

    const handleDrawerOpen=()=>{ setOpen(true) }
    const navigate = useNavigate()
    const location = useLocation()
    const data = {}
    const header = { headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
    }}
    useEffect(() => {  
        axios.post('http://localhost:5000/user/getUser', data, header)
        .then((res) => {
            setCurUser(res.data)
            setFlag(!(res.data.message === "Incorrect Token Given"))
            
        }).catch((error) => {
            console.log(error)
        });
        
    },[isEdit, deleted, localStorage.getItem("token")])

    const theme = useTheme()
    const styles = useStyles()
    const xs = useMediaQuery(theme.breakpoints.only('xs'));
    const handleList=(text)=>{
        switch(text){
            case 'Edit Profile': setIsEdit(true);setEdited(true) ; break;
            default : ;break;
        }
    }

    const handleItinerary=(text)=>{
        switch(text){
            case 'My Trips': navigate("../itinerary", {replace: true}) ; break;
            default : ;break;
        }
    }
    const handleAdmin=(text)=>{
      switch(text){
          case 'Admin Controls': navigate("../admin", {replace: true}) ; break;
          default : ;break;
      }
    }

    const handleSignup = () => {
      if(location.pathname === "/signup")
        window.location.reload(false)
      else {
       navigate("../signup", {replace: true})
      }
    }

    const handleSignOut = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("admin")
      localStorage.removeItem("not password")
      setFlag(false)
      setCurUser(null)
      toast.success("You have been logged out", {position: toast.POSITION.BOTTOM_RIGHT})
      navigate("../", {replace: true})
    }

    const handleLogin = () => {
      if(location.pathname === "/login")
        window.location.reload(false)
      else {
        navigate("../login", {replace: true})
      }
      
    }

      const listSigned = (anchor) => (
        <Box sx={{ width: anchor === 'top'? 'auto' : 250 ,marginRight:2 }} style={{width:'fit-content', minWidth:260}} >
          <List>
            <Paper elevation={0} >
                <div className={styles.list}  >
                  <ListItemIcon > <AccountCircleIcon/></ListItemIcon>
                  Profile
                </div>
                <div className={styles.fields}>Username: </div>
                <div className={styles.text}>{curUser && curUser.userName}</div>
                <div className={styles.fields}>Firstname: </div>
                <div className={styles.text}>{curUser && curUser.firstName}</div>
                <div className={styles.fields}>Lastname: </div>
                <div className={styles.text}>{curUser && curUser.lastName}</div>
                <div className={styles.fields}>Email:</div>
                <div className={styles.text}>{curUser && curUser.email}</div>
                <div className={styles.fields}>Passport Number: </div>
                <div className={styles.text}>{curUser && curUser.passportNumber}</div>
                <div className={styles.fields}>Home Address:</div>
                <div className={styles.text}>{curUser && curUser.homeAddress}</div>
                <div className={styles.fields}>Telephone Number: </div>
                <div className={styles.text}>{curUser && curUser.telephoneNumber}</div>
            </Paper>
            {['Edit Profile'].map((text, index) => (
               <ListItem key={text}  onClick={()=>handleList(text)} button >
               <ListItemIcon  className={edited?styles.stylesEdited:""} >  <EditIcon/> </ListItemIcon>
               <ListItemText primary={text}  />
               </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['My Trips'].map((text, index) => (
              <ListItem onClick={()=>handleItinerary(text)} button key={text}>
                <ListItemIcon  className={edited?styles.stylesEdited:""}> <AccessTimeIcon/> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {curUser && curUser.isAdmin && <Divider />}
          {curUser && curUser.isAdmin && <List>
            {['Admin Controls'].map((text, index) => (
              <ListItem onClick={()=>handleAdmin(text)} button key={text}>
                <ListItemIcon  className={edited?styles.stylesEdited:""}> <AdminPanelSettings/> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>}
        </Box>
      );
      const listUnsigned=(anchor)=>(
        <Box sx={{ width: anchor === 'top'? 'auto' : 250 ,marginRight:2  }}>
          <List>
            <Paper elevation={0} className={styles.paper}>
                <Typography sx={{ fontSize: 24 }} color="text.secondary" >
                  You are not logged in yet. Please <NavLink style={{color:"#017A9B"}} to={{pathname: "/login"}}>sign in</NavLink> to access your account and itinerary.
                </Typography>
            </Paper>
          </List>
        </Box>
      )
    
      return (
        <AppBar className={styles.appBar}>
          <Toolbar>
            <Grid container direction = "row" justifyContent="flex-start" spacing = {0} className={styles.grid1}>
              <Grid item className={styles.drawerLoc}>
                <IconButton onClick={handleDrawerOpen}>
                  <MenuIcon className={styles.drawer}/>
                </IconButton> 
                    {isEdit? <EditUser user={curUser} onEdit={(edit)=>setIsEdit(edit)}/>:<></>}
                    <Drawer className={styles.drawer} anchor="left" open={open} onClose={()=>setOpen(false)}>
                      {flag? listSigned("left"):listUnsigned("left")}
                    </Drawer>
              </Grid>

              
              <Grid item>
                <a href='/'>
                  <img src={Logo} alt = "logo" className={styles.image} href="/"/>
                </a>
              </Grid>
              
              
              {(xs) ? null
              :
              <Grid item>
              <a href='/' style={{textDecoration: "none"}}>
                <div className={styles.barTitle}>
                      Mighty Ducks
                </div>
              </a>
              </Grid>
              }
              
            </Grid>

            {flag ?

             <Grid container direction = "row" className={styles.grid2} justifyContent="flex-end" spacing = {3} >
                <Grid item>
                  <div className={styles.barButtons} onClick={handleSignOut} >
                    Sign Out
                  </div>
                </Grid> 

                <Grid item>
                <a href='/' style={{textDecoration: "none"}}>
                  <div className={styles.barLink}>
                      Book a flight?   
                  </div>
                </a>
                </Grid>  

                {(xs) ? null 
                :
                <Grid item>
                  <div className={styles.divider}>
                    |
                  </div>
                </Grid>
                }

                {(xs) ? null
                : 
                <Grid item>
                  <div className={styles.barText}>
                    Hello, {curUser && curUser.firstName}
                  </div>
                </Grid>
                }  
              </Grid> 
            :
            <Grid container direction = "row" className={styles.grid2} justifyContent="flex-end" spacing = {3}>
              <Grid item>
                 <a href='/' style={{textDecoration: "none"}}>
                  <div className={styles.barButtons} style = {{marginTop: "0.5em"}}>
                      Book a flight?   
                  </div>
                </a>
              </Grid> 

              {(xs) ? null
              :
              <Grid item>
                <div className={styles.divider} style = {{marginTop: "0.1em"}}>
                  |
                </div>
              </Grid> 
              }
               
              <Grid item>
              
                <div className={styles.barButtons} style = {{marginTop: "0.5em"}} onClick={handleLogin}>
                  Login
                </div>
              
              </Grid>

              {(xs) ? null
              :
              <Grid item>
                <Button className={styles.button} onClick={handleSignup}>
                  Sign Up
                </Button>
              </Grid> 
              }
                
            </Grid>
            }
            </Toolbar>
            
        </AppBar>
      );
}
export default Navbar;

