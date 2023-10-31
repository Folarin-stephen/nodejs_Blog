require("dotenv").config();
const express = require("express");
const expressLayout = require('express-ejs-layouts');
const connectDB = require("./server/config/db");
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require('express-session');

const app = express();
const PORT = 5000 || process.env.PORT

connectDB();

app.use(express.urlencoded ({extended: true}) )
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'Keyboard cat',
    resave: false,
    saveUninitialized: true,
    mongoUri: process.env.MONGODB_URL
}))

app.use(express.static('public'));

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));



// app.use(expressLayout);
// app.set('Layout', './layouts/main');
app.set('view engine', 'ejs')


app.listen(5000, () => {
    console.log(`server listening on port: ${PORT}`);
})


