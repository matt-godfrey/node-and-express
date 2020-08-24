
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
require('dotenv').config()
// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next();
})

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({ extended: false }))

/** 1) Meet the node console. */

console.log("Hello World")
/** 2) A first working Express Server */
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

/** 3) Serve an HTML file */


/** 4) Serve static assets  */

app.use(express.static(__dirname + "/public"))
/** 5) serve JSON on a specific route */

// app.get("/json", (req, res) => {
//     res.json({ "message": "Hello json" })
// })
/** 6) Use the .env file to configure the app */
 app.get("/json", (req, res) => {
     if (process.env.MESSAGE_STYLE === "uppercase") {
         res.json( {"message": "HELLO JSON"} )
     } else {
        res.json({ "message": "Hello json" })
     }
 })
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get("/now", (req, res, next) => {
    req.time = new Date().toString()
    next()
}, (req, res) => {
    res.send({ time: req.time })
})

/** 9)  Get input from client - Route parameters */

app.get("/:word/echo", (req, res) => {
    var word = req.params.word
    res.json({ echo: word })
   
})
/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res) => {
    var first = req.query.first;
    var last = req.query.last;
    res.json({ name: first + " " + last })
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */

app.post("/name", (req, res) => {
    var first = req.body.first;
    var last = req.body.last;
    res.json({ name: first + " " + last })
})

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

