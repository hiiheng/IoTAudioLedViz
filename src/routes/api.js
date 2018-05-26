
import { Router } from 'express';
import { StringDecoder } from 'string_decoder';
import * as dgram from 'dgram';

let router = Router();

const DECODER = new StringDecoder('utf8');
const ARDUINO_IP = '192.168.1.89';
const ARDUINO_PORT = '2390';
const FAILURE = 1;
const SUCCESS = 0;

var dGramClient = dgram.createSocket('udp4'),
    message, msg, red, green, blue;

// https://stackoverflow.com/questions/12121775/convert-streamed-buffers-to-utf8-string?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
dGramClient.on('message', (msg, rinfo) => {
    console.log('msg: ', DECODER.write(msg));
});

router.get('/test', (req, res, next) => {
    res.send({message : "successfully tested"});
});

router.post('/waves', (req, res, next) => {
    // send message to arduino
    red = Math.floor(req.body.waves[0].treble);
    green = Math.floor(req.body.waves[0].bass);
    blue = Math.floor(req.body.waves[0].mid);
    msg = red + ":" + green + ":" + blue;
    console.log('forwarding packet: ' + msg);
    message = new Buffer(msg);
    sendDatagram(message);
    res.send({success : 200, body: req.body});
});

function sendDatagram(message) {
    dGramClient.send(message, 0, message.length, ARDUINO_PORT, ARDUINO_IP, (err, bytes) => {
        if (err) { return FAILURE; }
        return SUCCESS;
    });
}

export default router;