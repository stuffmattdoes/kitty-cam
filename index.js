// ========================================
// Modules
// ========================================

const gpio = require('rpi-gpio');
const piCamera = require('./picturetaker');


// ========================================
// Variables
// ========================================

let pir = { 
	pin: 7,
	loopTime: 1000,
	tripped: false
}


// ========================================
// Functions
// ========================================

const readInterval = () => { 
	gpio.read(pir.pin, (error, value) => { 
		
		if (error) {
			return console.error('Error: ', error);
		}

		// we only want to move on if something changed
		if (value === pir.tripped) {
			return;
		}

		pir.tripped = value;

		if (pir.tripped) {
			piCamera.takePicture();
			console.log('Motion detected!');
		} else {
			console.log("nah");
		}
	});
}

const onSetup = error => {
	// console.log("RPI pin setup");

	if (error) {
		return console.error('Error: ', error);
	}

	return setInterval(readInterval, pir.loopTime);
} 

gpio.setMode(gpio.MODE_RPI);					// Specify either Raspberry Pi or SoC/BCM pin schemas
gpio.setup(pir.pin, gpio.DIR_IN, onSetup);