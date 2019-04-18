const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname + "/../public");
const fs = require("fs");
const bp = require("body-parser");
const db = require("../database/db");
const passport = require("passport");
const hbs = require("handlebars");
const ehbs = require("express-handlebars");
const bcrypt = require("bcryptjs");
const Event = require("../database/models/Event");

//logging middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile("server.log", log + "/n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});

app.use(express.static(publicPath));

//View engine setup
app.engine(".hbs", ehbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
//bp setup
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.set("view options", { layout: false });

// Passport Config
require("../config/passport")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//routes setup
const homeRoute = require("./routes/index");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
const eventRoute = require("./routes/event");
app.use("/", homeRoute);
app.use("/ticketvendoradmin", adminRoute);
app.use("/auth", userRoute);
app.use("/event", eventRoute);
app.get("/test", (req, res) => {
  res.status(200).send("Hello world");
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});