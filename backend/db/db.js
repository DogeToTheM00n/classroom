const mongoose = require("mongoose");
const schemas = require("../database_schemas/database_schema.js");

//Connect with MongoDB
const mongoURL =
  "mongodb+srv://easysolutions:" +
  process.env.PASSWORD +
  "@cluster0.tbfef.mongodb.net/classroomdb?retryWrites=true&w=majority";
function ConnectWithDatabase() {
  mongoose.connect(mongoURL, { useNewUrlParser: true }, () => {
    console.log("Connected to MongoDB Database");
  });
}

const UserSchema = mongoose.model("userSchema", schemas.UserSchema);
const LectureSchema = mongoose.model("lectureSchema", schemas.LectureSchema);
const ContentSchema = mongoose.model("contentSchema", schemas.ContentSchema);
const AssignmentsSchema = mongoose.model(
  "assignmentsSchema",
  schemas.AssignmentsSchema
);
const SubjectSchema = mongoose.model("subjectsSchema", schemas.SubjectSchema);
const MarkAssignmentsSchema = mongoose.model(
  "makrsAssignmentsSchema",
  schemas.MarkAssignmentsSchema
);
const StudentSchema = mongoose.model("studentSchema", schemas.StudentSchema);
const TeacherSchema = mongoose.model("teachersSchema", schemas.TeacherSchema);
const driveApi = mongoose.model("driveApi", schemas.driveApi);

module.exports = {
  UserSchema,
  LectureSchema,
  ContentSchema,
  AssignmentsSchema,
  SubjectSchema,
  MarkAssignmentsSchema,
  StudentSchema,
  TeacherSchema,
  driveApi,
  ConnectWithDatabase,
};
