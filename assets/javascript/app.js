

// })

var config = {
    apiKey: "AIzaSyBAuahuC1FGJlDnYbTh_W4SNbyXxI4lDPs",
    authDomain: "homepage-project-64ca7.firebaseapp.com",
    databaseURL: "https://homepage-project-64ca7.firebaseio.com",
    projectId: "homepage-project-64ca7",
    storageBucket: "homepage-project-64ca7.appspot.com",
    messagingSenderId: "438523083006"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {
    $(".modal-outer-username").fadeIn(750);

    $(".usernameNeed").click(function (event) {

        event.preventDefault();

        $(".modal-outer-username").hide();
        $(".modal-inner-username").hide();
        $(".modal-outer").slideToggle(750);
        $(".modal-inner").slideToggle(750);

    });

    $(".usernameSubmit").click(function (event) {

        event.preventDefault();

        $(".modal-outer-username").fadeOut(1000);
        $(".panel").show(750);

        var unEmail = $("#usernameEmail").val().trim();
        var cleanUnEmail = unEmail.replace(".", ",");



        database.ref().child(cleanUnEmail).on("value", function (snapshot) {
            console.log(snapshot.val());
            var userName = snapshot.val().name;
            console.log(userName);
            var userLoc = snapshot.val().loc;
            console.log(userLoc);
            var currentDate = moment().format("MMMM DD, YYYY");
            var currentTime = moment().format("hh:mm a");
            weather.call(userLoc);
            events(userLoc);
            $(".headerName").text("Welcome, " + userName);
            $(".date").text(currentDate);
            $(".time").text(currentTime);

        });
    });

    $(".modalBtn").click(function (event) {

        event.preventDefault();

        $(".modal-outer").fadeIn(1000);
        $(".modal-outer").hide(750);
        $(".panel").show(750);

        var name = $("#modalName").val();
        var loc = $("#modalLoc").val();
        var email = $("#modalEmail").val();
        var cleanEmail = email.replace(".", ",");
        var currentDate = moment().format("MMMM DD, YYYY");
        var currentTime = moment().format("hh:mm a");

        $(".headerName").text("Welcome, " + name);
        $(".date").text(currentDate);
        $(".time").text(currentTime);

        weather.call(loc);

        var user = {
            name: name,
            loc: loc,
            email: cleanEmail
        }

        var userRef = database.ref().child(user.email);
        userRef.set({
            name: name,
            loc: loc
        })
    });
});