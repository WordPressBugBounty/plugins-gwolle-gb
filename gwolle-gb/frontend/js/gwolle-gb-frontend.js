
/*
Copyright 2014 - 2025  Marcel Pol  (email: marcel@timelord.nl)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/


/*
 * JavaScript for Gwolle Guestbook Frontend.
 */


// Define it in main scope.
// deprecated since 4.9.0, remove this callback sometime soon.
var gwolle_gb_ajax_callback;
// This will load it before 'document' and 'window' (well, sometimes).
jQuery( window ).on( 'load', function() {
	gwolle_gb_ajax_callback = jQuery.Callbacks(); // Callback function to be fired after AJAX request.
});


/*
 * Run this function after changes in the guestbook.
 * It will hook events at each entry, for situations where there have been entries added.
 */
function gwolle_gb_frontend_callback_function() {

	if ( typeof gwolle_gb_readmore === 'function' ) {
		gwolle_gb_readmore();
	}
	if ( typeof gwolle_gb_readless === 'function' ) {
		gwolle_gb_readless();
	}
	if ( typeof gwolle_gb_metabox_handle === 'function' ) {
		gwolle_gb_metabox_handle();
	}
	if ( typeof gwolle_gb_reset_used_characters === 'function' ) {
		gwolle_gb_reset_used_characters();
	}

	// For add-on.
	if ( typeof gwolle_gb_addon_frontend_callback_function === 'function' ) {
		gwolle_gb_addon_frontend_callback_function();
	}

}
jQuery(document).ready(function($) {
	gwolle_gb_frontend_callback_function();
});


/*
 * Click the button and the form becomes visible.
 */
document.addEventListener('DOMContentLoaded', function () {

	document.querySelectorAll( 'div.gwolle-gb-write-button input' ).forEach( button => {
		button.addEventListener( 'click', function (e) {
			const main_div = button.closest( 'div.gwolle-gb' );
			const write_button = main_div.querySelector( 'div.gwolle-gb-write-button' );
			const form = main_div.querySelector( 'form.gwolle-gb-write' );

			write_button.style.height = '0px';
			write_button.classList.add( 'gwolle-gb-hide' );
			write_button.style.transition = 'none';
			write_button.setAttribute( 'aria-expanded', 'true' );

			form.style.height = '0px';
			form.classList.remove( 'gwolle-gb-hide' );
			form.style.transition = 'height 0.9s linear';
			form.style.height = form.scrollHeight + 'px';
			setTimeout(() => {
				form.style.height = 'auto';
				form.style.transition = 'none';
			}, 900);

			e.preventDefault();
		});
	});

	document.querySelectorAll( 'button.gb-notice-dismiss' ).forEach( button => {
		button.addEventListener( 'click', function (e) {
			const main_div = button.closest( 'div.gwolle-gb' );
			const write_button = main_div.querySelector( 'div.gwolle-gb-write-button' );
			const form = main_div.querySelector( 'form.gwolle-gb-write' );

			form.style.height = '0px';
			form.classList.add( 'gwolle-gb-hide' );
			form.style.transition = 'none';
			write_button.setAttribute( 'aria-expanded', 'false' );

			write_button.style.height = '0px';
			write_button.classList.remove( 'gwolle-gb-hide' );
			write_button.style.transition = 'height 0.3s linear';
			write_button.style.height = write_button.scrollHeight + 'px';
			setTimeout(() => {
				write_button.style.height = 'auto';
				write_button.style.transition = 'none';
			}, 300);

			e.preventDefault();
		});
	});

});


/*
 * Click the readmore and the full content of that entry becomes visible.
 */
