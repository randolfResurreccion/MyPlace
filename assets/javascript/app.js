
// at page load
$(document).ready(function () {
   
    // Initialize firebase
    app.initFireBase();

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

        // log the user in
        app.userlogin();
    });

    // new user data is updated in firebase after registration
    $(".modalBtn").click(function (event) {

        // Prevent the page from refreshing
        event.preventDefault();

        // add the user to the database
        app.newUser();
    });

    // when the map panel header is clicked
    $("#map-panel-heading").click(function (event) {

        // expand or collapse the map 
        app.toggleMap();
    });



});

// core logic 

// app object, contains methods for logging in, creating users, firebase, and map toggle
var app = {

    // when user logs in
    userlogin: function () {

        // get user input from form and store it in local variable
        var unEmail = $("#usernameEmail").val().trim();
        var cleanUnEmail = unEmail.replace(".", ",");

        // user input email validation
        if (unEmail === "") {

            $("#unDiv").addClass("has-error");
            $("#labelError").append("<span class='label label-danger'>Must fill out field</span>");
            $("#labelError").attr("style", "color:rgb(156, 59, 59)");
        } else {


            // retrieve data from firebase and display to user after login
            app.database.ref().child(cleanUnEmail).on("value", function (snapshot) {
                
                var userName = snapshot.val().name;
                var userLoc = snapshot.val().loc;
                var currentDate = moment().format("MMMM DD, YYYY");

                // call weather, news and events to get data using API calls
                weather.call(userLoc);
                events(userLoc);
                getNews();
                app.updateTime();
                setInterval(app.updateTime, 1000);
                $(".headerName").text("Welcome, " + userName);
                $(".date").text(currentDate);

                $(".modal-outer-username").fadeOut(1000);
                $(".panel").show(750);
            });

        }
    },

    // when a new user logs in
    newUser: function () {
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

            $(".headerName").text("Welcome, " + name);
            $(".date").text(currentDate);
            

            // call weather, news and events to get data using API calls
            weather.call(loc);
            events(loc);
            getNews();
            app.updateTime();
            setInterval(app.updateTime, 1000);
            // initMap(loc);
            var user = {
                name: name,
                loc: loc,
                email: cleanEmail
            }

            // set user data into firebase
            var userRef = app.database.ref().child(user.email);
            userRef.set({
                name: name,
                loc: loc
            });


        }
    },

    // hides the map
    toggleMap: function () {

        // if the map div is expanded
        if ($("#map-div").attr("data") == "show") {

            // hide the map div
            $("#map-div").attr('style', "display:none");
            $("#map-div").attr('data', "hide");

            // if the map div is hidden
        } else {

            // show the map div
            $("#map-div").attr('style', "display:show");
            $("#map-div").attr('data', "show");

            // re initialize the map
            app.initMap();
        }
    },

    // initializes the google map JS api
    initMap: function () {

        var uluru = { lat: parseFloat($("#lat-store").val()), lng: parseFloat($("#lon-store").val()) };

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

    },

    // holds the database reference
    database: "",

    // initializes firebase
    initFireBase: function () {
        var config = {
            apiKey: "AIzaSyBAuahuC1FGJlDnYbTh_W4SNbyXxI4lDPs",
            authDomain: "homepage-project-64ca7.firebaseapp.com",
            databaseURL: "https://homepage-project-64ca7.firebaseio.com",
            projectId: "homepage-project-64ca7",
            storageBucket: "homepage-project-64ca7.appspot.com",
            messagingSenderId: "438523083006"
        };

        firebase.initializeApp(config);
        // Create a variable to reference the database
        app.database = firebase.database();
    },

    updateTime: function () {
        var currentTime;
        currentTime = moment().format("hh:mm:ss a");
        $(".time").html("<h4>" + currentTime + "</h4>");
    }

    
}

