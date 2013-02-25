var ds = ds || {};

/**
 * Demo 2
 */
( function( $ ) {
	var media;

	ds.media = media = {
		buttonId: '#open-media-editor',
		detailsContainerId: '#attachment-details',
		settingsContainerId: '#attachment-settings',

		init: function() {
			$( media.buttonId ).on( 'click', this.openMediaDialog );
		},

		openMediaDialog: function( e ) {
			e.preventDefault();

			wp.media.editor.send.attachment = media.handleMediaAttachment;
			wp.media.editor.remove = media.closeMediaDialog;

			// An unique ID
			wp.media.editor.open( 'ds-editor' );
		},

		handleMediaAttachment: function( props, attachment ) {
			/**
			 * attachment
			 */
			var details = $( media.detailsContainerId );

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
			var settings = $( media.settingsContainerId );

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
