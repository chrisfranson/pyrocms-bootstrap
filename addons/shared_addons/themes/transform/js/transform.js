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

	// open review Scoring guide in a new window
	$('a.external').click(function() {
		window.open($(this).attr('href'));

		return false;
	});


	$('a.gmap-link').hover(
		function() {
			$(this).find('img').attr('src', function(index, attr) {
				return attr.replace('tan', 'color');
			});
		},
		function() {
			$(this).find('img').attr('src', function(index, attr) {
				return attr.replace('color', 'tan');
			});
		}
	);

	setTimeout(function() {
		var $alert = $('div.alert');

		$alert.find('a.close').fadeTo(200, 0); // This is a hack so that the close link fades out in IE
		$alert.fadeTo(200, 0);
		$alert.slideUp(400, function(){
			$(window).trigger('notification-closed');
			$alert.remove();
		});

	}, 4000);

	$('.user-dropdown .dropdown-toggle').dropdown();

	$('.sticky-auto').sticker({
		yOffset: 60,
		stopper: 'footer',
		revertWindowWidth: 655
	});

	$('.sticky-nav').sticker({
		revertWindowWidth: 655
	});

	$('.popover-link').popover();

});