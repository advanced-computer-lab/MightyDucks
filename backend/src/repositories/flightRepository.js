const flights = require('../models/flightModel');

class flightRepository{
    async createFlight(req){
        let flight = new flights({
            from: req.body.from,
            to: req.body.to,
            departureTime: req.body.departureTime,
            arrivalTime:req.body.arrivalTime,
            economy:req.body.economy,
            business:req.body.business,
            first:req.body.first,
            flightNumber:req.body.flightNumber,
            })
            console.log(flight)
        try {
            let result = await flight.save()
            return req.body.flightNumber;;
        }catch (error) {
            throw new Error()
        }
    }
    
    async deleteFlight(req) {
        let flight = flights.findOneAndRemove({
            flightNumber: req.body.flightNumber
        })
        return flight
    }

    async getFlights(req){
        let allFlights = flights.find({})
        return allFlights
    }

    async updateFlight(req){
        flights.findOneAndUpdate({flightNumber: req.body.oldFlightNumber}, {$set:{
            from: req.body.from,
            to: req.body.to,
            departureTime: req.body.departureTime,
            arrivalTime:req.body.arrivalTime,
            economy:req.body.economy,
            business:req.body.business,
            first:req.body.first,
            flightNumber:req.body.flightNumber,}}).then(() => {
                console.log(`Flight ${req.body.flightNumber} was updated successfully!`)
                return req.body.flightNumber;
            })
        
        
    }
}
const repository = new flightRepository();
module.exports = repository;

