//Create a connection to the server. 
$connection = mysql_connect($db_host, $db_user,$db_pwd);

// make sure a connection has been made
if (!$connection){
die("Database connection failed: " . mysql.error());
}

// Select the database on the server
$db_select = mysql_select_db($database, $connection);
if (!$db_select){
die("Database selection failed: " . mysql.error());
}

// START FORM PROCESSING
if (isset($_POST['submit'])) { // Form has been submitted.
    $url = trim(mysql_prep($_POST['url']));



if (isset($_POST['url'])) { // Form has been submitted.
    $url = trim(mysql_prep($_POST['url']));


// INSERT THE DATA 
$query = "INSERT INTO *dbprefix*readlater  ( url )
              VALUES ( '{$url}' )";
        // Confirm if the query is successful.
        $result = mysql_query($query, $connection);
}
