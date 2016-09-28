'use strict'
var express     = require('express');
var mysql       = require('mysql');
var bodyParser  = require('body-parser');
var multer      = require('multer');
var bcrypt      = require('bcrypt');
var moment      = require('moment')
var jwt         = require('jwt-simple');

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
    callback(null, __dirname + '/public/img/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage });


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('jwtTokenSecret', 'mysecretkey');


var jwtauth = function(req, res, next){

    var token = req.headers["x-access-token"];

    if (token) {
        try {
            var decoded = jwt.decode(token, app.get('jwtTokenSecret'))

            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400)
            }

            knex('users')
                .where('Id', decoded.iss)
                .then(data => {
                    let user = data[0];

                    if (!user) {
                        return next()
                    } else {
                        req.user = user
                        return next()
                    }
                });

        } catch (err) {
            return next()
        }

    } else {
        next()
    }
}

var requireAuth = function(req, res, next) {
    if (!req.user) {
        res.end('Not authorized', 401)
    }	else {
        next()
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
    res.send(data);
  })
});

// ------------------------------------------------------- LOGIN

// app.use('/api/admin', function (req, res, next) {
//     passport.authenticate('jwt', {session: false}, function (err, user, info) {
//         if (err) {
//             res.status(403).json({message: "Token could not be authenticated1", fullError: err})
//         }
//         console.log('user',user)
//         if (user) {
//             return next();
//         }
//         return res.status(403).json({message: "Token could not be authenticated2", fullError: info});
//     })(req, res, next);
// });


app.post('/api/login', function(req, res){

    knex('users')
        .where('username', req.body.username)
        .then(data => {
            let user = data[0];

            if (!user) {
                res.send({success: false, msg: 'Authentication failed. User not found.'});
            }

            bcrypt.compare(req.body.password, user.hash, function(err, result) {
                if (err) {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
                if (result) {

                    var expires = moment().add(7, 'days').valueOf()
                    var token = jwt.encode(
                        {
                            iss: user.Id,
                            exp: expires
                        },
                        app.get('jwtTokenSecret')
                    );
                    res.send({success: true, token: token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            })
        });
});


// app.get('/logout', jwtauth, requireAuth, function(req, res){
// });

// ------------------------------------------------------- ADMIN

// Get categories to admin route
app.get('/api/admin/categories', jwtauth, requireAuth, function(req, res){
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
app.get('/api/admin/about', jwtauth, requireAuth, function(req, res){
  var result = {}
  knex('about').where('id', 1).first('text')
  .then(about => {
    result.about = about
    res.send(result)
  });
});

// Add new category route
app.post('/api/admin/categories', jwtauth, requireAuth, function(req, res){
  knex('categories')
  .insert({name: req.body.name})
  .then((ids) => {
    let cat = {id:ids[0], name:req.body.name}
    res.send(JSON.stringify(cat))
  });
});

// Rename category route
app.put('/api/admin/categories', jwtauth, requireAuth, function(req, res){
  let cat = req.body
  knex('categories')
  .where('id', req.body.id)
  .update({name: req.body.name})
  .then(
    res.send(JSON.stringify(cat))
  );
});

// Delete category route
app.get('/api/admin/categories/delete/:id', jwtauth, requireAuth, function(req, res){
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
// app.post('/api/admin/images/new', upload.single('image'), function(req, res){
//   knex('images')
//   .insert({
//     title: req.file.filename,
//     imagePath: '/static/projects/'+req.file.filename,
//     categoryId: id
//   })
//   .then(
//     res.send(JSON.stringify('ok'))
//   );
// });

// Update 'About' text route
app.put('/api/admin/about', jwtauth, requireAuth, function(req, res){
  knex('about')
  .where('id', 1)
  .update({text: req.body.about})
  .then(
    res.send(JSON.stringify('ok'))
  );
});


app.post('/api/admin/images/upload', jwtauth, requireAuth, upload.array('files', 5), function(req, res) {

    req.files.forEach(file => {

        knex('images')
        .insert({
            title: file.filename,
            imagePath: 'img/'+file.filename,
            thumbPath: 'img/'+file.filename,
            categoryId: req.body.categoryId
        })
        .then(
        );

    })

});
