const db = require('../db/db.js');


function getUsername(role, t1) {
   // console.log(t1,role);
    return new Promise(resolve => {
        if (role=="false") {
            db.TeacherSchema.findOne({ username: t1 }, (err, results) => {
                if (err) throw err;
                console.log(results)
                return resolve(results);
            });
        }
        else {
            db.StudentSchema.findOne({ username: t1 }, (err, results) => {
                if (err) throw err;
                console.log(results)
                return resolve(results);
            });
        }
    });

}

function GetSubject(id) {
    //console.log(id);
    return new Promise(resolve => {
        db.SubjectSchema.findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            if(result==null){
                resolve(result);
            }
            resolve({
                "name": result.name,
                "teachersName":result.teachersName,
                "subjectID":result._id
            });
        })
    });
}


async function Dashboard(req, res) {
    const username = req.query.username;
    const role = req.query.role;

    //Will receive teacher's or studen's schema
    const f = await getUsername(role, username);
    var subjectArray = []
    if (f === null) {
        res.sendStatus(400);
    }
    else {
        if (f.subjectsIDArray == null) {
            res.send([]);
        }
        else {
            for (var i = 0; i < f.subjectsIDArray.length; i++){
                const sub = await GetSubject(f.subjectsIDArray[i].subjectId);
                subjectArray.push(sub);
            }
            res.json({ "SubjectsArray": subjectArray });
        }
    }


}


module.exports = { Dashboard }