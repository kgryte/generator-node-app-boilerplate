/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var path = require( 'path' ),
	yeoman = require( 'yeoman-generator' );


// VARIABLES //

var helpers = yeoman.test;


// TESTS //

describe( 'node-app-boilerplate', function tests() {

	// SETUP //

	beforeEach( function setup( done ) {
		helpers
			.run( path.join( __dirname, '../app' ) )
			.inDir( path.join( __dirname, 'tmp' ) )
			.withOptions({
				'skip-install': true,
				'skip-install-message': true,
				'skip-message': true
			})
			.withPrompt({
				'name': 'app-boilerplate-test',
				'author': 'Jane Doe',
				'email': 'jane@doe.com',
				'license_holder': 'Jane Doe &lt;jane@doe.com&gt;',
				'description': 'Boilerplate test application.',
				'git': false
			})
			.on( 'ready', function onReady( generator ) {
				// Called before `generator.run()` is called.
			})
			.on( 'end', function onEnd() {
				done();
			});
	});


	// TESTS //

	it( 'creates expected files', function test() {
		var expected = [
			// Dotfiles:
			'.gitignore',
			'.gitattributes',
			'.npmignore',
			'.travis.yml',
			'.editorconfig',
			'.jshintignore',
			'.jshintrc',

			// Top-level and meta files:
			'README.md',
			'TODO.md',
			'Makefile',
			'LICENSE',
			'package.json',

			// Bin directory:
			'bin/server',

			// etc directory:
			'etc/dev.json',
			'etc/test.json',

			// Application entry-point:
			'app/index.js',

			// Middleware entry-point:
			'app/middleware/index.js',

			// Error middleware:
			'app/middleware/error/index.js',

			// Finish middleware:
			'app/middleware/finish/index.js',

			// Log-level middleware:
			'app/middleware/loglevel/index.js',
			'app/middleware/loglevel/level.js',
			'app/middleware/loglevel/okay.js',
			'app/middleware/loglevel/validate.js',

			// Logs middleware:
			'app/middleware/logs/index.js',
			'app/middleware/logs/okay.js',
			'app/middleware/logs/logs.js',

			// Start middleware:
			'app/middleware/start/index.js',

			// Monitor middleware:
			'app/middleware/monitor/index.js',
			'app/middleware/monitor/monitor.js',
			'app/middleware/monitor/json.js',
			'app/middleware/monitor/response_stats.js',
			'app/middleware/monitor/response_stats.json',

			// Application config:
			'app/node_modules/config/index.js',
			'app/node_modules/config/runners.json',

			// Application logger:
			'app/node_modules/logger/index.js',

			// Application server:
			'app/node_modules/server/index.js',

			// Tests:
			'test/utils/existing_server.js',

			'test/app/middleware/error/test.js',

			'test/app/middleware/finish/test.js',

			'test/app/middleware/loglevel/test.put.js',
			'test/app/middleware/loglevel/test.level.js',
			'test/app/middleware/loglevel/test.validate.js',
			'test/app/middleware/loglevel/test.okay.js',

			'test/app/middleware/logs/test.logs.js',
			'test/app/middleware/logs/test.okay.js',
			'test/app/middleware/logs/test.post.js',

			'test/app/middleware/monitor/test.get.js',
			'test/app/middleware/monitor/test.json.js',
			'test/app/middleware/monitor/test.monitor.js',

			'test/app/middleware/monitor/plugins/mock.json',
			'test/app/middleware/monitor/plugins/test.response_stats.js',

			'test/app/middleware/start/test.js',

			'test/app/utils/test.server.js'
		];

		helpers.assertFile( expected );
	});
});
