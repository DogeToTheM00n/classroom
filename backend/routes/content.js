const db = require('../db/db.js');

function AddContentToSubject(id, content) {
    return new Promise(resolve => {
        db.SubjectSchema.findOneAndUpdate(
            { _id: id },
            { $push: { contentSchemaArray: content } },
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


async function SaveContent(req, res) {
    const sub_id = req.body.sub_id;
    const content = new db.ContentSchema({
        body: req.body.body,
        date: new Date(),
        files: req.body.file,
        username: req.body.username
    });
    if (req.body.body === undefined) {
        content.body = "";
    }
    if (req.body.files === undefined) {
        content.file = "";
    }
    await AddContentToSubject(sub_id, content);
    res.send(true);

}



module.exports = { SaveContent };
