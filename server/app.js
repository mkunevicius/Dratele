var express = require('express');
var mysql = require ('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SessionStore = require('express-mysql-session');
var multer = require('multer');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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

var options = {
  host     : 'localhost',
  port     : '8889',
  user     : 'root',
  password : 'root',
  database : 'Dratele'
}

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
// Cookie parser
app.use(cookieParser('secret'));
// Use body-parser - Express middleware for routes to access req.body
app.use(bodyParser.json());
// Backend session
app.use(session({
  secret: 'secret123',
  cookie: {expires: false},
  store: new SessionStore(options)
}));

app.use(passport.initialize());
app.use(passport.session());

// // Get username from session
// app.use(function(req, res, next) {
//   console.log('1 req.session.user: : ', req.session.user)
//   if (req.session.user) res.locals.username = req.session.user.username;
//   next();
// });

passport.use(new LocalStrategy(
  function(username, password, done) {
    knex('users')
    .where('username', username)
    .then(data => {
      let user = data[0];

      //if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password, user.hash, function(err, res) {
        if (err) return done(null, false, { message: 'Incorrect password1.' });
        if (res) {
          console.log('user',user)
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      })

      //return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('user.id', user.Id)
  done(null, user.Id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


function loggedIn(req, res, next){
  console.log('req.user', req.isAuthenticated())
  if (req.user) {
    next();
  } else {
    console.log('Access denied!')
  }
}


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

// Authenticate user & password
// function authenticate(name, pass, fn) {
//   knex('users')
//   .where('username', name)
//   .then(data => {
//     let user = data[0];
//     if (!user) return fn(new Error('cannot find user'));
//     bcrypt.compare(pass, user.hash, function(err, res) {
//       if (err) return fn(err);
//       if (res) {
//         return fn(null, user);
//       } else {
//         fn(new Error('invalid password'));
//       }
//     })
//   })
// }

// Login submit route
app.post('/api/login', passport.authenticate('local'), function(req, res){
  console.log('welcome!', req.user)
  res.send({result: 'OK'});

  // authenticate(req.body.username, req.body.password, function(err, user){
  //   if (user) {
  //     console.log('welcome!')
  //     req.session.regenerate(function(){
  //       req.session.user = user;
  //       console.log('2 req.session.user: ', req.session.user);
  //       res.send({result: 'OK'});
  //     });
  //   } else {
  //     res.send('error')
  //     console.log('wrong username and/or password!')
  //   }
  // });
});

// Enter restricted Admin area route
// app.all('/api/admin/*', function(req, res, next){
//   console.log(req.user)
//   console.log('Accessing admin area...');
//   console.log('3 req.session.user: ', req.session.user);
//   if (req.session.user) {
//     next();
//   } else {
//     req.session.error = 'Access denied!';
//     console.log('Access denied!')
//   }
// });

// Logout route
app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.send('OK')
    console.log('Bye bye!')
  });
});

// ------------------------------------------------------- ADMIN

// Get categories to admin route
app.get('/api/admin/categories', loggedIn, function(req, res){
  var result = {}
  knex('categories')
  .orderBy('id')
  .then(categories => {
    result.categories = categories
    res.send(result)
  });
});

// Get images to admin route
app.get('/api/admin/images/:categoryId', loggedIn, function(req, res){
  var result = {}
  knex('images')
  .where('categoryId', req.params.categoryId)
  .then(images => {
    result.images = images
    res.send(result)
  });
});

// Get about to admin route
app.get('/api/admin/about', loggedIn, function(req, res){
  var result = {}
  knex('about').where('id', 1).first('text')
  .then(about => {
    result.about = about
    res.send(result)
  });
});

// Add new category route
app.post('/api/admin/categories', loggedIn, function(req, res){
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
