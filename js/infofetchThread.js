var App_Debug = true;

function continueExecution() {
    $("#beforelogin").hide();	
}

function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}
  
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

// function for peole search 
function displayPeopleSearch(peopleSearch) {
//locationArray,userArray,markArray,industryArray,locArray
	// vars for map
	//alert(JSON.stringify(peopleSearch));
	var locationArray = [];
	var userArray     = [];
	var markArray     = [];
	var industryArray = [];
	var locArray      = [];
	
	// vars for display
	var i=0;
	var useridArray = 0;
	var count   = peopleSearch.numResults;
	//alert(count);

	var members = peopleSearch.people.values;
	var connectionsDiv = document.getElementById("connections");
	    connectionsDiv.innerHTML = '<input type="hidden" id="count" value=""/>';
	$("#count").val(count);
	var i =0 ;
	for (var member in members) {
	    var firstName = members[member].firstName ;
		var lastName  = members[member].lastName ;
		var picturl   = members[member].pictureUrl;
		var headline  = members[member].headline;
		if(personId != getCookie("linkedinid"))
	    {
		     if (typeof picturl == 'undefined') {
				picturl = "img/default.jpg";
				}
			 markArray[i] = picturl;		
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
		var positionInCompany = members[member].positions;
		//alert(JSON.stringify(members[member].positions));
		if(typeof positionInCompany != "undefined")
		{ 
			var positionInCompany1 = positionInCompany.values;
			//alert(positionInCompany._total);
			var length1 = positionInCompany._total;
			if(length1 > 0) {
				for (var company in positionInCompany1) {
					var compny = positionInCompany1[company].company.name;
					//alert(compny);
					compid = new Date().getTime()+Math.floor((Math.random()*1000)+1);
					//insertCompany(compny,compid);
				} // for close
			   
			}// if close
		}
		 if(personId != getCookie("linkedinid"))
			{
			  if (typeof picturl == 'undefined') {
				picturl = "img/default.jpg";
				}
			  connectionsDiv.innerHTML += "<li class='col-lg-4' style='padding:10px;'><div class='list-pic'><img src="+picturl+" alt='User Pic'></div><dl class='list-details'><h3>" + firstName + " " + lastName+"</h3><dd>"+headline+ "</dd><address>"+ location +"</dl><div class='clearfix'></div><a href='#' class='btn btn-lg btn-default'>Catch Up</a></li>";
              //var schoolNameGlobal = getCookie("schoolName");
  		      //insertIntoUserDetailUsingPeopleSearch(compid, personId, firstName, lastName, location, picturl, schoolNameGlobal,positionInCompany1);
		     }
		
	i++;
	}	
	connectionsDiv.innerHTML += '<div id="more" onClick="morePeople()"><li class="col-lg-4" style="padding:10px;"><a href="#" class="btn btn-lg btn-default">More...</a></li></div>';    
				  //connectionsDiv.innerHTML += '<div id="more" onClick="morePeople()"><li class="col-lg-1" style="background-color:transparent"><a href="#" class="class="btn btn-lg btn-success"">More...</a></li></div>';
	//linkedinmarker(locationArray,userArray,markArray,industryArray,locArray);
	showMarker();	
  	
}

function insertIntoCollege(school_name) {
	var colgid=new Date().getTime()+Math.floor((Math.random()*1000)+1);
	var MobileServiceClient = WindowsAzure.MobileServiceClient;
	var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
	var tableName1 = "college";
	var todoItemTable = client.getTable("college");
	var query = todoItemTable.select("college_id").where( {
		college:school_name
	}
	).read().done(function(results) {
		if(results.length==0) {
			todoItemTable.insert( {
				college_id:colgid,college:school_name
			}
			)
						.done(function (result) {
			}
			, function (err) {
				alert("Error: " + err);
			}
			);
		}
	}
	,function (err) {
		alert("Error: " + err);
	}
	)
}

function insertIntoUserDetail(positions, personId, firstName, lastName, location, pictureUrl, schools) {
	
	setCookie("linkedinid",personId,365);
	var userid=new Date().getTime()+Math.floor((Math.random()*100)+1);
	var k=0;
	var schoolname=[];
	var lastcolgid=0;
	for (var school in schools) {
		schoolname[k]=schools[school].schoolName;
		k++;
	}
	var MobileServiceClient = WindowsAzure.MobileServiceClient;
	var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
	var tableName1 = "user_detail";
	var tableName2= "college";
	var schoolName = schoolname[0];
	var todoItemTable2 = client.getTable("college");
	var query2=todoItemTable2.select("college_id").where( {
		college:schoolname[0]
	}
	).read().done(function (result) {
	      if(result.length!=0)
		  {
			lastcolgid=result[0].college_id;
			var todoItemTable = client.getTable("user_detail");
			var query = todoItemTable.select("success","userid","location","picurl","id").where( {
				complete: false, linkedinid  : personId
			}
			).read().done(function (results) {
				if(results.length==0) {
				   var compid=new Date().getTime()+Math.floor((Math.random()*100)+1);
				   for (var company in positions) {
						var compny = positions[company].company.name;
						if(compny)
						insertCompany(compny,compid);
					}
					var id  = userid;
					setCookie("id",id,365);
					setCookie("location",location,365);
					initialize(location);
					
					//-------------------------
					var geocoder = new google.maps.Geocoder();
						geocoder.geocode( { 'address': location}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							  //alert(results[0].geometry.location);
							  var markerLocation = results[0].geometry.location;
								todoItemTable.insert( {
									success : "1", markerLocation : JSON.stringify(markerLocation), linkedinid :personId, firstname: firstName, lastname:lastName, location: location, picurl:pictureUrl, userid:userid, last_college_id:lastcolgid, registered:"1",complete: false, last_company_id : compid
								})
								.done(function (result) {
									// if(JSON.stringify(result)) {										
         //                                setCookie("schoolName",schoolName,365);									   
									// 	document.getElementById("College1").innerHTML = schoolName;
									// 	IN.API.PeopleSearch()
									// 							 .fields("id","firstName", "lastName", "location","pictureUrl","positions:(company:(name))","industry","headline")
									// 							 .params( {"school-name": schoolName,"count": 25})
									// 							 .result(displayPeopleSearchAndStoreLocation)
									// 							 .error(function error(e) {
									// 							}
									// 							);
																
									// 	insertIntoCollegeDetail(schools,userid);
									// 	insertCompanyperson(positions,schoolname,userid);
									// 	// insert connections
										
									// 	IN.API.Connections("me")
									// 							.fields("firstName", "lastName", "industry","id","pictureUrl","headline","location","positions:(company:(name))","educations")
									// 							.result(displayConnections)
									// 							.error(displayConnectionsErrors);
										
									// 	// display Connection
									//     /*	
									// 	IN.API.Connections("me")
									// 							.fields("firstName", "lastName", "industry","id","pictureUrl","headline","location","positions:(company:(name))","educations")
									// 							.params({"count":25})
									// 							.result(displayConnectionsAfterRegister)
									// 							.error(displayConnectionsErrors);
									//    */ 				
									//     // set schoolName in Cookie
									//    setTimeout(continueExecution, 10000);
									// }
								}, function (err) {
								alert("Error: " + err);
								});
							}
						});
					
					// till here
				} else {
					var newLocation    = results[0].location;
					var newPicUrl      = results[0].picurl;
					var idtoUpdate     = results[0].id;
					var id  = results[0].userid;
					var success = results[0].success;
					setCookie("id",id,365);
					setCookie("location",newLocation,365);
					// graph intialization
					initialize(newLocation);
					if((newLocation!=location)||(newPicUrl!=pictureUrl)) {
						todoItemTable.update( {
								id     :   idtoUpdate,
							linkedinid :   personId,
							  location : newLocation,
								picurl :   newPicUrl,
					   last_company_id : compid
						}
						).done(function (result) {
							//alert(JSON.stringify(result));
						}
						, function (err) {
							alert("Error: " + err);
						}
						);
					}
					// call function here to insert connection information in azure
					/*
					IN.API.Connections("me")
									.fields("firstName", "lastName", "industry","id","pictureUrl","headline","location","positions:(company:(name))","educations")
									//.params({"count":10})
					.result(displayConnectionsAfterRegister)
									.error(displayConnectionsErrors);
									*/
									//alert(schoolName);
					document.getElementById("College1").innerHTML = schoolName;
					setCookie("schoolName",schoolName,365);
                    if(success)
                    {					
					// IN.API.PeopleSearch()
					// 				 .fields("id","firstName", "lastName", "location","pictureUrl","positions:(company:(name))","industry","headline")
					// 				 .params( {"school-name": schoolName,"count": 50})
					// 				 .result(displayPeopleSearch)
					// 				 .error(function error(e) {
					// 				}
					// 				);
				 //   }// if close
				 //   else
				 //   {
				    IN.API.PeopleSearch()
									 .fields("id","firstName", "lastName", "location","pictureUrl","positions:(company:(name))","industry","headline")
									 .params( {"school-name": schoolName,"count": 25})
									 .result(displayPeopleSearchAndStoreLocation)
									 .error(function error(e) {
									}
									);
				   }
				   setTimeout(continueExecution, 1000);
				}
			}
			, function (err) {
				alert("Error: " + err);
			}
			)
		}// main if close
	  } 
	) // 
}

