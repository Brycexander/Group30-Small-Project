var urlBase = 'http://numpal.xyz/API';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";
var searchString = "";
var nextUser = 0;

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ",nextUser=" + nextUser + ",searchString=" + searchString + ";expires=" + date.toGMTString();
  // alert(document.cookie);
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
    else if ( tokens[0] == "nextUser")
    {
      nextUser = parseInt( tokens[1].trim() );
    }
    else if (tokens[0] == "searchString")
      searchString = tokens[1].trim();
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		// document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

/*
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
	  if (userId < 1)
       return false;
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
		saveCookie();
    var next = "contacts.html";
    
		window.location.href = next;
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
  var jsonPayload = JSON.stringify({firstName : firstName, lastName : lastName, login : login, password : password});
	var url = urlBase + '/CreateAccount.' + extension;

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
*/

function hideLoginPage(){
	var page = document.getElementById("login-card");
	if (page.style.display == "none")
		page.style.display = "block";
	else
		page.style.display = "none";
}

function doLogin() {
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5(password);

	document.getElementById("loginResult").innerHTML = "";
	// var hash = md5(password, null, true);	
   
	//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = JSON.stringify({login : login, password : hash});
	// alert(jsonPayload);
  var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse(xhr.responseText);

		userId = jsonObject.id;
    // alert(userId);
	  if (userId < 1){
       document.getElementById("loginResult").innerHTML = "Invalid Username/Password";
       return false;
    }
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
		saveCookie();
    var next = "contactsPage.html";
    
		window.location.href = next;
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doRegister() {
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var login = document.getElementById("registerName").value;
	var orig = document.getElementById("registerPassword").value;
  var password = md5(orig);
  // alert(password);
	// alert(orig + " " + password);
	document.getElementById("registerResult").innerHTML = "";

	// var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "login" : "' + login + '", "password" : "' + password + '"}';
  var jsonPayload = JSON.stringify({firstName : firstName, lastName : lastName, login : login, password : password});
	var url = urlBase + '/CreateAccount.' + extension;
  
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
     xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
        var store = xhr.responseText;
				// alert(store);
				var jsonObject = JSON.parse(store); 
			  document.getElementById("registerResult").innerHTML = jsonObject.error;
      }
		};
		xhr.send(jsonPayload);
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

function readFakeCookie(){
	userId = 4;
	firstName = "Jay";
	lastName = "D";
	nextUser = 7;
}

function loadAdd(){
  document.getElementById("contactFirstName").value = "";
	document.getElementById("contactLastName").value = "";
	document.getElementById("contactPhoneNumber").value = "";
	document.getElementById("contactEmail").value = "";
	document.getElementById("contactStreet").value = "";
	document.getElementById("contactCity").value = "";
	document.getElementById("contactState").value = "";
	document.getElementById("contactZipcode").value = "";
	document.getElementById("contactCountry").value = "";
  document.getElementById("contactAddResult").innerHTML = "";
}

function addContact()
{
  readCookie(); 
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
  
  var jsonPayLoad = JSON.stringify({firstName : firstName, lastName : lastName, phone : phone, email : email, street : street, city : city, state : state, zipCode : zipcode, country : country, secondKey : userId});
	// alert(jsonPayLoad);

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
				document.getElementById("contactAddResult").innerHTML = "</br></br>Contact Added";
        var srch = document.getElementById("searchBox").value;
        document.getElementById("searchBox").value = "";
        searchUserContact();
        document.getElementById("searchBox").value = srch;
        searchUserContact();
			}
		};
		xhr.send(jsonPayLoad);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

}

var allContacts = [];
var favContacts = [];

class Contact{
	constructor(id, name, location, phone, email, star) {
		this.id = id;
		this.starid = "star-" + id;
		this.name = name;
		this.location = location;
		this.phone = phone;
		this.email = email;
		this.star = star;
	}
    
	starColor(){
    	var doc = document.getElementById(this.starid);
    	if (doc == null) return;
		if (this.star == 0){
			document.getElementById(this.starid).style.color = "#fff";
		}
		else{
			document.getElementById(this.starid).style.color = "#ffff00";
		}
	}

	equal(other){
		return this.id == other;
	}
	
