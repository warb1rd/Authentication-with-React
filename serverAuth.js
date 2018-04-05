const jwt = require ('jsonwebtoken');                                           //The code in this file creates a function that creates token
const {JWT_SECRET} = process.env;                                               //Gives us middleware that makes sure a token must be provided to access the route
const User = require('./models/User.js')
//User.findOne({email: req.body.email}, (err, thatUser) => {
//  signToken(thatUser)
// })

function signToken(user) {
    const userData = user.toObject()                                            //We don't want the auth to be able to use the inbuilt methods of the users like .update, .save and .remove. We only want the info like name and email, BUT NOT PASSWORD
    delete userData.password                                                    //Line 8 - preparing data and in line 9, removing password.
    return jwt.sign(userData, JWT_SECRET)                                       //The secret key creates the token
}

function verifyToken(req, res, next) {
    //Check to see if token was provided:
    const token = req.get("token")                                              //If req.get has "token" in the header( metadata about the request. Info about request not request(body) itself. check in postman)
    //If no token present, deny access:
    if(!token) return res.json({success: false, message: "no token provided"})
    //Otherwise try to verify token:
    jwt.verify(token, JWT_SECRET, (err, payload) => {                           //If there's an error, we'll get error if there was info then we'll get payload and find user by the id in the token and check to see if user matching the id exists. If no user, that means user deleted his account.
        //if problem with token verification, deny access:
        if(err) return res.json({success: false, message: "invalid token."})
        User.findById(payload._id, (err, user) => {
            //if no user, deny access:
            if(!user) return res.json({success: false, message: "Invalid token."})
            //Otherwise, add user to req object, and continue:
            req.user = user
            next()
        })
    })
}

module.exports = {                                                              //When we require this somewhere else, we will call this object with method signTOken
    signToken,                                                                  //Shortcut in ES6 instead of signToken: signToken since both have same name
    verifyToken
}                   