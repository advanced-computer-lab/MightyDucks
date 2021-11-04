const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const flightRepository = require("./repositories/flightRepository");
const userRepository = require("./repositories/userRepository")
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
    let result = await userRepository.login(user.userName,user.password)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post('/flight/create', async (req, res)=>{
  try {
    let result = await flightRepository.createFlight(req)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/flight/delete', async  (req, res) => {
  try {
    let result = await flightRepository.deleteFlight(req)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/flight/getFlights', async (req, res) => {
  try {
    let result = await flightRepository.getFlights(req)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

