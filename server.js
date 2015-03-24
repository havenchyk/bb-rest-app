var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    mongoose = require('mongoose');

var app = express();

var env = process.env.NODE_ENV || 'development';

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(application_root, 'site')));

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

app.get('/api', function(req, res){
	res.send('hello world');
});

mongoose.connect('mongodb://localhost/library');

var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date
});

var BookModel = mongoose.model('Book', Book);

app.get('/api/books', function(request, response) {
	return BookModel.find(function(err, books) {
		if (!err) {
			return response.send(books);
		} else {
			return console.log(err);
		}
	});
});

app.post('/api/books', function(request, response) {
	console.log(request.body.title);

	var book = new BookModel({
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate
	});

	book.save(function(err) {
		if (!err) {
			return console.log('created');
		} else {
			return console.log(err);
		}
	});

	return response.send(book);
});

app.get('/api/books/:id', function(request, response) {
	console.log(request.params.id);

	return BookModel.findById(request.params.id, function(err, book) {
		if (!err) {
			return response.send(book);
		} else {
			return console.log(err);
		}
	})
});

app.put('/api/books/:id', function(request, response) {
	console.log('Updating book' + request.body.title);

	return BookModel.findById(request.params.id, function(err, book) {
		book.title = request.body.title;
		book.author = request.body.author;
		book.releaseDate = request.body.releaseDate;

		return book.save(function(err) {
			if (!err) {
				console.log('book updated');
			} else {
				console.log(err);
			}

			return response.send(book);
		})
	});
});

app.delete('/api/books/:id', function(request, response) {
	console.log('Deleting book with id: ' + request.params.id);

	return BookModel.findById(request.params.id, function(err, book) {
		return book.remove(function(err) {
			if (!err) {
				console.log('Book removed');

				return response.send('');
			} else {
				console.log(err);
			}
		});
	});
});


var port = 4711;

app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});