'use strict';

var $ = require('jquery');

var ajax = function (url, data, type) {
	var method = type || 'POST';

	return $.ajax({
		url: 'http://localhost:9005' + url,
		datatype: 'json',
		contentType: 'application/json',
		type: method,
		data: JSON.stringify(data)
	});
};

module.exports = ajax;