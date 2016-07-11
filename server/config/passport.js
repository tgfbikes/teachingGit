var passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy
var User = require('../user/model')

passport.use(new BasicStrategy(
	function (email, password, next)
	{
		User.findOne({ email: email }, function (err, user)
		{
			if (err) return next(err)
			if (!user) return next(null, false)
			if (!user.verifyPassword(password)) return next(null, false)
			return next(null, user)
		})
	}
))