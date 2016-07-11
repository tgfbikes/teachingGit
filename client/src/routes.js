'use strict';

var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var HomePage = require('./components/HomePage');
var AboutPage = require('./components/about/About');
var App = require('./components/App');
var TodoPage = require('./components/todos/TodoPage');
var ManageTodoPage = require('./components/todos/ManageTodoPage');

var routes = (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="/about-page" component={AboutPage} />
		<Route path="/todos-page" component={TodoPage} />
		<Route path="/manage-todo" component={ManageTodoPage} />
		<Route path="/manage-todo/:id" component={ManageTodoPage} />
	</Route>
);

module.exports = routes;