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
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';

function Navbar(props){
    const [users,setUsers]=React.useState();
    const [open, setOpen] = React.useState(false);
    const [isEdit,setIsEdit]=React.useState(false);
    const [edited,setEdited]=React.useState(false)
    const [flag,setFlag]= React.useState(false);
    const handleDrawerOpen=()=>{ setOpen(true) }
    useEffect(() => {
        axios.get('http://localhost:5000/user/getUsers')
        .then((res) => {
        setUsers(res.data)
        setFlag(true);
    })},[isEdit]);
    const theme = useTheme()
    const styles = useStyles()
    const xs = useMediaQuery(theme.breakpoints.only('xs'));
    const sm = useMediaQuery(theme.breakpoints.only('sm'));
    const handleList=(text)=>{
        switch(text){
            case 'Edit Profile': setIsEdit(true);setEdited(true) ; break;
            default : ;break;
        }
    }

    //TODO: ItineraryTrips here
    const handleItinerary=(text)=>{
        switch(text){
            case 'My Trips': console.log("in trips") ; break;
            default : ;break;
        }
    }
      const listSigned = (anchor) => (
        <Box sx={{ width: anchor === 'top'? 'auto' : 250 ,marginRight:2  }} >
          <List>
            <Paper elevation={0} >
                <div className={styles.list}  >
                  <ListItemIcon > <AccountCircleIcon/></ListItemIcon>
                  Profile
                </div>
                <div className={styles.fields}>Username: </div>
                <div className={styles.text}>{users[1].userName }</div>
                <div className={styles.fields}>Firstname: </div>
                <div className={styles.text}>{users[1].firstName}</div>
                <div className={styles.fields}>Lastname: </div>
                <div className={styles.text}>{users[1].lastName}</div>
                <div className={styles.fields}>Email:</div>
                <div className={styles.text}>{users[1].email}</div>
                <div className={styles.fields}>Passport Number: </div>
                <div className={styles.text}>{users[1].passportNumber}</div>
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
        </Box>
      );
      const listUnsigned=(anchor)=>(
        <Box sx={{ width: anchor === 'top'? 'auto' : 250 ,marginRight:2  }}>
          <List>
            <Paper elevation={0} className={styles.paper}>
                <Typography sx={{ fontSize: 24 }} color="text.secondary" >
                  You are not logged in yet. Please sign in to access your account and itinerary.
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
                    {isEdit? <EditUser user={users[1]} onEdit={(edit)=>setIsEdit(edit)}/>:<></>}
                    <Drawer className={styles.drawer} anchor="left" open={open} onClose={()=>setOpen(false)}>
                      {flag? listSigned("left"):listUnsigned("left")}
                    </Drawer>
              </Grid>

              <Grid item>
                <img src={Logo} alt = "logo" className={styles.image}/>
              </Grid>
              
              {(xs) ? null
              :
              <Grid item>
                <div className={styles.barTitle}>
                  Mighty Ducks
                </div>
              </Grid>
              }
              
            </Grid>

            {flag ?

             <Grid container direction = "row" className={styles.grid2} justifyContent="flex-end" spacing = {3} >
                <Grid item>
                  <div className={styles.barButtons} >
                    Sign Out
                  </div>
                </Grid> 

                <Grid item>
                  <div className={styles.barButtons} className={styles.navLink}>
                    <NavLink to="/" className={styles.navLink}>
                      Book a flight?
                    </NavLink>
                  </div>
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
                    Hello, {users[1].firstName}
                  </div>
                </Grid>
                }  
              </Grid> 
            :
            <Grid container direction = "row" className={styles.grid2} justifyContent="flex-end" spacing = {3}>
              <Grid item>
                <div className={styles.barButtons} style = {{marginTop: "0.5em"}}>
                  <NavLink to="/" className={styles.navLink}>
                      Book a flight?
                  </NavLink>
                </div>
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
                <div className={styles.barButtons} style = {{marginTop: "0.5em"}}>
                  Sign In
                </div>
              </Grid>

              {(xs) ? null
              :
              <Grid item>
                <Button className={styles.button}>
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

