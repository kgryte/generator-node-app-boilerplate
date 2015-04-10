/**
*
*	MIDDLEWARE: log level
*
*
*	DESCRIPTION:
*		- Sets the runtime log level.
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
*	LICENSE:
*		MIT
*
*	Copyright (c) <%= year %>. <%= author %>.
*
*
*	AUTHOR:
*		<%= author %>. <%= email %>. <%= year %>.
*
*/

'use strict';

// MODULES //

var logger = require( 'logger' );


// LOG LEVEL //

/**
* FUNCTION: level( request, response, next )
*	Sets the runtime log level.
*
* @param {Object} request - HTTP request object
* @param {Object} response - HTTP response object
* @param {Function} next - callback to invoke after setting the runtime log level
*/
function level( request, response, next ) {
	var lev = request.body.level;

	// TODO: make general.
	logger.info( 'Setting log level to %s.', lev );
	logger.levels( 'main', lev );

	next();
} // end FUNCTION level()


// EXPORTS //

module.exports = level;
