import * as CONSTS from './Consts';

/** utility methods */
const util = {
        process: function (treble, bass, mid, primary, secondary, tertiary, cb) {
            if (treble > bass) {
                if (bass > mid) {
                    secondary = bass;
                    tertiary = mid;
                } else {
                    secondary = mid;
                    tertiary = bass;
                }
                primary = treble;
            } else if (treble > mid) {
                primary = bass;
                secondary = treble;
                tertiary = mid;
            } else {
                tertiary = treble;
                if (mid > bass) {
                    secondary = bass;
                    primary = mid;
                } else {
                    secondary = mid;
                    primary = bass;
                }
            }
            tertiary = Math.max(secondary - tertiary, 0);
            secondary = Math.max(primary - secondary, 0);
            cb({ primary, tertiary, secondary });
    },
    changeColor: function(colorIndex, color) {
        colorIndex++;
        colorIndex = colorIndex % CONSTS.COLORS.length;
        color = CONSTS.COLORS[colorIndex];
        return { colorIndex, color };
    },
    sendDatagram: function(dGramClient, message) {
        dGramClient.send(message, 0, message.length, CONSTS.ARDUINO_PORT, CONSTS.ARDUINO_IP, 
            (err, bytes) => {
                if (err) { 
                    return CONSTS.FAILURE; 
                }
                return CONSTS.SUCCESS;
        });
    }
}

module.exports = util;