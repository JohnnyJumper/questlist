const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 6357;
const mongoose = require('mongoose');
const keys = require('./config/keys');
const {mongoDB: {url}, session:{key}} = keys;
const authRoutes = require('./routes/auth-routes');
const apiRoutes = require('./routes/api-routes');
const passportSetup = require('./config/passport-config');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

mongoose.connect(url, {
    useNewUrlParser: true
}, () => console.log('connected to db'));

app.use(cors());
// app.use('/auth', function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); }); 

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [key]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`server launched successfully on port ${PORT}`));