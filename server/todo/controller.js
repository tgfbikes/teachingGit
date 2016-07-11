var Todo = require('./model')

module.exports = {
	// CREATE
	create: createTodo,
	// READ
	index: indexTodo,
	show: showTodo,
	// UPDATE
	update: updateTodo,
	// DELETE
	delete: deleteTodo
}

function createTodo(req, res)
{
	Todo.create(
	{
		title: req.body.title,
		description: req.body.description,
		completed: req.body.completed
	},
	function (err, item) {
		if (err) return reportError(err, res)

		res.status(201).json(item)
	})
}

function deleteTodo(req, res)
{
	findTodo(req, res, function (item)
	{
		item.remove(function (err)
		{
			if (err) return reportError(err, res)

			res.status(204).end()
		})
	})
}

function indexTodo(req, res)
{
	Todo.find(function (err, collection)
	{
		if (err) return reportError(err, res)

		res.json(collection)
	})
}

function showTodo(req, res)
{
	findTodo(req, res, function (item)
	{
		res.json(item)
	})
}

function updateTodo(req, res)
{
	findTodo(req, res, function (item)
	{
		item.title = req.body.title
		item.description = req.body.description
		item.completed = req.body.completed

		item.save(function (err)
		{
			if (err) return reportError(err, res)

			res.json(item)
		})
	})
}

/**
 * @param {function (item)} success
 */
function findTodo(req, res, success)
{
	var id = req.params.id
	Todo.findById(id, function (err, item)
	{
		if (err) return reportError(err, res)

		if (!item)
		{
			res.status(404).json({
				error: 'Could not find item with that id'
			})
		}
		else
		{
			success(item)
		}
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
