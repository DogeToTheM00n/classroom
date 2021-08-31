const db = require('../db/db.js');
const content = require("./content.js");

function getStudentArray(username) {
    return new Promise(resolve => {
        db.StudentSchema.findOne({ username: username }, (err, res) => {
            if (err) throw err;
            if (res != null) {
                resolve(res.marksAssignmentSchemaArray);
            }
        });
    });
}
// { $push: { subjectsIDArray:  { "subjectId": id } } }
function CopyDataToMarksArray(a, username, asg_id, sub_id) {
    // console.log("length is", a.length);
    return new Promise(resolve => {
        db.StudentSchema.findOne(
            {
                username: username,

            },
            (error, student) => {
                if (error) {
                    console.log(error);
                    resolve(error);
                } else {
                    //resolve(success);
                    console.log(student);

                    var index = -1;
                    for (var i = 0; i < student.marksAssignmentSchemaArray.length; i++) {
                        if (asg_id == student.marksAssignmentSchemaArray[i].assignmentId) {
                            index = i;
                            break;
                        }
                    }
                    if (index != -1) {
                        const pk = new db.driveApi({
                            kind: a.kind,
                            id: a.id,
                            name: a.name,
                            mimeType: a.mimeType,
                            viewLink: a.viewLink,
                            thumbnailLink: a.thumbnailLink
                        });
                        console.log("Index is ",index);
                        student.marksAssignmentSchemaArray[index].files.push(pk)

                        student.save((err) => {
                            if (err) throw err;
                            resolve(true);

                        });

                    }
                    resolve(true);
                }
            });


    });
}

async function uploadAsg(req, res) {


    //console.log(req.files);
    //console.log(req.body.username)
    mrks_array = await getStudentArray(req.body.username);
    //console.log("Makrs array ", mrks_array);
    const a = await content.SaveFilesToDrive(req.files)
    //a = [1]
    //mrks_array.files = a;
    console.log(a);

    for (var i = 0; i < a.length; i++) {
        await CopyDataToMarksArray(a[i], req.body.username, req.body.asg_id, req.body.sub_id);
    }
    res.json(true);
}



module.exports = { uploadAsg }
