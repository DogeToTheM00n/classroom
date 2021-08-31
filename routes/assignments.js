const db = require('../db/db.js');
const subject = require("./subject.js");
const content = require("./content.js");


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
        files:[],
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
        flag: req.body.flag,
        files:[]
    });

    const current_datetime = new Date();
    asg.date = current_datetime;

    // Adding Assignments to Subject Table
    //console.log("asg is ",asg);
    const a=await content.SaveFilesToDrive(req.files)
    asg.files=a;
    //console.log("subject id is ", req.body.subjectId);
    const obj = await AddAssignmentToSubject(req.body.subjectId, asg);

    // Adding Assignments to StudentsSchema
    await CreateMarkAssignmentsSchema(obj.new_id, obj.id);

    res.json({ "_id": obj.new_id ,"driveFiles":asg.files});

}

function GetAsgDetailsArray(sub_id, asg_id) {
    return new Promise(resolve => {
        db.SubjectSchema.findOne({ _id: sub_id }, (err, res) => {
            if (err) throw err;
            if (res != null) {
                //console.log(res);
                resolve({ "asg_array": res.assignmentsSchemaArray, "enrolled": res.enrolledStudents });
            }
        });
    });
}

function GetAsgOnly(quant, asg_id) {
    return new Promise(resolve => {
        for (var i = 0; i < quant.length; i++) {
            if (quant[i]._id == asg_id) {
                resolve(quant[i]);
            }
        }
    });

}

function GetUsersMarksArray(username) {
    return new Promise(resolve => {
        db.StudentSchema.findOne({ username: username }, (err, res) => {
            if (err) throw err;
            if (res != null) {
                resolve(res.marksAssignmentSchemaArray);
            }
        })
    });

}

function GetAsgWithStudent(quant, asg_id, username) {
    return new Promise(resolve => {
        for (var i = 0; i < quant.length; i++) {
            if (quant[i].assignmentId == asg_id) {
                resolve(quant[i]);
            }
        }
    });

}


async function ViewAssignmentDetails(req, res) {
    const reqObj = {
        asg_id: req.query.asg_id,
        sub_id: req.query.sub_id,
        username: req.query.username,
        role: req.query.role
    }
   // console.log(reqObj.role);
    if (reqObj.role == 0) {
        const quant = await GetAsgDetailsArray(reqObj.sub_id, reqObj.asg_id);
        const final_asg_array = await GetAsgOnly(quant.asg_array, reqObj.asg_id)
        res.json({ "Asg_array": final_asg_array });

    }
    else {
        const quant = await GetAsgDetailsArray(reqObj.sub_id, reqObj.asg_id);
        const final_asg_array = await GetAsgOnly(quant.asg_array, reqObj.asg_id)
        const user_array = await GetUsersMarksArray(reqObj.username);
        const final_resp = await GetAsgWithStudent(user_array, reqObj.asg_id);
        res.json({"Asg_array":final_asg_array, "User_makrs":final_resp});

    }



}



module.exports = { CreateAssignments, ViewAssignmentDetails }