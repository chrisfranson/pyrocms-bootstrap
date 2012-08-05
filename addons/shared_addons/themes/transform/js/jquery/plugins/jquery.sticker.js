/*!
 * jQuery Sticker - v0.4 - 7/26/2012
 * https://github.com/chrisfranson/jquery-sticker
 * 
 * Copyright (c) 2012 Chris Franson
 * Dual licensed under the MIT and GPL licenses.
 */
(function($) {
	
	var methods = {
		
		init: function(options) {
			
			var settings = {
				yOffset: 0,
				throttle: 10,
				stopper: false
			};
			
			return this.each(function() {
				
				if (options) $.extend(settings, options);
				
				var $sticker = $(this),
				
					// Make a new copy of settings for this sticker element only
					stickerSettings = $.extend({}, settings);

				// Calculate the window.scrollTop() value for which to fix the sticker
				stickerSettings.scrollThreshold = (stickerSettings.yOffset * -1) + $sticker.offset().top - parseInt($sticker.css('margin-top'), 10);

				// Create an invisible placeholder to preserve the page's layout when we switch
				// the sticker's position to 'fixed' and to get the right width when resizing a fluid layout
				$sticker.data('placeholder',
					$sticker
						.clone()
						.css({ visibility: 'hidden', height: '1px', marginBottom: 0, marginTop: 0 })
						.data('spacing', {
											height: $sticker.css('height'),
											marginBottom: $sticker.css('marginBottom'),
											marginTop: $sticker.css('marginTop')
										 }
						)
				);

				// Add the hidden element to the DOM right now
				$sticker.data('placeholder').insertAfter($sticker).children().remove();

				// Remember some layout CSS for when we switch the position back to the original position
				$sticker.data('originalLayout', {
					position: $sticker.css('position'),
					top: $sticker.css('top'),
					left: $sticker.offset().left - parseInt($sticker.css('margin-left'), 10)
				})

				// If a stopper (element or integer) is provided, we have to do some funky stuff in order to
				// butt the bottom of the sticker up against the top of the stopper. This is because
				// the sticker's parents may have a position other than static.
				if (settings.stopper) {

					// Calculate the window.scrollTop() value for which to make the sticker's bottom
					// butt up against the top of the stopper
					stickerSettings.stopperTop = ($.isNumeric(settings.stopper)) ? settings.stopper : $(settings.stopper).offset().top;
					stickerSettings.stopperTop -= (stickerSettings.yOffset
												   + $sticker.outerHeight()
						 						   + parseInt($sticker.css('margin-top'), 10)
						 						   + parseInt($sticker.css('margin-bottom'), 10)
												  );
				}

				// On resize, update the layout CSS if the element has moved
				$(window).resize(
					$.throttle(60, function() {

						var $placeholder = $sticker.data('placeholder');

						if ( (settings.revertLeft && $placeholder.offset().left <= settings.revertLeft)
							||
							 (settings.revertWindowWidth && $(window).width() <= settings.revertWindowWidth)
							) {

							var originalLayout = $sticker.data('originalLayout');
							$sticker.css('position', originalLayout.position);
						}

						$sticker.css({
							left: $placeholder.offset().left - parseInt($placeholder.css('margin-left'), 10)
						});
						$sticker.width($placeholder.width());

						if (settings.stopper) {

							// Calculate the window.scrollTop() value for which to make the sticker's bottom
							// butt up against the top of the stopper
							stickerSettings.stopperTop = ($.isNumeric(settings.stopper)) ? settings.stopper : $(settings.stopper).offset().top;
							stickerSettings.stopperTop -= (stickerSettings.yOffset
														   + $sticker.outerHeight()
								 						   + parseInt($sticker.css('margin-top'), 10)
								 						   + parseInt($sticker.css('margin-bottom'), 10)
														  );
						}
					})
				);

				// At the beginning of scroll, update the layout CSS if the element has moved
				$(window).scroll(
					$.debounce(250, true, function() {

						var $placeholder = $sticker.data('placeholder');

						// Calculate the window.scrollTop() value for which to fix the sticker
						var position = $sticker.css('position');
						if (position == 'fixed' || position == 'absolute') {
							stickerSettings.scrollThreshold = (stickerSettings.yOffset * -1) + $placeholder.offset().top - parseInt($sticker.css('margin-top'), 10);
						}
						else {
							stickerSettings.scrollThreshold = (stickerSettings.yOffset * -1) + $sticker.offset().top - parseInt($sticker.css('margin-top'), 10);
						}

						// Set the $sticker's left and width based on the respective properties of the placeholder
						$sticker.css({ 
							left: $placeholder.offset().left
						});
						$sticker.width($placeholder.width());

					})
				);

				// Whenever the user scrolls, check to see how the window's scroll position should affect
				// the sticker's position, and update it's position/offset accordingly
				$(window).scroll(

					// settings.throttle allows the user to specify how CPU intensive this effect should be
					$.throttle(settings.throttle, function() {

						var y = $(this).scrollTop(), // y = the current scroll position of the window
							$placeholder = $sticker.data('placeholder');

						// For responsive layouts that collapse columns for small window widths.
						// If the parent column is shifted to the left (at settings.reverLeft pixels),
						// change the $sticker's position to its original properties
						if ( (settings.revertLeft && $placeholder.offset().left <= settings.revertLeft)
							||
							 (settings.revertWindowWidth && $(window).width() <= settings.revertWindowWidth)
							) {

							$sticker.css({
								position: $placeholder.css('position'),
								left: $placeholder.css('left'),
								top: $placeholder.css('top')
							});

							return;
						}

						// If the user has scrolled below the threshold for stickiness
						if (y >= stickerSettings.scrollThreshold) {

							// If a stopper is specified and the user has scrolled to the point where
							// the bottom of the sticker would overlap the top of the stopper
							if (settings.stopper && y >= stickerSettings.stopperTop) {

								// Set the sticker's position to absolute, and its left and top to the proper values
								$sticker
									.css({
										position: 'absolute'
									})
									.offset({
										top: stickerSettings.yOffset + stickerSettings.stopperTop,
										left: $sticker.data('originalLayout').left + $sticker.css('margin-left')
									});

							}
							
							// If no stopper was specified, or if the user hasn't scrolled to the point
							// where the sticker would overlap the stopper
							else {

								// Show the placeholder so that the sticker's parents don't change their width or height
								$placeholder.css($placeholder.data('spacing'));
								
								// Set the sticker's position to fixed, and its left and top to the proper values
								$sticker.css({
									position: 'fixed',
									left: $placeholder.offset().left - parseInt($placeholder.css('margin-left'), 10),
									top: stickerSettings.yOffset
								});

							}
						}

						// If the user has scrolled above the threshold for stickiness
						else {

							// Make the placeholder's outerheight 1px
							$placeholder.css({ visibility: 'hidden', height: '1px', marginBottom: 0, marginTop: 0 });

							// Set the sticker's CSS back to its original values for position and top
							var originalLayout = $sticker.data('originalLayout');
							$sticker.css('position', originalLayout.position);
							$sticker.css('top', originalLayout.top);

						}
					})
				);

			});
			
		} // init method

	};

	// Create the jQuery plugin
	$.fn.sticker = function(method) {
		if (methods[method]) return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		else if (typeof method === 'object' || !method) return methods.init.apply(this, arguments);
		else $.error('jQuery.sticker doesn\'t have a "' + method + '" method');
	};

})(jQuery);

