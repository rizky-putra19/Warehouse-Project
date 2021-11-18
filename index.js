const express = require('express');
const app = express();
const cors = require('cors');
// const Router = require('./routes/index')
const moment = require('moment');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// app.use('/v1', Router);

app.get('/', (req,res) => {
    res.json({
        message: 'server running',
        serverTime: moment.utc(new Date()).local().format('YYYY-MM-DD HH:mm:ss'),
    });
});

app.get('*', (req,res) => {
    res.status(400).send('not found')
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});