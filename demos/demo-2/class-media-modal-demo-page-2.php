<?php
/**
 * Demo Page Two
 */
class Media_Modal_Demo_Page_2 extends Media_Modal_Demo_Page_Abstract {
	/**
	 * Initialises the WP actions.
	 *  - media_view_strings
	 *  - media_view_settings
	 */
	public function init_hooks() {
		add_filter( 'media_view_strings', array( $this, 'filter_media_view_strings' ) );
		add_filter( 'media_view_settings', array( $this, 'filter_media_view_settings' ) );
	}

	/**
	 * Filters media view strings.
	 *
	 * `insertMediaTitle` is the title of the modal
	 * `insertIntoPost` is the button at the right bottom
	 */
	public function filter_media_view_strings( $strings ) {
		$strings[ 'insertMediaTitle' ] = 'Select An Image';
		$strings[ 'insertIntoPost' ] = 'Select';

		return $strings;
	}

	/**
	 * Filters media view settings.
	 *
	 * `mimeTypes` includes the file types which will be
	 * displayed in the libary.
	 */
	public function filter_media_view_settings( $settings ) {
		$settings[ 'mimeTypes' ] = array( 'image' => $settings[ 'mimeTypes' ][ 'image'] );

		return $settings;
	}

	/**
	 * Enqueues the media script.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script(
			'media-modal-demo',
			plugins_url( 'js/media-modal-demo.js', __FILE__ ),
			array( 'media-views' )
		);
	}

	/**
	 * Prints a short description of what the demo does.
	 */
	public function print_description() {
		?>
		<p>Hello</p>
		<?php
	}

	/**
	 * Renders the demo page content.
	 */
	public function render_content() {
		?>
		<input type="button" class="button open-media-button" id="open-media-editor" value="Open Media Editor" />
		<fieldset id="attachment-details" class="attachment-fieldset">
			<legend>Attachment Details</legend>

			<div class="alignleft">
				<p><label>ID:<br /><input type="text" id="attachment-id" class="regular-text" /></label></p>
				<p><label>Title:<br /><input type="text" id="attachment-title" class="regular-text" /></label></p>
				<p><label>Filename:<br /><input type="text" id="attachment-filename" class="regular-text" /></label></p>
				<p><label>Height:<br /><input type="text" id="attachment-height" class="regular-text" /></label></p>
				<p><label>Width:<br /><input type="text" id="attachment-width" class="regular-text" /></label></p>
				<p><label>URL:<br /><input type="text" id="attachment-url" class="regular-text" /></label></p>
			</div>

			<div class="alignleft">
				<p><strong>Image:</strong><br/><img id="attachment-src" /></p>
			</div>

			<div class="alignleft">
				<p><label>RAW Data:<br /><textarea id="attachment-raw" class="code"></textarea></label>
			</div>
		</fieldset>

		<fieldset id="attachment-settings" class="attachment-fieldset">
			<legend>Attachment Settings</legend>

			<div class="alignleft">
				<p><label>Align:<br /><input type="text" id="attachment-prop-align" class="regular-text" /></label></p>
				<p><label>Size:<br /><input type="text" id="attachment-prop-size" class="regular-text" /></label></p>
				<p><label>Link:<br /><input type="text" id="attachment-prop-link" class="regular-text" /></label></p>
				<p><label>Link URL:<br /><input type="text" id="attachment-prop-linkUrl" class="regular-text" /></label></p>
			</div>

			<div class="alignleft">
				<p><label>RAW Data:<br /><textarea id="attachment-prop-raw" class="code"></textarea></label>
			</div>
		</fieldset>
		<?php
	}
}
