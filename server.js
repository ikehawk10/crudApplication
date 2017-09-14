const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

//get all the articles from the database and render to the page
app.get('/view-articles', (req, res) => {
	Article.find({}, (err, articles) => {
		res.render('view-articles', {articles});
	});
});

app.post('/articles/:id', (req, res) => {
	const { id } = req.params
	const { title, author, body } = req.body

	Article.findOneAndUpdate({_id: id}, { 
		title, 
		author, 
		body
	}, (err, result) => {
		res.redirect('/view-articles');
	});
})

app.post('/articles', (req, res) => {
	//add user input into the mongodb collection
	const { title, author, body } = req.body
	const data = { 
		title, 
		author, 
		body
	}

	Article.create(data, (err, result) => {
		if (err) return console.log(err);
		//redirect back to articles page
		res.redirect('/view-articles');
	})
})

app.get('/articles/:id', (req, res) => {
	const { id } = req.params
	
	Article.findById(id, (err, article) => {
		res.render('edit-article', {article});
	});
});

app.get('/articles/:id/delete', (req, res) => {
	const { id } = req.params;

	Article.remove({_id: id}, (err, result) => {
		res.redirect('/view-articles');
	});
});

app.listen(3000)








