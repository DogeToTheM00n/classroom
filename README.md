# Classroom Web Application

## Tech stack used:
1.Frontend: React, Redux, React-Redux, React-Router, Axios, React-bootsrap
<br/>
2. Backend: Node.js,google api, multer
<br/>
3. Database: MongoDB

## Steps to run this application on local system
* These steps assumes that all the tech stacks mentioned above are installed on the local system.
## Let's start:
1.Clone this Repository<br>
2.Start mongod using:<br>
``` sudo service mongod start ```
3.Go to the working directory, where you have cloned this repository<br>
4.Now run following commands:<br>
```
cd frontend/
npm i
cd ../backend
npm i
```
5. After installing all packages, start the server:<br>
```
node app.js
```

 The app will run on http://localhost:8080
 <br>
## Note
Since we have used google drive api in order to upload diles in the form of assignments and announcements. In order to get your ClientId,ClientSecret, Refresh token refer [Here!](https://console.cloud.google.com)
 







