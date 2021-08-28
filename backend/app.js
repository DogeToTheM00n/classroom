
// Requiring Dependencies

const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db/db.js")
const basicValidation = require("./routes/signupAndLogin");
console.log(basicValidation)

//  Preprocessing 
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.ConnectWithDatabase();

//Signup
app.post("/api/signup", (req, res) => {
    basicValidation.Signup(req, res);

});

// Login
app.post("/api/login",(req,res)=>{
    basicValidation.Login(req,res);
});

// Dashboard
app.get("/api/dashboard",(req,res)=>{
    basicValidation.Dashboard(req,res);
})

const port = 8080
app.listen(port, () => {
    console.log("Server running on port ", port);
});