function gwolle_gb_readmore() {

	const links = document.querySelectorAll( '.gb-entry-content .gwolle-gb-readmore' );
	links.forEach( link => {
		link.removeEventListener( 'click', gwolle_gb_readmore_open );
		link.addEventListener( 'click', gwolle_gb_readmore_open );
	});

	const links_a = document.querySelectorAll( '.gb-entry-admin_reply .gwolle-gb-readmore-admin_reply' );
	links_a.forEach( link => {
		link.removeEventListener( 'click', gwolle_gb_readmore_open_admin_reply );
		link.addEventListener( 'click', gwolle_gb_readmore_open_admin_reply );
	});

}
function gwolle_gb_readmore_open( event ) {

	const content = event.currentTarget.closest( 'div.gb-entry-content' );
	const excerpt = content.querySelector( 'div.gb-entry-excerpt' );
	const full_content = content.querySelector( 'div.gb-entry-full-content' );

	excerpt.classList.add( 'gwolle-gb-hide' );

	full_content.style.height = '0px';
	full_content.classList.remove( 'gwolle-gb-hide' );
	full_content.style.transition = 'height 0.3s linear';
	full_content.style.height = full_content.scrollHeight + 'px';
	setTimeout(() => {
		full_content.style.height = 'auto';
		full_content.style.transition = 'none';
	}, 300);

	event.preventDefault();

}
function gwolle_gb_readmore_open_admin_reply( event ) {

	const content = event.currentTarget.closest( 'div.gb-entry-admin_reply' );
	const excerpt = content.querySelector( 'div.gb-admin_reply-excerpt' );
	const full_content = content.querySelector( 'div.gb-admin_reply-full-content' );

	excerpt.classList.add( 'gwolle-gb-hide' );

	full_content.style.height = '0px';
	full_content.classList.remove( 'gwolle-gb-hide' );
	full_content.style.transition = 'height 0.3s linear';
	full_content.style.height = full_content.scrollHeight + 'px';
	setTimeout(() => {
		full_content.style.height = 'auto';
		full_content.style.transition = 'none';
	}, 300);

	event.preventDefault();

}
/* And collapse that again. */
function gwolle_gb_readless() {

	const links = document.querySelectorAll( '.gb-entry-content .gwolle-gb-readless' );
	links.forEach( link => {
		link.removeEventListener( 'click', gwolle_gb_readless_open );
		link.addEventListener( 'click', gwolle_gb_readless_open );
	});

	const links_a = document.querySelectorAll( '.gb-entry-admin_reply .gwolle-gb-readless-admin_reply' );
	links_a.forEach( link => {
		link.removeEventListener( 'click', gwolle_gb_readless_open_admin_reply );
		link.addEventListener( 'click', gwolle_gb_readless_open_admin_reply );
	});

}
function gwolle_gb_readless_open( event ) {

	const content = event.currentTarget.closest( 'div.gb-entry-content' );
	const excerpt = content.querySelector( 'div.gb-entry-excerpt' );
	const full_content = content.querySelector( 'div.gb-entry-full-content' );

	full_content.classList.add( 'gwolle-gb-hide' );

	excerpt.classList.remove( 'gwolle-gb-hide' );

	event.preventDefault();

}
function gwolle_gb_readless_open_admin_reply( event ) {

	const content = event.currentTarget.closest( 'div.gb-entry-admin_reply' );
	const excerpt = content.querySelector( 'div.gb-admin_reply-excerpt' );
	const full_content = content.querySelector( 'div.gb-admin_reply-full-content' );

	full_content.classList.add( 'gwolle-gb-hide' );

	excerpt.classList.remove( 'gwolle-gb-hide' );

	event.preventDefault();

}

/*
 * Metabox, toggle on and off.
 */
function gwolle_gb_metabox_handle() {

	const handles = document.querySelectorAll('button.gb-metabox-handle');

	handles.forEach( handle => {
		handle.removeEventListener( 'click', gwolle_gb_metabox_toggle );
		handle.addEventListener( 'click', gwolle_gb_metabox_toggle );
	});

}
function gwolle_gb_metabox_toggle( event ) {

	const article = event.currentTarget.closest( 'article' );
	const metabox = article.querySelector( 'div.gb-metabox' );
	const metabox_handle = article.querySelector( 'button.gb-metabox-handle' );
	if (metabox.style.visibility === 'hidden' || getComputedStyle(metabox).visibility === 'hidden') {
		// reset all
		document.querySelectorAll('div.gb-metabox').forEach( metabox => {
			metabox.style.opacity = 0;
			metabox.style.visibility = 'hidden';
		});
		document.querySelectorAll('button.gb-metabox-handle').forEach( metabox_handle => {
			metabox_handle.setAttribute( 'aria-expanded', 'false' );
			//metabox_handle.style.outlineStyle = 'none';
		});
		metabox.style.transition = 'opacity 0.4s linear';
		metabox.style.opacity = 1;
		metabox.style.visibility = 'visible';
		metabox_handle.setAttribute( 'aria-expanded', 'true' );
		//metabox_handle.style.outlineStyle = 'solid';
	} else {
		metabox.style.opacity = 0;
		metabox.style.visibility = 'hidden';
		metabox_handle.setAttribute( 'aria-expanded', 'false' );
		//metabox_handle.style.outlineStyle = 'none';
	}
	event.preventDefault();

}


