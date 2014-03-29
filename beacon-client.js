var myArgs = require('optimist').argv, 
help = '\nUsage: node beacon-client.js <username> <location>\n\nExample:\n \
	node beacon-client.js beacon01 "Main Entrance"\n\nNote:\n \
	sudo is required because Bluetooth LE requires root permissions,\n    \
	therefore user must be in sudoerers list without password prompt:- \n\n        \
	sudo visudo > username ALL=(ALL) NOPASSWD: ALL (username is you) \n'

if (((myArgs.h)||(myArgs.help)) || myArgs._.length != 2) {
   console.log(help);
   process.exit(0);
}

var net = require('net');
var _ = require('underscore');
var exec = require('child_process').exec; // http://nodejs.org/api.html#_child_processes
var child, heartbeatId, myIpAddress, connectId;
var config = require('./config')
var noble = require('noble');

var args = process.argv.slice(2);
var myUsername = args[0];
var myLocation = args[1];

var bleState = '';

console.logCopy = console.log.bind(console);
console.log = function(data) {	// method to add timestamps to log output
    var currentDate = '[' + new Date().toUTCString() + '] ';
    this.logCopy(currentDate, data);
};

console.log("Running with the following configuration: -");
console.log(config);
console.log(myUsername + ' ' + myLocation)


var server = new net.Socket();

connectToHost();

function connectToHost() {
	// provide a single function to handle connect, this prevents errno 114 - trying to use a socket which is already busy with another connection
	console.log('Attempting connection...');
	server.connect(config.tcp.port, config.app.host, myUsername);
}

function sendMessage(text, toUser) {
	server.write(JSON.stringify({
		event: 'message',
		data: {
			user: myUsername,
			toUser: toUser,
			message: text,
			ipaddress: myIpAddress,
			location: myLocation,
			bleState: bleState,
			type: 'terminal',
			timestamp: new Date().getTime()
		}
	}));
}

function sendHeartBeat() {
	sendMessage('heartbeat');
}

server.on('data', function (data) {
	// try {
	// 	var parsed = JSON.parse(data.toString());

	// 	if (parsed.data.toUser === myUsername ||  parsed.data.toUser === "*")  { // direct message or global
	// 		if (parsed.data.message == "list-devices") {
	// 			if (config.app.verbose) { console.log('Request for devices issued from ' + parsed.data.user + " for " + parsed.data.duration + " seconds");	}

	// 			var command = "sudo blescanner " // need to run as sudo for LE - to prevent password prompt: sudo visudo > username ALL=(ALL) NOPASSWD: ALL (username is you)
	// 			child = exec(command + parsed.data.duration + ' 0', function (error, stdout, stderr) {

	// 				if (error) { 
	// 					console.log('exec error: ' + error);  
	// 					server.write(JSON.stringify({
	// 						event: 'message',
	// 						data: {
	// 							toUser: parsed.data.user,
	// 							user: myUsername,
	// 							responseTo: parsed.data.message,
	// 							error: true,
	// 							message: stderr,
	// 							duration: parsed.data.duration,
	// 							location: myLocation,
	// 							timestamp: new Date().getTime()
	// 						}
	// 					}));
	// 					return (error); 
	// 				}
	// 				if (config.app.verbose) { console.log('Response to message \'list-devices\': ' + stdout.split("\n")); }
	// 		  		var devices = stdout.split("\n")
	// 		  		devices.pop();
	// 		  		devices = _.uniq(devices);  //strip out any dupes
	// 				if (devices.length == 0) { devices = ''; }
	// 		  		server.write(JSON.stringify({
	// 					event: 'message',
	// 					data: {
	// 						toUser: parsed.data.user,
	// 						user: myUsername,
	// 						responseTo: parsed.data.message,
	// 						message: devices,
	// 						duration: parsed.data.duration,
	// 						location: myLocation,
	// 						timestamp: new Date().getTime()
	// 					}
	// 				}));
	// 			});
	// 		}
	// 		else if (parsed.data.message == "mock") {
	// 			var res = 'DE:2F:C6:6A:FB:C3,D0:21:1F:DA:EF:EC';
	// 			console.log(res);
	// 			server.write(JSON.stringify({
	// 				event: 'message',
	// 				data: {
	// 					toUser: parsed.data.user,
	// 					user: myUsername,
	// 					responseTo: 'list-devices',
	// 					message: res,
	// 					duration: parsed.data.duration,
	// 					location: myLocation,
	// 					timestamp: new Date().getTime()
	// 				}
	// 			}));
	// 		}
	// 		else {
	// 			var res = 'Unsupported command: ' + parsed.data.message;
	// 			console.log(res);
	// 			server.write(JSON.stringify({
	// 				event: 'message',
	// 				data: {
	// 					toUser: parsed.data.user,
	// 					user: myUsername,
	// 					responseTo: parsed.data.message,
	// 					message: res,
	// 					location: myLocation,
	// 					timestamp: new Date().getTime()
	// 				}
	// 			}));
	// 		}
	// 	}
	// }
	// catch (e) {
	// 	console.log(e);
	// 	console.log(data.toString())
	// }
});

server.on('connect', function (){
	clearInterval(connectId);
	console.log('Connected to host');
	if (!myIpAddress) { myIpAddress = server.address().address; }
	sendHeartBeat()
	noble.startScanning([], true);
	heartbeatId = setInterval(function() {
		sendHeartBeat();
	}, 5000 );
})

server.on('end', function () {
	console.log('Host disconnected');
	noble.stopScanning();
	clearInterval(heartbeatId);
	server.setTimeout(2000, function() {
        connectToHost();
    });
});

server.on('error', function (err) {
	console.log('In error event: -');
	console.log(err);
	noble.stopScanning();
	clearInterval(heartbeatId);
	if (err.code == 'ECONNREFUSED') {
		console.log('Host refused connection');
		server.setTimeout(2000, function() {
            connectToHost();
        });
	}
	else if (err.code == "EPIPE") {
		console.log('Host ended connection');
		server.setTimeout(2000, function() {
            connectToHost();
        });
	}
	else if (err.code == "ENETUNREACH") {
		console.log('Network unreachable, waiting...');
		server.setTimeout(2000, function() {
            connectToHost();
        });
	}
	else if (err.code == "ENETDOWN") {
		console.log('Network down, waiting...');
		server.setTimeout(2000, function() {
            connectToHost();
        });
	}
	else if (err.code == "EHOSTUNREACH") {
		console.log('Host unreachable, waiting...');
		server.setTimeout(2000, function() {
            connectToHost();
        });
	}
	else
	{
		console.log('Unhandled error occurred: -');
		console.log(err);
		//process.exit(1);
		connectId = setInterval(function() {
			connectToHost();
		}, 5000 );
	}
});

noble.on('stateChange', function(state) {
	bleState = state;
	console.log(state)
 	if (state === 'poweredOn') {
 		sendMessage('bluetooth is powered on');
    	noble.startScanning([], true);
  	} else {
  		sendMessage('bluetooth is powered off');
    	noble.stopScanning();
  	}
});

noble.on('discover', function(peripheral) {
	var devices = [peripheral.uuid.toUpperCase()];
	if (config.app.verbose) console.log(peripheral)
	server.write(JSON.stringify({
		event: 'message',
		data: {
			user: myUsername,
			responseTo: 'list-devices',
			message: devices,
			location: myLocation,
			timestamp: new Date().getTime()
			}
		})
	);
});

//process.openStdin().addListener('data', function (data) {}); //listener prevents the client app from closing