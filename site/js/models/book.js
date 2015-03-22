var Backbone = require('Backbone');

var Book = Backbone.Model.extend({
  defaults: {
    coverImage: 'img/placeholder.jpg',
    title: 'No title',
    author: 'Unknown',
    releaseDate: 'Unknown',
    keywords: 'None'
  }
});

module.exports = Book;