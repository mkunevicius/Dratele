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
// // Backend session
// app.use(session());
// // Get username from session
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

// Get about text route
app.get('/api/about', function(req, res){
  knex('about')
  .where('id', '=', 1)
  .first('text')
  .then(data => {
    console.log(data)
    res.send(data);
  })
});

// ------------------------------------------------------- ADMIN

// Get all data route
app.get('/api/data', function(req, res){
  var result = {}
  knex('categories')
  .orderBy('id')
  .then(categories => {
    result.categories = categories
    knex('images')
    .then(images => {
      result.images = images
      knex('about').where('id', 1).first('text')
      .then(about => {
        result.about = about
        res.send(result)
      })
    })
  })

  // knex('categories')
  // .then(categories => {
  //     var result = []
  //     var promises = []
  //     categories.forEach(category => {
  //       var promise = new Promise((resolve, reject) => {
  //         knex('images')
  //         .where('categoryId', category.id)
  //         .then(images => {
  //           category.images = images
  //           result.push(category)
  //           console.log('result', result)
  //         })
  //         resolve(result)
  //       })
  //       promises.push(promise)
  //     })
  //     Promise.all(promises).then(res => {
  //       console.log('res', res)
  //     })
  //   })
  // promise.then(res => {
  //   console.log(res)
  //   //res.send(result);
  // })

});

// Add new category route
app.post('/api/categories', function(req, res){
  knex('categories')
  .insert({name: req.body.name})
  .then((ids) => {
    let cat = {id:ids[0], name:req.body.name}
    res.send(JSON.stringify(cat))
  });
});

// Rename category route
app.put('/api/categories', function(req, res){
  let cat = req.body
  knex('categories')
  .where('id', req.body.id)
  .update({name: req.body.name})
  .then(
    res.send(JSON.stringify(cat))
  );
});

// Delete category route
app.get('/api/categories/delete/:id', function(req, res){
  knex('categories')
  .where('id', req.params.id)
  .del()
  .then(
    res.send(JSON.stringify('ok'))
  );
});

// Delete image route
app.get('/api/images/delete/:id', function(req, res){
  knex('images')
  .where('id', req.params.id)
  .del()
  .then(
    res.send(JSON.stringify('ok'))
  );
});

// Add new image to category route
app.post('/api/images/new', upload.single('image'), function(req, res){
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
app.put('/api/about', function(req, res){
  knex('about')
  .where('id', 1)
  .update({text: req.body.about})
  .then(
    res.send(JSON.stringify('ok'))
  );
});


//
