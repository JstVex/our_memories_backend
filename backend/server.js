require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const memorieRoutes = require('./routes/memories');
const dateRoutes = require('./routes/date')
const cors = require('cors');
const corsOptions = require('./config/corsOptions')


const app = express();

//middleware
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsOptions));


//routes
app.use('/', require('./routes/root'))
app.use('/api/memories', memorieRoutes)
app.use('/api/dates', dateRoutes)

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ msg: '404 not found' })
    } else {
        res.type('txt').send('404 not found')
    }
})

//connect to mongoose
const PORT = process.env.PORT || 4001;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('listening to port', PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })




