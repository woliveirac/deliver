'use strict';

const cors = require("cors");
const express = require("express");
const dotenv = require('dotenv');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const billsToPayRouter = require('./routes/billsToPay.route');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.options('*', cors());

const port = Number(process.env.PORT || 4000);
const host = process.env.HOST || '0.0.0.0';

app.use('/contasapagar', billsToPayRouter);

app.get('/', (req, res) => {
   res.send('hey guys!');
});

// 404 error
app.all('*', (req, res, next) => {
   const err = new HttpException(404, 'Endpoint Not Found');
   next(err);
});

// Error middleware
app.use(errorMiddleware);

app.listen(port,host);

console.log('Running on http://'+ host + ':' + port);

module.exports = app;