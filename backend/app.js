const express = require('express');
const path = require('path');
const session = require("express-session")
const cors = require("cors");
const app = express();

const { SerialPort } = require('serialport');  // SerialPort 모듈 가져오기
const { ReadlineParser } = require('@serialport/parser-readline');  // Readline 파서 모듈 가져오기

// router variable
const userRouter = require("./routes/user.route");
const sensorRouter = require("./routes/sensor.route")

// util
const auth = require("./util/auth.js")
const mail = require("./util/sendEmail.js");

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// middleware

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.use(session({
  name:"session-id",
  secret:"my-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie:{
    httpOnly:false,
    secure: false,
    sameSite: "lax",
    path:"/"
  }}))

// router
app.use("/user",userRouter);
app.use("/sensor",sensorRouter);

app.use("/auth",auth);
app.use("/mail",mail);

app.listen(3001, () => {
  console.log("Express Server is Running!")
})