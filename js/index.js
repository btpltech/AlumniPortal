	   /*
	   $("#searchPeople").submit(function(event){
		    event.preventDefault();
		});
		*/
		// job submit prevention
		
		$("#search123").submit(function(event){
		    event.preventDefault();
		});
		
		function LogOut()
		{
                  IN.User.logout(afterLogout, afterlogoutScope);
		}
		function afterLogout()
		{
                 location.reload();
		}
		function afterlogoutScope()
		{}
		
	function back()
	{
	  $("#connections").show();
	  $("#info").hide();
	  showMarker();
	}