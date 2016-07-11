"use strict";

//This file is mocking a web API by hitting hard coded data.
var todos = require('./todoData').todos;
var _ = require('lodash');

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function() {
  // get the last id and increment by 1, always will keep keys unique
  var newIndex = parseInt(_.last(todos).id) + 1;
  return newIndex.toString();
};

var _clone = function(item) {
  return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var todoApi = {
  getAllTodos: function() {
    return _clone(todos);
  },

  getTodoById: function(id) {
    var todo = _.find(todos, {id: id});
    return _clone(todo);
  },

  saveTodo: function(todo, change) {
    //pretend an ajax call to web api is made here
    console.log('Saved Todo, mocking an AJAX call...');
    var existingTodoIndex;
    if (todo.id && change) {
      existingTodoIndex = _.indexOf(todos, _.find(todos, {id: todo.id}));
      
      switch (todo.done) {
        case false:
          todo.done = true;
          break;
        case true:
          todo.done = false;
          break;
        default:
          //do nothing
      }
      todos.splice(existingTodoIndex, 1, todo);
    }
    if (todo.id) {
      existingTodoIndex = _.indexOf(todos, _.find(todos, {id: todo.id}));
      todos.splice(existingTodoIndex, 1, todo);
    } else {
      //Just simulating creation here.
      //The server would generate ids for new authors in a real app.
      //Cloning so copy returned is passed by value rather than by reference.
      todo.id = _generateId();
      todos.push(todo);
    }

    return _clone(todo);
  },

  deleteTodo: function(id) {
    console.log('Deleted Todo ID ' + id + ', mocking an AJAX call...');
    _.remove(todos, { id: id});
  }
};

module.exports = todoApi;