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
            $("#tooltip").css("left", (e.pageX) + "px")
        }
        // Setting the tooltip y coordinate position to be the same as the mouse.
        $("#tooltip").css("top", (e.pageY) + "px")
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
            $("#tooltip").css("left", (e.pageX) + "px")
        }
        $("#tooltip").css("top", (e.pageY) + "px")
    });

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
        removeCurrentContent();
        setMembersXMLDoc();// Retrieving data to populate elements with.
        populateSelectElement();
        populateTable();
        populateList();
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

    /*
        *** Seasons Functionality ***
     */

    //Retrieving season information from local xml file using an XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "res/Seasons.xml", false)//synchronous get request.
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

    // *** Game Functionality ***

    //Defining a character. The player and enemies will both be characters.
    function character(src, x, y, z){
        this.size = 150 / 4;// relative to the canvas size.
        this.x = x;// characters x location.
        this.y = y;// characters y location.
        this.z = z;// characters direction.

        //Creating an image from the provided source.
        this.image = new Image();
        this.image.src = src;

        //The update method adjusts the characters x and y locations depending on its direction.
        this.update = function(){
            switch (this.z){
                case 0: // up
                    if (this.y > 0)this.y-=4;//this prevents the players character leaving the screen.
                    break;
                case 1: // left
                    this.x+=4;
                    break;
                case 2: // down
                    //this prevents the players character leaving the screen.
                    if (this.y < $("#game-screen")[0].height - this.size)this.y+=4;
                    break;
                case 3: // right
                    this.x-=4;
                    break;
                default:
                    break;
            }
        };

        //Basic collision detection
        this.hasCollided = function(character){
            //Checking if image area of characters overlap.
            if (this.x > character.x - this.size && this.x < character.x + character.size &&
                this.y > character.y - this.size && this.y < character.y + character.size){
                return true;
            }
            return false;
        }
    }

    //Creating and running game instance.
    function startGame() {
        $("#game-screen").remove();//Removing current game instance if there is one.
        $("#game-container").append("<canvas id='game-screen'></canvas>");//Creating new Game canvas.
        $("#game-screen").css("height", $("#game-screen").width()*.75 + "px");//Setting canvas height relative to width.
        var context = $("#game-screen")[0].getContext("2d");//Retrieving context to draw onto the canvas.

        //Creating in game variables
        var player = new character("res/dave-character-8bit.png", 0, 150/8*3, 4);
        var enemies = [];
        var enemyCount = 0;
        var enemySpeed = 50;

        //Adding key listener to alter the players direction.
        $(document).keypress(function(e) {
            switch(e.which){
                case 119: // key: w
                    player.z = 0; // up
                    break;
                case 115: // key: s
                    player.z = 2; // down
                    break;
            }
        });

        //Updating the game. triggered every 100 milliseconds. (Game Loop)
        var tick = setInterval(function () {
            if (enemyCount < 1){//Adding enemy when enemy count is 0
                //Generating random height for the enemy.
                var randomHeight = Math.floor(Math.random() * ($('#game-screen')[0].height - player.size));
                //Creating new enemy and adding it to the array.
                enemies.push(new character("res/8_bit_zombie_by_melolzugaming-d50kbqk.png",
                    Math.floor($('#game-screen')[0].width), randomHeight, 3));
                enemyCount = enemySpeed;//resetting count.
                enemySpeed-=2;//reducing next increment.
            }
            enemyCount--;//counting down.

            //Updating character location relative to their directions.
            player.update();
            for (var i = 0; i < enemies.length; i++){
                enemies[i].update();
            }

            //Refreshing the screen to illustrate the new character positions.
            context.clearRect(0, 0, $("#game-screen")[0].width, $("#game-screen")[0].height);// clearing screen
            context.drawImage(player.image, player.x, player.y, player.size, player.size);// drawing player
            for (var i = 0; i < enemies.length; i++){ // drawing enemies
                context.drawImage(enemies[i].image, enemies[i].x, enemies[i].y, enemies[i].size, enemies[i].size);
            }

            //Ending the game if a collision happens.
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].hasCollided(player)){ //If a collision has happened end the game.
                    //displaying game over message.
                    context.fillText("Game Over", $("#game-screen")[0].width / 2.5, $("#game-screen")[0].height / 3);
                    clearInterval(tick); //Exiting the game loop.
                    return true;
                }
            }
        }, 100);
    }

    //Adding functionality to trigger the starting of the game.
    $("#start-game-button").click(function() {
        startGame();
    });

    //Adjusting the Canvas height relative to the width on screen resize.
    $(window).resize(function() {
        $("#game-screen").css("height", $("#game-screen").width()*.75 + "px");
    });

    /* *** Members Functionality ***

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

        //Reducing age by one if the birthday hasn't occurred yet this year.
        if ((birthMonth > thisMonth) || (birthMonth == thisMonth && birthDay > today)) {
            age -= 1;
        }
        return age;
    }

    //This method removes the current list table and select elements so they do not cumulate.
    function removeCurrentContent(){
        $("table").remove();
        $("#delete-button-list").remove();
        $("#select-member").remove()
    }

    //Populating the members table.
    function populateTable() {
        var members = membersXMLDoc.getElementsByTagName("Member");//Retrieving member nodes from the xml document.

        //Creating the table and its headers
        var html = "<table id='table'><tr id=\"member-table-header-row\"><th>Name</th><th>Age</th><th>Email</th>" +
        "<th>On Mailing List</th></tr>";

        //Iterating thought the members and adding each members details into the table as a new row.
        for (var i = 0; i < members.length; i++) {
            //Selecting the needed information from each member instance.
            var firstname = members[i].getElementsByTagName("Firstname")[0].childNodes[0].nodeValue;
            var surname = members[i].getElementsByTagName("Surname")[0].childNodes[0].nodeValue;
            var dob = members[i].getElementsByTagName("DOB")[0].childNodes[0].nodeValue;
            var email = members[i].getElementsByTagName("Email_Address")[0].childNodes[0].nodeValue;
            var isSub = members[i].getElementsByTagName("Subscriber")[0].childNodes[0].nodeValue;

            var name = firstname + " " + surname;//Concatenating full name.
            var age = getAge(dob);//Calculating members age.
            var subText;// getting subscribing status.
            if (isSub === "true") {
                subText = "Yes";
            } else {
                subText = "No";
            }

            //Inserting table row element directly into the dom with current information.
            html +="<tr value=" + i + " class='member-row'><td>" + name + "</td><td>" + age + "</td>" +
                "<td>" + email + "</td><td>" + subText + "</td></tr>";
        }

        //Closing the table and inserting it into the table-container.
        html += "</table>";
        $('#table-container').append(html);
    }

    //Populating the delete button list.
    function populateList(){
        var members = membersXMLDoc.getElementsByTagName("Member");//Retrieving xml document.
        var html = "<ul id='delete-button-list'>";// Creating the unordered list.
        //Iterating through the members and adding a li element for each of them.
        for (var i = 0; i < members.length; i++) {
            //Selecting the needed information from each member instance.
            var firstname = members[i].getElementsByTagName("Firstname")[0].childNodes[0].nodeValue;
            //Inserting delete button list item into the list with the firstname of the member.
            html +="<li class='delete-button' value=" + i + ">Delete: " + firstname + "</li>";
        }
        //Closing unordered list and adding it into the list-container.
        html += "</ul>";
        $('#list-container').append(html);

        /*  Adding functionality to the delete list items to delete the selected member from the xml
            file and reload the list, table and select element.
         */
        $(".delete-button").click(function(){
            membersXMLDoc.getElementsByTagName("Member")[$(this).val()].remove();
            /*
             Saving xml document as a string into a cookie. New lines and returns were removed
             using a regular expression as only the first line of the document was being saved.
             Note: In a future release this should be saving to the server side.
             */
            document.cookie = new XMLSerializer().serializeToString(membersXMLDoc).replace(/[\r\n]/g, '');
            removeCurrentContent();
            populateSelectElement();
            populateTable();
            populateList();
        });
    }

    //Populating the select element.
    function populateSelectElement(){
        var members = membersXMLDoc.getElementsByTagName("Member");//Retrieving xml document.
        //Creating the parent select and optgroup element.
        var html = "<select id='select-member'><optgroup label='Members'>" +
            "<option class='delete-button' value=-1>None</option>";// value is used to select the correct table row.

        //Iterating through the members and adding an option element for each.
        for (var i = 0; i < members.length; i++) {
            //Selecting the needed information from each member instance.
            var firstname = members[i].getElementsByTagName("Firstname")[0].childNodes[0].nodeValue;
            //Inserting option into the select element with the firstname of the member.
            html +="<option class='delete-button' value=" + i + ">" + firstname + "</option>";
        }

        //Closing the optgroup and select elements and inserting them into the select container.
        html += "</optgroup></select>";
        $('#select-container').append(html);

        //Adding functionality to the select element to highlight the selected member in the table
        $("#select-member").bind('change', function(){
            var option = $(".delete-button:selected")[0].value;//getting the option value that relates to the table row.
            $(".member-row").removeClass("highlight");
            if ("-1" !== option) {//If an option that is not the 'none' option is selected.
                for (var i = 0; i < $(".member-row").length; i++) {
                    // If the option value matches the table row highlight the row.
                    if (option === $(".member-row").get(i).getAttribute("value")) {
                        $(".member-row").get(i).setAttribute('class', 'member-row highlight');
                    }
                }
            }
        });
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
        return today.getFullYear()+'-'+mm+'-'+dd//Todays date in correct format.
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