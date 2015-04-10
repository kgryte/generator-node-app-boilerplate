/**
*
*	MIDDLEWARE: OK
*
*
*	DESCRIPTION:
*		- Returns an `ok` (200) response.
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

/**
* FUNCTION: okay( request, response, next )
*	Returns an `ok` (200) response.
*
* @param {Object} request - HTTP request object
* @param {Object} response - HTTP response object
* @param {Function} next - callback to invoke after sending response
*/
function okay( request, response, next ) {
	response.sendStatus( 200 );
	next();
} // end FUNCTION okay()


// EXPORTS //

module.exports = okay;
