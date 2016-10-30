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

    /* *** Members Table Functionality ***

    An initial list of members is being loaded from an xml file in the project.
    However, if the registration form is submitted by the user an updated version of
    this xml file will be stored in a cookie. The xml file itself should be update in
    a future release.*/
    
    //Retrieving an xml document from the users cookie or the xml file.
    function setXMLDoc() {
        if (document.cookie == "") {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "members.xml", false)//synchronous local get request.
            xhr.send();
            xmlDoc = xhr.responseXML;//returning xhr request as an xml document.
        }else{
            xmlDoc = $.parseXML(document.cookie);//returning document cookie string parsed into xml.
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
    setXMLDoc();
    var members = xmlDoc.getElementsByTagName("Member");//Retrieving xml document.
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
        var member = xmlDoc.createElement("Member");
        var name = xmlDoc.createElement("Name");
        var firstname = xmlDoc.createElement("Firstname");
        var surname = xmlDoc.createElement("Surname");
        var dob = xmlDoc.createElement("DOB");
        var email = xmlDoc.createElement("Email_Address");
        var subscriber = xmlDoc.createElement("Subscriber");

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
        xmlDoc.getElementsByTagName("Members")[0].appendChild(member);

        /*
        Saving xml document as a string into a cookie. New lines and returns were removed
        using a regular expression as only the first line of the document was being saved.
        Note: In a future release this should be saving to the server side.
         */
        document.cookie = new XMLSerializer().serializeToString(xmlDoc).replace(/[\r\n]/g, '');
    });
});