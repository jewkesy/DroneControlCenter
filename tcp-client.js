var myArgs = require('optimist').argv, 
help = '\nUsage: node tcp-client.js <hostIp> <hostPort> <username> <location> <filterUser> <showHeartbeats>\n\nExample:\n \
	node tcp-client.js 192.168.25.169 3366 logger "Daryl desk" innovation true \n'

if (((myArgs.h)||(myArgs.help)) || myArgs._.length != 6) {
   console.log(help);
   process.exit(0);
}


var net = require('net');
var _ = require('underscore');
// http://nodejs.org/api.html#_child_processes
var exec = require('child_process').exec;
var child, heartbeatId, myIpAddress;

var args = process.argv.slice(2);
var serverIp = args[0];
var serverPort = args[1];
var myUsername = args[2];
var myLocation = args[3];
var userFilter = args[4];
var showHeartbeats = args[5];

console.logCopy = console.log.bind(console);

console.log = function(data) {	//method to add timestamps to log output
    var currentDate = '[' + new Date().toUTCString() + '] ';
    this.logCopy(currentDate, data);
};

var server = new net.Socket();

connectToHost();

function connectToHost() {
	//provide a single function to handle connect, this prevents errno 114 - trying to use a socket which is already busy with another connection
	server.connect(serverPort, serverIp, myUsername);
}

function sendHeartBeat() {
	server.write(JSON.stringify({
		event: 'message',
		data: {
			user: myUsername,
			message: 'heartbeat',
			ipaddress: myIpAddress,
			location: myLocation,
			type: 'terminal',
			timestamp: new Date().getTime()
		}
	}));
}

server.on('data', function (data) {
	try {
		var parsed = JSON.parse(data.toString());

		if (!parsed.data.user) {
			console.log(data.toString());
		}

//console.log(data.toString())
		if (parsed.data.user && parsed.data.user.toLowerCase().indexOf(userFilter.toLowerCase()) >= 0) {
			console.log(data.toString());
			if ((parsed.data.message == 'heartbeat') && showHeartbeats){
				console.log(data.toString());
			}
		}


			
	}
	catch (e) {
		console.log(e);
	}
});

server.on('connect', function (){
	console.log('connected to host');

	if (!myIpAddress) { myIpAddress = server.address().address; }
	sendHeartBeat();
	heartbeatId = setInterval(function() {
		sendHeartBeat();
	}, 5000 );
})

server.on('end', function () {
	console.log('host disconnected');
	clearInterval(heartbeatId);
	server.setTimeout(2000, function() {
		console.log('attempting connection');
        connectToHost();
    });
});

server.on('error', function (err) {
	console.log('in error event');
	console.log(err);
	clearInterval(heartbeatId);
	if (err.code == 'ECONNREFUSED') {
		console.log('Host refused connection');
		server.setTimeout(2000, function() {
			console.log('attempting connection');
            connectToHost();
        });
	}
	else if (err.code == "EPIPE") {
		console.log('Host ended connection');
		server.setTimeout(2000, function() {
			console.log('attempting connection');
            connectToHost();
        });
	}
	else
	{
		setTimeout(function() {
			console.log('Unhandled error occurred, attempting single reconnection after a setTimeout');
    		connectToHost();
		  }, 10);
	}
});

process.openStdin().addListener('data', function (data) {}); //listener prevents the client app from closing