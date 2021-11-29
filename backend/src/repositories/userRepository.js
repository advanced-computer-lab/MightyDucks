const users = require("../models/userModel");

class userRepository {
    async login(userName, password) {
        return new Promise((res, rej) => {
            try {
                users.findOne({
                    userName: userName
                }, function (err, docs) {
                    if (docs == undefined) {
                        rej("User not found!");
                    } else {
                        if (docs.password == password) res("Login Successful");
                        else rej("Password is incorrect");
                    }
                });
            } catch (err) {
                throw new Error("Username Or Password Are Incorrect");
            }
        });
    }

    async getUsers() {
        let allUsers = users.find({});
        return allUsers;
    }

    async updateUser(req) {
        users
            .findOneAndUpdate({
                userName: req.body.oldUserName
            }, {
                $set: {
                    userName: req.body.userName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    passportNumber: req.body.passportNumber,
                    flights: req.body.flights,
                    password: req.body.password,
                },
            })
            .then(() => {
                console.log(`User ${req.body.userName} was updated successfully!`);
                return req.body.userName;
            });
    }

    async getFlights(userName) {
        return new Promise((res, rej) => {
            users.findOne({
                userName: userName
            }, function (err, docs) {
                if (docs == undefined) {
                    rej("User not found!");
                } else {
                    let results = []
                    console.log(docs.flights);
                    for (let flight of docs.flights) {
                        let data = flight.split(" ")
                        results.push(data[0])
                        results.push(data[2])
                    }
                    res(results);
                }
            });
        });
    }

    async deleteFlight(req) {
        let user = users.find({
            userName: req.body.userName
        })
        for (let i in user.flights) {
            if (user.flight[i].includes(req.body.bookingId))
                user.flights.splice(i, 1)
        }
        users
            .findOneAndUpdate({
                userName: user.userName
            }, {
                $set: {
                    flights: user.flights,
                },
            })
            .then(() => {
                console.log(`Booking ${req.body.bookingId} was deleted successfully!`);
                return req.body.bookingId;
            });
    }
}

const repository = new userRepository();
module.exports = repository;
