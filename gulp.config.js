module.exports = function() {
	var client = './src/client/';
	var server = './src/server/';
	var temp = './.tmp';
	var config = {

		/* Files paths */
		alljs: [
			'./src/**/*.js',
			'./*.js'
		],

		less: client + 'styles/styles.less',
		server: server,
		temp: temp,

		/* Bower and NPM locations */

		/* Node settings */
		defaultPort: 7203,
		nodeServer: './src/server/app.js'

	};

	return config;
}