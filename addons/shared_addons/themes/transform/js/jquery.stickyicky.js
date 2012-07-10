/* ==========================================================
 * jquery-stickyicky.js
 * https://github.com/adamfairholm/jQuery-Stickyicky
 * ==========================================================
 * Copyright 2012 Adam Fairholm
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING*
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 * ========================================================== */

jQuery.fn.stickyicky = function(offset){

	// Make sure we have a numerical offset
	if ( ! offset)
	{
		offset = 0;
	}

	// Get our ID so we can use it if the
	// window.onscroll function.
	var id = $(this).attr('id');

	// We are going to create a container div
	// so we always know the relative div position
	// even when we have the content div set to fixed.
	var parent_div = id+'_stickyicky_wrap';
	$(this).wrap('<div id=\"'+parent_div+'\" />');

	// Every time we have a scroll action, evaluate
	// where our div is in relation to the top of the page
	window.onscroll = function()
	{
		var wrap_pos = ($('#'+parent_div).offset().top - $(window).scrollTop())-offset;

		if(wrap_pos <= 0)
		{
			// console.log();
			$('#'+id).css('position', 'fixed').css('top', offset+'px').css('left', 'auto');
		}
		else
		{
			$('#'+id).css('position', 'inherit');
		}
	}

};