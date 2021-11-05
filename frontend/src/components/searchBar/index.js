import React, { Component } from 'react'
import { TextField, Button, Menu, MenuItem, InputAdornment, IconButton,} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from 'axios';
import styles from "./styles.css"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { makeStyles, styled } from '@mui/styles';
import { createMuiTheme } from '@mui/material';
class SearchBar extends Component {

    state = {
        allFlights: [],
        flights: [],
        category: "",
        anchorEl: null,
        date: "",
        searchDate: false
    }

    async componentDidMount(){
        await axios.get('http://localhost:5000/flight/getFlights')
        .then((res) => {
            this.setState({
                ...this.state,
                allFlights: res.data
            })
        })
    }
    
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
                        console.log("hahaha lol")
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
            <div className= "bar">
            {this.state.searchDate ? 
            (
            <LocalizationProvider  dateAdapter={AdapterDateFns} >
                <MobileDateTimePicker 
                label="Select Date & Time" value={this.state.date}
                onChange={(e)=>{handleDateClick(e)}}
                renderInput={(params) => <TextField className="textField" {...params} />}
                />
            </LocalizationProvider>
            
            )
            :
            (
            <TextField  id="searchBar" label="Search" className = "textField" variant="outlined" onChange={(e)=>handleSearch(e.target.value)}
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
            <Button style={{backgroundColor: "white", color: "#2E3D49", margin: "1.2em", height: "4em"}}
            id="categorize"
            variant="contained"
            disableElevation>add icon here</Button>
         <div className = "test">
            {this.state.flights.length >0 && this.state.flights.map((flight)=>{
                return <div>{flight.flightNumber}</div>
            })}
        </div>
        </div>
        )
    }
}

export default SearchBar
