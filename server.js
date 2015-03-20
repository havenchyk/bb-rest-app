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

console.log(application_root);
console.log(path.join(application_root, 'site'));
app.use(express.static(path.join(application_root)));

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

var port = 4711;

app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode',
    port, app.settings.env);
});