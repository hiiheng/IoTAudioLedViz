import { Router } from 'express';
import * as dgram from 'dgram';
import * as CONSTS from '../util/Consts';
import * as util from '../util/Util';

let router = Router();

let dGramClient = dgram.createSocket('udp4'),
    message, msg, red, green, blue, treble, mid, bass,
    primary, secondary, tertiary;

let prevDate = new Date(),
    prevTime = prevDate.getTime() / 1000;
let colorIndex = 0, color = CONSTS.COLORS[0], linearModeOn = false, selectedColorIdx = null;

// https://stackoverflow.com/questions/12121775/convert-streamed-buffers-to-utf8-string?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
dGramClient.on('message', (msg, rinfo) => {
    // console.log('msg: ', DECODER.write(msg));
});

router.get('/test', (req, res, next) => {
    res.send({ message : "successfully tested" });
});

router.post('/waves', (req, res, next) => {
    selectedColorIdx = req.body.selectedColor;
    treble = Math.floor(req.body.waves[0].treble);
    bass = Math.floor(req.body.waves[0].bass);
    mid = Math.floor(req.body.waves[0].mid);
    if (selectedColorIdx == CONSTS.LINEAR_IDX)  {
        linearModeOn = true;
    } else {
        color = CONSTS.COLORS[selectedColorIdx];
        linearModeOn = false;
    }

    let newDate = new Date();
    let nextTime = newDate.getTime() / 1000;

    util.process(treble, bass, mid, primary, secondary, tertiary, (result) => {
        primary = Math.floor(color[0] * result.primary);
        secondary = Math.floor(color[1] * result.secondary);
        tertiary = Math.floor(color[2] * result.tertiary);
        let diff = Math.floor(nextTime - prevTime);
        if (diff > CONSTS.TIME_INTERVAL) {
            diff = CONSTS.TIME_INTERVAL;
        }
        if (diff == CONSTS.TIME_INTERVAL) {
            prevTime = nextTime;  
            if (linearModeOn) {
                var changed = util.changeColor(colorIndex, color);
                color = changed.color;
                colorIndex = changed.colorIndex;
            }
        }
    });

    // send message to arduino
    msg = primary + ":" + secondary + ":" + tertiary;
    message = new Buffer(msg);
    util.sendDatagram(dGramClient, message);
    res.send({success : 200, body: req.body});
});

export default router;