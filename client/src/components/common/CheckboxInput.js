'use strict';

var React = require('react');

var CheckboxInput = React.createClass({

	render: function () {
		return (
			<input 
				type="checkbox"
				checked={this.props.checked}
				onChange={this.props.updateTodo}
			/>
		);
	}
});

module.exports = CheckboxInput;