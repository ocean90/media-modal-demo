( function( $ ) {
	var mediaUploaderDemo = {
		button_id: '#open-media-editor',
		details_container: '#attachment-details',
		settings_container: '#attachment-settings',

		init: function() {
			$( this.button_id ).on( 'click', this.openMediaDialog );
		},

		openMediaDialog: function( e ) {
			e.preventDefault();

			wp.media.editor.send.attachment = mediaUploaderDemo.handleMediaAttachment;
            wp.media.editor.remove = mediaUploaderDemo.closeMediaDialog;

            wp.media.editor.open();
		},

		handleMediaAttachment: function( props, attachment ) {
			/** attachment **/
			var details = $( mediaUploaderDemo.details_container );

			$( 'input', details ).each( function() {
				var key = $( this ).attr( 'id' ).replace( 'attachment-', '' );
				$( this ).val( attachment[ key ] );
			} );

			var sizes = attachment.sizes;
			$( 'img', details ).attr( 'src', sizes.thumbnail.url );

			$( 'textarea', details ).val( JSON.stringify( attachment, null, 2 ) );

			/** props **/
			var settings = $( mediaUploaderDemo.settings_container );

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
		mediaUploaderDemo.init();
	} );
} )( jQuery );
