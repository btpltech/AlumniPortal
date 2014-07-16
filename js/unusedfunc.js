function continueExecution1() {
    //alert("after");
	 	$(document).ready(function(e) {
		$(window).resize(function() {
		$('.list').height($(window).height() -100);
		$('#map_canvas').height($(window).height() -100);
		//$("html").css("overflow", "hidden");
	});
	$(window).trigger('resize');
    }); 
	$("#beforelogin").hide();
	$("#index").remove();
	$("#peoples").show();
	//$("#jobs").hide();
}

function displayPeopleSearch1(peopleSearch) {
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
		var lastName  = members[member].lastName  ;
		var picturl   = members[member].pictureUrl;
		var headline  = members[member].headline  ;
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
              var schoolNameGlobal = getCookie("schoolName");
  		      insertIntoUserDetailUsingPeopleSearch(compid, personId, firstName, lastName, location, picturl, schoolNameGlobal,positionInCompany1);
		     }
		
	i++;
	}	
	connectionsDiv.innerHTML += '<div id="more" onClick="morePeople()"><li class="col-lg-4" style="padding:10px;"><a href="#" class="btn btn-lg btn-default">More...</a></li></div>';    
				  //connectionsDiv.innerHTML += '<div id="more" onClick="morePeople()"><li class="col-lg-1" style="background-color:transparent"><a href="#" class="class="btn btn-lg btn-success"">More...</a></li></div>';
	//linkedinmarker(locationArray,userArray,markArray,industryArray,locArray);
	//showMarker();
}



function displayMorePeople(peopleSearch) {
//        alert(JSON.stringify(peopleSearch));
//locationArray,userArray,markArray,industryArray,locArray
	// vars for map

	
	var locationArray = [];
	var userArray     = [];
	var markArray     = [];
	var industryArray = [];
	var locArray      = [];
	
	// vars for display
	var i=0;
	var useridArray = 0;
	var members = peopleSearch.people.values;
	var connectionsDiv = document.getElementById("connections");
	    //connectionsDiv.innerHTML = '';
	var count  = $("#count").val();
	var toAdd ;
	    if(parseInt(peopleSearch.numResults) > 25)
	    	toAdd = 25;
	    else
	        toAdd = parseInt(peopleSearch.numResults);
	    count  = parseInt(count) + toAdd;
	    $("#count").val(count);
	var i =0 ;
	if(typeof members !="undefined")
	{
	for (var member in members) {
	        
	        var firstName = members[member].firstName ;
//		alert(firstName);
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
				
		var location;
       if(typeof members[member].location !="undefined"){location = members[member].location.name;}
		if(members[member].location)
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
			if(personId != getCookie("linkedinid"))
			{
			  if (typeof picturl == 'undefined') {
				picturl = "img/default.jpg";
				}
			    connectionsDiv.innerHTML += "<li class='col-lg-4' style='padding:10px;'><div class='list-pic'><img src="+picturl+" alt='User Pic'></div><dl class='list-details'><h3>" + firstName + " " + lastName+"</h3><dd>"+headline+ "</dd><address>"+ location +"</dl><div class='clearfix'></div><a href='#' class='btn btn-lg btn-default'>Catch Up</a></li>";
				var schoolNameGlobal = getCookie("schoolName");
			    insertIntoUserDetailUsingPeopleSearch(compid, personId, firstName, lastName, location, picturl, schoolNameGlobal,positionInCompany1);
			}
	i++;
	}	
    connectionsDiv.innerHTML += '<div id="more" onClick="morePeople()"><li class="col-lg-4" style="padding:10px;"><a href="#" class="btn btn-lg btn-default">More...</a></li></div>';    
	//connectionsDiv.innerHTML += '<div id="more" onClick="morePeople()"><li class="col-lg-1" style="background-color:transparent"><a href="#" class="class="btn btn-lg btn-success"">More...</a></li></div>';
	}

        $("#beforelogin").hide();
	//linkedinmarker(locationArray,userArray,markArray,industryArray,locArray);
   //showMarker();
} 
 
//This is used to display the connections.
function displayConnections(connections) {
	var connectionsDiv = document.getElementById("connections");
	var members = connections.values;
	// The list of members you are connected to
	//alert(JSON.stringify(members));
	var location =[];
	var user = [];
	var mark=[];
	var industry=[];
	var loc=[];
	var useridArray = 0;
	for (var member in members) {
		var personId = members[member].id;
		var temp = members[member].headline;
		var fname=members[member].firstName;
		var headline = members[member].headline;
		var lname=members[member].lastName;
		var locationName = members[member].location.name;
		if(members[member].pictureUrl)
		          var picturl=members[member].pictureUrl;
		// call function here to get entries in azure
		var userid=new Date().getTime()+Math.floor((Math.random()*1000)+1);;
		if(typeof locationName == "undefined")
		          locationName = "n/a";
	    if(typeof picturl == "undefined")
		          picturl      = "n/a";
		insertIntoUserDetailConnection(userid, personId,fname,lname,locationName,picturl);
		if(useridArray == 0)
		          useridArray = userid; 
	    else
		          useridArray = useridArray+","+userid;
	}// for close
	updateUserProfile(useridArray);
}
function displayConnectionsErrors(error) {
	alert(JSON.stringify(error));
}

