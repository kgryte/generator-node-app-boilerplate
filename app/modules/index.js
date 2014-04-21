/**
*
*	APP: modules
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

	var // Filesystem module:
		fs = require( 'fs' );


	// VARIABLES //

	var modules;


	//
	modules = function ( clbk ) {

		// NOTE: the 'this' context is the application.

		var files, stats, path;

		// Get the "file" names:
		files = fs.readdirSync( __dirname );

		// For each possible file, determine if it is a directory...
		for ( var i = 0; i < files.length; i++ ) {

			if ( files[ i ][ 0 ] !== '.' ) {

				// Assemble the path:
				path = __dirname + '/' + files[ i ];

				// Get the file stats:
				stats = fs.statSync( path );

				// Is the "file" actually a directory?
				if ( stats.isDirectory() ) {

					// Mount the sub-application:
					this.use( require( path ) );

				} // end IF directory

			} // end IF !hidden directory

		} // end FOR i

		// Callback:
		clbk();

	};


	// EXPORTS //

	module.exports = modules;

})();