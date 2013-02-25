var ds = ds || {};

/**
 * Demo 3
 */
( function( $ ) {
	var media;

	ds.media = media = {
		buttonId: '#open-media-modal',
		detailsContainerId: '#attachment-details',

		frame: function() {
			if ( this._frame )
				return this._frame;

			this._frame = wp.media( {
				title: 'Select An Image',
				button: {
					text: 'Select'
				},
				multiple: false,
				library: {
					type: 'image'
				}
			} );

			this._frame.on( 'ready', this.ready );

			this._frame.state( 'library' ).on( 'select', this.select );

			return this._frame;
		},

		ready: function() {
			$( '.media-modal' ).addClass( 'no-sidebar smaller' );
		},

		select: function() {
			var settings = wp.media.view.settings,
				selection = this.get( 'selection' ).single();

			media.showAttachmentDetails( selection );
		},

		showAttachmentDetails: function( attachment ) {
			var details = $( media.detailsContainerId );

			$( 'input', details ).each( function() {
				var key = $( this ).attr( 'id' ).replace( 'attachment-', '' );
				$( this ).val( attachment.get( key ) );
			} );

			var sizes = attachment.get( 'sizes' );
			$( 'img', details ).attr( 'src', sizes.thumbnail.url );

			$( 'textarea', details ).val( JSON.stringify( attachment, null, 2 ) );
		},

		init: function() {
			$( media.buttonId ).on( 'click', function( e ) {
				e.preventDefault();

				media.frame().open();
			});
		}
	};

	$( media.init );
} )( jQuery );