function updateUserProfile(userids) {
	userid = getCookie("id");
	var MobileServiceClient = WindowsAzure.MobileServiceClient;
	var client1 = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
	var todoItemTable1 = client1.getTable("user_detail");
	//alert(userids);
	var query = todoItemTable1.select("id").where( {
		userid : userid
	}
	).read().done(function(results) {
		// alert(results[0].id);
		if(results.length !=0) {
			//alert("a");
			todoItemTable1.update( {
				id     : results[0].id,
		    connection : userids
			}
			).done(function (result) {
				//alert(JSON.stringify(result));
			}
			, function (err) {
				alert("Error: " + err);
			}
			);
		}
		// if close
	}
	,function (err) {
		alert("Error: " + err);
	}
	)
}

function insertIntoCollegeDetail(schools,userid) {
	var k=0;
	var colgid=0;
	var schoolname="";
	var startDate=0;
	var endDate=0;
	for (var school in schools) {
		schoolname=schools[school].schoolName;
		if(schools[school].startDate)
		startDate=schools[school].startDate.year;
		if(schools[school].endDate)
		endDate=schools[school].endDate.year;
		var MobileServiceClient = WindowsAzure.MobileServiceClient;
		var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
		var tableName1 = "person_college";
		var tableName2= "college";
		var todoItemTable2 = client.getTable("college");
		var query2=todoItemTable2.select("college_id").where( {
			college:schoolname
		}
		).read().done(function (result) {
		    if(result.length !=0)
			{
			    colgid=result[0].college_id;
			    var todoItemTable = client.getTable("person_college");
				var query = todoItemTable.select("id").where( {
					college_id:colgid,user_id:userid
				}
				).read().done(function(results) {
					if(results.length==0) {
						todoItemTable.insert( {
							college_id:colgid,user_id:userid, start_date:startDate, end_date: endDate
						}
						)
									.done(function (result) {
							//if(JSON.stringify(result))
							//document.getElementById("demo").innerHTML = "College Detail is successfully entered.";
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
			} // if close
			else
			{ 
			  var newCollegeId     = new Date().getTime()+Math.floor((Math.random()*2000)+1);
			  var todoItemTable123 = client.getTable("college");
			  todoItemTable123.insert( {
							college_id:newCollegeId,college_name : schoolname
						}
						)
						.done(function (result) {
							
						}
						, function (err) {
							alert("Error: " + err);
						}
						);
			 } // else close
		   }
		)
	}
}
function insertCompanyperson(positions,schoolname,userid) {
	var k=0;
	var compid=0;
	var colgid=0;
	var MobileServiceClient = WindowsAzure.MobileServiceClient;
    var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
	for (var company in positions) {
	    school_name=schoolname[k];
		if(positions[company].company)
		{
		var compny = positions[company].company.name;
		var tableName1 = "companyTperson";
		var tableName2= "company";
		var todoItemTable2 = client.getTable("company");
		var query2=todoItemTable2.select("company_id").where( {
			company_name:compny
		}
		).read().done(function (result) {
		    // if here
		   if(result.length !=0)
		   {
			compid=result[0].company_id;
			var tableName3= "college";
			var todoItemTable3 = client.getTable("college");
			var query3=todoItemTable3.select("college_id").where( {
				college:school_name
			}
			).read().done(function (result1) {
			  if(result1.length != 0)
				{  
					colgid = result1[0].college_id;
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
							.done(function (result123) {
							}
							, function (err) {
								alert("Error: " + err);
							}
							);
						} 
						else {
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
			  }// if close
			  else
			  {
			    insertIntoCollege(school_name);
			  }
			}
			)
		  }	
		  else
		  {
		    var compid=new Date().getTime()+Math.floor((Math.random()*100)+1);
		    var tableName1 = "company";
			var todoItemTable = client.getTable("company");
					todoItemTable.insert( {
						company_id:compid,company_name:company
					}
					)
					.done(function (result) {
				                var todoItemTable22 = client.getTable("company");
								var query22=todoItemTable22.select("company_id").where( {
									company_name:compny
								}
								).read().done(function (result123) {
									// if here
								   if(result123.length !=0)
								   {
									compid=result123[0].company_id;
									var tableName3= "college";
									var todoItemTable3 = client.getTable("college");
									var query3=todoItemTable3.select("college_id").where( {
										college:school_name
									}
									).read().done(function (results) {
									  if(results.length != 0)
										{  
											colgid = results[0].college_id;
											var todoItemTable = client.getTable("company");
											var query = todoItemTable.select("id","persons","count").where( {
												college_id:colgid,company_id:compid
											}
											).read().done(function(results) {
												if(results.length==0) {
													todoItemTable.insert( {
														college_id:colgid,persons:userid,company_id:compid, count:"1"
													}
													)
													.done(function (result123) {
													}
													, function (err) {
														alert("Error: " + err);
													}
													);
												} 
												else {
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
									  }// if close
									  else
									  {
										insertIntoCollege(school_name);
									  }
									}
									)
								  }	
								  else
								  {
									var compid=new Date().getTime()+Math.floor((Math.random()*100)+1);
									//var tableName1 = "company";
									var todoItemTable = client.getTable("company");
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
								)	  
					}
					, function (err) {
						alert("Error: " + err);
					}
					);
			}
		}
		)
		   k++;
	}// if close
  } // for close
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



function insertIntoUserDetailConnection(userid,personId, firstName, lastName, location, pictureUrl) {
	var lastcolgid=0;
	var MobileServiceClient = WindowsAzure.MobileServiceClient;
	var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
	var tableName1 = "user_detail";
	var todoItemTable = client.getTable(tableName1);
	var query = todoItemTable.select("userid","location","picurl","id").where( {
		complete: false, linkedinid  : personId
	}
	).read().done(function (results) {
		if(results.length==0) {
			todoItemTable.insert( {
				linkedinid :personId, firstname: firstName, lastname:lastName, location: location, picurl:pictureUrl, userid:userid, last_college_id:lastcolgid,registered: "0" ,complete: false
			}
			)
			.done(function (result) {
			}
			, function (err) {
				alert("Error: " + err);
			}
			);
		} else {
			var newLocation = results[0].location;
			var newPicUrl   = results[0].picurl;
			var idtoUpdate     = results[0].id;
			if((newLocation!=location)||(newPicUrl!=pictureUrl)) {
				todoItemTable.update( {
					id         :   idtoUpdate,
					linkedinid :   personId,
					location   :   newLocation,
					picurl     :   newPicUrl
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
	}
	, function (err) {
		alert("Error: " + err);
	}
	)
}
// function for updating information
function updateItemIntotable(idtoUpdate, personId, companyName , client, tableName) {
	var todoItemTable = client.getTable(tableName);
	todoItemTable.update( {
		           id     : idtoUpdate,
		           person : personId,
		           company: companyName
	}
	).done(function (result) {
		//alert(JSON.stringify(result));
	}
	, function (err) {
		alert("Error: " + err);
	}
	);
}
function insertintotable(personId,companyName, client, tableName) {
	var todoItemTable = client.getTable(tableName);
	todoItemTable.insert( {
		company : companyName,
				   person  : personId,
				   complete: false
	}
	).done(function (result) {
		
	}
	, function (err) {
		alert("Error: " + err);
	}
	);
}

function insertCompanyperson1(positions,schoolname,userid) {
	var k=0;
	var compid=0;
	var colgid=0;
	for (var company in positions) {
	    if(positions[company].company)
		{
			var compny = positions[company].company.name;
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
					college:schoolname
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
				)
			  }// if close
			}
			)
		      k++;
	  } //if close
	}
}
function displayConnectionsAfterRegister(connections) {
    //alert(JSON.string(connections));
	var connectionsDiv = document.getElementById("connections");
	connectionsDiv.innerHTML = '';
	var members = connections.values;
	// The list of members you are connected to
	//alert(JSON.stringify(members));
	var location =[];
	var user = [];
	var mark=[];
	var industry=[];
	var loc=[];
	var i=0;
	var useridArray = 0;
	for (var member in members) {
		var personId = members[member].id;
		var temp = members[member].headline;
		var fname=members[member].firstName;
		var headline = members[member].headline;
		var lname=members[member].lastName;
		var locationName = "null";
		if(members[member].location)
					  locationName=members[member].location.name;
		var picturl=members[member].pictureUrl;
		var members = connections.values;
		// The list of members you are connected to
		if(members[member].location)
		location[i]=members[member].location.name;
		user[i]=members[member].firstName + " " + members[member].lastName;
		mark[i]= members[member].pictureUrl;
		industry[i]=members[member].headline;
		if(members[member].location)
		loc[i]=members[member].location.name;
		i++;
	}
	//alert(i);
	linkedinmarker(location,user,mark,industry,loc);
	for (var member in members) {
		var picturl = "n/a";
		var personId = members[member].id;
		var temp = members[member].headline;
		var fname=members[member].firstName;
		var headline = members[member].headline;
		var lname=members[member].lastName;
		var locationName = "null";
		if(members[member].location)
		    location[i]=members[member].location.name;
		if(members[member].pictureUrl)
		    picturl=members[member].pictureUrl;
		connectionsDiv.innerHTML += "<li class='col-lg-4'><div class='list-pic'><img src="+picturl+" alt='User Pic'></div><dl class='list-details'><h3>" + fname + " " + lname+"</h3><dd>"+headline+ "</dd><address>"+ locationName +"</dl><div class='clearfix'></div><a href='#' class='btn btn-lg btn-default'>Catch Up</a><a href='#' class='btn btn-lg btn-default'>View Full Profile</a></li>";
	    //alert(connectionsDiv.innerHTML);
	}
	//updatestatus();
	//scrollalert();
	// alert($('#scrollbox').attr('scrollTop'));
}

		