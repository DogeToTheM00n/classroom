const db = require('../db/db.js');

function GetMarksArray(username,asg_id) {
    return new Promise((resolve, reject)=> {
        db.StudentSchema.findOne({username:username},(err,student)=>{
            if(err) throw err;
            if(student!=null){
                for(var i=0;i<student.marksAssignmentSchemaArray.length;i++){
                    if(student.marksAssignmentSchemaArray[i].assignmentId==asg_id){
                        resolve({"username": username ,"marks":student.marksAssignmentSchemaArray[i]})
                    }
                }
            }
            resolve(-1);
        })
    });
    

}

function GetAsgDetails(sub_id,asg_id){
    return new Promise(resolve=>{
        db.SubjectSchema.findOne({_id:sub_id}, (err,subject)=>{
            if(err) throw err;
            if(subject!=null){
                for(var i=0;i<subject.assignmentsSchemaArray.length;i++){
                    if(subject.assignmentsSchemaArray[i]._id==asg_id){
                        resolve(subject.assignmentsSchemaArray[i]);
                    }
                }
            }
            resolve(null);
        })
    });
}


function GetEnrolledStudents(sub_id) {
    return new Promise(resolve => {
        db.SubjectSchema.findOne({ _id: sub_id }, (err, res) => {
            if (err) throw err;
            if (res != null) {
                //console.log(res);
                resolve(res.enrolledStudents);
            }
        });
    });
}




async function GetStudentsWithAssignment(req, res) {
    const asg_id = req.query.asg_id;
    const sub_id = req.query.sub_id;
    const enrolled=await GetEnrolledStudents(sub_id);
    const output=[]
    for(var i=0;i<enrolled.length;i++){
        const op=await GetMarksArray(enrolled[i].username,asg_id);
        console.log(op)
        if(op.username!=undefined){
            output.push(op);
        }
    }
    const output2 = await GetAsgDetails(sub_id,asg_id);
    res.json({"asg_details":output2,"marks_array":output});
}


module.exports = { GetStudentsWithAssignment }