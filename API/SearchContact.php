<?php

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "MRod", "Group30Rocks", "Group30");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT ID, FirstName, LastName, Phone, Email, Street, City, State, ZipCode, Country, UserID, Favorites from Contacts where UserID='" . $inData["UserID"] . "' and (FullName like '%" . $inData["search"] . "%' or Phone like '%" . $inData["search"] . "%')";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .= "{\"id\": ";
        $searchResults .= '"' . $row["ID"] . '"';
        $searchResults .= ", \"firstName\": ";
				$searchResults .= '"' . $row["FirstName"] . '"';
				$searchResults .= ", \"lastName\": ";
				$searchResults .= '"' . $row["LastName"] . '"';
				$searchResults .= ", \"Phone\": ";
				$searchResults .= '"' . $row["Phone"] . '"';
				$searchResults .= ", \"Email\": ";
				$searchResults .= '"' . $row["Email"] . '"';
				$searchResults .= ", \"street\": ";
				$searchResults .= '"' . $row["Street"] . '"';
				$searchResults .= ", \"city\": ";
				$searchResults .= '"' . $row["City"] . '"';
				$searchResults .= ", \"state\": ";
				$searchResults .= '"' . $row["State"] . '"';
				$searchResults .= ", \"zipCode\": ";
				$searchResults .= '"' . $row["ZipCode"] . '"';
				$searchResults .= ", \"country\": ";
				$searchResults .= '"' . $row["Country"] . '"';
				$searchResults .= ", \"UserID\": ";
				$searchResults .= '"' . $row["UserID"] . '"';
				$searchResults .= ", \"favorite\": ";
				$searchResults .= '"' . $row["Favorites"] . '"';
				$searchResults .= "}";
			}
      
     	returnWithInfo( $searchResults );
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

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
