<?php
	$inData = getRequestInfo();

	// $id = 12;
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$password = $inData["password"];
	$login = $inData["login"];


  $conn = new mysqli("localhost", "MRod", "Group30Rocks", "Group30");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT ID,firstName,lastName FROM Users where Login='" . $login . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			returnWithError( "Login already exists" );
		}
		else
		{
			$sql = "INSERT INTO Users (FirstName, LastName, Login, Password) VALUES ('" . $firstName . "','" . $lastName . "', '" . $login . "','" . $password . "')";
			if( $result = $conn->query($sql) != TRUE )
			{
				returnWithError( $conn->error );
			}
 		  returnWithError( "Account created successfully" );
		}
		// if( $result = $conn->query($sql) != TRUE )
		// {
		// 	returnWithError( $conn->error );
		// }
    // else
    // {
    //   // $row = $result->fetch_assoc();
    //   // $id = $row["ID"];
    //   // returnWithInfo( $firstName, $lastName, $id);
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
