/**
*
*	ROUTES: GET /monitor
*
*
*	DESCRIPTION:
*		- Returns the application status and associated runtime statistics.
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

var monitor = require( './monitor.js' ),
	json = require( './json.js' );

// EXPORTS //

module.exports = [
	monitor,
	json
];
