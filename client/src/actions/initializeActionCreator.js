'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var API = require('../helpers/api');
var ActionTypes = require('../constants/actionTypes');

var InitializeActionCreator = {

	initializeApp: function () {
		var todosPromise = API.getAllTodos();

		todosPromise
			.then(function (todos) {
				Dispatcher.dispatch({
					actionType: ActionTypes.INITIALIZE,
					initialData: {
						todos: todos
					}
				});
			});
	}
};

module.exports = InitializeActionCreator;