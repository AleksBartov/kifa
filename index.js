const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const materials = require('./routes/materials');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/materials', materials);

mongoose.connect(`mongodb://AleksBartov:${process.env.DB_PASS}@ds247439.mlab.com:47439/aleksbartovworks`)
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port);
        console.log(`Connected to the Database. Server is running on port ${port}...`);
    })
    .catch((err) => console.error('Could not connect to the Database!', err.message));
