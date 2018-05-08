require('express-async-errors');
const error = require('./middleware/error');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const materials = require('./routes/materials');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/materials', materials);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

mongoose
    .connect('mongodb://AleksBartov:Merahba2018@ds247439.mlab.com:47439/aleksbartovworks')
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port);
        console.log(`Connected to the Database. Server is running on port ${port}...`);
    })
    .catch((err) => console.error('Could not connect to the Database!', err.message));
