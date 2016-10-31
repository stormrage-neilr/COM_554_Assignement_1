$(document).ready(function (){

    // *** Title Image ***

    //Adding a tooltip to display assignment details when the mouse hovers over the title image.
    $("#title_image").hover(function(e){
        ("")
    });

    // *** Navigation bar section Functionality ***

    //Hide all sections and then select home.
    $("section").hide();
    $("#home-button").addClass("selected");
    $("#home-content").show();

    //Navigation button events - hide and show content.
    $("#home-button").click(function () {
        //Highlighting correct navigation bar button on click
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        //Hide all sections and show the corresponding section
        $("section").hide();
        $("#home-content").show();
        //Adding css to the section
        $("#home-content").addClass('content');
    });
    $("#seasons-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").hide();
        $("#seasons-content").show();
        $("#seasons-content").addClass('content');
        //Demonstrating fade capabilities below
        $(".season-container").hide().fadeIn('slow');
    });
    $("#game-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").hide();
        $("#game-content").show();
        $("#game-content").addClass('content');
    });
    $("#members-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").hide();
        $("#members-content").show();
        $("#members-content").addClass('content');
    });
    $("#register-button").click(function () {
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        $("section").hide();
        $("#register-content").show();
    });

    //Toggling the seasons dropdown menu
    $("#seasons-button").hover(function(){
        $("#dropdown-menu").slideDown();
    }, function() {
        $("#dropdown-menu").slideUp();
    });
    $("#dropdown-menu").hover(function(e){
        e.stopPropagation()
    }, function(e) {
    });
    $("#dropdown-menu").find('li').click(function(e){
        e.stopPropagation();
        var seasonNumber = $(this)[0].innerText.substring(7, 8);
        $("section").hide();
        $("#seasons-content").show();
        $("#season-container" + seasonNumber).find('.episodes-container').slideDown();
        $("#dropdown-menu").slideUp();
        $('html, body').animate({
            scrollTop: ($('#season-container' + seasonNumber).offset().top)
        },'fast');
    });

    // *** Home Page Functionality ***

    //Adding tab functionality to trailer buttons to switch between videos
    $('#trailer2').hide();
    $('#trailer3').hide();
    $('#trailer-button1').click(function(){
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

    // *** Seasons Functionality ***

    //Retrieving season information from local xml file
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "res/Seasons.xml", false)//synchronous local get request.
    xhr.send();
    seasons = xhr.responseXML.getElementsByTagName('Season');//returning xhr request as an xml document.

    //Populating the seasons content
    for (var i = 0; i < seasons.length - 1; i++) {
        var seasonNo = seasons[i].getElementsByTagName("Season_Number")[0].innerHTML;
        var htmlString = "<div class=\"season-container\" id=\"season-container" + seasonNo +"\"><h2>Season " + seasonNo + "</h2><div class=\"episodes-container\">";
        var episodes = seasons[i].getElementsByTagName("Episode");
        for (var j = 0; j < episodes.length; j++) {
            var k = episodes.length -1 - j;
            var description = episodes[k].getElementsByTagName("Description")[0].innerHTML;
            if (description === ""){
                description = "No content description available... I'm Sorry";
            }
            htmlString += "<div class=\"episode-container\"><h3>Episode " + (j + 1) + "</h3><div class=\"episode-contents-container\">" +
            "<h4>" + episodes[k].getElementsByTagName("Title")[0].innerHTML + "</h4>" +
            "<img class=\"episode-img\" src=\"" + episodes[k].getElementsByTagName("Image_Source")[0].innerHTML  + "\"/>" +
            "<div class=\"description-container\"><p>" + description  + "</p></div></div></div>";
        }
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
        $(this).find('.episode-contents-container').slideToggle()
    });





    /* *** Members Table Functionality ***

    An initial list of members is being loaded from an xml file in the project.
    However, if the registration form is submitted by the user an updated version of
    this xml file will be stored in a cookie. The xml file itself should be update in
    a future release.*/

    //Retrieving an xml document from the users cookie or the xml file.
    function setMembersXMLDoc() {
        if (document.cookie == "") {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "res/members.xml", false)//synchronous local get request.
            xhr.send();
            membersXMLDoc = xhr.responseXML;//returning xhr request as an xml document.
        }else{
            membersXMLDoc = $.parseXML(document.cookie);//returning document cookie string parsed into xml.
        }
    }

    //This method returns an age given a date.
    function getAge(dob){
        var today = new Date().getDate();
        var thisMonth = new Date().getMonth() + 1;// +1 because months start at 0
        var thisYear = new Date().getFullYear();

        var birthDay = dob.substring(8, 10);
        var birthMonth = dob.substring(5, 7);
        var birthYear = dob.substring(0, 4);

        var age = thisYear - birthYear;
        if ((birthMonth > thisMonth) || (birthMonth == thisMonth && birthDay > today)) {
            age -= 1;
        }
        return age;
    }

    //Populating the members table.
    setMembersXMLDoc();
    var members = membersXMLDoc.getElementsByTagName("Member");//Retrieving xml document.
    for(var i = 0; i< members.length; i++){
        //Selecting the needed information from each member instance.
        var firstname = members[i].getElementsByTagName("Firstname")[0].childNodes[0].nodeValue;
        var surname = members[i].getElementsByTagName("Surname")[0].childNodes[0].nodeValue;
        var dob = members[i].getElementsByTagName("DOB")[0].childNodes[0].nodeValue;
        var email = members[i].getElementsByTagName("Email_Address")[0].childNodes[0].nodeValue;
        var isSub = members[i].getElementsByTagName("Subscriber")[0].childNodes[0].nodeValue;

        var name = firstname + " " + surname;
        var age = getAge(dob);//Calculating members age.
        var subText;
        if(isSub === "true"){
            subText = "Yes";
        }else{
            subText = "No";
        }

        //Inserting table row element directly into the dom with current information.
        $("#member-table-header-row").after(
            "<tr><td>" + name + "</td>" +
            "<td>" + age + "</td>" +
            "<td>" + email + "</td>" +
            "<td>" + subText + "</td></tr>");
    }

    // *** Registration section Functionality ***

    //Setting the latest date of birth in the registration form to today.
    $("#dob-input").attr("max", function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        if(dd < 10){//prefixing days less than 10 with 0.
            dd = '0' + dd
        }
        if(mm < 10){//prefixing months less than 10 with 0.
            mm = '0' + mm
        }
        return today.getFullYear()+'-'+mm+'-'+dd;
    });

    //Storing an updated version of the xml as a string in a cookie.
    $("#registration-form").submit(function() {
        //Creating xml elements needed to construct an instance of a member.
        var member = membersXMLDoc.createElement("Member");
        var name = membersXMLDoc.createElement("Name");
        var firstname = membersXMLDoc.createElement("Firstname");
        var surname = membersXMLDoc.createElement("Surname");
        var dob = membersXMLDoc.createElement("DOB");
        var email = membersXMLDoc.createElement("Email_Address");
        var subscriber = membersXMLDoc.createElement("Subscriber");

        //Adding values from the registration form into the xml elements.
        firstname.append($('#firstname').val());
        surname.append($('#surname').val());
        dob.append($('#dob-input').val());
        email.append($('#email').val());
        subscriber.append($('#subscribe-checkbox').is(':checked'));

        //adding elements into the correct parent elements.
        name.appendChild(firstname);
        name.appendChild(surname);
        member.appendChild(name);
        member.appendChild(dob);
        member.appendChild(email);
        member.appendChild(subscriber);

        //Retrieving current xml document and updating it with the new member.
        membersXMLDoc.getElementsByTagName("Members")[0].appendChild(member);

        /*
        Saving xml document as a string into a cookie. New lines and returns were removed
        using a regular expression as only the first line of the document was being saved.
        Note: In a future release this should be saving to the server side.
         */
        document.cookie = new XMLSerializer().serializeToString(membersXMLDoc).replace(/[\r\n]/g, '');
    });
});