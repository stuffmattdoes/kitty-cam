// ========================================
// Modules
// ========================================

const RaspiCam = require('raspicam');


// ========================================
// Functions
// ========================================

exports.takePicture = () => {
	let cameraOptions = {
		mode: 'photo',
		output: "./pictures/still_" + (Date.now()) + ".png",
		// output: "./pictures/test.png",
		w: 720,
		h: 405,
		e: 'jpg', 		// encoding: jpg, bmp, gif, png
		q: 40, 			// quality (0-100) set jpeg quality
		t: '4000', 		// time (in ms) until picture is taken. It's important to sleep for at least 2 seconds before capturing, to give the sensor time to set its light levels.
		rot: 180		// rotation
	}

	console.log("Taking picture in " + cameraOptions.t + ' seconds...');
	var camera = new RaspiCam(cameraOptions);
	camera.start();
}