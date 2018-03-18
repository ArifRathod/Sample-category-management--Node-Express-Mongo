var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//connect to MongoDB
const configDB = require('./config/db.js');
configDB.connectMongoDB();
var db = mongoose.connection;

// use sessions for tracking logins
app.use(session({
  secret: 'arifrathod',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// include routes
setTimeout(function(){
  require('./routes/router.js')(app);
},1000)

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});