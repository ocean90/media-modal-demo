<?php
/**
 * Plugin Name: Media Modal Demo
 * Version: 0.1
 * Description: Adds an options page, where the new Media Modal can be used to get attachment details
 * Author: Dominik Schilling
 * Author URI: http://wphelper.de/
 * Plugin URI: http://wpgrafie.de/
 *
 *
 * License: GPLv2 or later
 *
 *	Copyright (C) 2013 Dominik Schilling
 *
 *	This program is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU General Public License
 *	as published by the Free Software Foundation; either version 2
 *	of the License, or (at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License
 *	along with this program; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */


/**
 * Don't call this file directly.
 */
if ( ! class_exists( 'WP' ) ) {
	die();
}

/**
 * The class will demonstrate the media modal.
 */
final class Media_Modal_Demo {
	/**
	 * Saves the menu page slug
	 * @var string
	 */
	private static $page;

	/**
	 * Init.
	 *
	 * @since 0.1.0
	 */
	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'add_options_page' ) );
	}

	/**
	 * Adds an option page and registers style/script enqueue actions.
	 *
	 * @since 0.1.0
	 */
	public static function add_options_page() {
		self::$page = add_options_page(
			'Media Modal Demo',
			'Media Modal Demo',
			'manage_options',
			'media-modal-demo',
			array( __CLASS__, 'render_page' )
		);

		add_action( 'admin_print_scripts-' . self::$page, array( __CLASS__, 'enqueue_scripts' ) );
		add_action( 'admin_print_styles-' . self::$page, array( __CLASS__, 'enqueue_styles' ) );
	}

	/**
	 * Adds script to queue.
	 *
	 * @since 0.1.0
	 */
	public static function enqueue_scripts() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_enqueue_script(
			'media-modal-demo',
			plugins_url( "js/media-modal-demo$suffix.js", __FILE__ ),
			array( 'media-views' ),
			'22022013'
		);

		wp_enqueue_media();
	}

	/**
	 * Adds styles to queue.
	 *
	 * @since 0.1.0
	 */
	public static function enqueue_styles() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_enqueue_style(
			'media-modal-demo',
			plugins_url( "css/media-modal-demo$suffix.css", __FILE__ ),
			array( 'media-views' ),
			'22022013'
		);
	}

	/**
	 * Renders the options page.
	 *
	 * @since 0.1.0
	 */
	public static function render_page() {
		?>
		<div class="wrap" id="<?php echo esc_attr( self::$page ); ?>">
			<h2>Media Modal Demo</h2>

			<div>
				<input type="button" class="button" id="open-media-modal" value="Open Media Modal" data-title="Select An Image" data-button-text="Select" />
				<fieldset id="attachment-details">
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
						<p><strong>Image:<br/><img id="attachment-src" /></p>
					</div>

					<div class="alignleft">
						<p><label>RAW Data:<br /><textarea id="attachment-raw" class="code"></textarea></label>
					</div>
				</fieldset>
			</div>
		</div>
		<?php
	}
}

// Please load. Thanks.
add_action( 'init', array( 'Media_Modal_Demo', 'init' ), 20 );
