<?php
/**
 * The abstract class for building a demo page.
 */
abstract class Media_Modal_Demo_Page_Abstract {
	/**
	 * Can be used to add needed actions/filters.
	 */
	public function init_hooks() {
		return false;
	}

	/**
	 * Can be used to add needed styles.
	 */
	public function enqueue_styles() {
		return false;
	}

	/**
	 * Can be used to add needed scripts.
	 */
	public function enqueue_scripts() {
		return false;
	}

	/**
	 * Prints a short description of what the demo does.
	 */
	public abstract function print_description();

	/**
	 * Renders the demo page content.
	 */
	public abstract function render_content();
}
