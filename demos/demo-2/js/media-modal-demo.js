var ds = ds || {};

/**
 * Demo 2
 */
( function( $ ) {
	var media;

	ds.media = media = {
		button_id: '#open-media-editor',
		details_container: '#attachment-details',
		settings_container: '#attachment-settings',

		init: function() {
			$( this.button_id ).on( 'click', this.openMediaDialog );
		},

		openMediaDialog: function( e ) {
			e.preventDefault();

			wp.media.editor.send.attachment = media.handleMediaAttachment;
            wp.media.editor.remove = media.closeMediaDialog;

            wp.media.editor.open();
		},

		handleMediaAttachment: function( props, attachment ) {
			/**
			 * attachment
			 */
			var details = $( media.details_container );

			$( 'input', details ).each( function() {
				var key = $( this ).attr( 'id' ).replace( 'attachment-', '' );
				$( this ).val( attachment[ key ] );
			} );

			var sizes = attachment.sizes;
			$( 'img', details ).attr( 'src', sizes.thumbnail.url );

			$( 'textarea', details ).val( JSON.stringify( attachment, null, 2 ) );

			/**
			 * props
			 */
			var settings = $( media.settings_container );

			$( 'input', settings ).each( function() {
				var key = $( this ).attr( 'id' ).replace( 'attachment-prop-', '' );
				$( this ).val( props[ key ] );
			} );

			$( 'textarea', settings ).val( JSON.stringify( props, null, 2 ) );

		},

		closeMediaDialog: function( id ) {
			wp.media.editor.remove( id );
		}
	};

	$( document ).ready( function() {
		media.init();
	} );
} )( jQuery );
