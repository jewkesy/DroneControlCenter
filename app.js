var net = require('net');
var _ = require('underscore');
var path = require('path');
var express = require('express');
var app = express();
var routes = require('./web/routes');

var config = require('./config')
var chatti = require('./chatti-server');

// all environments
app.set('port', process.env.PORT || config.web.port);
app.set('views', path.join(__dirname, 'web/views'));
app.set('view engine', 'jade');
app.get('/', routes.index);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'web/public')));
app.use(express.static(path.join(__dirname, 'web/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
console.log("NOTE sockets.io wont work using localhost.  use the machine IP.");
console.log("Running with the following configuration: -");
console.log(config);

var http = require('http').createServer(app).listen(config.web.port, function(){
  console.log('Express server listening on port ' + config.web.port);
});

var server = chatti.createServer({
	httpServer: http,
	tcpHost: config.tcp.host,
	tcpPort: config.tcp.port
});

server.start();

var mgr = chatti.createManager();

server.on('client connection',  function (socket) {
	var ip = socket.remoteAddress || 'unknown IP Address';
	var client = chatti.transformSocket(socket);

	client.emit('message', {
		user: 'Server',
		action: 'chat',
		message: 'Welcome to the chat!'
	});

	mgr.add(client);

	client.broadcast('message', {
		user: 'Server',
		message: 'Someone connected: ' + ip
	})

	console.log(_.keys(socket));
});

server.on('error', function (err) {
	console.log(err);
	if (err.code == 'EADDRINUSE') {
		//Port already in use
	}
});

mgr.on('client message', function (data) {
	if (config.app.verbose) { console.log(data.data); }
	data.client.broadcast('message', data.data);
});
