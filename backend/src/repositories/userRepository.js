const users = require('../models/userModel');

class userRepository{
    async login(email, password){
        return new Promise((res,rej) =>{
            try{
                users.findOne({ email : email }, function (err, docs) {
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
                throw new Error("Email Or Password Are Incorrect")
            }
        })
    }
}

const repository = new userRepository();
module.exports = repository;