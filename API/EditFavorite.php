<?php
	$inData = getRequestInfo();

	// $id = $inData["ID"];
	// $firstName = $inData["firstName"];
	// $lastName = $inData["lastName"];
	// $phone = $inData["phone"];
	// $email = $inData["email"];
	// $street = $inData["street"];
	// $zipCode = $inData["zipCode"];
	// $country = $inData["country"];
	$id = $inData["id"];
  $favorite = $inData["favorite"];


  $conn = new mysqli("localhost", "MRod", "Group30Rocks", "Group30");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
    $sql = "UPDATE Contacts SET Favorites = '$favorite' WHERE ID= '$id'";

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
