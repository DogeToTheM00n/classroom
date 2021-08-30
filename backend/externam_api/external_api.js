const express = require("express");
const multer = require('multer')
const upload = multer();
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const { Readable } = require('stream');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const CLIENT_ID = '1022264532942-ck3t1ba66qph4vlc2tv8j5njtb12fp41.apps.googleusercontent.com';
const CLIENT_SECRET = 'rc-GrMQmCexQd3hJSEIp9SAT';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04DiaCUiICxIUCgYIARAAGAQSNwF-L9IrqD__qokKR_U3rhgpjImcubglli1EiIAQzQKY36uQwlz9sYTyFItVQPoq_QWvO30N2sk';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

//const filePath = path.join(__dirname, 'example.png');

function bufferToStream(buffer) {
    return new Promise((resolve => {
        var stream = new Readable();
        stream.push(buffer);
        stream.push(null);
        resolve(stream);
    }));

}



async function uploadFile(fileInfo) {
    const stream = fileInfo.buffer.toString('base64');
    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileInfo.originalname, //This can be name of your choice
                mimeType: fileInfo.mimeType,
            },
            media: {
                mimeType: fileInfo.mimeType,
                body: await bufferToStream(fileInfo.buffer),
            },
        });

        //console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error.message);
    }
}


async function uploadFile2(fileInfo) {
    var info_array=[]
    if(fileInfo != undefined) {
    for(var i=0;i<fileInfo.length;i++){
    const stream = fileInfo[i].buffer.toString('base64');
    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileInfo[i].originalname, //This can be name of your choice
                mimeType: fileInfo[i].mimeType,
            },
            media: {
                mimeType: fileInfo[i].mimeType,
                body: await bufferToStream(fileInfo[i].buffer),
            },
        });

        //console.log(response.data);
        info_array.push(response.data);
    } catch (error) {
        console.log(error.message);
    }

    }
    return info_array;
}

}



module.exports = { uploadFile, uploadFile2 }