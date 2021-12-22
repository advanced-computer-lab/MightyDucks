const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const userRepository = require("./repositories/userRepository")

export async function authorize(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if(token){
        jwt.verify(token,secret, (err, decoded) =>{
            if(err) return res.json({
                isLoggedIn: false,
                message: "Failed To Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id
            req.username = decoded.userName
            next()
        })
    } else {
        res.json({message : "Incorrect Token Given", isLoggedIn: false})
    }
}

export async function adminAuthorize(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if(token){
        jwt.verify(token,secret, (err, decoded) =>{
            if(err) return res.json({
                isLoggedIn: false,
                message: "Failed To Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.userName = decoded.userName
            let user = await userRepository.getUser(req.user.userName)
            if(user.isAdmin)
                next()
            else
                res.json({message : "Restricted Access! Admins Only!", isLoggedIn: false})
        })
    } else {
        res.json({message : "Incorrect Token Given", isLoggedIn: false})
    }
}