	sendFlip(val){
		readFakeCookie();
 		var jsonPayload = JSON.stringify({id: this.id, favorite: val});
  		var url = urlBase + '/EditFavorite.' + extension;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try {
			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					;
				}
			};
			xhr.send(jsonPayload);
		}
		catch (err) {
	  		// alert(err.message);
		} 
	}

	flip(){
		if (this.star == 0){
			this.sendFlip(1);
			this.star = 1;
			this.starColor();
			var contact = new Contact(this.id.slice(), this.name, this.location, this.phone, this.email, 1);
			favContacts.push(contact);
			displayFavorites(favContacts);
		}
		else{
			this.sendFlip(0);
			this.star = 0;
			this.starColor();
			for (var i = 0; i < favContacts.length; i++){
				if (favContacts[i].equal(this.id)){
					favContacts[i].id = "-1";
					break;
				}
			}
			displayFavorites(favContacts);
		}
	}	
}


function favorite(evt){
  // alert(evt);
  // alert(this.id);
  var id = this.id;
  var starID = id.substring(5);
  // alert(starID);
  for (var i = 0; i < allContacts.length; i++){
	  if (allContacts[i].equal(starID)){
		  allContacts[i].flip();
		  break;
	  }
  }  
}

function displayFavorites(){
  // alert(favContacts);
	favContacts.sort(function(a, b) { 
		return (a.name.localeCompare(b.name));
	});
	favList = "";
	for (var i = 0; i < favContacts.length; i++){
		c = favContacts[i];
    if (c.id == -1) continue;
		var info = "<tr> <td> <a id = \"" + c.id + "\" class = \"form-btn\" onclick=\"displayCard.call(this, event);\" href = \"#contact-card\">" + c.name + "</a> </td>";
		var fav = "<td> <a id = \"star1" + c.id + "\" class = \"star-btn\" onclick = \"favorite.call(this, event);\"> <i class=\"fa fa-star\"></i> </a> </td> </tr>";
		var str = info + fav;
		favList += str;
	}
	document.getElementById("table2").innerHTML = ("" + favList);
  for (var i = 0; i < favContacts.length; i++)
	{
	  var curr = favContacts[i];
	  var idUser = curr.id;
	  if (idUser == -1) continue;
    document.getElementById("star1" + idUser).style.color = "#ffff00";
	}
}


function duplicate(array, val){
  for (var i = 0; i < array.length; i++)
    if (array[i].equal(val.id))
      return true;
  return false;
}

function searchOnLoad(){
 searchUserContact();
}

