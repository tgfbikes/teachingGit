'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events');
var CHANGE_EVENT = 'change';
var _ = require('lodash');
var toastr = require('toastr');

var _todos = [];

var TodoStore = Object.assign({}, EventEmitter.prototype, {

	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	getAllTodos: function () {
		return _todos;
	},

	getTodoById: function (todoId) {
		return _.find(_todos, {_id: todoId})
	}

});

Dispatcher.register(function (action) {
	switch (action.actionType) {
		case ActionTypes.INITIALIZE:
			_todos = action.initialData.todos;
			TodoStore.emitChange();
			break;
		case ActionTypes.CREATE_TODO:
			// add the todo
			_todos.push(action.todo);
			TodoStore.emitChange();
			toastr.success('Todo CREATED!!!', 'CREATED TODO');
			break;
		case ActionTypes.DELETE_TODO:
			_.remove(_todos, {_id: action.todoId});
			TodoStore.emitChange();
			toastr.info('Todo deleted!', 'DELETED TODO');
			break;
		case ActionTypes.UPDATE_TODO:
			var existingTodo = _.find(_todos, {_id: action.todo._id});
			var existingTodoIndex = _.indexOf(_todos, existingTodo);
			_todos.splice(existingTodoIndex, 1, action.todo);
			TodoStore.emitChange();
			toastr.info('Updated Todo', 'UPDATED TODO');
			break;
		default:
			// do nothing
	}
});

module.exports = TodoStore;














