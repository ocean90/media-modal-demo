var mediaUploaderDemo = mediaUploaderDemo || {};

( function( $ ) {
	mediaUploaderDemo = {
		frame: function() {
			if ( this._frame )
				return this._frame;

			mediaUploaderDemo.views = {};
			mediaUploaderDemo.controller = {};

			mediaUploaderDemo.controller.HelloWorld = wp.media.controller.State.extend( {
				defaults: {
					id:       'hello-world-state',
					menu:     'default',
					content:  'hello_world_state'
				}
			} );

			mediaUploaderDemo.views.HelloWorld = wp.media.View.extend( {
				className: 'hello-world-frame',
				template:  wp.media.template( 'hello-world' ) // <script type="text/html" id="tmpl-hello-world">
			} );

			var states = [
				new wp.media.controller.Library(),
				new wp.media.controller.Library( {
						id:                 'image',
						title:              'Images',
						priority:           20,
						searchable:         false,
						library:            wp.media.query( { type: 'image' } ),
						multiple:           true
				} ),
				new wp.media.controller.Library( {
						id:                 'audio',
						title:              'Audio',
						priority:           30,
						filterable:         'uploaded',
						library:            wp.media.query( { type: 'audio' } ),
						multiple:           false
				} ),
				new wp.media.controller.Library( {
						id:                 'video',
						title:              'Video',
						priority:           40,
						library:            wp.media.query( { type: 'video' } ),
						multiple:           false,
						contentUserSetting: false // Show the Upload Files tab.
				} ),
				new mediaUploaderDemo.controller.HelloWorld( {
					title:    'Hello World',
					id:       'hello-world-state',
					priority: 50
				} )
			];

			this._frame = wp.media( {
				className: 'media-frame no-sidebar',
				states: states
				//frame: 'post'
			} );

			this._frame.on( 'content:create:hello_world_state', function() {
				var view = new mediaUploaderDemo.views.HelloWorld( {
					controller: mediaUploaderDemo.frame(),
					model:      mediaUploaderDemo.frame().state()
				} );

				mediaUploaderDemo.frame().content.set( view );
			} );

			this._frame.on( 'open', this.open );

			this._frame.on( 'ready', this.ready );

			this._frame.on( 'close', this.close );

			this._frame.on( 'menu:render:default', this.menuRender );

			this._frame.state( 'library' ).on( 'select', this.select );
			this._frame.state( 'image' ).on( 'select', this.select );

			return this._frame;
		},

		open: function() {
			$( '.media-modal' ).addClass( 'smaller' );
		},

		ready: function() {
			console.log( 'Frame ready' );
		},

		close: function() {
			$( '.media-modal' ).removeClass( 'smaller' );
		},

		menuRender: function( view ) {
			/*
			view.unset( 'library-separator' );
			view.unset( 'embed' );
			view.unset( 'gallery' );
			*/
		},

		select: function() {
			var settings = wp.media.view.settings,
				selection = this.get( 'selection' );

			$( '.added' ).remove();
			selection.map( mediaUploaderDemo.showAttachmentDetails );
		},

		showAttachmentDetails: function( attachment ) {
			var details_tmpl = $( '#attachment-details-tmpl' ),
				details = details_tmpl.clone();

			details.addClass( 'added' );

			$( 'input', details ).each( function() {
				var key = $( this ).attr( 'id' ).replace( 'attachment-', '' );
				$( this ).val( attachment.get( key ) );
			} );

			details.attr( 'id', 'attachment-details-' + attachment.get( 'id' ) );

			var sizes = attachment.get( 'sizes' );
			$( 'img', details ).attr( 'src', sizes.thumbnail.url );

			$( 'textarea', details ).val( JSON.stringify( attachment, null, 2 ) );

			details_tmpl.after( details );
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