function insertCompanyperson1(positions,schoolName,userid) {
	var k=0;
	var compid=0;
	var colgid=0;
	if(typeof positions != "undefined"){
		var positions1 = positions.values;
		var length1 = positions._total;
		if(length1 > 0) {
		for (var company in positions1) {
			// if(App_Debug)
			// 	console.log("Entering");
			var compny = positions1[company].company.name;
			// if(App_Debug)
			// 	console.log(compny);
			var MobileServiceClient = WindowsAzure.MobileServiceClient;
			var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
			var tableName1 = "companyTperson";
			var tableName2= "company";
			var todoItemTable2 = client.getTable("company");
			var query2=todoItemTable2.select("company_id").where( {
				company_name:compny
			}
			).read().done(function (result) {
			  if(result.length !=0){             			  
				compid=result[0].company_id;
				var tableName3= "college";
				var todoItemTable3 = client.getTable("college");
				var query3=todoItemTable3.select("college_id").where( {
					college:schoolName
				}
				).read().done(function (result1) {
					if(result1.length != 0) {
						colgid=result1[0].college_id;
						var todoItemTable = client.getTable("companyTperson");
						var query = todoItemTable.select("id","persons","count").where( {
							college_id:colgid,company_id:compid
						}
						).read().done(function(results) {
							if(results.length==0) {
								todoItemTable.insert( {
									college_id:colgid,persons:userid,company_id:compid, count:"1"
								}
								)
								.done(function (result) {
								}
								, function (err) {
									alert("Error: " + err);
								}
								);
							} 
							else 
							{
								var newpersons=results[0].persons+","+userid;
								var newcount=results[0].count+1;
								var idupdate=results[0].id;
								todoItemTable.update( {
									id : idupdate,
						       persons : newpersons,
								 count : newcount
								}
								).done(function (result) {
									//alert(JSON.stringify(result));
								}
								, function (err) {
									alert("Error: " + err);
								}
								);
							}
						}
						,function (err) {
							alert("Error: " + err);
						}
						);
					}
				}
				);
			  }// if close
			}
			);
		k++;
	  } //for close
	}
	}
}

