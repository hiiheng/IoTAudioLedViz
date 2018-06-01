/**
    p5.js configuration
    https://p5js.org/reference/
    https://p5js.org/reference/#/libraries/p5.dom
    https://p5js.org/reference/#/libraries/p5.sound
**/
const BACKGROUND_COLOR = "#111111",
    FPS = 10.67;

let mySound,
    uploadLoading,
    uploadedAudio,
    uploadBtn,
    playBtn,
    fft,
    prevDate = new Date();

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

/**
 * @function draw
 * called directly after setup()
 */
function draw() {
    let spectrum = fft.analyze(),
        s_bass = fft.getEnergy("bass", 300),
        s_treble = fft.getEnergy("treble", 1000),
        s_mid = fft.getEnergy("lowMid", 600),
        mid = map(s_mid, 0, 254, 0, 1023),
        treble = map(s_treble, 0, 254, 0, 1023),
        bass = map(s_bass, 0, 254, 0, 1023);
    let arr = [];

    arr.push({
        bass, treble, mid
    });

    let newDate = new Date();

    // send new post request @ 60Hz - (1/60)
    let prevTime = Math.floor(prevDate.getTime() / FPS),
        newTime = Math.floor(newDate.getTime() / FPS);
    if (prevTime != newTime) {
        prevDate = newDate;
        if (mySound.isPlaying()) {
            worker.postMessage(
                JSON.stringify({
                    waves: arr,
                    selectedColor: document.getElementById('ledColor').value
                })
            );
        }
    }

    drawVisuals(spectrum);
}

/**
 * function drawVisuals
 * @param {*} spectrum 
 */
function drawVisuals(spectrum) {
    noFill();
    background(BACKGROUND_COLOR);
    noStroke();
    fill(0, 255, 10); // spectrum is green

    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width); // width, height are globally available
        let h = map(spectrum[i], 0, 255, height, 0) - height;
        let send = map(spectrum[i], 0, 255, 0, 1023);
        // Draw a rectangle at location (x, height) with a width of (width / spectrum.length) and height of h.
        rect(x, height, width / spectrum.length, h);
    }

    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(255, 0, 0); // waveform is red
    strokeWeight(1);
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);
    }
    endShape();
}

setInterval(function () {
    if (fft)
        draw();
}, 1000 * (1 / 60));