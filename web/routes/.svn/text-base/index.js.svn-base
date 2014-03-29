
/*
 * GET home page.
 */

exports.index = function(req, res){
	var ipAddr = req.headers["x-forwarded-for"];
	if (ipAddr) {
		var list = ipAddr.split(",");
		ipAddr = list[list.length-1];
	} else {
		ipAddr = req.connection.remoteAddress;
	}

	res.render('index', { title: 'DroneControlCenter', ipAddress: ipAddr });
};