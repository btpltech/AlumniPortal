var map;
var addressArray1 = [];
var index = 0;
function initialize(location)
{
  //alert(location);
  if(location !=0)
  {
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
	    }
		});
}
 else
 {
      var mapProp = {
	  center:new google.maps.LatLng(51.508742,-0.120850),
	  zoom : 6,
	  mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
	 map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
   
 }
 }
 function reInitialize(location)
{
  //alert(location);
  if(location)
  {
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
	    }
		});
}
 else
 {
      var mapProp = {
	  center:new google.maps.LatLng(51.508742,-0.120850),
	  zoom : 6,
	  mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
	 map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
   
 }
 }

//google.maps.event.addDomListener(window, 'load', initialize);
function linkedinmarker(addressArray,userArray,markArray,industryArray,locArray){
    var k = 0;
    //var addressArray = new Array("41 Green Ln, Handsworth, Birmingham, West Midlands B21 0DE, UK","BT27 4SB","Norwich","delhi, India","Australlia","Rusia","Masko","Finland","Sri Lanka","Japan");
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();
	var markerBounds = new google.maps.LatLngBounds();
	for (var i = 0;  i < addressArray.length ; i++) {
		geocoder.geocode( { 'address': addressArray[i]}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		    var marker = new google.maps.Marker({
			map: map,
			position: results[0].geometry.location,
		});
		
		
        //makeInfoWindowEvent(map, infowindow, contentString, marker);
				
		google.maps.event.addListener(marker, 'click', (function(marker, k) {
			  return function() {
			  $("#connections").hide();
			  $("#info").show();                  
			    document.getElementById("info").innerHTML = "<li class='col-lg-4' style='padding:10px;'><div class='list-pic'><img src="+markArray[k]+" alt='User Pic'></div><dl class='list-details'><h1>" +userArray[k]+"</h1><dd>"+industryArray[k]+ "</dd><address>"+ locArray[k] +"</dl><div class='clearfix'></div><a href='#' class='btn btn-lg btn-default'>Catch Up</a><a href='#' class='btn btn-lg btn-default'>View Full Profile</a></li><br><input type='button' value='Back' class='btn btn-lg btn-default' onclick='back()'>";
			   }
			  })(marker, k++));
			  
			  /*
			  google.maps.event.addListener(marker, 'click', function () {
				$("#connections").hide();
			    $("#info").show();                  
			    document.getElementById("info").innerHTML = "<li class='col-lg-4' style='padding:10px;'><div class='list-pic'><img src="+markArray[k]+" alt='User Pic'></div><dl class='list-details'><h1>" +userArray[k]+"</h1><dd>"+industryArray[k]+ "</dd><address>"+ locArray[k] +"</dl><div class='clearfix'></div><a href='#' class='btn btn-lg btn-default'>Catch Up</a></li><br><input type='button' value='Back' class='btn btn-lg btn-default' onclick='back()'>";
			 	k++;
				});
				*/
		} 
		else 
		{
		   //alert("Geocode was not successful for the following reason: amit" + status);
		}
		});
	}
}
function makeInfoWindowEvent(map, infowindow, contentString, marker) {
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}