var mongoose = require("mongoose");

//! FOR DEV PURPOSES
// mongoose.connect("mongodb://localhost/Company");


//!FOR PROD PORPOSES
mongoose.connect("mongodb+srv://johang:201010jk@cluster0.anbzh.mongodb.net/Company?retryWrites=true&w=majority");
