<?php


if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/*
 * Check the $entry against Cleantalk service
 *
 * @param object $entry instance of gb_entry class
 * @return bool
 *          - true if the entry is considered spam by cleantalk
 *          - false if no spam, or no cleantalk functionality is found
 *
 * @since 4.9.0 (fixme next)
 */
function gwolle_gb_cleantalk( $entry ) {

	$active_plugins = get_option('active_plugins');
	if ( ! in_array('cleantalk-spam-protect/cleantalk.php', $active_plugins)) {
		return false;
	}

	$cleantalk_active = get_option( 'gwolle_gb-cleantalk-active', 'false' );
	if ( $cleantalk_active !== 'true' ) {
		return false;
	}

	if ( ! is_object( $entry ) ) {
		// No object, no fuss
		return false;
	}

	// Checking entries IP/Email. Gathering $data for check, be explicit.
	$data = $_POST;
	$data['author_IP'] = gwolle_gb_get_user_ip();
	$data['author_email'] = $entry->get_author_email();

	// doit
	$result = apply_filters( 'apbct_wordpress_protect_from_spam', $data );

	/*
	After the check, the result will be stored in the $result array:
	[
		'is_spam' => '0',
		'message' => '',
	];
	If 'is_spam' => 1, the message will contain the reason for blocking:
	[
		'is_spam' => '1',
		'message' => '*** Forbidden. Sender blacklisted. Anti-Spam by CleanTalk. ***',
	];
	*/

	if ( empty( $result['error'] ) ) {

		if ( $result['is_spam'] ) {
			return true;
		} else {
			return false;
		}

	}

	return false;

}
