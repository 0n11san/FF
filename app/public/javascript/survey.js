//v2: objects working
//v3: fixed jQuery selectors
//v4: changd prompts to modals (looks better)

$(document).ready(function() {
    // survey of things to gauge where users preferences are
    var questions = [
        'Pets',
        'Video Games',
        'Art',
        'Playing Sports',
        'Spicy Foods',
        'Exotic Travel',
        'Sleeping In',
        'Dancing',
        'Yoga',
        'Cooking'
    ];

    // choices
    var choices = [
        '1 (Love)',
        '2 (Like)',
        '3 (Indifferent)',
        '4 (Dislike)',
        '5 (Hate)'
    ];

    // jquery selects div where questions will be inserted on pag; starts counter at 0
    var questionDiv = $('#questions');
    i = 0;

    // For each question, create new div
    questions.forEach(function (question) {
        i++;
        // Fill said div w/ header, question, and dropdown
        var item = $('<div class="question">');
        var headline = $('<h4>').text('Question ' + i);
        var questionText = $('<p>').text(question);
        var dropDown = $('<div class="form-group">');
        var select = $('<select class="form-control selector">');
        // Create an option for each choice.
        choices.forEach(function(choice) {
            var option = $('<option>').text(choice);
            select.append(option);
        });
        select.attr('id', 'select' + i);
        // Add dropdown (adding item to `questions` div)
        dropDown.append(select);
        item.append(headline, questionText, dropDown);
        var br = $('<br>');
        questionDiv.append(item, br);
    });

    // wait for form to be submitted
    $('#submit').on('click', function(event) {

        // important!! (stops form from reloading page before user submits all answers)
        event.preventDefault();

        // Capture username and image link values
        var userName = $('#userName').val();
        var imageLink = $('#imageLink').val();

        // If aforementioned values are filled out, gather all answers and submit
        if (userName.length > 0 && imageLink.length >0) {
            var answers = [];

            // Add response for each selector to user's answers array
            Object.keys($('.selector')).forEach(function(key) {
                if (answers.length < questions.length) {
                    // Take only the first character of the answer, which is the number.
                    answers.push($('.selector')[key].value.charAt(0));
                }
            });

            // Put data in form
            var surveyData = {
                name: userName,
                photo: imageLink,
                answers: answers
            };

            // POST data to /api/friends (C in CRUD)
            $.post('/api/friends', surveyData, function(data) {

                // Use data callback to display result.
                if (data) {

                    // Empty out modal and username and link fields.
                    $('#modalContent').empty();
                    $('#userName').val('');
                    $('#imageLink').val('');

                    // results in array form; Grabs name and URL for each object,
                    data.forEach(function(profile) {
                        var profileDiv = $('<div class="profile">');
                        var name = profile.name;
                        var photoURL = profile.photo;
                        // Put the name in a header.
                        var nameHeader = $('<h3>').text(name);
                        // Add photo setting source ('src') to submitted photo URL (should be jpg/png/gif format etc)
                        var photo = $('<img>').attr('src', photoURL);
                        profileDiv.append(nameHeader, photo);

                        // Add items to modal
                        $('#modalContent').append(profileDiv);
                    });

                    // If there's more than is a tie for the best match(es)...
                    if (data.length > 1) {
                        // Makes header plural
                        $('.modal-title').text('Your best matches!');
                    } else {
                        // Makes header singular
                        $('.modal-title').text('Your best match!');
                    }

                    // Display match(es)
                    $('#resultModal').modal();
                }
            });
        // If missing name or picture link, display error...
        } else {
            $('#errorModal').modal();
            // The error modal can be dismissed but it will also disappear after 2 seconds.
            setTimeout(function() {
                $('#errorModal').modal('hide');
            }, 2000);
        }
    });
});
