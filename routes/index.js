var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BlogPost = mongoose.model('BlogPost');
var GameComment = mongoose.model('GameComment');
var GamePost = mongoose.model('GamePost');


var db = mongoose.connection;
//Test connection to mongodb
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("Connection succesful");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get all the BlogPosts
router.get('/blog', function(req, res, next) {
	console.log("Request to fetch all blogposts");

	BlogPost.find({}, function(err, results) { //Fetch everything
		if(err){ return next(err); }
		res.json(results);
	});
});

//Fetch information for a single Blog
router.get('/blog/:_id', function(req, res, next) {
	console.log("request to fetch information for a single blogpost");
	
		
	BlogPost.findById(req.params._id, function(err, results) {
		if(err){return next(err); }
		/*
		req.results.populate('comments', function(err, results) {
		if (err) { return next(err);}

		res.json(results);
	});*/
		res.send(results);
	});
});

//Post a blog post
router.post('/blog', function(req, res, next) {
	console.log("post a single blog post");
	console.log(req);
	var singleBlogPost = new BlogPost(req.body);
	

	singleBlogPost.save(function(err,post){
		if(err){return next(err); }
		//console.log(post);
		res.json(singleBlogPost);

	});
});


//Post a comment about a blog
router.post('/blog/:_id', function(req, res, next) {
	console.log("post a comment about a certain blogpost");
	//console.log("req.body:" + req.body);
	//var newComment = new Comment();
	//newComment.body = req.body.body;
	//newComment.author = req.body.author;
	//var newComment = new Comment(req.body);
	//console.log("New comment sisältää" + "" + newComment);
	//var blogUpdate = req.body;
	//console.log("New Comment:" + "" + newComment);
	//singleComment.blogPost = req.blogPost;
	/*
	BlogPost.save(function(err, newComment){
		if(err){ return next(err); }

		res.json(newComment);
	})
*/
	//console.log("Log id" + "" + req.params._id);
	BlogPost.findById(req.params._id, function(err, foundPost) {
	//BlogPost.findById(req.params._id, function(err, blogUpdate) {
		//console.log(req.params._id);
		/*
		if(err){ return next(err);}
		newComment.save(function(err,post){
			if(err){ return next(err); }
			res.json(newComment);
		});*/
		//foundPost.comments.push(newComment);
		foundPost.comments.push({body: req.body.body, author: req.body.author});
		console.log(foundPost);
		//console.log("results" + blogUpdate);
		foundPost.save(function(err) {
			if (!err) console.log("success!");
		});

	});
	
	
	/*
	BlogPost.save(function(err,comment){
		console.log("Inside the save");
		if(err){return next(err); }
		console.log(newComment);
		res.json(newComment);
		//newComment.save("saved a new comment");
	});*/
	
	/*singleComment.save(function(err,singleComment){
		if(err){return next(err); }

		req.blogPost.comments.push(singleComment);
		req.blogPost.save(function(err,blogPost) {
			if(err){ return next(err); }
			res.json(singleComment);
		});
	});
});


//Update the blog with a comment
router.put('/blog/:_id', function(req, res, next) {
	console.log("update a blogpost with comments");
	console.log(req.body);
	var newComment = new Comment(req.body);
	console.log(req.params._id);
    console.log(newComment);


	BlogPost.findByIdAndUpdate(req.params._id, newComment, function(err, results) {
        if(err){ return next(err); }
        //res.json(results);
        
        results.save('Saved bueno');
    });
	/*
	singleComment.save(function(err,post){
		if(err){return next(err); }
		console.log(singleComment);
		res.json(singleComment);
	
	});
	*/
});


module.exports = router;
