const express=require("express")
const mysql = require("mysql");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const config = require('./key')
var app = express();

var options = {
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    key: "session_id",
    secret: "s41241231$#@2sada@#sd@3",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    // cookie:{maxAge: 60*60*1000}
  })
);

var db = mysql.createConnection(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore({} /* session store options */, db);

module.exports=db