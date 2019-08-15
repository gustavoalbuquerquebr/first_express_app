"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

// this array is being used like a database
let animals = ["dog", "cat", "horse", "penguin", "bird"];

// tell Express to search any static file (e.g. css) in the public folder
app.use(express.static("public"));
// sets the folder for template files, default is:
app.set('views', './views');
// set the default template engine, this way there's no need to type the file extension
app.set("view engine", "ejs");

// line below is needed to parser the req.body in POST requests
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", {
    animals,
  });
});

app.get("/:query", (req, res) => {
  res.render("query", {
    query: req.params.query,
  });
});

app.post("/add", (req, res) => {
  animals.push(req.body.newAnimal);
  res.redirect("/");
});

// NOTE: catch all (*) must be in the end; express will selected the first route that match the first argument
app.get("*", (req, res) => res.send("404"));

app.listen(port, function() {
  console.log("The server is running...");
});
