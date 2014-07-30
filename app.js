var express = require('express'),
		ejs = require('ejs'),
		expressLayouts = require('express-ejs-layouts'),
		bodyParser = require('body-parser')
		db = require('./models/index.js')
		methodOverride = require('method-override');

var app = express();

app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(expressLayouts);
app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
	res.send('Hello world!');
});

app.get('/posts', function(req, res) {
	db.post.findAll({order: 'title DESC', include: [db.author]}).success(function(posts) {
		console.log('Get Posts Join: ', posts);
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

	db.author.find(newPost.authorId).success(function(author){
    var post = db.post.build({title: newPost.title, content: newPost.content, authorId: author.id})
    author.addPost(post)
      .success(function(author){
        post.save();
       	res.redirect('/posts');
    })
	});
});

app.get('/posts/:id', function(req, res) {
	var currPost;
	db.post.find(req.params.id).success(function(post) {
		currPost = post;
		db.author.find(post.authorId).success(function(author) {
			res.render('show', {post: currPost, author: author});
		});
			
	});
});

app.get('/authors/:id', function(req, res) {
	var id = req.params.id;

	db.author.find(id).success(function(author) {
		db.post.findAndCountAll({
			where: {authorId: author.dataValues.id}
		})
			.success(function(posts) {
				res.render('authors/show', {
					author: author,
					posts: posts.rows
				});
			});
	});
});

app.get('/posts/:id/edit', function(req, res) {
	var id = req.params.id;
	var authorList;

	db.author.findAll().success(function(authors) {
		authorList = authors;
		db.post.find(id).success(function(post) {
		// do update
			res.render('edit', {post: post, authors: authors });

		});
	});
	
});

app.put('/posts/:id', function(req, res) {
	var id = req.params.id;
	var newPost = req.body;
	db.post.find(id).success(function(post) {
		post.updateAttributes({title: newPost.post.title, content: newPost.post.content, authorId: newPost.post.authorId})
			.success(function(post) {
				res.redirect('/posts/');
			});
	});
	
});

app.delete('/posts/:id', function(req, res) {
	var id = req.params.id;
	var currAuthor;
	db.post.find(id).success(function(post) {
		currAuthor = post.dataValues.authorId;
		post.destroy().success(function() {
			res.redirect('/authors/' + currAuthor);
		});
	});
});






app.listen(3000, function() {
	console.log("SERVER LISTENING ON PORT 3000");
})