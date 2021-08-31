// Requiring Dependencies
// Accessing the path module
require('dotenv').config();
const path = require("path");
const express = require("express");
const db = require("./db/db.js");
const basicValidation = require("./routes/signupAndLogin");
const dashboard = require("./routes/dashboard.js");
const subject = require("./routes/subject.js");
const assignment = require("./routes/assignments.js");
const content = require("./routes/content.js");
const lectures = require("./routes/lectures.js");
const calender = require("./routes/calender.js");
const uploadasg = require("./routes/UploadAssignment.js");
const marks = require("./routes/marks.js");
const oauth = require("./external_api/oauth.js");
const multer = require("multer");
const cors = require("cors");

console.log(process.env.PASSWORD);
//  Preprocessing
const upload = multer();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Step 1:
app.use(express.static(path.resolve(__dirname, "./build")));
// Step 2:

db.ConnectWithDatabase();

// app.get("/", (req, res) => {
//   res.send("up");
// });

//Signup
app.post("/api/signup", (req, res) => {
  basicValidation.Signup(req, res);
});

// Login
app.post("/api/login", (req, res) => {
  basicValidation.Login(req, res);
});

// Dashboard
app.get("/api/dashboard", (req, res) => {
  dashboard.Dashboard(req, res);
});

// Create a Subject
app.post("/api/subject", (req, res) => {
  subject.CreateSubject(req, res);
});

// get details of a subjectArray
app.get("/api/subject", (req, res) => {
  subject.GetSubjectInfo(req, res);
});

// Update Subject Information
app.put("/api/subject", (req, res) => {
  subject.UpdateSubject(req, res);
});

// Join Class
app.post("/api/joinClass", (req, res) => {
  subject.JoinClass(req, res);
});

// Assignments Routes

app.post("/api/assignments", upload.any(), (req, res) => {
  assignment.CreateAssignments(req, res);
});

//Get Assignment Details

app.get("/api/assignments", (req, res) => {
  assignment.ViewAssignmentDetails(req, res);
});

app.post("/api/uploadAssignment", upload.any(), (req, res) => {
  uploadasg.uploadAsg(req, res);
});

app.post("/api/submitAssignment", (req, res) => {
  uploadasg.UpdateFlag(req, res);
});

app.put("/api/marks", (req, res) => {
  uploadasg.UpdateMarks(req, res);
});

app.get("/api/markAssignments", (req, res) => {
  marks.GetStudentsWithAssignment(req, res);
});

// Content Routes
app.post("/api/content", upload.any(), (req, res) => {
  content.SaveContent(req, res);
});

// Lecture routes
app.post("/api/lecture", (req, res) => {
  lectures.CreateLecture(req, res);
});

//Get Calender

app.get("/api/calender", (req, res) => {
  calender.GetSchedule(req, res);
});

app.get("/api/oauth", (req, res) => {
  console.log("alalal");
  oauth.urlGoogle();
});
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server running on port ", port);
});
