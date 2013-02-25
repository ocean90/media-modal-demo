<?php
/**
 * Demo Page Four
 */
class Media_Modal_Demo_Page_4 extends Media_Modal_Demo_Page_Abstract {
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
		<p>
			<input type="button" class="button open-media-button" id="open-media-modal" value="Open Media Library" />
			<span class="description">Choose one or more images.</span>
		</p>

		<fieldset id="attachment-details-tmpl" class="attachment-fieldset">
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
		<?php
	}
}
