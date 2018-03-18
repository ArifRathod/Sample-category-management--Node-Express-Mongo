let mongoose = require('mongoose');
const config = require('../config/config.json');
mongoose.Promise = Promise;

function connectMongoDB() {
    let connectionString = '';
    if (config.mongo.username && config.mongo.password) {
        connectionString = "mongodb://" + config.mongo.username + ":" + config.mongo.password + '@' + config.mongo.mongohost+"/"+ config.mongo.database;
    }else{
        connectionString = "mongodb://" + config.mongo.mongohost +"/"+ config.mongo.database;
    }
    //CONNECT WITH MONGOOSE
    mongoose.connect(connectionString);

    mongoose.connection.on('connected', function() {
        console.log('Mongo database connection estabilished successfully. ');
    });

    mongoose.connection.on('error', function(err) {
        console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose default connection disconnected');
    });

    process.on('exit', function() {
        console.log('Goodbye!!! Node Server stoped');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}

module.exports = {
    connectMongoDB: connectMongoDB
}