/*
 * Infinite Scroll. Get more pages when you are at the bottom.
 * This function does not support multiple lists on one page.
 */
var gwolle_gb_scroll_on = true; // The end has not been reached yet. We still get entries back.
var gwolle_gb_scroll_busy = false; // Handle async well. Only one request at a time.

document.addEventListener("DOMContentLoaded", () => {

	const gwolle_gb_read = document.querySelector( '.gwolle-gb-read' );

	if ( gwolle_gb_read && gwolle_gb_read.classList.contains( 'gwolle-gb-infinite' ) ) {
		var gwolle_gb_scroll_count = 2; // We already have page 1 listed.

		var gwolle_gb_load_message = '<div class="gb-entry gwolle_gb_load_message">' + gwolle_gb_frontend_script.load_message + '</div>';
		gwolle_gb_read.insertAdjacentHTML( 'beforeend', gwolle_gb_load_message ); // append the loading message.

		window.addEventListener( 'scroll', () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop; // use window.scrollY for compatibility.
			const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - 10; // have 10px diff for sensitivity.

			if ( scrollTop > scrollBottom && window.gwolle_gb_scroll_on === true && window.gwolle_gb_scroll_busy === false ) {
				gwolle_gb_scroll_busy = true;
				gwolle_gb_load_page( gwolle_gb_scroll_count );
				gwolle_gb_scroll_count++;
				gwolle_gb_scroll_busy = false;
			}
		});
	}

});
function gwolle_gb_load_page(page) {

	const load_message = document.querySelectorAll('.gwolle_gb_load_message');
	load_message.forEach( function( el ) {
		el.style.display = 'block';
	});

	const gwolle_gb_read = document.querySelector(".gwolle-gb-read");
	const book_id = gwolle_gb_read ? gwolle_gb_read.getAttribute( 'data-book_id' ) : '';

	const gwolle_gb_end_message = '<div class="gb-entry gwolle_gb_end_message">' + gwolle_gb_frontend_script.end_message + '</div>';

	const formData = new FormData();
	formData.append( 'action', 'gwolle_gb_infinite_scroll' );
	formData.append( 'pageNum', page );
	formData.append( 'permalink', window.location.href );
	formData.append( 'book_id', book_id );

	fetch( gwolle_gb_frontend_script.ajax_url, {
		method: 'POST',
		body: formData,
	})
	.then(response => response.text())
	.then(responseText => {

		load_message.forEach( function( el ) {
			el.style.display = 'none';
		});

		if (responseText === 'false') {
			if ( gwolle_gb_read ) {
				gwolle_gb_read.insertAdjacentHTML( 'beforeend', gwolle_gb_end_message );
			}
			gwolle_gb_scroll_on = false;
		} else {
			if ( gwolle_gb_read ) {
				gwolle_gb_read.insertAdjacentHTML( 'beforeend', responseText );
			}
		}

		if (typeof gwolle_gb_frontend_callback_function === 'function') {
			// Run callback for after ajax event. Used for metabox-handle for new entries among other things.
			gwolle_gb_frontend_callback_function();
		}

	//})
	//.catch( error => {
		// handle the error
	});

	return true;

}


/*
 * Mangle data for the honeypot.
 */
