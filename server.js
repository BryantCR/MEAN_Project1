//*REQUIRES------------------------------------------------------------------------------------------
const express = require('express');
const session = require( 'express-session' );
const {UserRouter} = require('./server/routers/userRouter');
const path = require('path');
const app = express();
var cors = require('cors')


//*APP-----------------------------------------------------------------------------------------------
app.use( express.urlencoded({extended:true}) );
app.use(cors())
app.use( express.json() );
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 30 }
}));
//app.use(express.static(path.join(__dirname, "/pu


//*DATABASE------------------------------------------------------------------------------------------
require("./server/config/database");

//*ROUTES------------------------------------------------------------------------------------------

app.use( '/company', UserRouter  );



//*PORT------------------------------------------------------------------------------------------
let port = 8080
app.listen(port, function(){
    console.log("This server is working on port: 8080");
})

