/**
*
*	APP
*
*
*
*	DESCRIPTION:
*		- 
*
*
*	API:
*		- 
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/04/21: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] 
*
*
*	LICENSE:
*		
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Express middleware:
		express = require( 'express' ),

		// Bootable:
		bootable = require( 'bootable' ),

		// Main application route binding:
		routes = require( './routes.js' ),

		// Application modules:
		modules = require( './modules' ),

		// HTTP server:
		server = require( __dirname + '/utils/server.js' );


	// APP //

	// [0] Create the application:
	var app = bootable( express() );

	// [1] Execute the initializers:
	app.phase( bootable.initializers( 'etc/init' ), app );

	// [2] Bind the routes to the application:
	app.phase( routes );

	// [3] Mount the modules to the application:
	app.phase( modules );

	// [4] Create the server:
	app.phase( server );
	

	// EXPORTS //

	// Expose the application:
	module.exports = app;

})();

