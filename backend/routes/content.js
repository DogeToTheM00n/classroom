const db = require('../db/db.js');
const driveApi = require("../external_api/external_api.js");

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

function SaveFilesToDrive(content) {
    return new Promise(resolve => {
        resolve(driveApi.uploadFile2(content));
    });


}

async function SaveContent(req, res) {
    console.log(req.files);
    const sub_id = req.body.sub_id;
    var content = new db.ContentSchema({
        body: req.body.body,
        date: new Date(),
        files:[],
        username: req.body.username
    });
    if (req.body.body === undefined) {
        content.body = "";
    }

    // console.log(content.files);
    //content.files = await SaveFilesToDrive(req.files);
    const a = await SaveFilesToDrive(req.files);
    // for(var i=0;i<a.length;i++){
    //     content[i].files.id=a[i].id;
    //     content[i].files.kind=a[i].kind;
    //     content[i].files.name=a[i].name;
    //     content[i].files.mimeType=a[i].mimeType;
    // }

    content.files=a;
    
    console.log("value of files is ", content.files);
    await AddContentToSubject(sub_id, content);
    res.json({ "Bool": true, "driveFiles": content.files });

}



module.exports = { SaveContent,SaveFilesToDrive };
