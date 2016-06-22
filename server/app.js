var express = require('express');
var mysql = require ('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');


var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
	port		 : '8889',
  user     : 'root',
  password : 'root'
});

// Use ADS database
connection.query('USE Dratele');

// Static server
app.use(express.static(__dirname + '/public'));
// Use body-parser - Express middleware for routes to access req.body
app.use(bodyParser.urlencoded({extended : false}));
// Cookie parser
app.use(cookieParser('shhhh, very secret'));
// Backend session
app.use(session());
// Get username from session
app.use(function(req, res, next) {
  if (req.session.user) res.locals.username = req.session.user.username;
  next();
});

// Server running
app.listen(3000, function(){
	console.log("The frontend server is running on port 3000...");
});

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/public/projects/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage });


// API projectlist route
app.get('/api/images', function(req, res){
  var queryAllProjects = 'SELECT * FROM images JOIN categories ON images.categoryId = categories.id';
  connection.query(queryAllProjects, function(err, rows){
    res.send(rows);
  });
});

app.get('/api/categories', function(req, res){
  var queryAllProjects = 'SELECT * FROM categories';
  connection.query(queryAllProjects, function(err, rows){
    res.send(rows);
  });
});


function getAllImages(res) {
  var queryAllProjects = 'SELECT * FROM images';
  connection.query(queryAllProjects, function(err, rows){
    return {images : rows};
  });
}

function getCategories(){
  var result;
  connection.query('SELECT * FROM categories', function(err, rows){
    result = rows;
  });
  return result;
}
