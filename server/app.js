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

// All categories route
app.get('/api/categories', function(req, res){
  var queryAllCats = 'SELECT * FROM categories';
  connection.query(queryAllCats, function(err, rows){
    res.send(rows);
  });
});

// About text route
app.get('/api/about', function(req, res){
  var queryAbout = 'SELECT text FROM about';
  connection.query(queryAbout, function(err, rows){
    res.send(rows);
  });
});


// ------------------------------------------------------- ADMIN

// Add new category route
app.post('/api/categories', function(req, res){
  console.log('Insert new category: ', req.body.name);
  var queryAddCat = 'INSERT INTO categories (name) VALUES (?)';
  connection.query(queryAddCat, [req.body.name], function(err, rows){
    if (err) throw err;
  });
  res.redirect('/api/admin');
});

// Rename category route
app.post('/api/categories/:categoryId', function(req, res){
  var id = req.params.categoryId;
  var queryRename = 'UPDATE Dratele.categories SET name = ? WHERE categories.id = ?';
  connection.query(queryRename, [req.body.name, id], function(err, rows){
    if (err) throw err;
  });
  res.redirect('/api/admin');
});

// Delete category route
app.get('/api/categories/delete/:categoryId', function(req, res){
  var id = req.params.id;
  var queryDeleteCat = 'DELETE FROM Dratele.categories WHERE categories.id = ?';
  connection.query(queryDeleteCat, [id], function(err, rows){
    if (err) throw err;
  });
  res.redirect('/api/admin');
});

// Delete image route
app.get('/images/delete/:imageId', function(req, res){
  var imageId = req.params.imageId;
  console.log('Delete image id: ', imageId);
  var queryDeleteImage = 'DELETE FROM Dratele.images WHERE id = ?';
  connection.query(queryDeleteGroup, [imageId], function(err, rows){
    if (err) throw err;
  });
  res.redirect('/api/admin');
});

// Add new image to category route





// Update 'About' text route
app.post('/api/about', function(req, res){
  var queryUpdateAbout = 'UPDATE Dratele.about SET text = ?';
  connection.query(queryUpdateAbout, [req.body.about], function(err, rows){
    if (err) throw err;
  });
  res.redirect('/api/admin');
});


//