function insertIntoUserDetailUsingPeopleSearch(compid, personId, firstName, lastName, location, pictureUrl, schoolName, positions, headline) {
	var userid=new Date().getTime()+Math.floor((Math.random()*100)+1);
	var k=0;
	//var schoolname=[];
	var lastcolgid=0;
	var MobileServiceClient = WindowsAzure.MobileServiceClient;
	var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
	var tableName1 = "user_detail";
	var tableName2= "college";
	var todoItemTable2 = client.getTable(tableName2);
	var query2=todoItemTable2.select("college_id").where( {
		college : schoolName
	}
	).read().done(function (result) {
		lastcolgid=result[0].college_id;
		// if(App_Debug)
		// 	console.log(lastcolgid + schoolName);
		var todoItemTable = client.getTable(tableName1);
		var query = todoItemTable.select("userid","location","picurl","id").where( {
			complete: false, linkedinid  : personId
		}
		).read().done(function (results) {
			if(results.length==0) {
                var geocoder = new google.maps.Geocoder();
				geocoder.geocode( { 'address': location}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					   todoItemTable.insert( {
							success : "0",markerLocation: JSON.stringify(results[0].geometry.location),linkedinid :personId, firstname: firstName, lastname:lastName, location: location, picurl:pictureUrl, userid:userid, last_college_id:lastcolgid, headline:headline, registered:"0",complete: false, last_company_id : compid
						}
						)
						.done(function (result) {
							if(JSON.stringify(result)) {
								//insertIntoCollegeDetail(schools,userid);
								//alert(JSON.stringify(results[0].geometry.location));
								insertCompanyperson1(positions,schoolName,userid);
							    showMarker();
								//return "success";
								var todoItemTable = client.getTable("user_detail");
								var query1 = todoItemTable.select("userid","location","picurl","id").where( {
									complete: false, linkedinid  : personId
								    }).read().done(function (results) {
									   //alert(JSON.stringify(results));
									   todoItemTable.update({
										   id: results[0].id,
										   success : "1"
										}).done(function (result) {
										   //alert(JSON.stringify(result));
										}, function (err) {
										   alert("Error: " + err);
										});

									}, function (err) {
									   alert("Error: " + err);
									})	
							}// if close
							else
							{
							   //return "failure";
							}
						}
						, function (err) {
							alert("Error: " + err);
						}
						);
				} // inside if close
				});// geolocation close
			} else {
				var idtoUpdate     = results[0].id;
                var geocoder = new google.maps.Geocoder();
				geocoder.geocode( { 'address': location}, function(resultsMark, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					todoItemTable.update( {
								id : idtoUpdate,
								success : "0",
								linkedinid : personId,
								location : location,
								picurl : pictureUrl,
								headline : headline,
								last_company_id : compid,
								markerLocation : JSON.stringify(resultsMark[0].geometry.location),
								firstname: firstName, 
								lastname:lastName,
								last_company_id : compid
								}
								).done(function (result) {
									showMarker(); // call function for marker
									//alert(JSON.stringify(result));
								}
								, function (err) {
									alert("Error: " + err);
								}
								);
							
				} // inside if close
				});// geolocation close
				}
		// if(App_Debug)
		// 	console.log("Insrting into companyTperson "+positions+" school "+schoolName+" userid "+userid);
		insertCompanyperson1(positions,schoolName,userid);
		// if(App_Debug)
		// 	console.log("Exiting");
		}
		);
	}
	);
}

