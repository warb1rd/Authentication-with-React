const
	express = require('express'),
	usersRouter = new express.Router(),
	usersCtrl = require('../controllers/users.js'),
	{verifyToken} = require('../serverAuth.js')								//We just want the verify token and not sign token so, destructure it

usersRouter.route('/')
	.get(usersCtrl.index)
	.post(usersCtrl.create)

usersRouter.post('/login', usersCtrl.authenticate)

//adding middleware here will affect all routes below
usersRouter.use(verifyToken)												//In postman, go to api/users/login and do a post request.Copy the token and paste it as a header with keyname as token

usersRouter.route('/:id')
	.get(usersCtrl.show)
	.patch(usersCtrl.update)
	.delete(usersCtrl.destroy)

module.exports = usersRouter