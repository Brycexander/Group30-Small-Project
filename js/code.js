var urlBase = 'http://numpal.xyz/API';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogin() {
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	//	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse(xhr.responseText);

		userId = jsonObject.id;
    alert(userId);
	  if (userId < 1)
       return false;
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
    alert(firstName + " " + lastName);
    // alert(window.location.href);
		saveCookie();
    var next = "contacts.html";
    
		window.location.href =  next;
    alert(window.location.href);
    alert(window.location.pathname);
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doRegister() {
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var login = document.getElementById("registerName").value;
	var password = document.getElementById("registerPassword").value;

	document.getElementById("registerResult").innerHTML = "";

	// var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "login" : "' + login + '", "password" : "' + password + '"}';
  var jsonPayLoad = JSON.stringify({firstName : firstName, lastName : lastName, login : login, password : password});
  alert(jsonPayLoad); 
	var url = urlBase + '/CreateAccount.' + extension;

	alert(jsonPayload);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.send(jsonPayload);

		window.location.href = "index.html";
	}
	catch (err) {
		document.getElementById("registerResult").innerHTML = err.message;
	}

}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
	var firstName = document.getElementById("contactFirstName").value;
	var lastName = document.getElementById("contactLastName").value;
	var phone = parseInt(document.getElementById("contactPhoneNumber").value);
	var email = document.getElementById("contactEmail").value;
	var street = document.getElementById("contactStreet").value;
	var city = document.getElementById("contactCity").value;
	var state = document.getElementById("contactState").value;
	var zipcode = parseInt(document.getElementById("contactZipcode").value);
	var country = document.getElementById("contactCountry").value;
	document.getElementById("contactAddResult").innerHTML = "";

	// var jsonPayload = '{"FirstName" : ' + firstName + ', "LastName" : ' + lastName + ', "Phone" : ' + phone +
		//	', "Email" : ' + email + ', "Street" : ' + street + ', "City" : ' + city +
			//', "State" : ' + state + ', "Zipcode" : ' + zipcode + ', "Country" : ' + country + '}';
  
  var jsonPayLoad = JSON.stringify({FirstName : firstName, LastName : lastName, Phone : phone, Email : email, Street : street, City : city, State : state, Zipcode : zipcode, Country : country, secondKey : userId});
	alert(jsonPayLoad);

	var url = urlBase + '/AddContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
        // alert("reached");
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

}

function searchContact()
{
	// var temp = "A B <br />\r\nC D<br />\r\nE F<br />\r\nG H<br />\r\nI J<br />\r\n";
	document.getElementById("searchResult").style.display = "block";
	// alert(temp);
	// document.getElementsByTagName("p")[0].innerHTML = "";
	// document.getElementsByTagName("p")[0].innerHTML = temp;

	// Get just and <a> elements
	/*
	var anchors = document.querySelectorAll("a");
	// Set up a click event listener for each one
	for(var i = 0; i < anchors.length; i++){
		anchors[i].addEventListener("click", function(evt){
			return (evt.target.id);
		});
	}
	*/
}

function editContact(evt)
{
	var currentId = (evt.target.id); 
}

/*
function searchContact()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	var colorList = "";
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchColors.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
}
*/
