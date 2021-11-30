import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStyles from './style'
import Navbar from '../../components/navbar';
import TripCard from '../../components/tripCard';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {Box, Typography} from '@mui/material'
import PropTypes from 'prop-types';


function Itinerary(props) {
    const styles = useStyles()
    const [currentUser, setUser] = useState({})
    const [value, setValue] = useState(0);
    const [upcoming, setUpcoming] = useState([])
    const [past, setPast] = useState([])
    const [deleted, setDeleted] = useState(false)


     const getUpcomingFlights=async(data)=>{
        await axios.post('http://localhost:5000/user/getFlights/upcoming', data)
        .then((res) => {
            setUpcoming(res.data)
            setDeleted(false)
        }).catch((error) => {
            console.log(error)
        });
    };
    
     const getPastFlights=async(data)=>{
        await axios.post('http://localhost:5000/user/getFlights/past', data)
        .then((res) => {
            setPast(res.data)
        }).catch((error) => {
            console.log(error)
        });
    };

    useEffect(() => {
        if(deleted){
            getUpcomingFlights({userName: currentUser.userName})
        }
    },[deleted]);

    useEffect(() => {
        getUpcomingFlights({userName: currentUser.userName})
        getPastFlights({userName: currentUser.userName})
    },[currentUser]);
   
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
    return {
        id: `id-${index}`,
        'aria-controls': `controls-${index}`,
    };
    }

    function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
   

    return (
        <div >
        <Navbar setuser={setUser} deleted={deleted}/>
        <div style={{alignContent:"center"}}>
            <Tabs sx={{marginTop: "5em"}} className={styles.tabs} centered={true} value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Upcoming Trips" {...a11yProps(0)} />
            <Tab label="Past Trips" {...a11yProps(1)} />
            </Tabs>
        </div>

        <TabPanel value={value} index={0}>
            <Grid container direction="column" spacing ={2} alignContent="center" sx={{marginTop: "0.5em"}}>
            {upcoming.length ===0 ?
            <Grid item>
                <div className={styles.empty}>No Upcoming Flights to Preview</div>
            </Grid> :           
            upcoming && upcoming.map((flight) => {
                return (<Grid item className={styles.card}>
                            <TripCard user={currentUser} reservation={flight} upcoming={true} setDeleted = {setDeleted}/>
                        </Grid>)
            })}
            </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Grid container direction="column" spacing ={2} alignContent="center" sx={{marginTop: "0.5em"}}>
            {past.length === 0 ? 
            <Grid item>
                <div className={styles.empty}>No Past Flights to Preview</div>
            </Grid> :
            past && past.map((flight) => {
                return (<Grid item className={styles.card}>
                            <TripCard user={currentUser} reservation={flight} upcoming={false}/>
                        </Grid>)
            })}
            </Grid>
        </TabPanel>
        </div>
    )
}

export default Itinerary