document.addEventListener("DOMContentLoaded", () => {

	document.querySelectorAll('form.gwolle-gb-write')?.forEach( function(form) {

		var honeypot  = gwolle_gb_frontend_script.honeypot;
		var honeypot2 = gwolle_gb_frontend_script.honeypot2;

		var honeypot_val  = parseInt( form.querySelector(`input.${honeypot}`)?.value, 10 );
		var honeypot2_val = parseInt( form.querySelector(`input.${honeypot2}`)?.value, 10 );

		if ( ! isNaN( honeypot_val ) && (typeof honeypot_val != "undefined") && (typeof honeypot2_val != "undefined") ) {
			if ( honeypot_val > 0 ) {
				form.querySelector(`input.${honeypot2}`).value = honeypot_val;
				form.querySelector(`input.${honeypot}`).value = '';
			}
		}

	});

});


/*
 * Mangle data for the form timeout.
 */
document.addEventListener("DOMContentLoaded", () => {

	document.querySelectorAll('form.gwolle-gb-write')?.forEach( function(form) {

		var timeout  = gwolle_gb_frontend_script.timeout;
		var timeout2 = gwolle_gb_frontend_script.timeout2;

		var timer  = parseInt( form.querySelector(`input.${timeout}`)?.value, 10 );
		var timer2 = parseInt( form.querySelector(`input.${timeout2}`)?.value, 10 );

		if ( ! isNaN( timer ) && ! isNaN( timer2 ) && (typeof timer != "undefined") && (typeof timer2 != "undefined") ) {

			var timer  = timer - 1;
			var timer2 = timer2 + 1;

			form.querySelector(`input.${timeout}`).value = timer;
			form.querySelector(`input.${timeout2}`).value = timer2;

		}

	});

});


// Use an object, arrays are only indexed by integers. This var is kept for compatibility with add-on 1.0.0 till 1.1.1.
var gwolle_gb_ajax_data = {
	permalink: window.location.href,
	action: 'gwolle_gb_form_ajax'
};


/*
 * AJAX Submit for Gwolle Guestbook Frontend.
 */
