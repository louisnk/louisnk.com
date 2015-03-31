
/**
 * Module dependencies.
 */

config = require("./config.json");

global.constants = require("./node_app/constants");
global.fs = require("fs");
global.path = require("path");
global.Promise = require("promise");
global._ = require("lodash");
var EE = require("events").EventEmitter;
global.events = new EE();

var Log = require("log");
log = new Log("debug", fs.createWriteStream(config.LOG_PATH));

var express = require("express");
var routes = require("./routes");
var http = require("http");
var dataService = require(path.join(__dirname, "node_app", "services", "DataService"));
var handleRequest = dataService.handleRequest.bind(dataService);
var handlePost = dataService.handlePost.bind(dataService);

var app = express();

// all environments
app.set("port", process.env.PORT || config.PORT);
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
app.use(express.static(path.join(__dirname, "build")));

// development only
if ("development" == app.get("env")) {
  app.use(express.errorHandler());
}

app.get("/", routes.index);
app.get("/models/*", handleRequest);
app.post("/users*", handlePost);

http.createServer(app).listen(app.get("port"), function(){
  console.log("Ready to roll on port " + app.get("port"));
});
