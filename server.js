const express = require('express');
const session = require( 'express-session' );
const path = require('path');

const app = express();
var cors = require('cors')

app.use( express.urlencoded({extended:true}) );
app.use(cors())
app.use( express.json() );
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 30 }
    
}));
//app.use(express.static(path.join(__dirname, "/public/dist/public")));

let port = 8080
app.listen(port, function(){
    console.log("This server is working on port: 8080");
})

//Hola amiguitos, nuestro proyecto va a ser genial
