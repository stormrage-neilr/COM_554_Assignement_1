$(document).ready(function (){

    $(".nav-li").hover(function () {
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });

    $("#register-button").click(function () {
        $("#register-content").removeClass('hidden');
    });
});