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

// Use 'Dratele' database
connection.query('USE Dratele');

// For file uploading with multer
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/public/projects/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage });

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

// All images route
app.get('/api/images', function(req, res){
  var queryAllImages = 'SELECT * FROM images JOIN categories ON images.categoryId = categories.id';
  connection.query(queryAllImages, function(err, rows){
    res.send(rows);
  });
});

// Get categories route
app.get('/api/categories', function(req, res){
  var queryAllCats = 'SELECT * FROM categories';
  connection.query(queryAllCats, function(err, rows){
    res.send(rows);
  });
});
