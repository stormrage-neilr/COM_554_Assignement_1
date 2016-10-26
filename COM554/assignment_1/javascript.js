$(document).ready(function (){

    // *** Navigation bar section Functionality ***

    //Navigation button events - hide and show content.
    $("#home-button").click(function () {
        //Highlighting correct navigation bar button on click
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        //Hide all sections and show the corresponding section section
        $("section").addClass('hidden');
        $("#home-content").removeClass('hidden');
        //Adding css to the section
        $("#home-content").addClass('content');
    });
    $("#seasons-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").addClass('hidden');
        $("#seasons-content").removeClass('hidden');
        $("#seasons-content").addClass('content');
    });
    $("#game-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").addClass('hidden');
        $("#game-content").removeClass('hidden');
        $("#game-content").addClass('content');
    });
    $("#members-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").addClass('hidden');
        $("#members-content").removeClass('hidden');
        $("#members-content").addClass('content');
    });
    $("#register-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").addClass('hidden');
        $("#register-content").removeClass('hidden');
    });

    // *** Registration section Functionality ***

    //Setting the latest date of birth in the registration form to today
    $("#dob-input").attr("max", function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        if(dd < 10){
            dd = '0' + dd
        }
        if(mm < 10){
            mm = '0' + mm
        }
        return today.getFullYear()+'-'+mm+'-'+dd;
    });

    //Adding the new registered member into the members list


});