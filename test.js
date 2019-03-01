'use strict';
 
const { Bme680 } = require('bme680-sensor');
const bme680 = new Bme680(1, 0x76);
 
bme680.initialize().then(async () => {
	console.info('Sensor initialized');
	setInterval(async () => {
		const result = await bme680.getSensorData()
		console.info(result.data);
	}, 3000);
});
