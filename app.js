var express = require('express'),
		ejs = require('ejs'),
		expressLayouts = require('express-ejs-layouts'),
		bodyParser = require('body-parser')
		db = require('./models/index.js');

var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.send('Hello world!');
});

app.get('/posts', function(req, res) {
	db.post.findAll().success(function(posts) {
		res.render('index', {posts: posts});
	})
	
});

app.get('/posts/:id', function(req, res) {
	db.post.find(req.params.id).success(function(post) {
		res.render('show', {post: post});
	});
});

app.

// db.author.create({name: 'John Doe'})
// 	.success(function(author) {
// 		console.log("Author: ", author);
// 	});

// db.author.find(1).success(function(author){
//     var post = db.post.build({title: "First Post", content: "lorem ipsum", authorId: 1})
//     author.setPosts([post])
//       .success(function(author){
//         post.save();
//        console.log("Author: ", author);
//     })
// });


app.listen(3000, function() {
	console.log("SERVER LISTENING ON PORT 3000");
})