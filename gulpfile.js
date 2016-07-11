'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); // Run our local sever (dev)
var open = require('gulp-open'); // Open our default browser
var browserify = require('browserify'); // Bundle JS and lets us use the Common js pattern in the frontend
var reactify = require('reactify'); // Transpile our JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text stream with gulp
var concat = require('gulp-concat'); // Concatenate our files

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './client/src/*.html',
		js: './client/src/**/*.js',
		mainJs: './client/src/main.js',
		images: './client/src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/build/toastr.css',
			'client/src/css/main.css'
		],
		dist: './dist'
	}
};

// Setup for our dev server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

// Depends on connect task, and will auto run default browser
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// Take html files from src dir and put them in dist dir, and refresh
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

// Take css files from src dir and put them in dist dir, and refresh
gulp.task('css', function () {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

gulp.task('images', function () {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
});

gulp.task('js', function () {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.css, ['css']);
});


gulp.task('default', ['html', 'css', 'js', 'watch']);