function searchUserContact()
{
  readCookie();
	var srch = document.getElementById("searchBox").value;
    // alert(srch);
	// document.getElementById("search").innerHTML = "";
  if (srch == ""){
    favContacts = [];
    allContacts = [];
  }
	var contactList = " <tr> <th> Name </th> <th> Phone </th> <th> Email</th><th></th></tr>";
    var favList = "";
	var jsonPayload = JSON.stringify({"search" : srch, "UserID" : userId});
	var url = urlBase + '/SearchContact.' + extension;
    // alert(jsonPayload);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		// <a id = "17" onclick="displayCard.call(this, event);" href = "contact-card.html"> Jay D <br /> </a>
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var store = xhr.responseText;
				// alert(store);
				var jsonObject = JSON.parse(store);
        // alert(jsonObject.results);
				if (jsonObject.results == undefined){
         document.getElementById("table1").innerHTML = "";
         return;
        }
        jsonObject.results.sort(function(a, b) { 
					return (a.firstName.localeCompare(b.firstName))  ||  (a.lastName.localeCompare(b.lastName));
				});
				// alert(jsonObject.results[0]);
				for (var i = 0; i < jsonObject.results.length; i++)
				{
					var curr = jsonObject.results[i];
					var on = parseInt(jsonObject.results[i].favorite);
					var name = jsonObject.results[i].firstName + " " + jsonObject.results[i].lastName;
					var idUser = jsonObject.results[i].id;
					var phone = curr.Phone;
					var email = curr.Email;
					var location = curr.street + " " + curr.city + " " + curr.state + " " + curr.zipCode + " " + curr.country;
					// alert(name + "\n" + idUser + "\n" + phone + "\n" + email + "\n" + location);
					// alert(first);
					// alert(last);
				  // alert(idUser);
					var contact = new Contact(idUser, name, location, phone, email, on);
    	    var favContact = new Contact(idUser.slice(), name, location, phone, email, on);
          			if (!duplicate(allContacts, contact))
					  allContacts.push(contact);
					var info = "<tr> <td> <a id = \"" + idUser + "\" class = \"form-btn\" onclick=\"displayCard.call(this, event);\" href = \"#contact-card\">" + name + "</a> </td>";
          info +=  "<td> <a id = \"" + idUser + "\" class = \"form-btn\" onclick=\"displayCard.call(this, event);\" href = \"#contact-card\">" + phone + " " + "</a> </td>";
          info += " <td> <a id = \"" + idUser + "\" class = \"form-btn\" onclick=\"displayCard.call(this, event);\" href = \"#contact-card\">" + email + "</a> </td>";
					var fav = "<td> <a id = \"star-" + idUser + "\" class = \"star-btn\" onclick = \"favorite.call(this, event);\"> <i class=\"fa fa-star\"></i> </a> </td> </tr>";
					
					var str = info + fav;
					// alert(str);
					contactList += str;
					if (on == 1){
						favList += str;
            if (!duplicate(favContacts, contact)) 
						  favContacts.push(favContact);
					}
				}
				document.getElementById("table1").innerHTML = ("" + contactList);
				// document.getElementById("table2").innerHTML = ("" + favList);
				for (var i = 0; i < jsonObject.results.length; i++)
				{
					var curr = jsonObject.results[i];
					var on = parseInt(jsonObject.results[i].favorite);
					var idUser = jsonObject.results[i].id;
					// alert(on);
					if (on == 1){
						document.getElementById("star-" + idUser).style.color = "#ffff00";
					}
				}
        // alert("reached");
				//alert(contactList);
			}
      displayFavorites();
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("searchResult").innerHTML = err.message;
	}	
}

function searchContact()
{
  readCookie();
	var srch = document.getElementById("searchText").value;
  // alert(srch);
	document.getElementById("search").innerHTML = "";

	var contactList = "";

	var jsonPayload = JSON.stringify({"search" : srch, "UserID" : userId});
	var url = urlBase + '/SearchContact.' + extension;
  // alert(jsonPayload);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		// <a id = "17" onclick="displayCard.call(this, event);" href = "contact-card.html"> Jay D <br /> </a>
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var store = xhr.responseText;
        // alert(store);
				var jsonObject = JSON.parse(store);
	      jsonObject.results.sort(function(a, b) { 
          return (a.firstName.localeCompare(b.firstName))  ||  (a.lastName.localeCompare(b.lastName));
        });
        // alert(jsonObject.results);
				for (var i = 0; i < jsonObject.results.length; i++)
				{
					var name = jsonObject.results[i].firstName + " " + jsonObject.results[i].lastName;
					var idUser = jsonObject.results[i].id;
          // alert(first);
          // alert(last);
          // alert(idUser);
         	var str = "<a id = \"" + idUser + "\" onclick=\"displayCard.call(this, event);\" href = \"#contact-card\"> " + name + " <br /> </a>";
          // alert(str);
					contactList += str;
				}
        //document.getElementsByTagName("p")[0].innerHTML = colorList;
        document.getElementById("search").innerHTML = ("" + contactList);
        document.getElementById("searchResult").style.display = "block";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}	
}

function displayCard(evt)
{

  readCookie();
  // alert(evt.id);
  // alert(this.id);
  nextUser = (this.id); 
  saveCookie();
  testDisplayInfo();    
}

function testDisplayInfo() {
	readCookie();

	var jsonPayload = JSON.stringify({ id: nextUser});
	var url = urlBase + '/GetContact.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var contact = JSON.parse(this.responseText);
				document.getElementById("nameP").innerHTML = "<h1>" + contact.firstName + " " + contact.lastName + "</h1>";
				document.getElementById("phoneP").innerHTML = "<i class=\"fa fa-phone info\"></i>" + contact.phone;
				document.getElementById("emailP").innerHTML = "<i class=\"fa fa-envelope info\"></i>" + contact.email;
        var location = contact.street + ", " + contact.city + ", " + contact.state + ", " + contact.zipCode + ", " + contact.country;
				document.getElementById("LocationP").innerHTML = "<i class=\"fa fa-home info\"></i>" + location;
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("displayResult").innerHTML = err.message;
	}
}


