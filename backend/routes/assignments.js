const db = require('../db/db.js');
const subject = require("./subject.js");


async function AddAssignmentToSubject(id, asg) {
    const new_id = (new Date()).getTime().toString(36)
    console.log(new_id);
    return new Promise(resolve => {
        db.SubjectSchema.findOneAndUpdate(
            { _id: id },
            { $push: { assignmentsSchemaArray: { "asg": asg, "_id": new_id } } },
            function (error, success) {
                if (error) {
                    console.log(error);
                    resolve(error);
                } else {
                    //console.log("Before Success");
                    console.log(success);
                    resolve({ "new_id": new_id, "id": id });
                }
            });

    });
}

async function AddMarksSchemaToStudent(username, marks_obj) {
    console.log(username, marks_obj);
    return new Promise(resolve => {
        db.StudentSchema.findOneAndUpdate(
            { username: username },
            { $push: { marksAssignmentSchemaArray: marks_obj } },
            function (error, success) {
                if (error) {
                    console.log(error);
                    resolve(error);
                } else {
                    //console.log("Before Success");
                    console.log(success);
                    resolve(true);
                }
            });

    });
}

function GetInfo(id) {
    return new Promise(resolve => {
        db.SubjectSchema.findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}


async function CreateMarkAssignmentsSchema(new_id, subId) {
    const mk = new db.MarkAssignmentsSchema({
        marks: -1,
        assignmentId: new_id,
        files: "",
        subjectId: subId,
        flag: 1
    });
    const sub = await GetInfo(subId);
    for (let i = 0; i < sub.enrolledStudents.length; i++) {
        await AddMarksSchemaToStudent(sub.enrolledStudents[i].username, mk);
    }

}


async function CreateAssignments(req, res) {
    const asg = new db.AssignmentsSchema({
        title: req.body.title,
        points: req.body.point,
        body: req.body.body, // Url of the file  [You have to fetch all these details to your drive]
        deadline: req.body.deadline,
        flag: req.body.flag
    });
    if (req.body.files === undefined) {
        asg.files = "";
    }
    else {
        asg.files = req.body.files;
    }
    const current_datetime = new Date();
    asg.date = current_datetime;

    // Adding Assignments to Subject Table

    const obj = await AddAssignmentToSubject(req.body.subjectId, asg);

    // Adding Assignments to StudentsSchema
    await CreateMarkAssignmentsSchema(obj.new_id, obj.id);

    res.json({"_id": new_id});




}


module.exports = { CreateAssignments }