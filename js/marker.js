function showMarker(){
    //alert("reached");  
    var id = getCookie("id");
	//alert(id);
	var MobileServiceClient = WindowsAzure.MobileServiceClient;
	var client = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
	var todoItemTable = client.getTable("user_detail");
    var query=todoItemTable.select("last_college_id").where( {
		userid :id
	}
	).read().done(function (results) {
	   //alert(JSON.stringify(results));
	   if(results.length != 0)
	   {
	     var college_id = results[0].last_college_id;
	           var query=todoItemTable.select("location","last_company_id","firstname","lastname","location","picurl","markerLocation").where( {
					last_college_id : college_id
				}
				).read().done(function (results) {
				   if(results.length != 0)
				   {
					 //var college_id = results[0].last_college_id;
					 //alert(JSON.stringify(results));
					 var lcoationArray = new Array();
                     for(var i = 0;i < results.length ;i++)
                     {
					   var firstname = results[i].firstname;
					   var lastname = results[i].lastname;
					   var last_company_id = results[i].last_company_id;
					   var location = results[i].location;
					   var markerLocation = results[i].markerLocation;
					   var picurl = results[i].picurl;
					   //alert(markerLocation);
            		   drawMarker(markerLocation,location,firstname,lastname,getCookie("schoolName"),picurl);
					 }					 
				   }// else close
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
} // functoin close
function drawMarker(markerLocation,location,firstname,lastname,schoolName,picurl)
{
    //alert(markerLocation);
    if(markerLocation)
	{
    var k = 0;
    var geocoder     = new google.maps.Geocoder();
    var infowindow   = new google.maps.InfoWindow();
	var markerBounds = new google.maps.LatLngBounds();
	    var data = JSON.parse(markerLocation);
		var latitude  = data.nb;
		var longitude = data.ob;
	var latlng = new google.maps.LatLng(latitude,longitude);
	//alert(markerLocation);
		//alert(latlng);
	//var latlng = "("+latitude+","+longitude+")";
	//var latlng = $.parseJSON(markerLocation);
	marker = new google.maps.Marker({
		map:map,
		draggable:true,
		animation: google.maps.Animation.DROP,
		position: latlng
	  });
	google.maps.event.addListener(marker, 'click', (function(marker) {
    return function() {
	 	 $("#connections").hide();
		 $("#info").show();                  
		 $("#searchConnections").hide();
	     document.getElementById("info").innerHTML = "<li class='col-lg-4' style='padding:10px;'><div class='list-pic'><img src="+picurl+" alt='User Pic'></div><dl class='list-details'><h3>" +firstname+" "+lastname+"</h3><dd>Studied At: "+schoolName+ "</dd><address>"+ location +"</dl><div class='clearfix'></div><a href='#' class='btn btn-lg btn-default'>Catch Up</a></li><br><input type='button' value='Back' class='btn btn-lg btn-default' onclick='back()'>";
    }
  })(marker));
  }
} // functon close