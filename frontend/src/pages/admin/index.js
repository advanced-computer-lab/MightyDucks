import React, { Component } from 'react'
import {RingLoader} from "react-spinners"
import Flight from "../../components/flight"
import axios from 'axios';
import AddFlightModal from '../../components/addFlightModal';
import styles from './index.module.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { TextField, Button, Menu, MenuItem, InputAdornment, IconButton,} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default class Admin extends Component {

  state={
    isLoading: true,
    allFlights: [],
    flights: [],
    category: "",
    anchorEl: null,
    date: "",
    searchDate: false
  }

  componentDidMount = () => {
    this.getFlights()
  }

  getFlights=async()=>{
    this.setState({
      ...this.state,
      isLoading: true,
    })
    await axios.get('http://localhost:5000/flight/getFlights')
    .then((res) => {
        console.log(res.data);
        this.setState({
          ...this.state,
          isLoading: false,
          allFlights: res.data,
          flights: res.data,
        })
    }).catch((error) => {
        console.log(error)
    });
  };

  render() {
    const open = Boolean(this.state.anchorEl);

    const handleOpen = (event) => {
    this.setState( {
        ...this.state,
        anchorEl: event.currentTarget
        })
    };

    const handleClose = () => {
        this.setState({
            ...this.state,
            anchorEl: null
        })
    };

    const handleClick = (str) => {
        if(str === "departureTime" || str === "arrivalTime"){
            this.setState({
                ...this.state,
                category: str,
                anchorEl: null,
                date: "",
                searchDate: true
            })
        }    
        else {
            this.setState({
                ...this.state,
                category: str,
                anchorEl: null,
                searchDate: false
            })
        }    
    }

    const handleDateClick = (str) => {
        this.setState({
            ...this.state,
            category: str,
            anchorEl: null,
            date: str
        })
        handleSearch(str)
    }

    const handleSearch = (str) => {
        var results = this.state.allFlights
        var category = this.state.category
        if(str === ""){
           this.setState({
                ...this.state,
                flights: results
            })
        }
        else {
            var res = []
            if (category === "flightNumber" || category === ""){
                res = results.filter((flight)=> {
                return flight.flightNumber.toLowerCase().includes(str.toLowerCase())
            })
            this.setState({
                ...this.state,
                flights: res
            })
            }
            else if (category === "departureTime"){
                 results.forEach((flight)=> {
                     flight.departureTime = new Date(flight.departureTime).toString()
                 })

                res = results.filter((flight)=> {
                    return flight.departureTime.substring(0,21) === str.toString().substring(0,21)
                })
            this.setState({
                ...this.state,
                flights: res
            })
            }
            else if (category === "arrivalTime"){
                 results.forEach((flight)=> {
                     flight.arrivalTime = new Date(flight.arrivalTime).toString()
                 })
                res = results.filter((flight)=> {
                    console.log(flight.arrivalTime.toString().substring(0,21))
                    console.log(str.toString().substring(0,21))
                return flight.arrivalTime.substring(0,21) === str.toString().substring(0,21)
            })
            this.setState({
                ...this.state,
                flights: res
            })
            }
            else if (category === "from"){
                res = results.filter((flight)=> {
                return flight.from.toLowerCase().includes(str.toLowerCase())
            })
            this.setState({
                ...this.state,
                flights: res
            })
            }
            else if (category === "to"){
                res = results.filter((flight)=> {
                return flight.to.toLowerCase().includes(str.toLowerCase())
                
            })
            this.setState({
                ...this.state,
                flights: res
            })
            }      
        }           
    }
    return (
      <container style={{textAlign: "-webkit-center"}}>
        
        <div className={styles["bar"]}>
            {this.state.searchDate ? 
            (
            <LocalizationProvider  dateAdapter={AdapterDateFns} >
                <MobileDateTimePicker 
                label="Select Date & Time" value={this.state.date}
                onChange={(e)=>{handleDateClick(e)}}
                renderInput={(params) => <TextField className={styles["textField"]} {...params} />}
                />
            </LocalizationProvider>
            
            )
            :
            (
            <TextField  id="searchBar" label="Search" className ={styles["textField"]} variant="outlined" onChange={(e)=>handleSearch(e.target.value)}
            InputProps={{
            endAdornment: (
                <InputAdornment>
                    <IconButton style={{color:"#017A9B"}}>
                      <SearchOutlinedIcon />
                    </IconButton>
                </InputAdornment>
                )
            }}>   
            </TextField>
            )}
         
        <Button
            style={{backgroundColor: "white", color: "#2E3D49", margin: "1.2em", height: "4em"}}
            id="categorize"
            variant="contained"
            aria-controls="categoryMenu"
            aria-expanded={open ? 'true' : undefined}
            disableElevation
            aria-haspopup="true"
            onClick={handleOpen}
            endIcon={<KeyboardArrowDownIcon/>}>
            {this.state.category === "" ? "Categorize By" : this.state.category}
        </Button>
            
        <Menu
            id="categoryMenu"
            MenuListProps={{'aria-labelledby': 'categorize',}}
            anchorEl={this.state.anchorEl}
            open={open}
            onClose={handleClose}>
            <MenuItem onClick={(e)=>handleClick(("flightNumber"))}>Flight Number</MenuItem>
            <MenuItem onClick={(e)=>handleClick(("departureTime"))}>Departure</MenuItem>
            <MenuItem onClick={(e)=>handleClick(("arrivalTime"))}>Arrival</MenuItem>
            <MenuItem onClick={(e)=>handleClick(("from"))}>From</MenuItem>
            <MenuItem onClick={(e)=>handleClick(("to"))}>To</MenuItem>
        </Menu>
            <Button style={{backgroundColor: "white", borderRadius: "2em", width: "1em"}}
            id="categorize"
            variant="contained"
            disableElevation><AddFlightModal getFlights={this.getFlights} /></Button>
        </div>
        <div className={styles["flightModal"]}>
        <br />
        {this.state.isLoading && <div className={styles["divElement"]}><RingLoader color="#017A9B" /></div>}
        <div style={{backgroundColor: "#E5E5E5", width: "50%", padding: "0.5em"}}>
        {this.state.flights.length>0 && <div className={styles["stat"]}>Showing {this.state.flights.length} flights</div>}
        {this.state.flights.length>0 && 
          (this.state.flights.map((flight) => {
            return (
              <div>
                <Flight flightDetails={flight} getFlights={this.getFlights} />
                <br />
              </div>
            )
          }))}
        </div>
          </div>
        </container>
    )
  }
}
