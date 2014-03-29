var noble = require('noble');

noble.on('stateChange', function(state) {
  console.log(state)
  if (state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  console.log('peripheral discovered (' + peripheral.uuid+ '):');
  console.log('\tName: ' + peripheral.advertisement.localName);
  console.log('\tAdvertised services:' + JSON.stringify(peripheral.advertisement.serviceUuids));
  
  if (peripheral.advertisement.serviceData) {
    console.log('\tService data: ' + JSON.stringify(peripheral.advertisement.serviceData.toString('hex')));
  }
  if (peripheral.advertisement.manufacturerData) {
    console.log('\tManufacturer: ' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
  }
  if (peripheral.advertisement.txPowerLevel !== undefined) {
    console.log('\tTX power level: ' + peripheral.advertisement.txPowerLevel);
  }

  console.log();
});