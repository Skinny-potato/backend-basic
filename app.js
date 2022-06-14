var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const { error } = require('console');

var app = express();

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true

});
var db = mongoose.connection;

db.on('error', () => console.log("Error in connecting the database"));
db.once('open', () => console.log("Connected to the database"));


app.post('/feedback', (req, res) => {
    var Name = req.body.Name;
    var Email = req.body.Email;
    var PhoneNo = req.body.PhoneNo;
    var Password = req.body.Password;

    var data = {
        "Name": Name,
        "Email": Email,
        "Age": PhoneNo,
        "Course Enrolled": Password,
    }

    db.collection('major').insertOne(data, (err, collection) => {
        if (err) {
            throw error
        }
        console.log(data);
        console.log("Record entered successfully");

    });
    return res.redirect('feed-back.html')

});


app.get('/', (req, res) => {
    return res.redirect('index.html')

}).listen(3000, () => { console.log("SERVER STARTED !!") });