document.addEventListener('DOMContentLoaded', function() {

	const submit_buttons = document.querySelectorAll( '.gwolle_gb_form_ajax input.gwolle_gb_submit' );

	submit_buttons.forEach( function (button) {
		button.addEventListener( 'click', function (event) {

			const main_div = button.closest( 'div.gwolle-gb' );
			const ajax_icon = main_div.querySelector( '.gwolle_gb_submit_ajax_icon' );
			if (ajax_icon) {
				ajax_icon.style.display = 'inline';
			}

			const form = main_div.querySelector( 'form.gwolle-gb-write' );
			const formData = new FormData(); // Use an object, arrays are only indexed by integers.

			formData.append( 'permalink', window.location.href );
			formData.append( 'action', 'gwolle_gb_form_ajax' );

			const inputs = form.querySelectorAll( 'input' );
			inputs.forEach(function (input) {
				const type = input.type;
				const name = input.name;
				const val = input.value;

				if (type === 'checkbox') {
					if (input.checked) {
						formData.append( name, 'on' ); // Mimick standard $_POST value.
					}
				} else if (type === 'radio') {
					if (input.checked) {
						formData.append( name, val );
					}
				} else {
					formData.append( name, val );
				}
			});

			const textareas = form.querySelectorAll( 'textarea' );
			textareas.forEach(function (textarea) {
				formData.append( textarea.name, textarea.value );
			});

			const selects = form.querySelectorAll( 'select' );
			selects.forEach(function (select) {
				formData.append( select.name, select.value );
			});

			fetch( gwolle_gb_frontend_script.ajax_url, {
				method: 'POST',
				body: formData
			})
			.then(response => response.text())
			.then(responseText => {

				if ( gwolle_gb_is_json( responseText ) ) {
					data = JSON.parse( responseText );

					if ( ( typeof data['saved'] === 'boolean' || typeof data['saved'] === 'number' )
						&& typeof data['gwolle_gb_messages'] === 'string'
						&& typeof data['gwolle_gb_errors'] === 'boolean'
						&& typeof data['gwolle_gb_error_fields'] === 'object' ) { // Too strict in testing?

						var saved                  = data['saved'];
						var gwolle_gb_messages     = data['gwolle_gb_messages'];
						var gwolle_gb_errors       = data['gwolle_gb_errors'];
						var gwolle_gb_error_fields = data['gwolle_gb_error_fields'];

						const form_inputs = form.querySelectorAll('.gwolle_gb_form_ajax input');
						form_inputs.forEach( function (input) {
							input.classList.remove( 'error' );
						});
						const form_selects = form.querySelectorAll('.gwolle_gb_form_ajax select');
						form_selects.forEach( function (select) {
							select.classList.remove( 'error' );
						});
						const form_textareas = form.querySelectorAll('.gwolle_gb_form_ajax textarea');
						form_textareas.forEach( function (textarea) {
							textarea.classList.remove( 'error' );
						});
						const form_div_inputs = form.querySelectorAll('.gwolle_gb_form_ajax div.input'); // for type != text, like radio.
						form_div_inputs.forEach( function (div_input) {
							div_input.classList.remove( 'error' );
						});

						// we have all the data we expect.
						if ( typeof data['saved'] === 'number' ) {

							// Show returned messages.
							const messages_bottom_container = main_div.querySelectorAll( '.gwolle-gb-messages-bottom-container' );
							messages_bottom_container.forEach( function (messages) {
								messages.innerHTML = '';
							});
							const messages_top_container = main_div.querySelectorAll( '.gwolle-gb-messages-top-container' );
							messages_top_container.forEach( function (messages) {
								messages.innerHTML = '<div class="gwolle-gb-messages">' + data['gwolle_gb_messages'] + '</div>';
							});
							const gwolle_gb_messages = main_div.querySelectorAll( '.gwolle-gb-messages' );
							gwolle_gb_messages.forEach( function (messages) {
								messages.classList.remove( 'error' );
							});

							// Remove form from view.
							document.querySelectorAll( 'button.gb-notice-dismiss' ).forEach( button => {
								const main_div = button.closest( 'div.gwolle-gb' );
								const write_button = main_div.querySelector( 'div.gwolle-gb-write-button' );
								const form = main_div.querySelector( 'form.gwolle-gb-write' );

								form.style.height = '0px';
								form.classList.add( 'gwolle-gb-hide' );
								form.style.transition = 'none';
								write_button.setAttribute( 'aria-expanded', 'false' );

								write_button.style.height = '0px';
								write_button.classList.remove( 'gwolle-gb-hide' );
								write_button.style.transition = 'height 0.3s linear';
								write_button.style.height = write_button.scrollHeight + 'px';
								setTimeout(() => {
									write_button.style.height = 'auto';
									write_button.style.transition = 'none';
								}, 300);
							});

							// Prepend entry to the entry list if desired.
							if ( typeof data['entry'] === 'string' ) {
								const gwolle_gb_reads = main_div.querySelectorAll( '.gwolle-gb-read' );
								gwolle_gb_reads.forEach( function (gwolle_gb_read) {
									gwolle_gb_read.insertAdjacentHTML( 'afterbegin', data['entry'] );
								});
							}

							// Scroll to messages div. Add 80px to offset for themes with fixed headers.
							const container = document.querySelector('.gwolle-gb-messages-top-container');
							if (container) {
								const offset = container.getBoundingClientRect().top + window.scrollY - 80;
								window.scrollTo({
									top: offset,
									behavior: 'smooth'
								});
							}

							// Reset content textarea.
							const form_textareas = main_div.querySelectorAll( '.gwolle_gb_form_ajax textarea' );
							form_textareas.forEach( function (textarea) {
								textarea.value = '';
							});

							if (ajax_icon) {
								ajax_icon.style.display = 'none';
							}

							if (typeof gwolle_gb_frontend_callback_function === 'function') {
								// Run callback for after ajax event. Used for metabox-handle for new entries among other things.
								gwolle_gb_frontend_callback_function();
							}

						} else {
							// Not saved, show errors.

							// Show returned messages.
							const messages_top_container = main_div.querySelectorAll( '.gwolle-gb-messages-top-container' );
							messages_top_container.forEach( function (messages) {
								messages.innerHTML = '';
							});
							const messages_bottom_container = main_div.querySelectorAll( '.gwolle-gb-messages-bottom-container' );
							messages_bottom_container.forEach( function (messages) {
								messages.innerHTML = '<div class="gwolle-gb-messages error">' + data['gwolle_gb_messages'] + '</div>';
							});

							// Add error class to failed input fields.
							gwolle_gb_error_fields.forEach(function(value) {
								const textareas = main_div.querySelectorAll('textarea.' + value);
								const inputs = main_div.querySelectorAll('input.' + value);
								const selects = main_div.querySelectorAll('select.' + value);

								textareas.forEach(el => el.classList.add( 'error' ));

								inputs.forEach(el => {
									el.classList.add( 'error' );
									if (el.type === 'radio') {
										const wrapper = el.closest( 'div.input' );
										if (wrapper) {
											wrapper.classList.add( 'error' );
										}
									}
								});

								selects.forEach(el => {
									const wrapper = el.closest( 'div.input' );
									if (wrapper) {
										wrapper.classList.add( 'error' );
									}
								});
							});

						}
					} else {

						var unexpected_error = 'Gwolle Error: Something unexpected happened. (not the data that is expected)';

						if (typeof console != "undefined") {
							console.log( unexpected_error );
						}

						const messages_top_container = main_div.querySelectorAll( '.gwolle-gb-messages-top-container' );
						messages_top_container.forEach( function (messages) {
							messages.innerHTML = '';
						});
						const messages_bottom_container = main_div.querySelectorAll( '.gwolle-gb-messages-bottom-container' );
						messages_bottom_container.forEach( function (messages) {
							messages.innerHTML = '<div class="gwolle-gb-messages error">' + unexpected_error + '</div>';
						});

					}

				} else {

					var unexpected_error = 'Gwolle Error: Something unexpected happened. (not json data)';

					if (typeof console != "undefined") {
						console.log( 'Gwolle Error: Something unexpected happened. (not json data)' );
					}

					const messages_top_container = main_div.querySelectorAll( '.gwolle-gb-messages-top-container' );
					messages_top_container.forEach( function (messages) {
						messages.innerHTML = '';
					});
					const messages_bottom_container = main_div.querySelectorAll( '.gwolle-gb-messages-bottom-container' );
					messages_bottom_container.forEach( function (messages) {
						messages.innerHTML = '<div class="gwolle-gb-messages error">' + unexpected_error + '</div>';
					});

				}
			})

			event.preventDefault();

			if (ajax_icon) {
				ajax_icon.style.display = 'none';
			}

		});

	});

});


