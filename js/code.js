var urlBase = 'http://numpal.xyz/API';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

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
	var phone = document.getElementById("contactPhoneNumber").value;
	var email = document.getElementById("contactEmail").value;
	var street = document.getElementById("contactStreet").value;
	var city = document.getElementById("contactCity").value;
	var state = document.getElementById("contactState").value;
	var zipcode = document.getElementById("contactZipcode").value;
	var country = document.getElementById("contactCountry").value;
	document.getElementById("contactAddResult").innerHTML = "";

	var jsonPayload = '{"FirstName" : ' + firstName + ', "LastName" : ' + lastName + ', "Phone" : ' + phone +
			', "Email" : ' + email + ', "Street" : ' + street + ', "City" : ' + city +
			', "State" : ' + state + ', "Zipcode" : ' + zipcode + ', "Country" : ' + country + '}';

	alert(jsonPayload);

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
	alert(evt.target.id);
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
