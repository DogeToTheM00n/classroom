const db = require('../db/db.js');

function AddLectureToSubject(id, lec) {
    return new Promise(resolve => {
        db.SubjectSchema.findOneAndUpdate(
            { _id: id },
            { $push: {lectureSchemaArray: { "lecture": lec } } },
            function (error, success) {
                if (error) {
                    console.log(error);
                    resolve(error);
                } else {
                    //console.log(success);
                    resolve(success);
                }
            });

    });
}



async function CreateLecture(req,res){
    const lec=new db.LectureSchema({
        day:req.body.day ,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    });
    await AddLectureToSubject(req.body.sub_id,lec);
    res.send(true);

}

module.exports ={CreateLecture}