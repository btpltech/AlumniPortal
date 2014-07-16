var App_Debug = true;

function displayjobs(userid) {
	// searchcustom();
	var schoolName = getCookie("schoolName");
	var resultDiv = document.getElementById("results1234");
	var MobileServiceClient = WindowsAzure.MobileServiceClient;
	var client1 = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
	var tableName2= "college";
	var todoItemTable12 = client1.getTable(tableName2);
	var query12=todoItemTable12.select("college_id").where( {
		college : schoolName
	}
	).read().done(function (results) {
		if(results.length !=0){
			last_college_id = results[0].college_id;
			setCookie("lastCollege",last_college_id,365);
			var todoItemTable123 = client1.getTable("college");
			var college;
			var query11 = todoItemTable123.select("college").where({college_id : last_college_id}).read().done(function(res) {
				if(res.length !=0) {
					college = res[0].college;
					//alert(college);
					if(App_Debug)
						console.log("entering "+ college+" Id "+last_college_id);
					// document.getElementById("College1").innerHTML = college;
					// document.getElementById("College").innerHTML = college;
				}
			}
			,function (err) {
				alert("Error: " + err);
			}
			)
			var todoItemTable1 = client1.getTable("companyTperson");
			var query1 = todoItemTable1.select("persons","company_id").where( {
				college_id : last_college_id
			}
			).read().done(function(results1) {
				if(results1.length !=0) {
					for (var i=0;i<results1.length;i++) {
						//alert(results1[i].company_id);
						//alert(results1[i].persons);
						var company_id = results1[i].company_id;
						var people_ids = results1[i].persons.split(',');
						var count = people_ids.length;
						var cc = results1.length;
						if(App_Debug)
						console.log("companyTperson company "+company_id+" people_ids "+people_ids+" count "+cc);
						// 1386229430809
						var todoItemTable2 = client1.getTable("job");
						var query2 = todoItemTable2.select("comp_id","location","description","title").where( {
							comp_id : company_id
						}
						).read().done(function(results2) {
							if(results2.length !=0) {
								var companyId  = results2[0].comp_id;
								var location   = results2[0].location;
								var description = results2[0].description;
								var title	   = results2[0].title;
								// code for getting name of company
								if(App_Debug)
									console.log("job table data Title "+title+" Location "+location+" company "+companyId);

								var todoItemTable312 = client1.getTable("company");
								var query4 = todoItemTable312.select("company_name")
																.read().done(function(results3) {
									if(results3.length !=0) {
										var company_name = results3[0].company_name;
										title       = title.replace(/"/g, "");
										title       = title.replace('[','');
										title       = title.replace(']','');
										description	= description.replace(/"/g, "");
										description	= description.replace(']','');				
										description	= description.replace('[','');								
										if(title.length >= 25)
										   title    = title.substr(0,25)+"..."; 
										if(description.length >= 75)
										 description = description.substr(0,75)+"..."; 
										if(location.length >= 15)
										  location  = location.substr(0,10)+"...";
										resultDiv.innerHTML += "<li class='col-lg-4' style='padding:10px; width: 30%;'><h3>" + title +"</h3>"+ description + "<address>"+ location +"</address><div class='clearfix'></div><div class='job-info'><a href='#' onClick= getRecommendedPeople("+ company_id +")> "+ count +" others recommended you for this job</a></div></li>";
										//$("#results").append(NewDiv);
									}
									// if close
								}
								,function (err) {
									alert("Error: " + err);
								}
								)
							}
							// if close
						}
						,function (err) {
							alert("Error: " + err);
						}
						)
					}
					// for close
				}
				// if close
			}
			,function (err) {
				alert("Error: " + err);
			}
			)
		}
		// if close
	}
	,function (err) {
		alert("Error: " + err);
	}
	)
}

// function insertcustom() {		
// 		var MobileServiceClient = WindowsAzure.MobileServiceClient;
// 		var client1 = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
// 		var todoItemTable1 = client1.getTable("companyTperson");
// 		todoItemTable1.insert( {
// 						college_id:1388125203211, company_id:1386164725239, persons:1388731662095
// 				});
// }

function searchcustom(){
	var MobileServiceClient = WindowsAzure.MobileServiceClient;
	var client1 = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
	var todoItemTable1 = client1.getTable("user_detail");
	var query1 = todoItemTable1.select("firstname").where( {
				last_college_id : 1388990543509
			}).read().done(function(results1) {
				if(results1.length !=0) {
					for (var i=0;i<results1.length;i++) {
						var firstname = results1[i].firstname;
						if(App_Debug)
							console.log("Firstname "+firstname+" Exists");
					}
				}
			});
}

function getRecommendedPeople(company_id) {	
	var collage_id = getCookie("lastCollege");
	var MobileServiceClient = WindowsAzure.MobileServiceClient;
	var client1 = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
	var todoItemTable1 = client1.getTable("companyTperson");
	var query1 = todoItemTable1.select("persons").where({college_id : collage_id},{company_id : company_id})
	.read().done(function(results1) {
				if(results1.length !=0) {
					for (var i=0;i<results1.length;i++) {
						var people_ids = results1[i].persons.split(',');
					

	var todoItemTable = client1.getTable("user_detail");
	var query = todoItemTable.select("firstname","lastname","location","picurl").where( {
		userid : people_ids[0]
	}).read().done(function(results) {
		if(results.length !=0) {
			for (var i=0;i<results.length;i++) {
				var firstname = results[i].firstname;
				var lastname = results[i].lastname;
				var location = results[i].location;
				var picurl = results[i].picurl;
				alert(picurl+""+firstname+""+lastname+""+location)
				if(App_Debug)
					console.log("name "+firstname+""+lastname+" Location "+location+" Picurl "+picurl);
			}
		}
	});
	}
				}
			});
}

function searchMyJob() {
	var searchText = document.getElementById("search123").value;
	var Parent = document.getElementById('results1234');
	Parent.innerHTML = '';
	$.getJSON("http://168.63.232.51:8983/solr/select/?q="+searchText+"&wt=json&json.wrf=?&indent=true&rows=10", function(result) {
		for (var i = 0; i < result.response.docs.length; i++) {
			var company_id = result.response.docs[i].company_id;
			//alert(company_id);
			var college_id = getCookie("lastCollege");
			//alert(college_id);		  
			/*
		  var MobileServiceClient = WindowsAzure.MobileServiceClient;
		  var client1 = new MobileServiceClient('https://jobaggrigation.azure-mobile.net/', 'MtGtKEhSbayTQRbxXVnveMqDUhsBgV40');
		  var todoItemTable = client1.getTable("companyTperson");
		  var query = todoItemTable.select("persons").where({company_id : company_id, college_id : college_id}).read().done(function(results){
		  if(results.length !=0)
			{
			   alert(results[0].persons);
			}
			else
			{
			   var thisResult = "<div class=\"list-body\"><div class=\"list-pic\"></div><dl class=\"list-details\">"+"<h1>" + result.response.docs[i].title + "</h1><dd>" + result.response.docs[i].description
		       + "</dd><address>" + result.response.docs[i].location + "</address></dl> <div class=\"clearfix\"></div></div>"+'<div class="job-info"></div>';
			   var NewDiv = document.createElement("li");
			   $(NewDiv).addClass("list-body");
			   NewDiv.innerHTML = thisResult+"</li>";
			   Parent.appendChild(NewDiv);
			}
			},function (err) {
			   alert("Error: " + err);
			})
			*/
			var title       = JSON.stringify(result.response.docs[i].title);
			    title       = title.replace(/"/g, "");
				title       = title.replace('[','');
				title       = title.replace(']','');
			var description = JSON.stringify(result.response.docs[i].description);
	            description	= description.replace(/"/g, "");
                description	= description.replace(']','');				
                description	= description.replace('[','');								
			var location    = result.response.docs[i].location;
			    location    = location.replace(/"/g,"");
				location    = location.replace(']',"");
				location    = location.replace('[',"");
			if(title.length >= 25)
				title       = title.substr(0,25)+"..."; 
			if(description.length >= 75)
				 description = description.substr(0,75)+"..."; 
			if(location.length >= 30)
			    location    = location.substr(0,30)+"...";
			// var thisResult = "<div class=\"list-body\"><div class=\"list-pic\"></div><dl class=\"list-details\" style=\"width:100%\">"+"<h1>" + title + "</h1><dd>" + description
								        + "</dd><address>" + location + "</address></dl> <div class=\"clearfix\"></div></div>"+'<div class="job-info">'+Math.floor((Math.random()*10))+' people has recommended this job</div>';
			
			Parent.innerHTML += "<li class='col-lg-4' style='padding:10px; width: 30%;'><h3>" + title +"</h3>"+ description + "<address>"+ location +"</address><div class='clearfix'></div><div class='job-info'><a href='#' onClick= getRecommendedPeople("+ company_id +")>others recommended you for this job</a></div></li>";
			
			// var NewDiv = document.createElement("li");
			// $(NewDiv).addClass("list-body");
			// NewDiv.innerHTML = thisResult+"</li>";
			// Parent.appendChild(NewDiv);
		}
	}
	);
}