var express = require('express');
var mysql = require ('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    port     : '8889',
    user     : 'root',
    password : 'root',
    database : 'Dratele'
  }
});

var app = express();

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
app.use(bodyParser.json());

// Cookie parser
// app.use(cookieParser('shhhh, very secret'));

// Backend session
// app.use(session());

// Get username from session
// app.use(function(req, res, next) {
//   if (req.session.user) res.locals.username = req.session.user.username;
//   next();
// });

// Server running
app.listen(3000, function(){
	console.log("The frontend server is running on port 3000...");
});

// Get all images in categories route
app.get('/api/images', function(req, res){
  knex('images')
  .join('categories', 'images.categoryId', '=', 'categories.id')
  .select()
  .then(data => {
    res.send(data);
  })
});

// Get all categories route
app.get('/api/categories', function(req, res){
  knex('categories')
  .orderBy('id')
  .then(data => {
    res.send(data);
  })
});

// Get about route
app.get('/api/about', function(req, res){
  knex('about')
  .where('id', '=', 1)
  .first('text')
  .then(data => {
    console.log(data)
    res.send(data);
  })
});

// ------------------------------------------------------- LOGIN

// // Authenticate user & password
// function authenticate(name, pass, fn) {
//   connection.query('SELECT * FROM users WHERE username=?', [name], function(err, rows){
//     let user = rows[0];
//     if (!user) return fn(new Error('cannot find user'));
//     bcrypt.compare(pass, user.hash, function(err, res) {
//       if (err) return fn(err);
//       if (res) {
//         return fn(null, user);
//       } else {
//         fn(new Error('invalid password'));
//       }
//     });
//   });
// }
//
// // Login submit route
// app.post('/login', function(req, res){
//   authenticate(req.body.username, req.body.password, function(err, user){
//     if (user) {
//       console.log('welcome!')
//       req.session.regenerate(function(){
//         req.session.user = user;
//         res.redirect('/api/projects');
//       });
//     } else {
//       console.log('wrong username and/or password!')
//       // res.redirect('/login');
//     }
//   });
// });
//
// // Enter restricted Admin area route
// app.all('/api/admin/*', function(req, res, next){
//   console.log('Accessing admin area...');
//   if (req.session.user) {
//     next();
//   } else {
//     req.session.error = 'Access denied!';
//     // res.redirect('/login');
//   }
// });
//
// // Logout route
// app.get('/logout', function(req, res){
//   // destroy the user's session to log them out
//   // will be re-created next request
//   req.session.destroy(function(){
//     // res.redirect('/login');
//   });
// });

// ------------------------------------------------------- ADMIN

// Get categories to admin route
app.get('/api/admin/categories', function(req, res){
  var result = {}
  knex('categories')
  .orderBy('id')
  .then(categories => {
    result.categories = categories
    res.send(result)
  });
});

// Get images to admin route
app.get('/api/admin/images/:categoryId', function(req, res){
  var result = {}
  knex('images')
  .where('categoryId', req.params.categoryId)
  .then(images => {
    result.images = images
    res.send(result)
  });
});

// Get about to admin route
app.get('/api/admin/about', function(req, res){
  var result = {}
  knex('about').where('id', 1).first('text')
  .then(about => {
    result.about = about
    res.send(result)
  });
});

// Add new category route
app.post('/api/admin/categories', function(req, res){
  knex('categories')
  .insert({name: req.body.name})
  .then((ids) => {
    let cat = {id:ids[0], name:req.body.name}
    res.send(JSON.stringify(cat))
  });
});

// Rename category route
app.put('/api/admin/categories', function(req, res){
  let cat = req.body
  knex('categories')
  .where('id', req.body.id)
  .update({name: req.body.name})
  .then(
    res.send(JSON.stringify(cat))
  );
});

// Delete category route
app.get('/api/admin/categories/delete/:id', function(req, res){
  knex('categories')
  .where('id', req.params.id)
  .del()
  .then(
    res.send(JSON.stringify('ok'))
  );
});

// Delete image route
app.get('/api/admin/images/delete/:id', function(req, res){
  knex('images')
  .where('id', req.params.id)
  .del()
  .then(
    res.send(JSON.stringify('ok'))
  );
});

// Add new image to category route
app.post('/api/admin/images/new', upload.single('image'), function(req, res){
  knex('images')
  .insert({
    title: req.file.filename,
    imagePath: '/static/projects/'+req.file.filename,
    categoryId: id
  })
  .then(
    res.send(JSON.stringify('ok'))
  );
});

// Update 'About' text route
app.put('/api/admin/about', function(req, res){
  knex('about')
  .where('id', 1)
  .update({text: req.body.about})
  .then(
    res.send(JSON.stringify('ok'))
  );
});


//
