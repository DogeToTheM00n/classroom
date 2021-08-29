//const express = require("express");
const db = require("../db/db.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;


// Signup
function CheckUsername(t1) {

    return new Promise(resolve => {
        db.UserSchema.findOne({ username: t1 }, (err, results) => {
            if (err) throw err;
            if (results != null) {
                //console.log("Hello checkusername");
                resolve(true);

            }
            resolve(false);
        });
    });

}



function CheckEmail(t2) {
    return new Promise(resolve => {
        db.UserSchema.findOne({ email: t2 }, (err, results) => {
            if (err) throw err;
            //console.log(results);
            if (results != null) {
                resolve(true);
            }

            resolve(false);
        });
    });

}


async function Signup(req, res) {
    const validation = {
        username: false,
        email: false
    }

    validation.username = await CheckUsername(req.body.username);
    validation.email = await CheckEmail(req.body.email);

    // console.log(validation);
    //console.log("to put details");
    if (!validation.username && !validation.email) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) throw err;
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                // returns hash
                if (err) throw err;
                //console.log(hash);
                const user = new db.UserSchema({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    role: req.body.role
                })

                user.save((err) => {
                    if (err) throw err;
                    if (!err) {
                        console.log("Information saved to database, successfully");
                    }
                })
                if (!user.role) {
                    const teacher = new db.TeacherSchema({
                        username: user.username,
                        subjectsIdArray:[]
                    });
                    teacher.save((err) => {
                        if (err) throw err;
                        console.log("Teacher created ");
                    })

                }
                else {
                    const student = new db.StudentSchema({
                        username: user.username,
                        subjectsIDArray:[]
                    });
                    student.save((err) => {
                        {
                            if (err) throw err;
                            console.log("Student created ");
                        }
                    })
                }
                res.json({
                    username: user.username,
                    email: user.email,
                    role: user.role
                });
            });
        });
    }
    else {
        res.json(validation);
    }
}

// Login

function Login(req, res) {

    const testUsername = req.body.username;
    db.UserSchema.find({ username: testUsername }, (err, entry) => {
        if (err) {
            res.send(err);
        }
        else {
            if (entry.length == 0) {
                res.send(400);
            }

            else {
                bcrypt.compare(req.body.password, entry[0].password, (err, result) => {
                    if (err) throw err;
                    if (result) {
                        res.json({
                            username: entry[0].username,
                            email: entry[0].email,
                            role: entry[0].role
                        });
                    }
                    else {
                        res.send(401);
                    }
                });
            }
        }
    });



}

module.exports = { Signup, Login }