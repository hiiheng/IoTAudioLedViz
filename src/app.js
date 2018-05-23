import dotenv from 'dotenv'
dotenv.load();

import express from 'express'
import path from 'path'
import routes from './routes/index'

let app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use("/", routes);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
