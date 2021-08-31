const express = require("express");
const multer = require("multer");
const upload = multer();
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const { Readable } = require("stream");



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

//const filePath = path.join(__dirname, 'example.png');

function bufferToStream(buffer) {
  return new Promise((resolve) => {
    var stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    resolve(stream);
  });
}

async function uploadFile(fileInfo) {
  const stream = fileInfo.buffer.toString("base64");
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

    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

async function uploadFile2(fileInfo) {
  //console.log("client id is ", CLIENT_ID);
  var info_array = [];
  if (fileInfo != undefined) {
    for (var i = 0; i < fileInfo.length; i++) {
      const stream = fileInfo[i].buffer.toString("base64");
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
        const fileId = response.data.id;
        //change file permisions to public.
        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });

        //obtain the webview and webcontent links
        const result = await drive.files.get({
          fileId: fileId,
          fields: "webViewLink, webContentLink,thumbnailLink",
        });
        console.log(result.data);
        //console.log(response.data);
        info_array.push({
          kind: response.data.kind,
          id: response.data.id,
          name: response.data.name,
          mimeType: response.data.mimeType,
          viewLink: result.data.webViewLink,
          thumbnailLink: result.data.thumbnailLink
            ? result.data.thumbnailLink.substring(
                0,
                result.data.thumbnailLink.length - 5
              )
            : null,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    return info_array;
  }
}

module.exports = { uploadFile, uploadFile2 };
