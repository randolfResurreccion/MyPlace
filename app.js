

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
    $(".modal-outer").fadeIn(1000);
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
        $(".headerLocation").text(loc);
        $(".date").text(currentDate);
        $(".time").text(currentTime);

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

    // database.ref().on("value", function(snapshot) {
    //     console.log(snapshot.val());

        // $(".headerName").text(snapshot.val(name));
        // $(".headerLocation").text(snapshot.val(loc));

    // })
});