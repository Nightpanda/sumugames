var mongoose = require('mongoose');

var CommentsGeneral = new mongoose.Schema({
	//text title author upvotes
	//title: String,
	text: String,
	author: {type: String, default: "Anonymous"},
	upvotes: {type: Number, default: 0},
	//blogPost: {type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost'}
});

mongoose.model('Comments', CommentsGeneral);
