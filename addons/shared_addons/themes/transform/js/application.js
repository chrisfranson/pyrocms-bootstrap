$(function(){

		$('#app_signup').load(SITE_URL+'grants/application/register form#register', function(){
			var $register = $('form#register');
		
			// submit the registration form
			$register.on('submit', function(e){
				$.post(SITE_URL+'grants/application/register', $register.serialize(), function(data){

					var regexp = new RegExp('<form');
					// check if it redirected and spit out html or if it's our json string
					if (regexp.test(data)){
						$register.prepend($(data).find('.alert'));
					} else {
						
						var result = $.parseJSON(data);
						window.location.replace($('#redirect_to').val());

					}
				});
				return false;
			});
		});

});