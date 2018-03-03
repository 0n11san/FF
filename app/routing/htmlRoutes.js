// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  //
  // GET route for /survey returns survey.html
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/survey.html'));
    });

    // USE route returns home.html for any undefined GET routes
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });
};
