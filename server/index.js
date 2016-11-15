"use strict";

const PORT        = 8080; //
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//line below imports function connect from lib. That function tajes a function as an params and returns the result of passing the argument funciton
//onto dbMethods, also defined in lib.
db.connect((dbInstance) => {
  //the app.use triggers middleware (the second arg. below), only on the route specified ('/tweets').
  //Question: how is said route chosen? Through any GET/POST/PUT.. request?
  //And what is dbInstance?
  app.use('/tweets', tweetsApi(dbInstance));
  //tweetsApi
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
