var ds = ds || {};

/**
 * Demo 1
 */
( function( $ ) {
	var media;

	ds.media = media = {
		buttonId: '#open-media-lib',
		detailsContainerId: '#attachment-details',

		init: function() {
			$( this.buttonId ).on( 'click', this.openMediaDialog );
		},

		openMediaDialog: function( e ) {
			if ( this._frame ) {
				this._frame.open();
				return;
			}

			this._frame = wp.media.frames.frame = wp.media( {
				title: $( this ).data( 'title' ),
				button: {
					text: $( this ).data( 'buttonText' )
				},
				multiple: false,
				library: {
					type: 'image'
				}
			} );

			this._frame.on( 'ready', function() {
				$( '.media-modal' ).addClass( 'no-sidebar' );
			} );

			this._frame.state( 'library' ).on( 'select', function() {
				var attachment = this.get( 'selection' ).single();
				media.handleMediaAttachment( attachment );
			} );

			this._frame.open();
		},

		handleMediaAttachment: function( attachment ) {
			var details = $( this.detailsContainerId );

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
		media.init();
	} );
} )( jQuery );
