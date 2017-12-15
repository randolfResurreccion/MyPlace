// Get the user input , do required validations and save user data to firebase
// Allows new users to register
// Makes calls to functions in other js files to display weather, news and local events data to user
// Initialize firebase
// Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCSI6pmvP1pjIdXadFW_b1RBIZCFrmTDI8",
//     authDomain: "project-1-8deb1.firebaseapp.com",
//     databaseURL: "https://project-1-8deb1.firebaseio.com",
//     projectId: "project-1-8deb1",
//     storageBucket: "",
//     messagingSenderId: "880463477699"
//   };
//   firebase.initializeApp(config);

//test with shama firebase
// Initialize Firebase

var config = {
    apiKey: "AIzaSyCSI6pmvP1pjIdXadFW_b1RBIZCFrmTDI8",
    authDomain: "project-1-8deb1.firebaseapp.com",
    databaseURL: "https://project-1-8deb1.firebaseio.com",
    projectId: "project-1-8deb1",
    storageBucket: "project-1-8deb1.appspot.com",
    messagingSenderId: "880463477699"
};
firebase.initializeApp(config);
var cleanUnEmail = "";
// Create a variable to reference the database
var database = firebase.database();

$(document).ready(function () {
    $(".modal-outer-username").fadeIn(750);

    $(".usernameNeed").click(function (event) {
        // Prevent the page from refreshing
        event.preventDefault();
        // animation on user input forms
        $(".modal-outer-username").hide();
        $(".modal-inner-username").hide();
        $(".modal-outer").slideToggle(750);
        $(".modal-inner").slideToggle(750);

    });
    // on click of submit button
    $(".usernameSubmit").click(function (event) {
        // Prevent the page from refreshing
        event.preventDefault();

        // get user input from form and store it in local variable
        var unEmail = $("#usernameEmail").val().trim();
        cleanUnEmail = unEmail.replace(".", ",");
        // user input email validation
        if (unEmail === "") {
            $("#unDiv").addClass("has-error");
            $("#labelError").append("<span class='label label-danger'>Must fill out field</span>");
            $("#labelError").attr("style", "color:rgb(156, 59, 59)");
        }
        else {
            $(".modal-outer-username").fadeOut(1000);
            $(".panel").show(750);
            // $("#map").attr("style", "visibility:visibile");

            // retrieve data from firebase and display to user after login
            database.ref().child(cleanUnEmail).on("value", function (snapshot) {
                if (snapshot.val()) {

                    var userName = snapshot.val().name;
                    var userLoc = snapshot.val().loc;
                    var currentDate = moment().format("MMMM DD, YYYY");
                    var currentTime = moment().format("hh:mm a");

                    // call weather, news and events to get data using API calls
                    weather.call(userLoc);
                    events(userLoc);
                    getNews();
                    $(".headerName").text("Welcome, " + userName);
                    $(".date").text(currentDate);
                    $(".time").text(currentTime);
                }
                else {
                    alert("invalid email ID. Please register if you are a new user");
                }

            });
        }
    });

    // new user data is updated in firebase after registration
    $(".modalBtn").click(function (event) {
        // Prevent the page from refreshing
        event.preventDefault();

        // get user input from form and store in local variables
        var name = $("#modalName").val();
        var loc = $("#modalLoc").val();
        var email = $("#modalEmail").val();
        var cleanEmail = email.replace(".", ",");
        var currentDate = moment().format("MMMM DD, YYYY");
        var currentTime = moment().format("hh:mm a");
        $(".form-group").attr("class", "form-group");
        $("span").text("");
        $("label").attr("style", "");

        if (email === "") {
            $("#newEmailDiv").addClass("has-error");
            $("#newEmailLabel").append("<span class='label label-danger'>Must fill out field</span>");
            $("#newEmailLabel").attr("style", "color:rgb(156, 59, 59)");
        }
        if (name === "") {
            $("#newNameDiv").addClass("has-error");
            $("#newNameLabel").append("<span class='label label-danger'>Must fill out field</span>");
            $("#newNameLabel").attr("style", "color:rgb(156, 59, 59)");
        }
        if (loc === "") {
            $("#newLocDiv").addClass("has-error");
            $("#newLocLabel").append("<span class='label label-danger'>Must fill out field</span>");
            $("#newLocLabel").attr("style", "color:rgb(156, 59, 59)");
        }
        if (email && name && loc) {

            $(".modal-outer").fadeIn(1000);
            $(".modal-outer").hide(750);
            $(".panel").show(750);
            $("#map").show(750);

            $(".headerName").text("Welcome, " + name);
            $(".date").text(currentDate);
            $(".time").text(currentTime);

            // call weather, news and events to get data using API calls
            weather.call(loc);
            events(loc);
            getNews();
            var user = {
                name: name,
                loc: loc,
                email: cleanEmail
            }

            // set user data into firebase
            var userRef = database.ref().child(user.email);
            userRef.set({
                name: name,
                loc: loc
            });
        }
    });

    // saving bookmarks from articles and events in firebase
    $(document).on("click", ".bookmark", function (event) {
                // Prevent the page from refreshing
                event.preventDefault();
        var dataUrl = $(this).attr("data-url");
        var itemBookmarked = dataUrl.split(",");
        if (itemBookmarked) {
            // if (itemBookmarked[0] === "article") {
                console.log("article");
                // database.ref().child(cleanUnEmail).on("value", function (snapshot)  {

                // set user data into firebase
                var userRef = database.ref().child(cleanUnEmail).child("bookmarks");
                userRef.push({
                    articles: itemBookmarked[1]
                });

                // });
            // }
            // else if (itemBookmarked[0] === "event") {


            //     // set user data into firebase
            //     var userRef = database.ref().child(cleanUnEmail).child("bookmarks");
            //     userRef.push({
            //         events: itemBookmarked[1]
            //     });


            // }
        }
    });
});