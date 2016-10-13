#!/usr/bin/env php
<?php
$debug=false;
if ($debug) echo "Philips Hue Bridge Finder", "\n\n";
// ******************************************************************************************************
// * 
// *  The url below has to be adapated for each user
// *    replace 192.168.2.17 by the IP of your Hue Bridge
// * 	replace v5ZEXuEydfGJj8yV61qLtMQmN6lJdrsn0PLZ30Ah by your Hue App Key
// *		in order to create a Key in the Hue Bridge (Ref to http://www.developers.meethue.com/documentation/getting-started):
// *			in a web Brower open the page: http://192.168.2.17/debug/clip.html  (replace the IP by your Hue Bridge IP)
// * 			in the interface fill the "Body" field with: 
// *					{"devicetype":"my_hue_app#iphone peter"}
// * 			PRESS the button POST
// *			This command is basically saying please create a new resource inside /api (where usernames sit) with the following properties.
// *			When you press the POST button you should get back an error message letting you know that you have to press the link button. 
// * 			This is a security step By pressing the button we prove that the user has physical access to the bridge.
// *			Go and press the button on the bridge and then press the POST button again and you should get a success response with your desired API Key.
// * 			the API key follows the "username": ...
//*				Note the API Key and replace the key v5ZEXuEydfGJj8yV61qLtMQmN6lJdrsn0PLZ30Al by your API KEY.
// * 

$response = @file_get_contents('http://192.168.2.17/api/v5ZEXuEydfGJj8yV61qLtMQmN6lJdrsn0PLZ30Al²/lights'); 
// Don't continue if bad response
if ($response === false) {
    if ($debug) echo "\tRequest failed. Ensure that you have internet connection.";
    exit(1);
}
if ($debug) echo "\tRequest succeeded", "\n\n";
$oresult = array();
// Parse the JSON response
$data = json_decode($response,true);
if ($debug) echo "Number of response found: ", count($data), "\n";
// Iterate through each bridge
foreach ($data as $key => $lights) {
    if ($debug) echo "\tLight #", $key, "\n";
	if ((!(isset($_GET['light']))) || ($key == $_GET['light'])) {
		$light_id= $key;
		if ($debug) echo "\tname: ", $lights['name'], "\n"; 
		$light_name=$lights['name'];
		$light_reachable=false;
		$light_sate= false;
		if (isset($lights['state'])) 
			$ostate = $lights['state'];
			foreach ($lights['state'] as $key => $state) {
				if ($key == "on") {
					$light_state=$state;
				}
				if ($key == "bri") {
					$light_bri=$state;					
				}
				if ($key == "reachable") {
					$light_reachable=$state;
			}
		}
		if (!(isset($_GET['light']))) {
			$oresult[] = array('LIGHT_ID' =>  (int) $light_id,  'HUE_DATA' => $lights );
		}
		else {
			$oresult = array('LIGHT_ID' =>  (int) $light_id,  'HUE_DATA' => $lights );
		}
	}
}

// push Header (JSON)
header('Content-type: application/json');
// return the JSON Data content
$temp  = json_encode($oresult);
ob_start('ob_gzhandler');
echo $temp;


?>