// $(window).on("load", function () {

// })

$(document).ready(function () {
    $(".modal-outer").fadeIn(1000);
    $(".modalBtn").click(function (event) {

        event.preventDefault();

        $(".modal-outer").hide(750);
        $(".panel").show(750);

        var name = $("#modalName").val();
        var loc = $("#modalLoc").val();
        var currentDate = moment().format("MMMM DD, YYYY");
        var currentTime = moment().format("hh:mm a");

        $(".headerName").text("Welcome, " + name);
        $(".headerLocation").text(loc);
        $(".date").text(currentDate);
        $(".time").text(currentTime);
    })
});