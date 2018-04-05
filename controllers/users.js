const User = require('../models/User.js');
const {signToken} = require ('../serverAuth.js');

module.exports = {
	// list all users
	index: (req, res) => {
		User.find({}, (err, users) => {
			res.json(users)
		})
	},

	// get one user
	show: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			res.json(user)
		})
	},

	// create a new user
	create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({success: false, code: err.code})
			const token = signToken(user)															//If everything check out, server generates a token.Include the token when user is created
			res.json({success: true, message: "User created.", user, token})
		})
	},

	// update an existing user
	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			Object.assign(user, req.body)
			user.save((err, updatedUser) => {
				res.json({success: true, message: "User updated.", user})
			})
		})
	},

	// delete an existing user
	destroy: (req, res) => {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			res.json({success: true, message: "User deleted.", user})
		})
	}, 

	authenticate: (req, res) => {
		//check if user exists
		User.findOne({email: req.body.email}, (err, user)=> {
			if(!user || !user.validPassword(req.body.password)) {									//If no user or invalid password, then return message.
				return res.json({success: false, message:"Invalid Credentials"})
			}
			const token = signToken(user)															//This creates a token if above conditions are true and give a message
			res.json({success: true, message: "token attached.", token})							//ES6 shortcut for - token: token
		})																							//If we copy paste the token in the jwt site, it shows the name and email and NOT password because we did delete userData.password in serverAuth.js
	}
}