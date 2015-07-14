'use strict';

// MODULES //

var fs = require( 'fs' ),
	path = require( 'path' ),
	dirtree = require( 'dirtree' ),
	yeoman = require( 'yeoman-generator' ),
	yosay = require( 'yosay' ),
	shell = require( 'shelljs' ),
	chalk = require( 'chalk' );


// FUNCTIONS //

/**
* FUNCTION: git( path )
*	Initializes and runs git.
*
* @private
* @param {String} path - repo path; i.e., 'username/reponame'
*/
function git( path ) {
	var cmd = 'git remote add origin https://github.com/' + path + '.git';

	// Initialize the repository:
	shell.exec( 'git init' );
	shell.exec( cmd );
	shell.exec( 'git add -A' );
	shell.exec( 'git commit -m "[INIT]"' );
} // end FUNCTION git()


// GENERATOR //

var Generator = yeoman.generators.Base.extend({

	/**
	* METHOD: init()
	*	Generator initialization.
	*/
	init: function() {
		var flg = this.options[ 'skip-message' ];

		this.pkg = require( '../package.json' );
		this.year = ( new Date() ).getFullYear();

		if ( typeof flg === 'undefined' || !flg ) {
			this.log( yosay( 'Welcome to the application boilerplate generator...' ) );
		}
	},

	/**
	* METHOD: promptUser()
	*	Prompts a user for input relevant to the application.
	*/
	promptUser: function() {
		var next = this.async(),
			flg,
			dirname,
			prompts,
			git,
			user,
			email;

		// Output flag:
		flg = this.options[ 'skip-message' ];

		// Initialize defaults:
		user = '';
		email = '';

		// Check if the user has Git:
		git = shell.which( 'git' );

		if ( git ) {
			user = shell.exec( 'git config --get user.name', { silent: true } ).output.trim();
			email = shell.exec( 'git config --get user.email', { silent: true } ).output.trim();
		}

		// Get the current directory name:
		dirname = path.basename( process.cwd() );

		// Specify the input prompts required in order to tailor the application...
		prompts = [
			{
				'type': 'input',
				'name': 'name',
				'message': 'What is the application name?',
				'default': dirname
			},
			{
				'type': 'confirm',
				'name': 'git',
				'message': 'Create a new git repository?',
				'default': true,
				validate: function( answer ) {
					if ( answer && !git ) {
						return 'Unable to find git. Ensure that you have git installed.';
					}
					return true;
				}
			},
			{
				when: function( answers ) {
					if ( answers.git ) {
						return true;
					}
					return false;
				},
				'type': 'input',
				'name': 'repo',
				'message': 'Git repository path?'
			},
			{
				'type': 'input',
				'name': 'author',
				'message': 'Primary author\'s name?'
			},
			{
				'type': 'input',
				'name': 'email',
				'message': 'Primary author\'s contact e-mail?',
				default: function( answers ) {
					return ( answers.git ) ? email : '';
				}
			},
			{
				'type': 'input',
				'name': 'license_holder',
				'message': 'Author name(s) to include in the license file?',
				default: function( answers ) {
					return answers.author;
				}
			},
			{
				'type': 'input',
				'name': 'description',
				'message': 'Application description:',
				'default': 'Application.'
			}
		];

		// Prompt the user for responses:
		this.prompt( prompts, function onAnswers( answers ) {
			this.author = answers.author;
			this.email = answers.email;
			this.license_holder = answers.license_holder;
			this.appName = answers.name;
			this.description = answers.description;
			this.git = answers.git;
			this.repo = answers.repo;

			next();
		}.bind( this ) );
	}, // end METHOD promptUser()

	/**
	* METHOD: mkdirs()
	*	Creates application directories.
	*/
	mkdirs: function() {
		var tree = dirtree(),
			dirs,
			len,
			i;

		// Set the tree root...
		tree.root( './app/templates' );

		// Only map the `app` directory:
		tree.include( 'dirs', /app/ );

		// Create a tree:
		tree.create();

		// Get all the relative paths:
		dirs = tree.leaves();

		// Create each directory...
		len = dirs.length;
		for ( i = 0; i < len; i++ ) {
			this.mkdir( 'app/' + dirs[ i ] );
		}
	}, // end METHOD mkdirs()

	/**
	* METHOD: dotFiles()
	*	Copies over base dot files.
	*/
	dotFiles: function() {
		var tree = dirtree(),
			files,
			name,
			len,
			i;

		tree.root( './app/templates' );

		tree.exclude( 'dirs', /.*/ );
		tree.exclude( 'files', /^_/ );

		files = tree.leaves();

		for ( i = 0; i < len; i++ ) {
			name = files[ i ];
			this.copy( name, '.' + name );
		}
	}, // end METHOD dotfiles()

	/**
	* METHOD: makefile()
	*	Copies over base Makefile.
	*/
	makefile: function() {
		this.copy( '_Makefile', 'Makefile' );
	}, // end METHOD makefile()

	/**
	* METHOD: license()
	*	Creates a license file.
	*/
	license: function() {
		var context = {
			'holder': this.license_holder,
			'year': this.year
		};

		this.template( '_LICENSE', 'LICENSE', context );
	}, // end METHOD license()

	/**
	* METHOD: package()
	*	Creates a `package.json` file.
	*/
	package: function() {
		var context = {
			'name': this.appName,
			'repo': this.repo,
			'author': this.author,
			'email': this.email,
			'description': this.description
		};

		this.template( '_package.json', 'package.json', context );
	}, // end METHOD package()

	/**
	* METHOD: todo()
	*	Copies over a TODO file.
	*/
	todo: function() {
		this.copy( '_TODO.md', 'TODO.md' );
	}, // end METHOD todo()

	/**
	* METHOD: readme()
	*	Creates a boilerplate README.
	*/
	readme: function() {
		var context = {
			'title': this.appName,
			'name': this.appName,
			'repo': this.repo,
			'holder': this.license_holder,
			'year': this.year,
			'description': this.description
		};

		this.template( '_README.md', 'README.md', context );
	}, // end METHOD readme()

	/**
	* METHOD: app()
	*	Creates a boilerplate application entry-point.
	*/
	app: function() {
		this.copy( 'app/_index.js', 'app/index.js' );
	}, // end METHOD app()

	/**
	* METHOD: mw()
	*	Creates application middleware.
	*/
	mw: function() {
		// Middleware entry-point:
		this.template( 'app/middleware/_index.js', 'app/middleware/index.js', context );

		// Error middleware:
		this.template( 'app/middleware/error/_index.js', 'app/middleware/error/index.js', context );

		// Finish middleware:
		this.template( 'app/middleware/finish/_index.js', 'app/middleware/finish/index.js', context );

		// Start middleware:
		this.template( 'app/middleware/start/_index.js', 'app/middleware/start/index.js', context );

		// Logs middleware:
		this.template( 'app/middleware/logs/_index.js', 'app/middleware/logs/index.js', context );

		this.template( 'app/middleware/logs/_logs.js', 'app/middleware/logs/logs.js', context );

		this.template( 'app/middleware/logs/_okay.js', 'app/middleware/logs/okay.js', context );

		// Log-level middleware:
		this.template( 'app/middleware/loglevel/_index.js', 'app/middleware/loglevel/index.js', context );

		this.template( 'app/middleware/loglevel/_level.js', 'app/middleware/loglevel/level.js', context );

		this.template( 'app/middleware/loglevel/_okay.js', 'app/middleware/loglevel/okay.js', context );

		this.template( 'app/middleware/loglevel/_validate.js', 'app/middleware/loglevel/validate.js', context );

		// Monitor middleware:
		this.template( 'app/middleware/monitor/_index.js', 'app/middleware/monitor/index.js', context );

		this.template( 'app/middleware/monitor/_monitor.js', 'app/middleware/monitor/monitor.js', context );

		this.template( 'app/middleware/monitor/_json.js', 'app/middleware/monitor/json.js', context );

		this.template( 'app/middleware/monitor/plugins/_response_stats.js', 'app/middleware/monitor/plugins/response_stats.js', context );

		this.template( 'app/middleware/monitor/plugins/_response_stats.json', 'app/middleware/monitor/plugins/response_stats.json', context );
	}, // end METHOD mw()

	/**
	* METHOD: node_modules()
	*	Creates application node modules.
	*/
	node_modules: function() {
		var context = {
			'name': this.appName,
			'author': this.author,
			'email': this.email,
			'description': this.description,
			'year': this.year
		};

		// Application node modules...
		this.template( 'app/node_modules/config/_index.js', 'app/node_modules/config/index.js', context );

		this.template( 'app/node_modules/config/_runners.json', 'app/node_modules/config/runners.json', context );

		this.template( 'app/node_modules/logger/_index.js', 'app/node_modules/logger/index.js', context );

		this.template( 'app/node_modules/server/_index.js', 'app/node_modules/server/index.js', context );
	}, // end METHOD node_modules()

	/**
	* METHOD: test()
	*	Creates a test boilerplate.
	*/
	test: function() {

		// Node modules...
		this.copy( 'test/app/utils/_test.server.js', 'test/app/utils/test.server.js' );

		// Middleware tests...
		this.copy( 'test/app/middleware/_test.js', 'test/app/middleware/test.js' );

		// Error middleware:
		this.copy( 'test/app/middleware/error/_test.js', 'test/app/middleware/error/test.js' );

		// Finish middleware:
		this.copy( 'test/app/middleware/finish/_test.js', 'test/app/middleware/finish/test.js' );

		// Start middleware:
		this.copy( 'test/app/middleware/start/_test.js', 'test/app/middleware/start/test.js' );

		// Logs middleware:
		this.copy( 'test/app/middleware/logs/_test.logs.js', 'test/app/middleware/logs/test.logs.js' );

		this.copy( 'test/app/middleware/logs/_test.okay.js', 'test/app/middleware/logs/test.okay.js' );

		this.copy( 'test/app/middleware/logs/_test.post.js', 'test/app/middleware/logs/test.post.js' );

		// Log level middleware:
		this.copy( 'test/app/middleware/loglevel/_test.put.js', 'test/app/middleware/loglevel/test.put.js' );

		this.copy( 'test/app/middleware/loglevel/_test.level.js', 'test/app/middleware/loglevel/test.level.js' );

		this.copy( 'test/app/middleware/loglevel/_test.okay.js', 'test/app/middleware/loglevel/test.okay.js' );

		this.copy( 'test/app/middleware/loglevel/_test.validate.js', 'test/app/middleware/loglevel/test.validate.js' );

		// Monitor middleware:
		this.copy( 'test/app/middleware/monitor/_test.get.js', 'test/app/middleware/monitor/test.get.js' );

		this.copy( 'test/app/middleware/monitor/_test.json.js', 'test/app/middleware/monitor/test.json.js' );

		this.copy( 'test/app/middleware/monitor/_test.monitor.js', 'test/app/middleware/monitor/test.monitor.js' );

		this.copy( 'test/app/middleware/monitor/plugins/_test.response_stats.js', 'test/app/middleware/monitor/plugins/test.response_stats.js' );

		this.copy( 'test/app/middleware/monitor/plugins/_mock.json', 'test/app/middleware/monitor/plugins/mock.json' );
	}, // end METHOD test()

	/**
	* METHOD: test_utils()
	*	Creates test utilities.
	*/
	test_utils: function() {
		this.copy( 'test/utils/_existing_server.js', 'test/utils/existing_server.js' );
	}, // end METHOD test_utils()

	/**
	* METHOD: bin()
	*	Copies boilerplate executables.
	*/
	bin: function() {
		var context = {
			'name': this.appName,
			'author': this.author,
			'email': this.email,
			'year': this.year
		};

		this.template( 'bin/_server', 'bin/server', context );
	}, // end METHOD bin()

	/**
	* METHOD: etc()
	*	Copies boilerplate configuration files.
	*/
	etc: function() {
		this.copy( 'etc/_dev.json', 'etc/dev.json' );
		this.copy( 'etc/_test.json', 'etc/test.json' );
	}, // end METHOD etc()

	/**
	* METHOD: install()
	*	Initializes git and installs dependencies.
	*/
	install: function() {
		var config = {
			'bower': false,
			'npm': true,
			'skipInstall': this.options[ 'skip-install' ],
			'skipMessage': false,
			'callback': function onFinish() {
				console.log( '\n...finished.\n' );
			}
		};

		this.on( 'end', function onEnd() {
			if ( this.git ) {
				console.log( '\n...initializing git...\n' );
				git( this.repo );
				console.log( '\n...initialized git.\n' );
			}
			this.installDependencies( config );
		});
	} // end METHOD install()

});


// EXPORTS //

module.exports = Generator;
