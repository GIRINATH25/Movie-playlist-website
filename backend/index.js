const express = require('express');
const mongoose = require('mongoose');
const auth = require('./src/middleware/auth');
const route = require('./src/routes/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const env = process.env;

const app = express();
require('dotenv').config();

app.use(cors({
    origin: env.allowOrigin,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/', route);

let inclu = [];
app.use((req, res, next) => {
    if (inclu.includes(req.path)) return auth(req, res, next);
    next();
});

mongoose.connect(env.mongodbUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then(() => console.log('mongodb connected successfully'))
    .catch((err) => console.log(`Error on connecting to MongoDB: ${err}`));

app.listen(env.port, () => console.log(`listening on port ${env.port}`));
