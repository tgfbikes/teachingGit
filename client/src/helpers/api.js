'use strict';

var ajax = require('./ajax');

module.exports = {
	getAllTodos: getAllTodos,
	createTodo: createTodo,
	deleteTodo: deleteTodo,
	updateTodo: updateTodo
}

function getAllTodos () {
	var url = '/todos';
	var data = {};
	var type = 'GET';

	return ajax(url, data, type);
}

function createTodo (todo) {
	var url = '/todos';
	var data = todo;

	return ajax(url, data);
}

function deleteTodo (todo) {
	var url = '/todos/' + todo._id;
	var data = {};
	var type = 'DELETE';

	return ajax(url, data, type);
}

function updateTodo (todo) {
	var url = '/todos/' + todo._id;
	var data = todo;
	var type = 'PUT';

	return ajax(url, data, type);
}




















