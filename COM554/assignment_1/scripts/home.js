$(document).ready(function (){

    /*
     *** Home Page Functionality ***
     */

    //Hiding two tabs initially.
    $('#trailer2').hide();
    $('#trailer3').hide();

    //Adding functionality to trailer buttons to switch between video tabs.
    $('#trailer-button1').click(function(){
        //If this is not the active trailer toggle it.
        if (!$('#trailer1').hasClass("active")) {
            $('.trailer.active').toggle("slow", function(){
                $(this).removeClass("active");
                $('#trailer1').addClass("active");
                $('#trailer1').toggle("slow");
            });
        }
    });

    $('#trailer-button2').click(function(){
        if (!$('#trailer2').hasClass("active")) {
            $('.trailer.active').toggle('slow', function(){
                $(this).removeClass("active");
                $('#trailer2').addClass("active");
                $('#trailer2').toggle('slow');
            });
        }
    });

    $('#trailer-button3').click(function(){
        if (!$('#trailer3').hasClass("active")) {
            $('.trailer.active').toggle('slow', function(){
                $(this).removeClass("active");
                $('#trailer3').addClass("active");
                $('#trailer3').toggle('slow');
            });
        }
    });
});