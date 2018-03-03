// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var bodyParser = require("body-parser");

// Initialize app
var app = express();

// PORT is either environmental (Heroku via process.env.PORT) or 3000 if run locally in CLI
var PORT = process.env.PORT || 3000;

// Setup "middleware"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/app/public'));

// Import routes
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Start listening on port
app.listen(PORT, '0.0.0.0');
