'use strict';

var React = require('react');


var AboutPage = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Cool Stuff We Are Learning</h1>
				<p>We are going to do things with these technologies.</p>
				<ul>
					<li>Gulp</li>
					<li>React</li>
					<li>React Router</li>
					<li>Node</li>
					<li>Browserify</li>
					<li>Bootstrap</li>
					<li>Flux</li>
				</ul>
			</div>
		);
	}
});

module.exports = AboutPage;