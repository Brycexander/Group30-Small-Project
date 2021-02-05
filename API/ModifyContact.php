<?php
	$inData = getRequestInfo();

	$id = $inData["id"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$street = $inData["street"];
	$city = $inData["city"];
	$state = $inData["state"];
	$zipCode = $inData["zipCode"];
	$country = $inData["country"];
	$secondKey = $inData["secondKey"];


  $conn = new mysqli("localhost", "MRod", "Group30Rocks", "Group30");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		//$sql = "UPDATE ID,firstName,lastName, phone,email,street,city,state,zipCode, country, secondKey FROM Contacts where ID ='" . $inData["secondKey"] . "'";


		$sql = "UPDATE Contacts
						SET FirstName = '$firstName', LastName = '$lastName', Phone = '$phone', Email = '$email', Street = '$street', City = '$city', State = '$state', ZipCode = '$zipCode', Country = '$country'
						WHERE ID= $id";


		// $sql = "DELETE from Contacts where ID = '" . $inData["secondKey"] . "'";

		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
    // else
    // {
    //  $row = $result->fetch_assoc();
    //  $id = $row["ID"];
    //  returnWithInfo( $firstName, $lastName);
    // }

		$conn->close();
	}

	// returnWithError("");

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

  function returnWithInfo( $firstName, $lastName)
  {
    $retValue = '{"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    sendResultInfoAsJson( $retValue );
  }

  function sendResultInfoAsJson( $obj )
  {
    header('Content-type: application/json');
    echo $obj;
  }

?>
