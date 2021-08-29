const db = require('../db/db.js');
const subject = require("./subject.js");
//import uniqueString from 'unique-string';


function AddAssignmentToSubject(id, asg) {
    return new Promise(resolve => {
        db.SubjectSchema.findOneAndUpdate(
            { _id: id },
            { $push: { assignmentsSchemaArray: {"asg":asg} } },
            function (error, success) {
                if (error) {
                    console.log(error);
                    resolve(error);
                } else {
                    console.log(success);
                    resolve(true);
                }
            });

    });
}



async function CreateAssignments(req, res) {
    const asg = new db.AssignmentsSchema({
        title: req.body.title,
        points: req.body.point,
        body: req.body.body, // Url of the file  [You have to fetch all these details to your drive]
        deadline: req.body.deadline,
        flag: req.body.flag
    });
    if(req.body.files===undefined){
        asg.files="";
    }
    else{
        asg.files=req.body.files;
    }
    const current_datetime = new Date();
    asg.date = current_datetime;

    // Adding Assignments to Subject Table
    await AddAssignmentToSubject(req.body.subjectId,asg);
    
    // Adding Assignments to StudentsSchema



}


module.exports = { CreateAssignments }