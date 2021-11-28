const users = require('../models/userModel');

class userRepository{
    async login(userName, password){
        return new Promise((res,rej) =>{
            try{
                users.findOne({ userName : userName }, function (err, docs) {
                    if (docs == undefined){
                        rej("User not found!")
                    }
                    else{
                        if(docs.password == password)
                            res("Login Successful")
                        else
                            rej("Password is incorrect")
                    }
                });
            }
            catch(err){
                throw new Error("Username Or Password Are Incorrect")
            }
        })
    }

    async getUsers(){
        let allUsers = users.find({})
        return allUsers
    }

    async updateUser(req){
        users.findOneAndUpdate({userName: req.body.oldUserName}, {$set:{
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email:req.body.email,
            passportNumber:req.body.passportNumber,
            flights: req.body.flights,
            password:req.body.password,}}).then(() => {
                console.log(`User ${req.body.userName} was updated successfully!`)
                return req.body.userName;
            })
    }
}

const repository = new userRepository();
module.exports = repository;
