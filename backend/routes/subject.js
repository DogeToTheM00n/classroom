const db = require('../db/db.js');

function getRandomString(length) {
    return new Promise(resolve => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        resolve(result)

    });

}

function CountDocuments() {
    return new Promise(resolve => {
        db.SubjectSchema.countDocuments({}, (err, cnt) => {
            if (err) throw err;
            resolve(cnt);
        });
    })
}

function AddSubjectToTeacher(subj) {
    console.log(subj);
    return new Promise(resolve=>{
    db.TeacherSchema.findOneAndUpdate(
        { username: subj.teachersUsername }, 
        { $push: { subjectsIDArray: {"subjectId":subj._id}  } },
       function (error, success) {
             if (error) {
                 console.log(error);
                 resolve(error);
             } else {
                 console.log(success);
                resolve(success);
             }
         });

        });
}

 

async function CreateSubject(req, res) {
    console.log("Hello");
    console.log(req.body);

    var unique_string = await getRandomString(5);
    var count = await CountDocuments();

    console.log(count);
    unique_string += count;

    const subj = new db.SubjectSchema({
        _id: unique_string,
        name: req.body.name,
        teachersName: req.body.teachersName,
        teachersUsername: req.body.teachersUsername,
        description: req.body.description,
        contentSchemaArray: [],
        lectureSchemaArray: [],
        assignmentsSchemaArray: [],
        videoLectureLink: ""
    });

    await AddSubjectToTeacher(subj);
    //const teacherObj=await AddSubjectToTeacher(subj.teachersUsername);


    subj.save((err) => {
        if (err) throw err;
        console.log("Subject information Saved to database successfully");

    });
    res.json({ "_id": subj._id });

}

module.exports = { CreateSubject }