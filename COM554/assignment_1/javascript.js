$(document).ready(function (){

    // *** Navigation bar section Functionality ***

    //Navigation button events - hide and show content.
    $("#home-button").click(function () {
        //Highlighting correct navigation bar button on click
        $(".nav-li").removeClass("selected");
        $(this).addClass("selected");
        //Hide all sections and show the corresponding section
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

    // *** Members Table Functionality ***

    //Populating the members table from the xml file
    if (document.cookie == "") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "members.xml", false)//synchronous local get request
        xhr.send();
        xmlDoc = xhr.responseXML;
    }else{
        xmlDoc = $.parseXML(document.cookie);
    }
    var members = xmlDoc.getElementsByTagName("Member");

    var today = new Date().getDate();
    var thisMonth = new Date().getMonth() + 1;
    var thisYear = new Date().getFullYear();

    for(var i = 0; i< members.length; i++){

        var dob = members[i].getElementsByTagName("DOB")[0].childNodes[0].nodeValue;
        var birthDay = dob.substring(8, 10);
        var birthMonth = dob.substring(5, 7);
        var birthYear = dob.substring(0, 4);

        var age = thisYear - birthYear;
        if ((birthMonth > thisMonth) || (birthMonth == thisMonth && birthDay > today)) {
            age -= 1;
        }

        var isSubscriber;
        if(members[i].getElementsByTagName("Subscriber")[0].childNodes[0].nodeValue === "true"){
            isSubscriber = "Yes";
        }else{
            isSubscriber = "No";
        }
        var name = members[i].getElementsByTagName("Firstname")[0].childNodes[0].nodeValue + " " + members[i].getElementsByTagName("Surname")[0].childNodes[0].nodeValue

        $("#member-table-header-row").after(
            "<tr><td>" + name + "</td>" +
            "<td>" + age + "</td>" +
            "<td>" + members[i].getElementsByTagName("Email_Address")[0].childNodes[0].nodeValue + "</td>" +
            "<td>" + isSubscriber + "</td></tr>");
    }

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

    //Storing an updated version of the xml as a string in a cookie
    $("#registration-form").submit(function() {

        var member = xmlDoc.createElement("Member");
        var name = xmlDoc.createElement("Name");
        var firstname = xmlDoc.createElement("Firstname");
        var surname = xmlDoc.createElement("Surname");
        var dob = xmlDoc.createElement("DOB");
        var email = xmlDoc.createElement("Email_Address");
        var subscriber = xmlDoc.createElement("Subscriber");

        firstname.append($('#firstname').val());
        surname.append($('#surname').val());
        dob.append($('#dob-input').val());
        email.append($('#email').val());
        subscriber.append($('#subscribe-checkbox').is(':checked'));

        name.appendChild(firstname);
        name.appendChild(surname);
        member.appendChild(name);
        member.appendChild(dob);
        member.appendChild(email);
        member.appendChild(subscriber);
        xmlDoc.getElementsByTagName("Members")[0].appendChild(member);

        document.cookie = new XMLSerializer().serializeToString(xmlDoc).replace(/[\r\n]/g, '');
    });
});