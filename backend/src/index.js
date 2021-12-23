const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const flightRepository = require("./repositories/flightRepository");
const userRepository = require("./repositories/userRepository")
const mailerRepository = require("./repositories/mailerRepository")
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(result =>
    console.log("MongoDB is now connected")
  ).catch(err =>
    console.log(err)
  );
  console.log(`Server is running on port: ${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Mighty Ducks Backend!')
})

app.post('/login', async (req, res) => {
  let user = {
    userName: req.body.userName,
    password: req.body.password
  }
  try {
    let result = await userRepository.login(user.userName, user.password)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post('/flight/create', async (req, res) => {
  try {
    let result = await flightRepository.createFlight(req)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/flight/update', async (req, res) => {
  try {
    let result = await flightRepository.updateFlight(req)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/flight/delete', async (req, res) => {
  try {
    let result = await flightRepository.deleteFlight(req)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/flight/getFlights', async (req, res) => {
  try {
    let result = await flightRepository.getFlights()
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/user/getUsers', async (req, res) => {
  try {
    let result = await userRepository.getUsers()
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

    
app.post('/flight/getFlight', async (req, res) => {
  try {
    let result = await flightRepository.getFlight(req)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})
    
app.post('/user/update', async (req, res) => {
  try {
    let result = await userRepository.updateUser(req)
    res.status(200).send(result)
  } catch (error) {
    console.log("err")
    res.status(400).send(error)
  }
})

app.post('/flight/filterFlights', async (req, res) => {
  try {
    let result = await flightRepository.filterFlights(req)
    res.status(200).send(result)
  } catch (error) {
    console.log("err")
    res.status(400).send(error)
  }
})

app.post('/user/getFlights/upcoming', async (req, res) => {
  try {
    console.log("/user/getFlights/upcoming")
    let flights = await flightRepository.getFlights()
    let upcomingFlights = flights.filter(flight => flight.departureTime > new Date());
    let userFlights = await userRepository.getFlights(req.body.userName, upcomingFlights);
    res.status(200).send(userFlights)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/user/getFlights/past', async (req, res) => {
  try {
    let flights = await flightRepository.getFlights()
    let pastFlights = flights.filter(flight => flight.departureTime < new Date());
    let userFlights = await userRepository.getFlights(req.body.userName, pastFlights);
    res.status(200).send(userFlights)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.delete('/user/deleteFlight', async (req, res) => {
  try {
    let result = await userRepository.deleteFlight(req);
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/user/notify', async (req, res) => {
  try {
    let result = await mailerRepository.send(req);
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post('/user/add', async (req, res) => {
  try {
    let result = await userRepository.addUser(req);
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})