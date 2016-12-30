//This method is used in the navigation bar and therefore needs to be global.
var setUpContents;

$(document).ready(function (){

    /* *** Members Functionality ***

     An initial list of members is being loaded from an xml file in the project.
     However, if the registration form is submitted by the user an updated version of
     this xml file will be stored in a cookie. The xml file itself should be update in
     a future release.*/

    //Members button has been moved here to gain access to relevant methods.
    setUpContents = function() {
        removeCurrentContent();
        setMembersXMLDoc();// Retrieving data to populate elements with.
        populateSelectElement();
        populateTable();
        populateList();
    };

    //Retrieving an xml document from the users cookie or the xml file.
    setMembersXMLDoc = function setMembersXMLDoc() {
        if (document.cookie.indexOf("<Members>") === -1) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "databases/members.xml", false);//synchronous local get request.
            xhr.send();
            membersXMLDoc = xhr.responseXML;//returning xhr request as an xml document.
        }else{
            var xmlString = document.cookie.split('<Members>')[1].split('</Members>')[0];
            xmlString = '<Members>' + xmlString + '</Members>';
            document.cookie += "=;expires=Thu, 05 Oct 1990 00:00:01 GMT;";
            document.cookie = xmlString;
            membersXMLDoc = $.parseXML(xmlString);//returning document cookie string parsed into xml.
        }
    };

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
            document.cookie += "=;expires=Thu, 05 Oct 1990 00:00:01 GMT;";
            document.cookie = new XMLSerializer().serializeToString(membersXMLDoc).replace(/[\r\n]/g, '');
            removeCurrentContent();
            populateSelectElement();
            populateTable();
            populateList();
        });
    }

    //Populating the select element.
    populateSelectElement = function(){
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
});