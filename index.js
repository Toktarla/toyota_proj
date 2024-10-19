const express = require('express');
const ejs = require('ejs');
const { connectDB } = require('./config/db.js'); 
const session = require('express-session');
const bodyParser = require("body-parser")


const MARKETCHECK_API_KEY = process.env.MARKETCHECK_API_KEY;

// Routes
const adminRoutes = require('./routes/adminRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const generalRoutes = require('./routes/generalRoutes.js');
const quizRoutes = require('./routes/quizRoutes.js');
const carRoutes = require('./routes/carRoutes.js');

// ENV
require('dotenv').config();

const app = express();
const port = 3000;

app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 30 * 60 * 1000 // after 30 min user should extend session or he will be logged out
    },
    httpOnly: true,  // dont let browser javascript access cookie ever
    secure: true, // only use cookie over https
    ephemeral: true // delete this cookie while browser close
 
}));

app.set('view engine', 'ejs'); 
app.use(express.static('views'));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static('i18n'));

app.use(bodyParser.urlencoded({ extended: true }));

connectDB()

app.use('/', adminRoutes);
app.use('/', quizRoutes);
app.use('/', authRoutes);
app.use('/', generalRoutes);
app.use('/', carRoutes);


app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