/*
 * Maxlength for text in textarea content.
 */
document.addEventListener('DOMContentLoaded', function () {

	const textareas = document.querySelectorAll('form.gwolle-gb-write textarea.maxlength');

	textareas.forEach(function (textarea) {
		textarea.addEventListener('keyup', function (event) {
			const div_input = event.target.closest('div.input');
			let content = event.target.value.trim();

			let length;
			if (typeof Array.from === 'function') {
				// New browsers with support for ES6 and multibyte characters like emoji.
				length = Array.from(content).length;
			} else {
				// Old browsers: Count emoji as double characters.
				length = content.length;
			}

			const span = div_input.querySelector('span.gb-used-characters');
			if (span) {
				span.textContent = length;
			}

			event.preventDefault();
		});
	});

});
function gwolle_gb_reset_used_characters() {

	const spans = document.querySelectorAll( 'div.input span.gb-used-characters' );
	spans.forEach( function (span) {
		span.textContent = 0;
	});

}


function gwolle_gb_is_json( string ) {

	try {
		JSON.parse( string );
	} catch (e) {
		return false;
	}

	return true;

}


/*
 * Abstract helper function for MarkItUp.
 * Works with jQuery and in the future without.
 *
 * @param string target element that is the textarea as target.
 * @param string bbcode the html inside square brackets that need to be added.
 *
 * @since 4.10.0
 *
 * Append image to the content field for the upload form.
 * Example variables:
 * var target = jQuery( 'textarea.gwolle_gb_content' );
 * var bbcode = '\r\n[img]' + image_url + '[/img]\r\n';
 *
 */
function gwolle_gb_markitup_replace( target, bbcode ) {

	if ( typeof jQuery.markItUp === 'function' ) {
		jQuery.markItUp( { target:target, replaceWith:bbcode } );
	}

}
