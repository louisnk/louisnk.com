
/**
 * Module dependencies.
 */

global.path = require('path');
global.log = console.log;
global.fs = require('fs');
global.constants = require("./node_app/constants");
global.details = {};

var express = require('express');
var routes = require('./routes');
var http = require('http');


var dataService = require('./node_app/services/DataService');

var app = express();

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get("/DataService/*", function(req, res) {
	dataService.handleRequest(req, res);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Ready to roll on port ' + app.get('port'));
});
