<?php
/*
 * ajax.php
 * Processes AJAX requests.
 */


if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/*
 * Permalink for single entry.
 */
function gwolle_gb_entry_metabox_lines_permalink_v2( $gb_metabox, $entry ) {

	if (get_option( 'gwolle_gb_addon-permalink', 'true') === 'true') {
		$permalink = gwolle_gb_get_permalink(get_the_ID());

		// Test if we are on an AJAX request:
		if ( $permalink == false && isset( $_POST['permalink'] ) ) {
			$permalink = sanitize_text_field( $_POST['permalink'] );
		}

		$permalink = add_query_arg( 'entry_id', $entry->get_id(), $permalink );

		$gb_metabox .= '
					<div class="gb-metabox-line gb-metabox-line-permalink">
						<a class="gwolle_gb_permalink" href="' . esc_attr( $permalink ) . '" title="' . esc_attr__('Permanent link to this single entry', 'gwolle-gb') . '">' . esc_html__('Permalink', 'gwolle-gb') . '</a>
					</div>';
	}
	return $gb_metabox;

}
add_filter( 'gwolle_gb_entry_metabox_lines', 'gwolle_gb_entry_metabox_lines_permalink_v2', 70, 2 );
