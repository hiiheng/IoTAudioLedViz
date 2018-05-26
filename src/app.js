import dotenv from 'dotenv'
dotenv.load();

import express from 'express'
import path from 'path'
import routes from './routes/index'
import api from './routes/api'
import bodyParser from 'body-parser'

let app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", routes);
app.use("/api", api);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
