/**
*
*	ROUTES: PUT /loglevel
*
*
*	DESCRIPTION:
*		- Route for setting the runtime log level.
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

// MIDDLEWARE //

var parse = require( 'body-parser' ).json(),
	validate = require( './validate.js' ),
	level = require( './level.js' ),
	okay = require( './okay.js' );


// EXPORTS //

module.exports = [
	parse,
	validate,
	level,
	okay
];
