'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var app = (0, _express2.default)();

app.set('views', _path2.default.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use("/", _index2.default);
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

module.exports = app;