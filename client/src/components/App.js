'use strict';

var React = require('react');
var Header = require('./common/Header');


var App = React.createClass({
	render: function () {
		return (
			<div>
				<Header />
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
});

module.exports = App;