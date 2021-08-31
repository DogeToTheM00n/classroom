# Classroom Web Application

## Tech stack used:
1.Frontend: React, Redux, React-Redux, React-Router, Axios, React-bootsrap
<br/>
2. Backend: Node.js,google api, multer
<br/>
3. Database: MongoDB

## Steps to run this application on local system
* These steps assume that the tech stack mentioned above are installed on the local system.
* Since we have used google drive api in order to upload diles in the form of assignments and announcements. In order to get your ClientId,ClientSecret, Refresh token refer [here](https://console.cloud.google.com).
## Let's start:
1.Clone this Repository<br/>
2.Start mongod using:<br/>
``` sudo service mongod start ```<br/>
3.Go to the working directory, where you have cloned this repository<br/>
4.Now run following commands:<br/>
```
cd frontend/
npm i
cd ../backend
npm i
```
<br/>
5. After installing all packages, start the server:<br/>
```node app.js```<br/>
6. To start the react server, change into frontend directory, and run the following command:<br/>
```npm start```<br/>

The app will run on http://localhost:3000, server will run on http://localhost:8080.
 <br/>
 







