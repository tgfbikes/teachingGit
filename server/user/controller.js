var User = require('./model')

module.exports = {
	create: createUser
}

function createUser(req, res)
{
	var name = req.body.name
	var email = req.body.email
	var password = req.body.password

	User.create(
	{
		name: name,
		email: email,
		password: password
	},
	function (err, user)
	{
		if (err) return reportError(err, res)

		res.status(201).json(user)
 	})
}

function reportError(err, res)
{
	if (err.name === 'ValidationError')
	{
		res.status(422).json({
			error: err.toString()
		})
	}
	else if (err.name === 'MongoError' && err.code === 11000)
	{
		res.status(409).json({
			error: err.message
		})
	}
	else
	{
		res.status(500).json({
			error: err.toString()
		})
	}
}

