$(document).ready(function (){

    //Navigation button events - hide and show content.
    $("#home-button").click(function () {
        //Highlighting correct navigation bar button on click
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        //Hide all sections and show the corresponding section section
        $("section").addClass('hidden');
        $("#home-content").removeClass('hidden');
    });
    $("#seasons-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").addClass('hidden');
        $("#seasons-content").removeClass('hidden');
    });
    $("#game-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").addClass('hidden');
        $("#game-content").removeClass('hidden');
    });
    $("#members-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").addClass('hidden');
        $("#members-content").removeClass('hidden');
    });
    $("#register-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").addClass('hidden');
        $("#register-content").removeClass('hidden');
    });

});