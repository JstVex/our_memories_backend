require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const memorieRoutes = require('./routes/memories');
const dateRoutes = require('./routes/date')


const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded());


//routes
app.use('/api/memories', memorieRoutes)
app.use('/api/dates', dateRoutes)


//connect to mongoose
const port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log('listening to port', port);
        })
    })
    .catch((error) => {
        console.log(error)
    })




