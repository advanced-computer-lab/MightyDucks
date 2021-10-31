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
      email: req.body.email,
      password: req.body.password
  }
  try {
    let result = await userRepository.login(user.email,user.password)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).json(error)
  }
})