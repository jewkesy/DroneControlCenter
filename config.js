var config = {}

config.app = {};
config.tcp = {};
config.web = {};

config.app.verbose = false;
config.app.host = '192.168.25.193'	// host of the application, used by deployed clients
config.tcp.host = '0.0.0.0';   		// host should be 0.0.0.0 to allow external connections
config.tcp.port = 3366;				// used by beacon-client.js
config.web.port = 8080;				// used by browsers

module.exports = config;
