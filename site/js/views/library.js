var Backbone = require('Backbone'),
    $ = require('jquery'),
    Book = require('../models/book.js'),
    Library = require('../collections/library.js'),
    BookView = require('./book.js');

var LibraryView = Backbone.View.extend({
  el: '#books',

  events: {
    'click #add': 'addBook'
  },

  initialize: function( initialBooks ) {
    this.collection = new Library( initialBooks );
    this.render();

    this.listenTo(this.collection, 'add', this.renderBook);
  },

  render: function() {
    this.collection.each(this.renderBook, this);
  },

  renderBook: function( bookModel ) {
    var bookView = new BookView({
      model: bookModel
    });

    this.$el.append( bookView.render().el );
  },

  addBook: function( e ) {
    e.preventDefault();

    var formData = {};

    $( '#addBook div').children( 'input').each( function(i, el) {
      if ( $( el).val() !== '') {
        formData[ el.id ] = $( el).val();
      }
    });

    this.collection.add( new Book( formData ) );
  }
});

module.exports = LibraryView;