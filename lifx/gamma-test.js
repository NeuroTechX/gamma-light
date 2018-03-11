var lifx = require('node-lifx');

var LifxClient = lifx.Client;
var packet = lifx.packet;
var constants = lifx.constants;

var client = new LifxClient();

var packetObj = packet.create('setWaveform', {
  isTransient: true,
  color: {hue: 0, saturation: 0 , brightness: 0, kelvin: 0},
  period: 25,
  cycles: 500,
  skewRatio: 0.5,
  // SAW, SINE, HALF_SINE, TRIANGLE, PULSE
  waveform: constants.LIGHT_WAVEFORMS.indexOf('PULSE')
}, client.source);

client.on('light-new', function(light) {
  console.log('New light found.');
  console.log('ID: ' + light.id);
  console.log('IP: ' + light.address + ':' + light.port);
  light.getState(function(err, info) {
    if (err) {
      console.log(err);
    }
    console.log('Label: ' + info.label);
    console.log('Power:', (info.power === 1) ? 'on' : 'off');
    console.log('Color:', info.color);
  });

  light.getHardwareVersion(function(err, info) {
    if (err) {
      console.log(err);
    }
    console.log('Device Info: ' + info.vendorName + ' - ' + info.productName);
    console.log('Features: ', info.productFeatures, '\n');
  });
	
	packetObj.target = light.id; // light id
	client.send(packetObj, function(){});
});

client.init();
