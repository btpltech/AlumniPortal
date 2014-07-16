function showPeopleDiv()
{ 
  $("#peoplecontent").show();
  $("#jobcontent").hide();
  $("#maincontent").hide();
  $("#jobsearchnavbar").hide();
}

function getSetPage()
{
  $.post('set.html','',function(data){
        $("#people").hide();
        $("#searchConnections").hide();
    $("#jobs").remove();
  $("<div id=\"set\"></div>").appendTo("#ParentDiv"); 
  $("#set").html(data);
  });
}

function showJobsDiv()
{  
  $("#topright-nav").show();
  $("#jobsearchnavbar").show();
  $("#maincontent").hide();
  $("#peoplecontent").hide();
  $("#jobcontent").show();
  var id = getCookie("id");
  displayjobs(id);
}
function showindexpage()
{

}