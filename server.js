const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const data = { 
		title, 
		author, 
		body
	};
const { id } = req.params;

mongoose.connect('mongodb://ikehawk10:jesus100@ds133814.mlab.com:33814/articles');

//create mongoose model for date entries
const Article = mongoose.model('articles', {
	title: String,
	author: String,
	body: String
});

app.set('view engine', 'ejs');

//extract data from the form inputs
app.use(bodyParser.urlencoded({extended: true}));

//homescreen to render index.html
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

//get ALL the articles from the database and render to the page
app.get('/view-articles', (req, res) => {
	Article.find({}, (err, articles) => {
		if (err) return console.log(err);
		res.render('view-articles', {articles});
	});
});

//render newly updated article
app.post('/articles/:id', (req, res) => {
	Article.findOneAndUpdate({_id: id}, data, (err, result) => {
		if (err) return console.log(err);
		res.redirect('/view-articles');
	})
});

//add article to the mongodb collection
app.post('/articles', (req, res) => {
	Article.create(data, (err, result) => {
		if (err) return console.log(err);
		//redirect back to articles page
		res.redirect('/view-articles');
	})
})

//get specific article by id to edit
app.get('/articles/:id', (req, res) => {	
	Article.findById(id, (err, article) => {
		if (err) return console.log(err);
		res.render('edit-article', {article});
	});
});

//remove selected article from the database
app.get('/articles/:id/delete', (req, res) => {
	Article.remove({_id: id}, (err, result) => {
		if (err) return console.log(err);
		res.redirect('/view-articles');
	});
});

app.listen(3000)








