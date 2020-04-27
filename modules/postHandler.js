let bodyParser = require('body-parser');

// create application/json parser
let jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({
    extended: false
});


module.exports.postReqs = function (app, db) {

    app.post('/api/users', urlencodedParser, function (req, res) {
        if (!req.body) return res.sendStatus(400);
        console.log(req.body);
        let data = req.body;
        db.collection('users').findOne({
            username: data.username
        }, (err, result) => {
            if (result === null) {
                db.collection('users').insertOne(data, function (err) {
                    if (err) throw err;
                    console.log("Record inserted!");
                    res.status(200).send("recordInserted");
                })
            } else {
                res.status(400).send("userExists");
            }
        })

    })
    let loginData, loginUsername, loginPassword;
    app.post('/api/login', urlencodedParser, function (req, res) {
        if (!req.body) return res.sendStatus(400);
        console.log("Post request recieved");

        console.log(req.body);
        loginData = req.body;
        loginUsername = loginData.username;
        loginPassword = loginData.password;
        db.collection('users').findOne({
            username: loginUsername,
            password: loginPassword
        }, function (err, result) {
            if (err) throw err;
            if (result === null) {
                res.sendStatus(500);

            } else if (result.username === loginUsername && result.password === loginPassword) {
                db.collection('currentUserSession').insertOne({
                    username: result.username
                }, (err) => {
                    if (err) throw err;
                    console.log("User session created");
                })
                res.sendStatus(200);
            }
        })
    })

    app.put('/users/posts', urlencodedParser, (req, res) => {
        if (!req.body) {
            res.sendStatus(500);
        } else {
            var postTitle = req.body.postTitle;
            var content = req.body.postContent;
            var uname = req.body.username;
            var postData = {
                postTitle: postTitle,
                postContent: content,
                user: uname
            }
            db.collection('posts').insertOne(postData, (err) => {
                if (err) throw err;
            })
            res.sendStatus(200);
        }
    })
}