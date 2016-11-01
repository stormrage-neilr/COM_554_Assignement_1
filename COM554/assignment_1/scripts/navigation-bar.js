$(document).ready(function (){

    /*
     *** Navigation bar section Functionality ***
     */

    //Hide all sections and then select home screen as it is the default screen.
    $("section").hide();
    $("#home-button").addClass("selected");
    $("#home-content").show();

    //Navigation button events - These buttons hide and show the main content on the page.

    //Home button
    $("#home-button").click(function () {
        //Highlighting correct navigation bar button on click.
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        //Hide all sections and show the corresponding section.
        $("section").hide();
        $("#home-content").show();
        //Adding css to the section
        $("#home-content").addClass('content');
    });

    //Seasons button
    $("#seasons-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        if(!$('#seasons-content').is(":visible")) {
            $("section").hide();
            $("#seasons-content").show();
            $("#seasons-content").addClass('content');
            //Demonstrating fade capabilities below
            $(".season-container").hide().fadeIn('slow');
        }
    });

    //Game button
    $("#game-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").hide();
        $("#game-content").show();
        $("#game-content").addClass('content');
    });

    //Members button
    $("#members-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").hide();
        $("#members-content").show();
        $("#members-content").addClass('content');
        // Dynamically removing, creating then populating a select, table and list element.
        setMembersXMLDoc();// Retrieving data to populate elements with.
        setUpContents();
    });

    //Register button
    $("#register-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").hide();
        $("#register-content").show();
    });

    //Seasons DropDown Functionality

    //Toggling the sub menu to slide down when the mouse hovers over the parent season button.
    $("#seasons-button").hover(function(){
        $("#dropdown-menu").slideDown();
    }, function() {
        $("#dropdown-menu").slideUp();
    });

    //Toggling the sub menu to slide up when the mouse hovers away from the parent season button.
    $("#dropdown-menu").hover(function(e){
        e.stopPropagation()
    }, function(e) {
    });

    //Adding a click event to the dropdown item to carry out several sequential animations.
    $("#dropdown-menu").find('li').click(function(e){
        e.stopPropagation();// Preventing parent Seasons button functionality.
        var seasonNumber = $(this)[0].innerText.substring(7, 8);// Getting the seasons number from the dropdown item.
        //First animation: Sliding the dropdown menu up.
        $("#dropdown-menu").slideUp(function(){
            //This if statement handles the transition to the Seasons content it it is not already selected
            if(!$('#seasons-content').is(":visible")) {
                $("section").hide();
                $("#seasons-content").show();
                $("#seasons-content").addClass('content');
                //Second animation: Fading in the season containers is triggered after the dropdown menu slides up.
                $(".season-container").hide().fadeIn('slow', function () {
                    //Third animation: sliding down the episodes container after the season containers fade in.
                    $("#season-container" + seasonNumber).find('.episodes-container').slideDown(function () {
                        //Fourth animation: sliding the users view to the selected season after the episodes are showing
                        $("#dropdown-menu").slideUp(function () {
                            $('html, body').animate({
                                scrollTop: ($('#season-container' + seasonNumber).offset().top)
                            }, 'fast');
                        });
                    });
                });
            }else{// This is if the user is already on the seasons page.
                $("#season-container" + seasonNumber).find('.episodes-container').slideDown(function () {
                    $("#dropdown-menu").slideUp(function () {
                        $('html, body').animate({
                            scrollTop: ($('#season-container' + seasonNumber).offset().top)
                        }, 'fast');
                    });
                });
            }
        });
    });
});