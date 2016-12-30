$(document).ready(function (){

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
        document.cookie += "=;expires=Thu, 05 Oct 1990 00:00:01 GMT;";
        document.cookie = new XMLSerializer().serializeToString(membersXMLDoc).replace(/[\r\n]/g, '');
    });
});