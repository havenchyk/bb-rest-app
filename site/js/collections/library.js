var Backbone = require('Backbone'),
	Book = require('../models/book.js');

var Library = Backbone.Collection.extend({
  model: Book
});

module.exports = Library;