<?php
/*
 * Guestbook frontend
 * Called by using the shortcode [gwolle_gb] in a page or post.
 * $output will be used as replacement for that shortcode using the Shortcode API.
 */


if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly



/*
 * Frontend Function
 * Use this to display the guestbook on a page without using a shortcode.
 *
 * For multiple guestbooks, use it like this:
 * show_gwolle_gb( array('book_id'=>2) );
 * which will show Book ID 2.
 */
function show_gwolle_gb( $atts ) {
	echo get_gwolle_gb( $atts );
}


/*
 * Frontend Function
 * Used for the main shortcode.
 *
 * @param array $atts array with the shortcode attributes.
 *   - book_id = 1 (default)
 *     Can be any integer. Can also be post_id, which will set it to the ID of that post.
 *   - entry_id = 0
 *     Only set if there is a single entry requested, otherwise 0.
 *   - button = true
 *     Set to true in the main shortcode, by default false in gwolle_gb_write shortcode.
 *     True will show the button to open the form, fasle will show the form directly.
 *   - num_entries = 20
 *     Number of entries, taken from settings, which is 20 by default.
 *     Added to shortcode to have flexibility over different uses of the shortcode, instead of the fixed value of the setting.
 */
function get_gwolle_gb( $atts ) {

	$shortcode = 'gwolle_gb';

	$num_entries = (int) get_option('gwolle_gb-entriesPerPage', 20);
	$num_entries = (int) apply_filters( 'gwolle_gb_read_num_entries', $num_entries, $atts );

	$shortcode_atts = shortcode_atts( array(
		'book_id'     => 1,
		'entry_id'    => 0,
		'button'      => 'true', // default when main shortcode is used.
		'num_entries' => $num_entries,
	), $atts );

	if ( $shortcode_atts['book_id'] === 'post_id' ) {
		$shortcode_atts['book_id'] = get_the_ID();
	}

	if ( is_singular() && is_main_query() && ! is_admin() ) {
		$id = get_the_ID();
		update_post_meta( $id, 'gwolle_gb_book_id', (int) $shortcode_atts['book_id'] );
	}

	// Load Frontend CSS in Footer, only when it's active
	gwolle_gb_enqueue();


	// Define $output
	$output = '<div class="gwolle-gb">';

	// Add the form
	$output .= gwolle_gb_frontend_write( $shortcode_atts, $shortcode );

	// Add the list of entries to show
	$output .= gwolle_gb_frontend_read( $shortcode_atts, $shortcode );

	$output .= '</div>';

	return $output;
}
add_shortcode( 'gwolle-gb', 'get_gwolle_gb' ); // deprecated, do not use dashes in Shortcode API
add_shortcode( 'gwolle_gb', 'get_gwolle_gb' );


/*
 * Frontend function to show just the form.
 *
 * @param array $atts array with the shortcode attributes.
 */
function get_gwolle_gb_write( $atts ) {

	$shortcode = 'gwolle_gb_write';

	$shortcode_atts = shortcode_atts( array(
		'book_id'  => 1,
		'entry_id' => 0,
		'button'   => 'false', // default when only the write shortcode is used.
	), $atts );

	if ( $shortcode_atts['book_id'] === 'post_id' ) {
		$shortcode_atts['book_id'] = get_the_ID();
	}

	if ( is_singular() && is_main_query() && ! is_admin() ) {
		$id = get_the_ID();
		update_post_meta( $id, 'gwolle_gb_book_id', (int) $shortcode_atts['book_id'] );
	}

	// Load Frontend CSS in Footer, only when it's active
	gwolle_gb_enqueue();

	// Define $output
	$output = '<div class="gwolle-gb">';

	// Add the form
	$output .= gwolle_gb_frontend_write( $shortcode_atts, $shortcode );

	$output .= '</div>';

	return $output;
}
add_shortcode( 'gwolle_gb_write', 'get_gwolle_gb_write' );


/*
 * Frontend function to show just the list of entries
 *
 * @param array $atts array with the shortcode attributes.
 */
function get_gwolle_gb_read( $atts ) {

	$shortcode = 'gwolle_gb_read';

	$num_entries = (int) get_option('gwolle_gb-entriesPerPage', 20);
	$num_entries = (int) apply_filters( 'gwolle_gb_read_num_entries', $num_entries, $atts );

	$shortcode_atts = shortcode_atts( array(
		'book_id'  => 1,
		'entry_id' => 0,
		'num_entries' => $num_entries,
	), $atts );

	if ( $shortcode_atts['book_id'] === 'post_id' ) {
		$shortcode_atts['book_id'] = get_the_ID();
	}
	if ( is_singular() && is_main_query() && ! is_admin() ) {
		$id = get_the_ID();
		update_post_meta( $id, 'gwolle_gb_book_id', (int) $shortcode_atts['book_id'] );
	}

	// Load Frontend CSS in Footer, only when it's active
	gwolle_gb_enqueue();

	// Define $output
	$output = '<div class="gwolle-gb">';

	// Add the list of entries to show
	$output .= gwolle_gb_frontend_read( $shortcode_atts, $shortcode );

	$output .= '</div>';

	return $output;
}
add_shortcode( 'gwolle_gb_read', 'get_gwolle_gb_read' );
