var mongoose = require('mongoose');

var Comments = new mongoose.Schema({
	//text title author upvotes
	//title: String,
	body: String,
	author: {type: String, default: "Anonymous"},
	upvotes: {type: Number, default: 0},
	//blogPost: {type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost'}
});

var BlogSchema = new mongoose.Schema({
	title: String,
	body: [],
	author: String,
	date: {type: Date, default: Date.now},
	comments: [Comments],
});

mongoose.model('BlogPost', BlogSchema);