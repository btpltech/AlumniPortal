var App_Debug = true;
function backgroundThreadToFetchAndStore(schoolName) {	
	if(schoolName){
		var link = getCookie("linkedinid");
		var MobileServiceClient = WindowsAzure.MobileServiceClient;
		var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
		var todoItemTable2 = client.getTable("user_detail");
		if(App_Debug)
			console.log("Entering");
		var query2=todoItemTable2.select("complete","id").where( {
				linkedinid : link
			}
			).read().done(function (result) {
				if(result.length !=0) {
					var complete = result[0].complete;
					if(complete == true){
						for(var i=1;i<=20;i++) { 
							 IN.API.PeopleSearch()
								.fields("id","firstName", "lastName", "location","pictureUrl","positions:(company:(name))","industry","headline")
								.params({"school-name": schoolName,"count": 25,"start": 25*i})
								.result(backgroundPeopleSearchAndStore)
								.error(function error(e) {
								});
							}
							var idtoUpdate = result[0].id;
							todoItemTable2.update( {
												id : idtoUpdate,
												complete : true,
												}).done(function (result) {
							});
					}
				}
		});			
	}	
} // function close


function backgroundPeopleSearchAndStore(peopleSearch){
	var locationArray = [];
	var userArray     = [];
	var markArray     = [];
	var industryArray = [];
	var locArray      = [];
	var useridArray = 0;
	var members = peopleSearch.people.values;
	var i =0 ; 
	if(App_Debug)
		console.log("Entering to insert");
	for (var member in members) {
	    var firstName = members[member].firstName ;
		var lastName  = members[member].lastName ;
		var pictureUrl   = members[member].pictureUrl;
		var headline  = members[member].headline;
		if(personId != getCookie("linkedinid"))
	    {
		     if (typeof pictureUrl == 'undefined') {
				pictureUrl = "img/default.jpg";
				}
			 markArray[i] = pictureUrl;		
			 userArray[i] = firstName + " " + lastName;
			 industryArray[i]   = members[member].headline;
     	}// if close
		var location  = "null";
		if(typeof members[member].location !="undefined")
		{
			if(personId != getCookie("linkedinid"))
			{
			location  = members[member].location.name;
		    locationArray[i] = location; 
			locArray[i]      = location; 
		   }
		}
		var personId  = members[member].id;
		var compid ;
		var positions = members[member].positions;
		//alert(JSON.stringify(members[member].positions));
		if(typeof positions != "undefined")
		{ 
			var positions1 = positions.values;
			//alert(positions._total);
			var length1 = positions._total;
			if(length1 > 0) {
				for (var company in positions1) {
					var company = positions1[company].company.name;
					//alert(compny);
					compid = new Date().getTime()+Math.floor((Math.random()*1000)+1);
					insertCompany(company,compid);
				} // for close
			}// if close
		}
		var schoolName = getCookie("schoolName");	    
			// console.log("Inserting firstname "+firstName+" lastname "+lastName+" Location "+location+" inserted");
	    insertIntoUserDetailUsingPeopleSearch(compid, personId, firstName, lastName, location, pictureUrl, schoolName, positions, headline);
	} // for close
}