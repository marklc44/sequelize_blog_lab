var express = require('express'),
		ejs = require('ejs'),
		expressLayouts = require('express-ejs-layouts'),
		bodyParser = require('body-parser')
		db = require('./models/index.js');

var app = express();

app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(expressLayouts);
app.use(bodyParser.urlencoded());

app.get('/', function(req, res) {
	res.send('Hello world!');
});

app.get('/posts', function(req, res) {
	db.post.findAll().success(function(posts) {
		res.render('index', {posts: posts});
	})
});

app.get('/posts/new', function(req, res) {
	// get authors for drop down select
	db.author.findAll().success(function(authors) {
		res.render('new', {authors: authors});
	});
});

app.post('/posts', function(req, res) {
	var newPost = req.body.post;
	console.log("newPost :", newPost)

	db.author.find(newPost.authorId).success(function(author){
    var post = db.post.build({title: newPost.title, content: newPost.content, authorId: author.id})
    author.addPost(post)
      .success(function(author){
        post.save();
       	res.redirect('/posts');
    })
	});
	
})

app.get('/posts/:id', function(req, res) {
	db.post.find(req.params.id).success(function(post) {
		res.render('show', {post: post});
	});
});



// db.author.create({name: 'John Doe'})
// 	.success(function(author) {
// 		console.log("Author: ", author);
// 	});




app.listen(3000, function() {
	console.log("SERVER LISTENING ON PORT 3000");
})