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
import styles from './index.module.css'
import EditUser from '../editUser';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const DrawerComponent =()=>{
    const [users,setUsers]=React.useState();
    const [open, setOpen] = React.useState(false);
    const [isEdit,setIsEdit]=React.useState(false);
    const [edited,setEdited]=React.useState(false)
    const [flag,setFlag]= React.useState(false);
    const handleDrawerOpen=()=>{ setOpen(true) }
    useEffect(() => {
        console.log("here")
        axios.get('http://localhost:5000/user/getUsers')
        .then((res) => {
        setUsers(res.data)
        setFlag(true);
    })},[isEdit]);

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
                <div className={styles["list"]}  >
                  <ListItemIcon > <AccountCircleIcon/></ListItemIcon>
                  Profile
                </div>
                <div className={styles["fields"]}>Username: </div>
                <div className={styles["text"]}>{users[1].userName}</div>
                <div className={styles["fields"]}>Firstname: </div>
                <div className={styles["text"]}>{users[1].firstName}</div>
                <div className={styles["fields"]}>Lastname: </div>
                <div className={styles["text"]}>{users[1].lastName}</div>
                <div className={styles["fields"]}>Email:</div>
                <div className={styles["text"]}>{users[1].email}</div>
                <div className={styles["fields"]}>Passport Number: </div>
                <div className={styles["text"]}>{users[1].passportNumber}</div>
            </Paper>
            {['Edit Profile'].map((text, index) => (
               <ListItem key={text}  onClick={()=>handleList(text)} button >
               <ListItemIcon  className={edited?styles["stylesEdited"]:""} >  <EditIcon/> </ListItemIcon>
               <ListItemText primary={text}  />
               </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['My Trips'].map((text, index) => (
              <ListItem onClick={()=>handleItinerary(text)} button key={text}>
                <ListItemIcon  className={edited?styles["stylesEdited"]:""}> <AccessTimeIcon/> </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      );
      const listUnsigned=(anchor)=>(
        <Box sx={{ width: anchor === 'top'? 'auto' : 250 ,marginRight:2  }}>
          <List>
            <Paper elevation={0} className={styles["paper"]}>
                <Typography sx={{ fontSize: 24 }} color="text.secondary" >
                  You are not logged in yet. Please sign in to access your account and itinerary.
                </Typography>
            </Paper>
          </List>
        </Box>
      )
    
      return (
        <div>
          <Toolbar title="open settings"> <IconButton  onClick={handleDrawerOpen}  > <MenuIcon /> </IconButton> </Toolbar>
            <React.Fragment key="left" anchor="left">
              {isEdit? <EditUser user={users[1]} onEdit={(edit)=>setIsEdit(edit)}/>:<></>}
              <Drawer anchor="left" open={open} onClose={()=>setOpen(false)}>
                {flag? listSigned("left"):listUnsigned("left")}
              </Drawer>
            </React.Fragment>
        </div>
      );
}
export default DrawerComponent;

