<?php

  $id = 0;
  $firstName = "";
  $lastName = "";
  $fullName = "";
  $phone = "";
  $email = "";
  $street = "";
  $city = "";
  $state = "";
  $zipCode = "";
  $country = "";
  $secondKey = 0;

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "MRod", "Group30Rocks", "Group30");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
    $sql = "SELECT ID, FirstName, LastName, FullName, Phone, Email, Street, City, State, ZipCode, Country, UserID from Contacts where ID = '" . $inData["id"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
      $id = $row["ID"];
			$firstName = $row["FirstName"];
			$lastName = $row["LastName"];
      $fullName = $row["FullName"];
      $phone = $row["Phone"];
      $email = $row["Email"];
      $street = $row["Street"];
      $city = $row["City"];
      $state = $row["State"];
      $zipCode = $row["ZipCode"];
      $country = $row["Country"];
      $secondKey = $row["UserID"];

      returnWithInfo( $id, $firstName, $lastName, $phone, $email, $street, $city, $state, $zipCode, $country, $secondKey);
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $id, $firstName, $lastName, $phone, $email, $street, $city, $state, $zipCode, $country, $secondKey)
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","phone":"' . $phone . '","email":"' . $email . '","street":"' . $street . '","city":"' . $city . '","state":"' . $state . '","zipCode":"' . $zipCode . '","country":"' . $country . '","secondKey":' . $secondKey . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
