!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

$(function(){

	$('[rel=tooltip]').tooltip();

	// All modal links should open in a new window
	$('.modal a').attr('target', '_blank');

	$('[rel=tooltip]').click(function() {

		$('[rel=tooltip]').tooltip('hide');

	});

	$('#disable_screen, #loading_message').fadeOut('slow');

	// Fluid width video
	$('.container-fluid').fitVids();

	// Sort Filters
	$('.dropdown-menu').on('click', '.sort', function(e) {
		e.preventDefault();
		var post = { sort_by : $(this).attr('data-sort'), limit: $(this).attr('data-limit') };

		$.post(SITE_URL+'grants/grant_ajax/get_grants', post, function(data){
			$('ul#application-list').quicksand($(data).find('li'), { attribute : 'data-application', easing : 'easeInOutQuad' }, function() { twttr.widgets.load(); FB.Share.renderAll(); } );
					
		});
	});

	// voting buttons
	$('.project-listing').on('click', '.btn-vote', function(e){
		e.preventDefault();
		var url = $(this).attr('data-vote');
		var $item = $(this);

		$.get(url, function(data){
			var result = $.parseJSON(data);

			switch (result.action){
				case false:
					$('#login-form').modal('show');
					$item.addClass('pending-vote');
				break;

				case 'voted':
					$(e.target).removeClass('btn-primary').addClass('btn-success').html(ACCEPT_APPLICATIONS ? 'VOTED' : 'VOLUNTEERED');
				break;

				case 'updated':
					$(e.target).removeClass('btn-success').addClass('btn-primary').html(ACCEPT_APPLICATIONS ? 'VOTE' : 'VOLUNTEER');
				break;
			}
		});
	});

	// log them in via ajax from the bootstrap modal
	$form = $('#login-form form');
	$form.on('submit', function(e){
		e.preventDefault();
		var post = {}
		post.email 		= $form.find('#email').val();
		post.password 	= $form.find('#password').val();
		post.remember 	= $form.find('#remember').val();

		$.post($form.attr('action'), post, function(data){
			var result = $.parseJSON(data);
			$form.find('#messages').html(result.message);

			if (result.status){
				$form.find('#messages').empty();
				$('#login-form').modal('hide');
				$('.pending-vote').click();

				// update their user menu
				$('.navbar-inner').find('ul.pull-right').remove();
				$('.navbar-inner').find('.nav-collapse').append(
					'<ul class="nav pull-right">'+
						'<li class="dropdown">'+
							'<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+result.data.username+'<b class="caret"></b></a>'+
							'<ul class="dropdown-menu">'+     
								'<li><a href="'+SITE_URL+'apply/my-apps">My Applications</a></li>'+
								'<li><a href="'+SITE_URL+'edit-profile">Edit Profile</a></li>'+
								'<li class="divider"></li>'+
								'<li><a href="'+SITE_URL+'users/logout">Logout</a></li>'+
							'</ul>'+
						'</li>'+
					'</ul>');
			}
		});
	});


	// show registration form during Voting process
	$form.on('click', '.register', function(e){
		e.preventDefault();

		$('.modal').load(SITE_URL+'grants/application/register form#register', function(){
			var $register = $('form#register');

			$('.modal').prepend('<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h2>Registration</h2></div>');
			$register.find('li').has('input[type="submit"]').remove();
			$register.append('<div class="modal-footer"><input type="submit" value="Register" name="btnRegister" class="btn btn-primary"></div>');
		
			// submit the registration form
			$register.on('submit', function(e){
				$.post(SITE_URL+'grants/application/register', $register.serialize(), function(data){

					var regexp = new RegExp('<form');
					// check if it redirected and spit out html or if it's our json string
					if (regexp.test(data)){
						$register.find('.alert').remove();
						$register.prepend($(data).find('.alert'));
					} else {
						var result = $.parseJSON(data);

						$('#login-form').modal('hide');
						$('.pending-vote').click();

						// update their user menu
						$('.navbar-inner').find('ul.pull-right').remove();
						$('.navbar-inner').find('.nav-collapse').append(
							'<ul class="nav pull-right">'+
								'<li class="dropdown">'+
									'<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+result.data.username+'<b class="caret"></b></a>'+
									'<ul class="dropdown-menu">'+     
										'<li><a href="'+SITE_URL+'apply/my-apps">My Applications</a></li>'+
										'<li><a href="'+SITE_URL+'edit-profile">Edit Profile</a></li>'+
										'<li class="divider"></li>'+
										'<li><a href="'+SITE_URL+'users/logout">Logout</a></li>'+
									'</ul>'+
								'</li>'+
							'</ul>');
					}
				});
				return false;
			});
		});
	});

	// scroll to the item that the link brought them to see
	if ($('#public-view').length > 0){
		var segments = window.location.href.split('/');
		var hash = segments[segments.length - 1];
		var $selected = $('#public-view').find('[data-application="'+hash+'"]');

		if ($selected.length > 0){
			$.scrollTo($selected.offset().top - 100, {duration: 750});
		}
		
		$selected.addClass('alert-info');

		// allow them to remove the selection
		$('#application-list').on('click', '.alert-info', function(){
			$(this).removeClass('alert-info');
		});
	}

	// prevent Enter from submitting the form during app review
	$('#review_form').keypress(function(e){
		if (e.which == 13) {
			return false;
		}
	});

	// submit their disclosure confirmation from the app reviewer listing page
	$('input.disclosure').change(function(){
		$('.container-fluid').append('<form id="disclosure" method="post" action="' + SITE_URL + 'grants/review/apps"><input name="disclosure" type="hidden" value="accept"/></form>');
		$('#disclosure').submit();
	});

	// catch the review submission and make sure they have agreed to disclosure policy
	$('.disclosure-prompt').click(function(e){
		e.preventDefault();
		$('#disclosure-modal').modal('show');
	});

	$('.add-disclosure').click(function(e){
		e.preventDefault();
		$('#review_form').submit();
	});

	$('.no-disclosure').click(function(e){
		e.preventDefault();
		$('#disclosure-text').val('');
		$('#review_form').submit();
	});

	// open review Scoring guide in a new window
	$('a.external').click(function() {
		window.open($(this).attr('href'));

		return false;
	});
});