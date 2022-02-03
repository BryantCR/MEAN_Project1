var mongoose = require("mongoose");

//! FOR DEV PURPOSES
// mongoose.connect("mongodb://localhost/Company");


//!FOR PROD PORPOSES
mongoose.connect("mongodb+srv://johang:201010jk@cluster0.anbzh.mongodb.net/Company?retryWrites=true&w=majority");

mongoose.connection.on('error', err => {
    console.error(`Mongoose default connection error: ${ err }`);
    process.exit(0);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});