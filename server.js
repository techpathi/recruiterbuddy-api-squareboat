const express = require('express');
const router = require('./src/routes/routing');
const requestLogger = require('./src/utilities/loggers/requestLogger');
const errorLogger = require('./src/utilities/loggers/errorLogger');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const db = require('./src/db/connection');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use('/api/v1/', router);
app.use(errorLogger);


app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});