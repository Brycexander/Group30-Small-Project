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
		$sql = "SELECT ID, FirstName, LastName, Phone, Email, Street, ZipCode, Country, UserID from Contacts where LastName like '%" . $inData["search"] . "%' and UserID=" . $inData["UserID"];
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
				$searchResults .= "[";
				$searchResults .= '"' . $row["FirstName"] . '"';
				$searchResults .= ",";
				$searchResults .= '"' . $row["LastName"] . '"';
				$searchResults .= ",";
				$searchResults .= '"' . $row["LastName"] . '"';
				$searchResults .= ",";
				$searchResults .= '"' . $row["Phone"] . '"';
				$searchResults .= ",";
				$searchResults .= '"' . $row["Email"] . '"';
				$searchResults .= ",";
				$searchResults .= '"' . $row["Street"] . '"';
				$searchResults .= ",";
				$searchResults .= '"' . $row["ZipCode"] . '"';
				$searchResults .= ",";
				$searchResults .= '"' . $row["Country"] . '"';
				$searchResults .= ",";
				$searchResults .= '"' . $row["UserID"] . '"';
				$searchResults .= ",";
				$searchResults .= "]";
			}
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	returnWithInfo( $searchResults );

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
