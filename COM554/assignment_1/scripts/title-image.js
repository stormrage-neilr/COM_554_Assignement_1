$(document).ready(function (){

    // *** Title Image ***

    //Adding a tooltip to display assignment details when the mouse hovers over the title image.
    $("#title_image").mouseover(function(e){
        // Add dding the element into the body
        $("body").append("<p id='tooltip'>Neil Rafferty (B00451753) - COM554: Assignment 1 (2016)</p>");
        // Change the tooltip x coordinate position depending on what side of the screen the mouse is on.
        var totalWidth = $(this).width();
        if(e.pageX/totalWidth > .5){
            $("#tooltip").css("left", (e.pageX - 370) + "px");
        }else{
            $("#tooltip").css("left", (e.pageX) + "px");
        }
        // Setting the tooltip y coordinate position to be the same as the mouse.
        $("#tooltip").css("top", (e.pageY) + "px");
    });

    //Removing the tooltip when the mouse is no longer over the title image.
    $("#title_image").mouseleave(function(e){
        $("#tooltip").remove();
    });

    //Repositioning the tooltip relative to the mouse when the mouse moves.
    $('body').mousemove(function(e){
        var totalWidth = $(this).width();
        if(e.pageX/totalWidth > .5){
            $("#tooltip").css("left", (e.pageX - 370) + "px");
        }else{
            $("#tooltip").css("left", (e.pageX) + "px");
        }
        $("#tooltip").css("top", (e.pageY) + "px");
    });
});