function editContact() {
	readCookie();
	var newFirstName = document.getElementById("editFirstName").value;
	var newLastName = document.getElementById("editLastName").value;
	var phone = parseInt(document.getElementById("editPhoneNumber").value);
	var email = document.getElementById("editcontactEmail").value;
	var street = document.getElementById("editcontactStreet").value;
	var city = document.getElementById("editcontactCity").value;
	var state = document.getElementById("editcontactState").value;
	var zipCode = parseInt(document.getElementById("editcontactZipcode").value);
	var country = document.getElementById("editcontactCountry").value;
	var secondKey = userId;



	var jsonPayload = JSON.stringify({ id: nextUser, firstName: newFirstName, lastName: newLastName, phone: phone, email: email, street: street, city: city, state: state, zipCode: zipCode, country: country, secondKey: secondKey });
	// alert(jsonPayload);

	var url = urlBase + '/ModifyContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.send(jsonPayload);
    xhr.onload = function(){      
      var srch = document.getElementById("searchBox").value;
      document.getElementById("searchBox").value = "";
      searchUserContact();
      document.getElementById("searchBox").value = srch;
      searchUserContact();
      document.getElementById("nameP").innerHTML = "<h1>" + newFirstName + " " + newLastName + "</h1>";
		  document.getElementById("phoneP").innerHTML = "<i class=\"fa fa-phone info\"></i>" + phone;
		  document.getElementById("emailP").innerHTML = "<i class=\"fa fa-envelope info\"></i>" + email;
      var location = street + " " + city + " " + state + " " + zipCode + " " + country;
		  document.getElementById("LocationP").innerHTML = "<i class=\"fa fa-home info\"></i>" + location;
    };
	}
	catch (err) {
   // alert(err.message);
		document.getElementById("editResult").innerHTML = err.message;
	}
}

function loadEdit() {
	readCookie();

	var jsonPayload = JSON.stringify({ id: nextUser });
	var url = urlBase + '/GetContact.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var contact = JSON.parse(this.responseText);
        // alert(this.responseText);
				document.getElementById("editFirstName").value = contact.firstName;
				document.getElementById("editLastName").value = contact.lastName;
				document.getElementById("editPhoneNumber").value = contact.phone;
				document.getElementById("editcontactEmail").value = contact.email;
				document.getElementById("editcontactStreet").value = contact.street;
				document.getElementById("editcontactCity").value = contact.city;
				document.getElementById("editcontactState").value = contact.state;
				document.getElementById("editcontactZipcode").value = contact.zipCode;
				document.getElementById("editcontactCountry").value = contact.country;
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("displayResult").innerHTML = err.message;
	}
}

function deleteContact()
{
  readCookie();
  var jsonPayload = JSON.stringify({"secondKey": nextUser});
  var url = urlBase + '/DeleteContact.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				;
			}
		};
		xhr.send(jsonPayload);
    xhr.onload = function(){
      var srch = document.getElementById("searchBox").value;
      document.getElementById("searchBox").value = "";
      searchUserContact();
      document.getElementById("searchBox").value = srch;
      searchUserContact();
      window.location.href = "#container";
    };
	}
	catch (err) {
	  // alert(err.message);
     // document.getElementById("displayResult").innerHTML = err.message;
	} 
}

