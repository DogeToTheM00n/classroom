const db = require('../db/db.js');


function CheckUsername(t1) {

    return new Promise(resolve => {
        db.UserSchema.findOne({ username: t1 }, (err, results) => {
            if (err) throw err;
            if (results != null) {
                console.log("Hello checkusername");
                resolve(true);

            }
            resolve(false);
        });
    });

}



function Dashboard(req, res) {
    const username = req.query.username;


}