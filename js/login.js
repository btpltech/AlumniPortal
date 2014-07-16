//Logic For Login:
/**
- Show the Loading Overlay
- In the mean time, 
	-- Change the page and setup the map
	-- Get the user Data from Linkedin
	-- Get 25 user Friends Data from linkedin
	-- Once the Data of the friends is received, then display it on the map and the list.
- Remove the Loading Overlay
- Get all the other friends data in the background
*/

var App_Debug = false;
var schoolNameGlobal;
var loggedIdGlobal;

//Step 1
function onLinkedInLoad() {
	IN.Event.on(IN, "auth", onLinkedInAuth);
}

//Step2
function onLinkedInAuth() {
	//Show the Loading Screen
	$("#beforelogin").show();

	//Get the User Data from the Linked In	
	IN.API.Profile("me")
	.fields(["id","firstName","pictureUrl","lastName","headline","summary","location","educations","industry","positions:(company:(name))"])
	.result(displayProfiles);

	// if(App_Debug)
	// console.log("We are getting the Data of the Logged in User from the LinkedIn");
}

//Step 3: Get the Profile Information of the User and Put in the Database
function displayProfiles(profiles) 
{
	// if(App_Debug)
	// console.log("We have got the Data of the Logged In User From LinkedIn");

	member = profiles.values[0];
	var positions = member.positions.values;
	var personId  = member.id;
	var schools   = member.educations.values;
	var school_name;

	if(typeof schools !="undefined")
	{
		// school_name = schools[0].schoolName;
		var user_name = member.firstName+" "+member.lastName;
		for (var school in schools) {
			school_name=schools[school].schoolName;
			if(school_name)
			insertIntoCollege(school_name);
		}
	}

	// if(App_Debug)
	// 	console.log("Entering the Data of Linkedin Id"+ personId +" studying in School"+ school_name+" in the User Detail Table");

	//insert data in college_to_user tbl
	insertIntoUserDetail(positions, personId, member.firstName, member.lastName, member.location.name, member.pictureUrl, schools);
	schoolNameGlobal  = school_name;

	//Now since we have the information of the Person, Now we will start showing the People Name
	$.post('people.html','',function(data){
		$("#peoplecontent").show();
		$("#peoplecontent").html(data);
		$("#jobsearchnavbar").hide();
		$("#maincontent").hide();
		$("#jobcontent").hide();
		$("#topright-nav").show();
		$("#College1").html(schoolNameGlobal);
		var location = member.location.name;
		initialize(location);
	});
}

