//*REQUIRES------------------------------------------------------------------------------------------
const express = require('express');
const session = require( 'express-session' );
const flash = require('express-flash');
const {UserRouter} = require('./server/routers/userRouter');
const path = require('path');
const app = express();
var cors = require('cors')


//*APP-----------------------------------------------------------------------------------------------
app.use( express.urlencoded({extended:true}) );
app.use(cors());
app.use(flash);
app.use( express.json() );
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 30 }
}));
//app.use(express.static(path.join(__dirname, "/pu

//TEST EJS
app.set( 'Views', __dirname + '/Views' );
app.set( 'view engine', 'ejs' );

//*DATABASE------------------------------------------------------------------------------------------
require("./server/config/database");

//*ROUTES------------------------------------------------------------------------------------------

app.use( '/company', UserRouter  );

app.get( '/', function( req, res){
    res.render( 'login' );
});

//*PORT------------------------------------------------------------------------------------------
let port = 8080
app.listen(port, function(){
    console.log("This server is working on port: 8080");
})

//Trando de entender el código de Johandro
