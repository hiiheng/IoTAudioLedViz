
/**
    p5.js configuration
    https://p5js.org/reference/
    https://p5js.org/reference/#/libraries/p5.dom
    https://p5js.org/reference/#/libraries/p5.sound
**/
const BACKGROUND_COLOR = "#111111";

var mySound, uploadLoading, uploadedAudio, uploadBtn, playBtn,
    fft;
var prevDate = new Date();

/**
 * @function uploaded
 * callback fxn for upload button
 * @param {*} file user selected sound file
 */
function uploaded(file) {
	uploadLoading = true;
	uploadedAudio = loadSound(file.data, uploadedAudioPlay);
}

/**
 * @function uploadedAudioPlay
 * success callback when file is uploaded
 * @param {*} audioFile file data
 */
function uploadedAudioPlay(audioFile) {
	uploadLoading = false;
	if (mySound.isPlaying()) {
		mySound.pause();
	}

	mySound = audioFile;
	mySound.loop();
}

/**
 * @function toggleSound
 * callback for play/pause button
 */
function toggleSound() {
    if (mySound.isPlaying()) {
        mySound.pause();
    } else {
        mySound.loop();
    }
}

/**
 * p5 STRUCTURE methods
 * preload, setup, draw 
 */

/**
 * @function preload
 * called before setup() and should ONLY have load calls inside the method
 */
function preload() {
    mySound = loadSound('audio/DEMO_1.mp3');
}

/**
 * @function setup
 * called once the program starts, handles initial environment properties
 */
function setup() {
    uploadLoading = false;
    createCanvas(300, 300);

    // from p5.dom
    uploadBtn = createFileInput(uploaded);
    playBtn = createButton("Play/Pause");

    playBtn.mousePressed(toggleSound);

    fft = new p5.FFT();

    mySound.setVolume(1);
    mySound.loop();
}

// taken from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data),// must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        // 'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json()) // parses response to JSON
  }

/**
 * @function draw
 * called directly after setup()
 */
function draw() {

    noFill();
    background(BACKGROUND_COLOR);

    var spectrum = fft.analyze();
    var bass = map(fft.getEnergy("bass"), 0, 255, 0, 120),
        treble = map(fft.getEnergy("treble"), 0, 255, 0, 1023),
        mid = map(fft.getEnergy("mid"), 0, 255, 0, 700);
    var arr = [];

    arr.push({
        bass, treble, mid
    });

    var newDate = new Date();
    // send new post request every .05 second
    var prevTime = Math.floor(prevDate.getTime() / 10.67),
        newTime = Math.floor(newDate.getTime() / 10.67);
    if (prevTime != newTime) {
        // console.log("timeOld: " +prevTime + " timeNew: " + newTime);
        prevDate = newDate;
        if (mySound.isPlaying()) {
            postData(window.location.origin + "/api/waves", { waves: arr });
        }
    }

    noStroke();
    fill(0,255,10); // spectrum is green

    for (var i = 0; i < spectrum.length; i++){
      var x = map(i, 0, spectrum.length, 0, width); // width, height are globally available
      var h = map(spectrum[i], 0, 255, height, 0) - height;
      var send = map(spectrum[i], 0, 255, 0, 1023);
      // Draw a rectangle at location (x, height) with a width of (width / spectrum.length) and height of h.
      rect(x, height, width / spectrum.length, h);
    }

    var waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(255,0,0); // waveform is red
    strokeWeight(1);
    for (var i = 0; i< waveform.length; i++){
      var x = map(i, 0, waveform.length, 0, width);
      var y = map( waveform[i], -1, 1, 0, height);
      vertex(x,y);
    }
    endShape();
  }