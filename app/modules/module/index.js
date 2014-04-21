/**
*
*	MODULE: {{module}}
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

		// Module routes:
		routes = require( './routes.js' );


	// APP //

	// [0] Create the application:
	var app = bootable( express() );

	// [1] Bind routes to the application:
	app.phase( routes );

	// [2] Boot the app:
	app.boot( function ( error ) {
		// Check if we encountered an error while booting...
		if ( error ) {
			console.log( error.message );
			console.log( error.stack );
			return process.exit( -1 );
		}
	});


	// EXPORTS //

	// Expose the application:
	module.exports = app;

})();