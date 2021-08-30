const db = require('../db/db.js');

function getCalenderTeacher(username) {
    var calender_array = [];
    return new Promise(resolve => {
        db.SubjectSchema.find({ teachersUsername: username }, (err, result) => {
            if (err) throw err;
            if (result != null) {
                for (var i = 0; i < result.length; i++) {
                    calender_array.push({
                        "subjectName": result[i].name,
                        "lectureSchemaArray": result[i].lectureSchemaArray,
                        "videoLectureLink": result[i].videoLectureLink
                    });
                }
                resolve(calender_array);
            }
        })
    });
}

function getCalenderStudent(username) {
    return new Promise(resolve => {
        db.StudentSchema.findOne({ username: username }, (err, res) => {
            if (err) throw err;
            if (res != null) {
                resolve(res.subjectsIDArray);
            }
        });
    });
}

function GetAllStuff(sub_id) {
    return new Promise(resolve => {
        db.SubjectSchema.findOne({ _id: sub_id }, (err, result) => {
            if (err) throw err;
            if (result != null) {
                resolve({
                    "subjectName": result.name,
                    "lectureSchemaArray": result.lectureSchemaArray,
                    "videoLectureLink": result.videoLectureLink
                });
            }
            resolve(result);
        })
    });
}


async function GetSchedule(req, res) {

    const username = req.query.username;
    const role = req.query.role;
    if (role == "false") {
        const output = await getCalenderTeacher(username);
        res.json(output);
    }
    else {
        const output1 = await getCalenderStudent(username);
        const final=[]
        console.log("akakak");
        for(var i=0;i<output1.length;i++){
            final.push(await GetAllStuff(output1[i].subjectId))
        }
        res.json(final);
    }

}

module.exports = { GetSchedule }