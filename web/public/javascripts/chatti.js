// console.logCopy = console.log.bind(console);

// console.log = function(data)
// {	//method to add timestamps to log output
//     var currentDate = '[' + new Date().toUTCString() + '] ';
//     this.logCopy(currentDate, data);
// };

var peeps = [	{ name : 'Daryl',	dbName : 'daryl', deviceId : 'DE:2F:C6:6A:FB:C3', avatar : 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash3/t1/1535630_10152007345968961_563794759_n.jpg' },
				{ name : 'FlexTest', 	dbName : 'FlexTest', deviceId : 'DE:77:E4:14:E9:2F', avatar : 'http://www.clove.co.uk/product-images/fullsize/fitbit-flex-wristband-tangerine-gad-fwrist3.jpg' },
			];

var beacons = 	[
					{ name : 'beagle', 	coords : '1x5', wifiIp: '192.168.25.199'},
					{ name : 'device1', 	coords : '1x6' },
					{ name : 'device2',	coords : '1x11'},
					{ name : 'pi',	coords : '9x16'}
				];

function querystring(key) {
   var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
   var r=[], m;
   while ((m=re.exec(document.location.search)) != null) r.push(m[1]);
   return r;
}

function orderSort(a,b) {
   return ($(a).attr('order') > $(b).attr('order')) ? 1 : -1;
}

window.createChatti = (function ($) {
	return function () {
		var server = null;
		var scanId;
		var heartbeatId;
		var myIpAddress = $('#hdnIP').attr('ipaddress');
		var username = querystring('user')[0];

		var msgShowListDevices = false;

		var chatti = {
			init: function (host){
				server = io.connect(host || location.host);   //using routes meant location.href no longer worked correctly
				server.on('connect', chatti.events.onConnect);
				server.on('disconnect', chatti.events.onDisconnect);
				server.on('message', chatti.events.onClientMessage);
				server.on('error', chatti.events.onServerError);

				$('#message').keyup(function (e) {
					if (e.keyCode === 13) { chatti.events.onTextboxEnter.apply(this, arguments); }
				}).focus();
				$('#sendButton').click(function() {
					chatti.events.onSendButtonClick.apply(this, arguments);
				});
				$('#scan').click(function() {
					chatti.events.onScanButtonClick.apply(this, arguments);
				});
				$('#mnuMissionControl').click(function() {
					chatti.menu.showMissionControl.apply(this, arguments);
				});
				$('#mnuMap').click(function() {
					chatti.menu.showMap.apply(this, arguments);
				});
				$('#mnuHistory').click(function() {
					chatti.menu.showHistory.apply(this, arguments);
				});

				$('#chkboxListDevices').click(function() {
					msgShowListDevices = $('#chkboxListDevices').is(':checked')
				})

				chatti.views.buildBaselineDrones();
				chatti.views.buildMap();
				chatti.views.buildHistoryHolder();

				chatti.menu.showMissionControl();  //default view
			},
			views: {
				error: function (msg) {
					var currentDate = '[' + new Date().toUTCString() + '] ';
					return $('<div></div>').addClass('error-message').html(currentDate + msg);
				},
				warn: function (msg) {
					var currentDate = '[' + new Date().toUTCString() + '] ';
					return $('<div></div>').addClass('warn-message').html(currentDate + msg);
				},
				message: function (msg) {
					var currentDate = '[' + new Date().toUTCString() + '] ';
					return $('<div></div>').addClass('client-message').html(currentDate + msg);
				},
				drone: function (drone) {
					var container = $('<div></div>').attr('id', drone.user).attr('type', drone.type).attr('coords', 'summet').addClass('item').attr('timestamp', Math.round((new Date()).getTime() / 1000));
					var avatar = $('<img></img>').addClass('avatar').attr('alt', drone.type);
					var who = $('<span></span>').addClass('name').html(drone.user);


					switch (drone.type.toLowerCase())
					{
						case 'terminal':
							avatar.attr('src', '/images/terminal_icon.png');
							who.append(' <i>' + drone.ipaddress + '</i>');
							if (drone.bleState && drone.bleState.toLowerCase() == 'poweredon') {
								container.addClass('bleOn');
							}
							break;
						case 'browser':
							avatar.attr('src', '/images/browser_icon.png');
							break;
						default:
							avatar.attr('src', '/images/??.png');
							break;
					}

					var what = $('<span></span>').addClass('beacons').html(chatti.views.formatBeaconList(drone.beacons));
					var where = $('<p></p>').addClass('location').html(drone.location).append(what);
					var when = $('<span></span>').addClass('time').html(new Date().toUTCString());
					return(container.append(avatar).append(who).append(where).append(when));
				},
				person: function (peep, location) {
					var newId = peep.deviceId.replace(/:\s*/g, "");
					var container = $('<div></div>').attr('id', newId).attr('type', 'peep').addClass('item').attr('timestamp', Math.round((new Date()).getTime() / 1000));
					var avatar = $('<img></img>').addClass('avatar').attr('src', peep.avatar);
					var who = $('<span></span>').addClass('name').html(peep.name + ' <i>' + peep.deviceId + '</i>');
					var where = $('<p></p>').addClass('location').html($('<span></span>').addClass('location').html(location));
					var when = $('<span></span>').addClass('time').html(new Date().toUTCString());
					return(container.append(avatar).append(who).append(where).append(when));
				},
				formatBeaconList: function(arrBeacons) {
					var retVal = "";
					if (arrBeacons){
						$.each(arrBeacons, function(index, value) {
							retVal += value + '; ';
						});
					}
					return retVal;
				},
				buildBaselineDrones: function() {
//TODO : Decide if we show known drones regardless if they are running
					//$.each( beacons, function( key, beacon ) {
						//console.log(beacon);
					//} );
				},
				buildMap: function () {
					var map = $('<table></table>').addClass('map');
					for(i=0; i<12; i++){
					    var row = $('<tr></tr>');
					    for(x=0; x<20; x++){
					    	var td = $('<td></td>').attr('id', i + 'x' + x).text(i + 'x' + x);
					    	row.append(td);
						}
					    map.append(row);
					}

					$('#mapContainer').append(map);

					$.each( beacons, function( key, beacon ) {
						$('#' + beacon.coords).html(beacon.name).addClass('beaconInit').attr('name', beacon.name);
					});
				},
				resetMapItem: function (item, type) {
					var x = $('td[name*=' + item + ']');
					x.removeClass().html(x.attr('id'));
				},
				warnMapItem: function (item) {
					var x = $('td[name*=' + item + ']');
					x.removeClass().addClass('beaconWarn');
				},
				errorMapItem: function (item) {
					var x = $('td[name*=' + item + ']');
					x.removeClass().addClass('beaconError');
				},
				buildHistoryHolder: function () {
					return;
				},
				buildLocationTrail: function (userId, location) {
					var retVal = $('#' + userId).find($('.location'));
					var arrLocs = [location];

					retVal.children().each(function () {
						arrLocs.push($(this).html());
					});

					retVal.html('');

					$.each( arrLocs, function( index, value ){
						if (index == 1 && value == location) {
							return;
						}
						if (index >= 4) { return false; }
					    retVal.append($('<span></span>').addClass('location').html(value));
					});
				}
			},
			server: {
				sendMessage: function (data) {
					server.emit('message', {
						user: username,
						toUser: data.toUser,
						responseTo: data.responseTo,
						message: data.message,
						duration: data.duration,
						type: data.type,
						timestamp: new Date().getTime()
					})
				},
				sendHeartBeat: function () {
					chatti.server.sendMessage({
						message: 'heartbeat',
						type: 'browser',
						ipaddress: myIpAddress
					});
				}
			},
			dom: {
				appendError: function (msg) {
					var history = $('#chat-history');
					var message = chatti.views.error(msg).hide();
					history.append(message.fadeIn());
					history.find('.client-message:even').addClass('even');

					chatti.controls.scrollHistoryDown();

					return message;
				},
				appendWarning: function (msg) {
					var history = $('#chat-history');
					var message = chatti.views.warn(msg).hide();
					history.append(message.fadeIn());
					history.find('.client-message:even').addClass('even');

					chatti.controls.scrollHistoryDown();

					return message;
				},
				appendMessage: function (msg) {
					var history = $('#chat-history');
					var message = chatti.views.message(msg).hide();
					history.append(message.fadeIn());
					history.find('.client-message:even').addClass('even');

					chatti.controls.scrollHistoryDown();

					return message;
				},
				startScanning: function () {
					var intv = (+$('#duration').val() + 1) * 1000

					scanId = setInterval(function() {
						$('#broadcast').fadeIn('slow', function(){
							$('#broadcast').fadeOut('slow');
						});
						chatti.server.sendMessage({
							user: username,
							toUser: '*',
							message: 'list-devices',
							duration: $('#duration').val()
						});
					}, intv);
				},
				stopScanning: function () {
					clearInterval(scanId);
				},
				identifyUsers: function(devices, location) {
					$.each( peeps, function( key, value ) {
						var newId =  value.deviceId.replace(/:\s*/g, "");
						if (devices.indexOf(newId) >= 0) {
							var people = $('#people');
							if ($('#' + newId).length == 0) {
								var display = chatti.views.person(value, location).hide();
								people.append(display.fadeIn());
							}
							else if ($('#' + newId).length == 1) {
								$('#' + newId).attr('timestamp', Math.round((new Date()).getTime() / 1000)).fadeTo('fast', 1);
								$('#' + newId).find($('span.time')).html(new Date().toUTCString());
								chatti.views.buildLocationTrail(newId, location);
							}
						}
					});
				},
				checkChildren: function(container) {
					$(container).children().each(function (index) {
						var currTime = Math.round((new Date()).getTime() / 1000);
						var diff = currTime - $(this).attr('timestamp');
						if (diff <= 15 ) {
							$(this).fadeTo('fast', 1);
						}
						else if (diff > 15 && diff < 29) {
							$(this).fadeTo('slow', 0.85);
						}
						else if (diff >= 30 && diff < 44) {
							$(this).fadeTo('slow', 0.6);
						}
						else if (diff >= 45 && diff < 50) {
							$(this).fadeTo('slow', 0.4);
							if ($(this).attr('type') == 'terminal') {
								chatti.views.warnMapItem($(this).attr('id'));
								chatti.dom.appendWarning($(this).attr('id') + ' has not responded after ' + diff + ' seconds' );
							}
							else if ($(this).attr('type') == 'peep') {
								chatti.dom.appendWarning($(this).find($('span.name')).html() + ' may not be within range')
							}
						}
						else if (diff >= 50 && diff < 89) {
							$(this).fadeTo('slow', 0.33);
						}
						else if (diff >= 90 && diff < 95) {
							$(this).fadeTo('slow', 0.2);
							if ($(this).attr('type') == 'terminal') {
								chatti.views.warnMapItem($(this).attr('id'));
								chatti.dom.appendWarning($(this).attr('id') + ' has still not responded after ' + diff + ' seconds' );
							}
							else if ($(this).attr('type') == 'peep') {
								chatti.dom.appendWarning($(this).find($('span.name')).html() + ' still not be within range')
							}
						}
						else if (diff >= 120) {
							$(this).fadeTo('slow', 0, function() {
								$(this).slideUp(function() {
									if ($(this).attr('type') == 'terminal') {
										chatti.dom.appendError($(this).attr('id') + ' has stopped responding');
										chatti.views.errorMapItem($(this).attr('id'));
									}
									else if ($(this).attr('type') == 'peep') {
										chatti.dom.appendError($(this).find($('span.name')).html() + ' is not in range');
									}
//TODO decide whether to remove items or leave in faded state.  Add status to prevent checks until reenabled
									$(this.remove());
								});
							});
						}
					});
				},
				filteredDisplay: function(msg) {
					//return false;
					console.log(msg)
					if (msg.responseTo == 'list-devices' && msgShowListDevices) {
						return true;
					}
				}
			},
			cardio: {
				ecg: function (heartbeat) {
					if ($('#' + heartbeat.user).length == 0) {
						var display = chatti.views.drone(heartbeat).hide();
						$('#drones').append(display.fadeIn());
					}
					else if ($('#' + heartbeat.user).length == 1) {
						$('#' + heartbeat.user).attr('timestamp', Math.round((new Date()).getTime() / 1000)).fadeTo('fast', 1);
						$('#' + heartbeat.user).find($('span.beacons')).html(chatti.views.formatBeaconList(heartbeat.beacons));
						$('#' + heartbeat.user).find($('.time')).html(new Date().toUTCString());
						if (heartbeat.bleState && heartbeat.bleState.toLowerCase() == 'poweredon') {
							$('#' + heartbeat.user).addClass('bleOn');
						}
						else {
							$('#' + heartbeat.user).removeClass('bleOn');
						}
					}

					//now update the map
					$.each( beacons, function( key, beacon ) {
						if (beacon.name == heartbeat.user) {
							$('#' + beacon.coords).html(beacon.name).removeClass().addClass('beacon').attr('name', beacon.name);
								$('#' + beacon.coords).fadeTo('fast', 1, function () {
									$('#' + beacon.coords).fadeTo('slow', 0.5);
								});
							return;
						}
					});
				}
			},
			controls: {
				scrollHistoryDown: function () {
					if ($('#chat-history').length) {
						$('#chat-history').animate({
							scrollTop: $('#chat-history').get(0).scrollHeight
						}, 50)
					}
				}
			},
			events: {
				onConnect: function () {
					$('#serverStatus').removeClass('disconnected').addClass('connected').html('Connected to host ' + server.socket.options.host + ':' + server.socket.options.port);
					chatti.server.sendHeartBeat();
					heartbeatId = setInterval(function() {
						chatti.server.sendHeartBeat();
					}, 5000);

					setInterval(function () { chatti.dom.checkChildren('#drones'); }, 5000);
					setInterval(function () { chatti.dom.checkChildren('#people'); }, 5000);
				},
				onDisconnect: function () {
					clearInterval(heartbeatId);
					$('#serverStatus').removeClass('connected').addClass('disconnected').html('Disconnected from host ' + server.socket.options.host + ':' + server.socket.options.port);
				},
				onServerError: function (err) {
					clearInterval(heartbeatId);
					console.log(err);
					$('#serverStatus').removeClass('connected').addClass('disconnected').html('Error received from host: ' + err);
				},
				onClientMessage: function (data) {
					if ($.trim(data.message).length === 0){ return; }
					if ($.trim(data.message) == 'heartbeat') {
						chatti.cardio.ecg(data);
						return;
					}
					if ($.trim(data.message) == 'getpeople') {
						chatti.server.sendMessage({
							toUser: data.user,
							responseTo: 'getpeople',
						 	message: peeps
						});
						return;
					}

					if (data.error) {
						chatti.dom.appendError("From: " + data.user +
							"; ToUser: " + data.toUser +
							"; Message: " + data.message +
							"; Duration: " + data.duration);
						return;
					}

					if(data.user == "Server") {
						chatti.dom.appendMessage(JSON.stringify(data));
						return;
					}

					if (data.responseTo && data.responseTo.toLowerCase() == "list-devices") {

						chatti.dom.identifyUsers(data.message, data.location);
//TODO						#The following is handled in the clients, so no need for direct messaging here????
						// $('#drones').children().each(function (index) {
						// 	var beacons = $(this).find($('span.beacons')).html();
						// 	if (beacons.length > 0) {
						// 		if (beacons.toLowerCase().indexOf(data.location.toLowerCase()) != -1) {
						// 			var droneName = $(this).find($('span.name')).html();
						// 			chatti.server.sendMessage({
						// 				toUser: droneName,
						// 			 	message: data
						// 			});
						// 		}
						// 	}
						// });
						if (msgShowListDevices){ chatti.dom.appendMessage(JSON.stringify(data)); }
					}
				},
				onTextboxEnter: function (e) {
					var value = $(this).val();
					if (value.length > 0) {
						chatti.dom.appendMessage("From: " + username +
							"; ToUser: " + $('#toUser').val() +
							"; Message: " + value +
							"; Duration: " + $('#duration').val()).addClass('own-message');
						chatti.server.sendMessage({
							toUser: $('#toUser').val(),
							duration: $('#duration').val(),
							message: value
						});
						//$(this).val('');
					}
				},
				onSendButtonClick: function (e) {
					var msg = $('#message').val();
					if (msg.length > 0) {
						chatti.dom.appendMessage(username + ": " + msg).addClass('own-message');
						chatti.server.sendMessage({
							toUser: $('#toUser').val(),
							duration: $('#duration').val(),
							message: msg});
						//$('#message').val('');
					}
				},
				onScanButtonClick: function (e) {
					if ($(this).val() === 'scan') {
						$(this).val('stop');
						chatti.dom.startScanning();
					}
					else {
						$(this).val('scan');
						chatti.dom.stopScanning();
					}
				}
			},
			menu: {
				showMissionControl: function (e) {
					$('#mnuMissionControl').addClass('selected');
					$('#mnuMap').removeClass('selected');
					$('#mnuHistory').removeClass('selected');

					$('#chat-history').show();
					chatti.controls.scrollHistoryDown();
					$('#drones').show();
					$('#people').show();
					$('#commands').show();

					$('#mapContainer').hide();
					$('#history').hide();

				},
				showMap: function (e) {
					$('#mnuMissionControl').removeClass('selected');
					$('#mnuMap').addClass('selected');
					$('#mnuHistory').removeClass('selected');

					$('#mapContainer').show();

					$('#history').hide();
					$('#chat-history').hide();
					$('#drones').hide();
					$('#people').hide();
					$('#commands').hide();
				},
				showHistory: function (e) {
					$('#mnuMissionControl').removeClass('selected');
					$('#mnuMap').removeClass('selected');
					$('#mnuHistory').addClass('selected');

					$('#history').show();

					$('#mapContainer').hide();
					$('#chat-history').hide();
					$('#drones').hide();
					$('#people').hide();
					$('#commands').hide();
				}
			}
		};

		chatti.init.apply(this, arguments);
		return chatti;
	};
})(jQuery);

$(function () {
	var chatti = window.createChatti('');
});