function insertCompany(company,compid) {
    if(company && compid){
		var MobileServiceClient = WindowsAzure.MobileServiceClient;
		var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
		var tableName1 = "company";
		var todoItemTable = client.getTable("company");
		var query = todoItemTable.select("company_id").where( {
			company_name:company
		}
		).read().done(function(results) {
			if(results.length==0) {
				todoItemTable.insert( {
					company_id:compid,company_name:company
				}
				)
				.done(function (result) {
				}
				, function (err) {
					alert("Error: " + err);
				}
				);
			}
		}
		,function (err) {
			alert("Error: " + err);
		}
		)
	}// if close
}

function displayPeopleSearchAndStoreLocation(peopleSearch) {
    //locationArray,userArray,markArray,industryArray,locArray
	// vars for map
	//alert(JSON.stringify(peopleSearch));
	var locationArray = [];
	var userArray     = [];
	var markArray     = [];
	var industryArray = [];
	var locArray      = [];
	// vars for display
	var i=0;
	var useridArray = 0;
	var count   = peopleSearch.numResults;
	//alert(count);

	var members = peopleSearch.people.values;
	var connectionsDiv = document.getElementById("connections");
	    connectionsDiv.innerHTML = '<input type="hidden" id="count" value=""/>';
	$("#count").val(count);
	var i =0 ; 
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
			//alert(positionInCompany._total);
			var length1 = positions._total;
			if(length1 > 0) {
				for (var company in positions1) {
					var company = positions1[company].company.name;
					//alert(compny);
					compid = new Date().getTime()+Math.floor((Math.random()*1000)+1);
					insertCompany(company,compid);
					// if(App_Debug)
					// 	console.log("Company Name "+company+" Id "+compid);
				} // for close
			}// if close
		}
		 if(personId != getCookie("linkedinid"))
			{
			  if (typeof pictureUrl == 'undefined') {
				pictureUrl = "img/default.jpg";
				}
			  connectionsDiv.innerHTML += "<li class='col-lg-4' style='padding:10px;'><div class='list-pic'><img src="+pictureUrl+" alt='User Pic'></div><dl class='list-details'><h3>" + firstName + " " + lastName+"</h3><dd>"+headline+ "</dd><address>"+ location +"</dl><div class='clearfix'></div><a href='#' class='btn btn-lg btn-default'>Catch Up</a></li>";
			}
		var schoolName = getCookie("schoolName");	
	    insertIntoUserDetailUsingPeopleSearch(compid, personId, firstName, lastName, location, pictureUrl, schoolName, positions, headline);
	i++;
	} // for close	
	connectionsDiv.innerHTML += '<div id="more" onClick="morePeople()"><li class="col-lg-4" style="padding:10px;"><a href="#" class="btn btn-lg btn-default">More...</a></li></div>';    					
	backgroundThreadToFetchAndStore(schoolName);	
	//connectionsDiv.innerHTML += '<div id="more" onClick="morePeople()"><li class="col-lg-1" style="background-color:transparent"><a href="#" class="class="btn btn-lg btn-success"">More...</a></li></div>';
	//linkedinmarker(locationArray,userArray,markArray,industryArray,locArray);
}
var App_Debug = true;
var moreSkip = 1;

