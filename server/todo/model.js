var mongoose = require('mongoose')

var TodoSchema = new mongoose.Schema({
	title: { type: String, required: true, unique: true, dropDups: true },
	description: { type: String, required: true },
	completed: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date
})

TodoSchema.pre('save', function (done)
{
	this.updatedAt = new Date()
	done()
})

module.exports = mongoose.model('Todo', TodoSchema)
