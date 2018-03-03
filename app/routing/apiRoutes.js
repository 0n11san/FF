// Import friend data
var friendData = require('../data/friends.js');

module.exports = function(app) {

    // GET route for /api/friends returns friendData
    app.get('/api/friends', function(req, res) {
        res.json(friendData);
    });

    // POST route for /api/friends takes in the new data and responds with the most compatible match
    app.post('/api/friends', function(req, res) {
        // this user refers to data sent in the request
        var thisUser = req.body;
        var differences = [];

        // If >1 friend to compare to...
        if (friendData.length > 1) {
            // Iterate thru potential friends
            friendData.forEach(function(user) {
                var totalDifference = 0;

                // For each answer, compare and add the absolute difference to total difference
                for (var i = 0; i < thisUser.answers.length; i++) {
                    var otherAnswer = user.answers[i];
                    var thisAnswer = thisUser.answers[i];
                    var difference = +otherAnswer - +thisAnswer;
                    totalDifference += Math.abs(difference);
                }

                differences.push(totalDifference);
            });

            // Find minimum difference score
            var minimumDifference = Math.min.apply(null, differences);

            // Since there may be more than one potential friend with that score, create an array
            var bestMatches = [];

            // For each item in differences, if equal to minimum difference, add corresponding friendData to bestMatches array
            for (var i = 0; i < differences.length; i++) {
                if (differences[i] === minimumDifference) {
                    bestMatches.push(friendData[i]);
                }
            }

            // Then send bestMatches to client/user
            res.json(bestMatches);
        // If there is only one friend to compare, send back that friend as default
        } else {
            res.json(friendData);
        }

        // Once done comparing, add new user to potential friends data
        friendData.push(thisUser);

    });
};