function morePeople() {
    $("#more").remove();
    $("#beforelogin").show();
		  // var schoolName = $("#College1").html();
		  // var count      = $("#count").val();
		var connectionsDiv = document.getElementById("connections");		
		var schoolName = getCookie("schoolName");
		var lastcolgid=0;
		var MobileServiceClient = WindowsAzure.MobileServiceClient;
		var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
		var tableName2= "college";
		var todoItemTable2 = client.getTable(tableName2);
		var query2=todoItemTable2.select("college_id").where( {
			college : schoolName
		}
		).read().done(function (result) {
			lastcolgid=result[0].college_id;
			// if(App_Debug)
			// 	console.log(lastcolgid + schoolName);
			var MobileServiceClient = WindowsAzure.MobileServiceClient;
			var client1 = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
			var todoItemTable1 = client1.getTable("user_detail");
			var query1 = todoItemTable1.select("linkedinid","firstname","lastname","picurl","location","headline").where( {
				last_college_id : lastcolgid
				}).skip(25*moreSkip).read().done(function(results1) {
				if(results1.length !=0) {
					for (var i=0; i<25; i++) {
							var personId =results1[i].linkedinid;
							var picturl = results1[i].picurl;
							var firstname = results1[i].firstname;
							var lastname = results1[i].lastname;
							var headline = results1[i].headline;
							var location = results1[i].location;
							if(personId != getCookie("linkedinid"))
							{
				  				if (typeof picturl == 'undefined') {
									picturl = "img/default.jpg";
								}
				  			// if(App_Debug)
				  			// 	console.log("Getting firstname "+firstname+" lastname "+lastname+" location "+location+" picturl "+picturl+" Data");
				  			connectionsDiv.innerHTML += "<li class='col-lg-4' style='padding:10px;'><div class='list-pic'><img src="+picturl+" alt='User Pic'></div><h3>" + firstname + " " + lastname+"</h3><dd>"+headline+"</dd><address>"+ location +"</address><div class='clearfix'></div><a href='#' class='btn btn-lg btn-default'>Catch Up</a></li>";
							}
					}

			connectionsDiv.innerHTML += '<div id="more" onClick="morePeople()"><li class="col-lg-4" style="padding:10px;"><a href="#" class="btn btn-lg btn-default">More...</a></li></div>';
			  	}// if close
			  	else{
			  		$("#more").remove();
			  	}
			});
		$("#beforelogin").hide();
		//showMarker();
	});
	moreSkip++
} // function close