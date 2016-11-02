$(document).ready(function (){

    /*
     *** Seasons Functionality ***
     */

    //Retrieving season information from local xml file using an XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "databases/Seasons.xml", false)//synchronous get request.
    xhr.send();
    seasons = xhr.responseXML.getElementsByTagName('Season');//returning all season nodes from the seasons.xml file.

    //Populating the seasons container using the xml content.
    for (var i = 0; i < seasons.length - 1; i++) {
        //Getting the current season number and puting it into the id and header of the season-container.
        var seasonNo = seasons[i].getElementsByTagName("Season_Number")[0].innerHTML;
        var htmlString = "<div class=\"season-container\" id=\"season-container" + seasonNo +"\"><h2>Season " + seasonNo
            + "</h2><div class=\"episodes-container\">";
        //Getting episodes of the current season and and iterating through them to add there content into the HTML.
        var episodes = seasons[i].getElementsByTagName("Episode");
        for (var j = 0; j < episodes.length; j++) {
            var k = episodes.length -1 - j;// reversing the episodes order.
            //Retrieving the episodes description or alternative message if there is none.
            var description = episodes[k].getElementsByTagName("Description")[0].innerHTML;
            if (description === ""){
                description = "No content description available... I'm Sorry";
            }
            //Adding a new episode-container containing the episode information of this current iteration.
            htmlString += "<div class=\"episode-container\"><h3>Episode " + (j + 1) +
                "</h3><div class=\"episode-contents-container\">" +
                "<h4>" + episodes[k].getElementsByTagName("Title")[0].innerHTML + "</h4>" +
                "<img class=\"episode-img\" src=\"" + episodes[k].getElementsByTagName("Image_Source")[0].innerHTML  + "\"/>" +
                "<div class=\"description-container\"><p>" + description  + "</p></div></div></div>";
        }
        //Closing HTML amendment string and inserting it into the seasons-container.
        htmlString += "</div></div>";
        $('#seasons-container').prepend(htmlString);
    }

    //Sliding up list of episodes and episode contents.
    $('.episode-contents-container').slideUp();
    $('.episodes-container').slideUp();

    //Adding episode list slide toggle click event onto the parent season container.
    $('.season-container').click(function(){
        $(this).find('.episodes-container').slideToggle()

    });

    //Stoping the slide being toggled from within the episode list container.
    $('.episodes-container').click(function(e){
        e.stopPropagation()
    });

    //Adding episode content slide toggle click event onto the parent episode container.
    $('.episode-container').click(function(e){
        e.stopPropagation()
        $(this).find('.episode-contents-container').toggle("slide")
    });
});
