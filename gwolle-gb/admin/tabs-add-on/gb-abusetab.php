<?php
/*
 * Settings page for the guestbook
 */


if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


function gwolle_gb_addon_page_settingstab_abuse_v2() {

	if ( ! current_user_can('manage_options') ) {
		die(esc_html__('You need a higher level of permission.', 'gwolle-gb'));
	} ?>

	<input type="hidden" id="gwolle_gb_tab" name="gwolle_gb_tab" value="gwolle_gb_abuse" />
	<?php
	settings_fields( 'gwolle_gb_addon_options' );
	do_settings_sections( 'gwolle_gb_addon_options' );

	/* Nonce */
	$nonce = wp_create_nonce( 'gwolle_gb_addon_abuse_nonce' );
	echo '<input type="hidden" id="gwolle_gb_addon_abuse_nonce" name="gwolle_gb_addon_abuse_nonce" value="' . esc_attr( $nonce ) . '" />';
	?>
	<table class="form-table">
		<tbody>

		<tr>
			<th scope="row"><label for="gb_report"><?php esc_html_e('Report Abuse', 'gwolle-gb'); ?></label></th>
			<td>
				<input <?php
					if (get_option( 'gwolle_gb_addon-report', 'false') === 'true') {
						echo 'checked="checked"';
					} ?>
					type="checkbox" name="gb_report" id="gb_report">
				<label for="gb_report">
					<?php esc_html_e('Enable report abuse link in Metabox.', 'gwolle-gb'); ?>
				</label><br />
				<span class="setting-description">
					<?php esc_html_e('Visitors can report abusive entries through a link in the metabox.', 'gwolle-gb'); ?>
				</span>
			</td>
		</tr>

		<tr>
			<th colspan="2">
				<p class="submit">
					<input type="submit" name="gwolle_gb_addon_abuse" id="gwolle_gb_addon_abuse" class="button-primary" value="<?php esc_attr_e('Save settings', 'gwolle-gb'); ?>" />
				</p>
			</th>
		</tr>

		</tbody>
	</table>

	<?php
}
