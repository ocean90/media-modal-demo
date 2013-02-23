var mediaUploaderDemo = mediaUploaderDemo || {};

( function( $ ) {
	mediaUploaderDemo = {
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

			mediaUploaderDemo.showAttachmentDetails( selection );
			this._frame.trigger('destroy');
		},

		showAttachmentDetails: function( attachment ) {
			var details = $( '#attachment-details' );

			$( 'input', details ).each( function() {
				var key = $( this ).attr( 'id' ).replace( 'attachment-', '' );
				$( this ).val( attachment.get( key ) );
			} );

			var sizes = attachment.get( 'sizes' );
			$( 'img', details ).attr( 'src', sizes.thumbnail.url );

			$( 'textarea', details ).val( JSON.stringify( attachment, null, 2 ) );
		},

		init: function() {
			$( '#open-media-modal' ).on( 'click', function( e ) {
				e.preventDefault();

				mediaUploaderDemo.frame().open();
			});
		}
	};

	$( mediaUploaderDemo.init );
} )( jQuery );
