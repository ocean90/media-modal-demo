( function( $ ) {
	var mediaUploaderDemo = {
		button_id: '#open-media-lib',
		details_container: '#attachment-details',
		frame: null,

		init: function() {
			$( this.button_id ).on( 'click', this.openMediaDialog );
		},

		openMediaDialog: function( e ) {
			if ( this.frame ) {
				this.frame.open();
				return;
			}

			this.frame = wp.media.frames.frame = wp.media( {
				title: $( this ).data( 'title' ),
				button: {
					text: $( this ).data( 'buttonText' )
				},
				multiple: false,
				library: {
					type: 'image'
				}
			} );

			this.frame.on( 'ready', function() {
				$( '.media-modal' ).addClass( 'no-sidebar' );
			} );

			var that = this;
			this.frame.on( 'select', function() {
				var attachment = that.frame.state().get( 'selection' ).first();
				mediaUploaderDemo.handleMediaAttachment( attachment );
			} );

			this.frame.open();
		},

		handleMediaAttachment: function( attachment ) {
			var details = $( this.details_container );

			$( 'input', details ).each( function() {
				var key = $( this ).attr( 'id' ).replace( 'attachment-', '' );
				$( this ).val( attachment.get( key ) );
			} );

			var sizes = attachment.get( 'sizes' );
			$( 'img', details ).attr( 'src', sizes.thumbnail.url );

			$( 'textarea', details ).val( JSON.stringify( attachment.toJSON(), null, 2 ) );

		}
	};

	$( document ).ready( function() {
		mediaUploaderDemo.init();
	} );
} )( jQuery );
