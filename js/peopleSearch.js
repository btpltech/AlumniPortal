function searchPeople1234()
{
  $("#beforelogin").show();
  var schoolName = $("#College1").html();
  var name       = $("#searchPeople").val();
  //alert(name);
  if(schoolName){
  $("#more").remove();
	 IN.API.PeopleSearch()
	 .fields("id","firstName", "lastName", "location","pictureUrl","positions:(company:(name))","industry","headline")
	 .params( {"firstName": name,"school-name": schoolName,"count":25})
	 .result(displayPeopleSearch)
	 .error(function error(e) {
	}
	);
  }// if close
  else
  {
    
  }
  $("#beforelogin").hide();
    
}
function hitEnter()
{
  searchPeople123($("#searchPeople").val());
}
 /*
 $("#searchPeople").keyup(function (e) {
  if (e.which == 13) {
    alert("a");
    //searchPeople123($("#searchPeople").val());
  }
 });
*/
function searchPeople123(name)
{
  //alert("a");
  $("#beforelogin").show();
  var schoolName = "Pranveer Singh Institute Of Technology";//$("#College1").html();
  //alert(name);
  if(schoolName){
        //var id = getCookie("id");
		//alert(id);
		var MobileServiceClient = WindowsAzure.MobileServiceClient;
		var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
		var todoItemTable = client.getTable("College");
		var todoItemTable1 = client.getTable("user_detail");
		var query=todoItemTable.select("college_id").where( {
			college : schoolName
		}
		).read().done(function (results) {
		   //alert(JSON.stringify(results));
		   if(results.length != 0)
		   {
			       var college_id = results[0].college_id;
				   var query=todoItemTable1.select("location","last_company_id","firstname","lastname","location","picurl","markerLocation").where( {
						last_college_id : college_id,
						firstname : name,
                    }
					).read().done(function (results) {
					   alert(JSON.stringify(results));
					   if(results.length != 0)
					   {
						 //var college_id = results[0].last_college_id;
						 //alert(JSON.stringify(results));
						 var connectionsDiv = document.getElementById("searchConnections");
						     connectionsDiv.innerHTML = '';
						     $("#connections").hide();
							 $("#info").hide();  	
							 $("#searchConnections").show();
						 var lcoationArray = new Array();
						 for(var i = 0;i < results.length ;i++)
						 {
						   var firstname = results[i].firstname;
						   var lastname = results[i].lastname;
						   var last_company_id = results[i].last_company_id;
						   var location = results[i].location;
						   var markerLocation = results[i].markerLocation;
						   var picurl = results[i].picurl;
	                       connectionsDiv.innerHTML += "<li class='col-lg-4' style='padding:10px;'><div class='list-pic'><img src="+picurl+" alt='User Pic'></div><dl class='list-details'><h3>" + firstname + " " + lastname+"</h3><dd>Studied At: "+schoolName+ "</dd><address>"+ location +"</dl><div class='clearfix'></div><a href='#' class='btn btn-lg btn-default'>Catch Up</a></li><br><input type='button' value='Back' class='btn btn-lg btn-default' onclick='back()'>";
						   var geocoder = new google.maps.Geocoder();
								geocoder.geocode( { 'address': location}, function(results, status) {
								if (status == google.maps.GeocoderStatus.OK) {
									  //alert(results[0].geometry.location);
									  var mapProp = {
									  center:results[0].geometry.location,
									  zoom : 4,
									  mapTypeId:google.maps.MapTypeId.ROADMAP
									  };
									  map=new google.maps.Map(document.getElementById("googleMap"),mapProp);		
					                  drawMarker(markerLocation,location,firstname,lastname,getCookie("schoolName"),picurl);
									 }
								});
                          } // for close
						   //alert(connectionsDiv.innerHTML);
					   }// if close
					   else
					   {}
					}
					, function (err) {
						alert("Error: " + err);
					}
					)
		   }// else close
		   else
		   {}
		}
		, function (err) {
			alert("Error: " + err);
		}
		)
  }// if close
  else
  {
    
  }
  $("#beforelogin").hide();
    
}
