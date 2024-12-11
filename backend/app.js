const express = require('express');
const path = require('path');
const session = require("express-session")
const cors = require("cors");

const app = express();

// router variable
const userRouter = require("./routes/user.route")

// auth

const auth = require("./middleware/auth")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

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
app.use("/user",userRouter)

app.use("/auth",auth);

app.listen(3001, () => {
  console.log("Express Server is Running!")
})