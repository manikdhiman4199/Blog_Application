let express = require('express');
let app = express();
let postHandler = require('./modules/postHandler');

//Mongo connection
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', function () {
  console.log("Connection error");
});

db.once('open', function () {
  console.log("Connected to database");

})

//Set the ejs as the view engine
app.set('view engine', 'ejs');
//Use the assets folder such as javascript, css and images
app.use('/assets', express.static('assets'));

app.get('/index', function (req, res) {
  db.collection('currentUserSession').findOne({}, (err, result) => {
    if (err) throw err;
    if (result === null) {
      res.render('index')
    } else {
      res.render('index', {
        username: result.username
      });
      console.log(result.username);
    }
  })
})

//Signin Page
app.get('/signup', function (req, res) {
  res.render('signup')
});

app.get('/signin', function (req, res) {
  res.render('signin');
})

app.get('/users/posts/data', (req, res) => {
  db.collection('posts').find({}).toArray((err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result)
  });
})
//Handles all the post requests
postHandler.postReqs(app, db);


app.listen(9000);
