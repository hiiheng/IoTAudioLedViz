
// Consts.js
import { StringDecoder } from 'string_decoder';
import dotenv from 'dotenv';
dotenv.load();

/** Consts */
const CONSTS = {
    COLORS : [          // pre determined colors
        [.7, .1, 0],    // burnt orange
        [0 , .8, .4],   // cyan
        [.2, .3, .9],   // ice blue
        [.3, .1, .8],   // ice purple
        [.5, .22, .22], // pink
        [0, .5, .15],   // teal
        [.65, .5, 0],    // yellow
        [.01, .41, .01] // light green
    ],
    ARDUINO_IP : process.env.ARDUINO_IP,
    ARDUINO_PORT : process.env.ARDUINO_PORT,
    FAILURE : 1,
    SUCCESS : 0,
    DECODER : new StringDecoder('utf8'),
    TIME_INTERVAL : 5, // every 5 seconds 
    LINEAR_IDX : -1,
    TITLE : "LED Audio Visualization"
}

module.exports = CONSTS;