
/**
 * Module dependencies.
 */

global.constants = require("./node_app/constants");
global.fs = require("fs");
global.path = require("path");
global.Promise = require("promise");
global._ = require("lodash");
var EE = require("events").EventEmitter;
global.events = new EE();

var Log = require("log");
var logFile = path.join(__dirname, "logs", "lnk.log");
log = new Log("debug", fs.createWriteStream(logFile));

var express = require("express");
var routes = require("./routes");
var http = require("http");
var dataService = require(path.join(__dirname, "node_app", "services", "DataService"));

var app = express();

// all environments
app.set("port", process.env.PORT || 1337);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require("less-middleware")(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "public")));

// development only
if ("development" == app.get("env")) {
  app.use(express.errorHandler());
}

app.get("/", routes.index);

app.get("/models/*", function(req, res) {
	dataService.handleRequest(req, res);
});

http.createServer(app).listen(app.get("port"), function(){
  console.log("Ready to roll on port " + app.get("port"));
});
