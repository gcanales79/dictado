require('dotenv').config()
const express=require("express");
const bodyParser=require("body-parser");
const exphbs  = require('express-handlebars');

const app=express();

const PORT=process.env.PORT || 3001;

// Imports the Google Cloud client library hello
const textToSpeech = require('@google-cloud/text-to-speech');
 
// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

  // Routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

  module.exports=app;
console.log(client)
  