;(function($) {
	'use strict'
  
	/**
	 * Add integers, wrapping at 2^32.
	 * This uses 16-bit operations internally to work around bugs in interpreters.
	 *
	 * @param {number} x First integer
	 * @param {number} y Second integer
	 * @returns {number} Sum
	 */
	function safeAdd(x, y) {
	  var lsw = (x & 0xffff) + (y & 0xffff)
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
	  return (msw << 16) | (lsw & 0xffff)
	}
  
	/**
	 * Bitwise rotate a 32-bit number to the left.
	 *
	 * @param {number} num 32-bit number
	 * @param {number} cnt Rotation count
	 * @returns {number} Rotated number
	 */
	function bitRotateLeft(num, cnt) {
	  return (num << cnt) | (num >>> (32 - cnt))
	}
  
	/**
	 * Basic operation the algorithm uses.
	 *
	 * @param {number} q q
	 * @param {number} a a
	 * @param {number} b b
	 * @param {number} x x
	 * @param {number} s s
	 * @param {number} t t
	 * @returns {number} Result
	 */
	function md5cmn(q, a, b, x, s, t) {
	  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
	}
	/**
	 * Basic operation the algorithm uses.
	 *
	 * @param {number} a a
	 * @param {number} b b
	 * @param {number} c c
	 * @param {number} d d
	 * @param {number} x x
	 * @param {number} s s
	 * @param {number} t t
	 * @returns {number} Result
	 */
	function md5ff(a, b, c, d, x, s, t) {
	  return md5cmn((b & c) | (~b & d), a, b, x, s, t)
	}
	/**
	 * Basic operation the algorithm uses.
	 *
	 * @param {number} a a
	 * @param {number} b b
	 * @param {number} c c
	 * @param {number} d d
	 * @param {number} x x
	 * @param {number} s s
	 * @param {number} t t
	 * @returns {number} Result
	 */
	function md5gg(a, b, c, d, x, s, t) {
	  return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
	}
	/**
	 * Basic operation the algorithm uses.
	 *
	 * @param {number} a a
	 * @param {number} b b
	 * @param {number} c c
	 * @param {number} d d
	 * @param {number} x x
	 * @param {number} s s
	 * @param {number} t t
	 * @returns {number} Result
	 */
	function md5hh(a, b, c, d, x, s, t) {
	  return md5cmn(b ^ c ^ d, a, b, x, s, t)
	}
	/**
	 * Basic operation the algorithm uses.
	 *
	 * @param {number} a a
	 * @param {number} b b
	 * @param {number} c c
	 * @param {number} d d
	 * @param {number} x x
	 * @param {number} s s
	 * @param {number} t t
	 * @returns {number} Result
	 */
	function md5ii(a, b, c, d, x, s, t) {
	  return md5cmn(c ^ (b | ~d), a, b, x, s, t)
	}
  
	/**
	 * Calculate the MD5 of an array of little-endian words, and a bit length.
	 *
	 * @param {Array} x Array of little-endian words
	 * @param {number} len Bit length
	 * @returns {Array<number>} MD5 Array
	 */
	function binlMD5(x, len) {
	  /* append padding */
	  x[len >> 5] |= 0x80 << len % 32
	  x[(((len + 64) >>> 9) << 4) + 14] = len
  
	  var i
	  var olda
	  var oldb
	  var oldc
	  var oldd
	  var a = 1732584193
	  var b = -271733879
	  var c = -1732584194
	  var d = 271733878
  
	  for (i = 0; i < x.length; i += 16) {
		olda = a
		oldb = b
		oldc = c
		oldd = d
  
		a = md5ff(a, b, c, d, x[i], 7, -680876936)
		d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
		c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
		b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
		a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
		d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
		c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
		b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
		a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
		d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
		c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
		b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
		a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
		d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
		c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
		b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)
  
		a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
		d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
		c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
		b = md5gg(b, c, d, a, x[i], 20, -373897302)
		a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
		d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
		c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
		b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
		a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
		d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
		c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
		b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
		a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
		d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
		c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
		b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)
  
		a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
		d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
		c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
		b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
		a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
		d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
		c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
		b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
		a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
		d = md5hh(d, a, b, c, x[i], 11, -358537222)
		c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
		b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
		a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
		d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
		c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
		b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)
  
		a = md5ii(a, b, c, d, x[i], 6, -198630844)
		d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
		c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
		b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
		a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
		d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
		c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
		b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
		a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
		d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
		c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
		b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
		a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
		d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
		c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
		b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)
  
		a = safeAdd(a, olda)
		b = safeAdd(b, oldb)
		c = safeAdd(c, oldc)
		d = safeAdd(d, oldd)
	  }
	  return [a, b, c, d]
	}
  
	/**
	 * Convert an array of little-endian words to a string
	 *
	 * @param {Array<number>} input MD5 Array
	 * @returns {string} MD5 string
	 */
	function binl2rstr(input) {
	  var i
	  var output = ''
	  var length32 = input.length * 32
	  for (i = 0; i < length32; i += 8) {
		output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff)
	  }
	  return output
	}
  
	/**
	 * Convert a raw string to an array of little-endian words
	 * Characters >255 have their high-byte silently ignored.
	 *
	 * @param {string} input Raw input string
	 * @returns {Array<number>} Array of little-endian words
	 */
	function rstr2binl(input) {
	  var i
	  var output = []
	  output[(input.length >> 2) - 1] = undefined
	  for (i = 0; i < output.length; i += 1) {
		output[i] = 0
	  }
	  var length8 = input.length * 8
	  for (i = 0; i < length8; i += 8) {
		output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32
	  }
	  return output
	}
  
	/**
	 * Calculate the MD5 of a raw string
	 *
	 * @param {string} s Input string
	 * @returns {string} Raw MD5 string
	 */
	function rstrMD5(s) {
	  return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
	}
  
	/**
	 * Calculates the HMAC-MD5 of a key and some data (raw strings)
	 *
	 * @param {string} key HMAC key
	 * @param {string} data Raw input string
	 * @returns {string} Raw MD5 string
	 */
	function rstrHMACMD5(key, data) {
	  var i
	  var bkey = rstr2binl(key)
	  var ipad = []
	  var opad = []
	  var hash
	  ipad[15] = opad[15] = undefined
	  if (bkey.length > 16) {
		bkey = binlMD5(bkey, key.length * 8)
	  }
	  for (i = 0; i < 16; i += 1) {
		ipad[i] = bkey[i] ^ 0x36363636
		opad[i] = bkey[i] ^ 0x5c5c5c5c
	  }
	  hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
	  return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
	}
  
	/**
	 * Convert a raw string to a hex string
	 *
	 * @param {string} input Raw input string
	 * @returns {string} Hex encoded string
	 */
	function rstr2hex(input) {
	  var hexTab = '0123456789abcdef'
	  var output = ''
	  var x
	  var i
	  for (i = 0; i < input.length; i += 1) {
		x = input.charCodeAt(i)
		output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
	  }
	  return output
	}
  
	/**
	 * Encode a string as UTF-8
	 *
	 * @param {string} input Input string
	 * @returns {string} UTF8 string
	 */
	function str2rstrUTF8(input) {
	  return unescape(encodeURIComponent(input))
	}
  
	/**
	 * Encodes input string as raw MD5 string
	 *
	 * @param {string} s Input string
	 * @returns {string} Raw MD5 string
	 */
	function rawMD5(s) {
	  return rstrMD5(str2rstrUTF8(s))
	}
	/**
	 * Encodes input string as Hex encoded string
	 *
	 * @param {string} s Input string
	 * @returns {string} Hex encoded string
	 */
	function hexMD5(s) {
	  return rstr2hex(rawMD5(s))
	}
	/**
	 * Calculates the raw HMAC-MD5 for the given key and data
	 *
	 * @param {string} k HMAC key
	 * @param {string} d Input string
	 * @returns {string} Raw MD5 string
	 */
	function rawHMACMD5(k, d) {
	  return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
	}
	/**
	 * Calculates the Hex encoded HMAC-MD5 for the given key and data
	 *
	 * @param {string} k HMAC key
	 * @param {string} d Input string
	 * @returns {string} Raw MD5 string
	 */
	function hexHMACMD5(k, d) {
	  return rstr2hex(rawHMACMD5(k, d))
	}
  
	/**
	 * Calculates MD5 value for a given string.
	 * If a key is provided, calculates the HMAC-MD5 value.
	 * Returns a Hex encoded string unless the raw argument is given.
	 *
	 * @param {string} string Input string
	 * @param {string} [key] HMAC key
	 * @param {boolean} [raw] Raw output switch
	 * @returns {string} MD5 output
	 */
	function md5(string, key, raw) {
	  if (!key) {
		if (!raw) {
		  return hexMD5(string)
		}
		return rawMD5(string)
	  }
	  if (!raw) {
		return hexHMACMD5(key, string)
	  }
	  return rawHMACMD5(key, string)
	}
  
	if (typeof define === 'function' && define.amd) {
	  define(function() {
		return md5
	  })
	} else if (typeof module === 'object' && module.exports) {
	  module.exports = md5
	} else {
	  $.md5 = md5
	}
  })(this)


// format: <a id = "17" onclick="displayCard.call(this, event);" href = "contact-card.html"> Jay D <br /> </a>

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
