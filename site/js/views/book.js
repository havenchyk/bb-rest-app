var Backbone = require('Backbone'),
    _ = require('underscore'),
    $ = require('jquery');

var BookView = Backbone.View.extend({
  tagName: 'div',
  className: 'bookContainer',
  template: _.template( $('#bookTemplate').html() ),

  events: {
    'click .delete': 'deleteBook'
  },

  //methods
  render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );

    return this;
  },

  deleteBook: function() {
    //destroy model
    this.model.destroy();

    //delete view
    this.remove();
  }
});

module.exports = BookView;