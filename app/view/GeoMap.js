Ext.define('Reminder.view.GeoMap', {
	extend: 'Ext.Container',
	xtype: 'geomap',
	requires: [
		'Ext.Map',
		'Ext.util.GeoLocation',
		'Ext.device.Connection'
	],
	config:{
		layout: {
			type: 'fit'
		}
	},

	initialize: function() {
        console.log('View - GeoMap - initialize');
        this.callParent(arguments);
        var me = this;

        var backButton = {
            xtype: 'button',
            text: 'Back',
            ui: 'action',
            handler: this.onGeoMapBackButtonTap,
            scope: this    
        };

		var customZoomInButton = {
            xtype: 'button',
            text: '+',
            ui: 'action',
            handler: this.geoMapZoomIn,
            scope: this    
        };


        var customZoomOutButton = {
            xtype: 'button',
            text: '-',
            ui: 'action',
            handler: this.geoMapZoomOut,
            scope: this    
        };

        var topToolbar = {
            xtype: 'toolbar',
            docked: 'top',
            title: 'GeoMap',
            items: [
                backButton,
                {xtype: 'spacer'},
                customZoomOutButton,
                customZoomInButton
            ]
        };

		var geo = null;

		if( navigator.connection.type != "none") {

			geo = Ext.create('Ext.util.Geolocation', {
			    autoUpdate: false,
			    listeners: {
			        locationupdate: function(geo) {
			        },
			        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
			        }
			    }
			});
			geo.updateLocation();

		} else {
			// TODO  if device is offline
		}

        

        var geoMap = {
            xtype: 'map',
            modal: true,
            useCurrentLocation: geo,
			mapOptions: {
				'zoom': 16,
				'mapTypeId': google.maps.MapTypeId.HYBRID,
				'disableDefaultUI': true,
				'overviewMapControl': false
			},
			itemId: 'geomap',
			listeners: {
				maprender: function( obj, map, eOpts ) {
					me.onMapRenderd( this, map, eOpts );	
				}
			
			},
        };


        this.add( [topToolbar, geoMap] );
	},

	launch: function() {
        this.callParent(arguments);
        console.log('View - GeoMap - launch');
	},

	onGeoMapBackButtonTap: function() {
		console.log('View - GeoMap - onGeoMapBackButtonTap');	
		this.fireEvent('backCommand', this);
	},

	geoMapZoomIn: function() {
	
		this.fireEvent('customZoomIn', this);
	},

	geoMapZoomOut: function() {
		this.fireEvent('customZoomOut', this);
	},

	onMapRenderd: function( me, map, eOpts ) {
	    console.log('View - GeoMap - onMapRenderd');	
	    //Prepare the overlay object so we can use its "fromContainerPixelToLatLng" method
		var overlay = new google.maps.OverlayView();
		overlay.draw = function() {};
		overlay.onAdd = function() {};
		overlay.onRemove = function() {};		
		overlay.setMap(map);

		var container = this;
		//console.log(this);
		//console.log(me);
		//console.log(map);
		

		// this = ext.map
		// me = ext.map
		// map = map

		//Prepare the touch vars
		me.touches = {
		    startX  : 0,
		    startY  : 0,
		    currentX: 0,
		    currentY: 0,
		    reset   : function() {
		        me.startX   = 0;
		        me.startY   = 0;
		        me.currentX = 0;
		        me.currentY = 0;
		    }
		};


		//var me = this;


		me.element.dom.addEventListener('touchstart', function(e) {
		    /**
		     * Only deal with single touches (not multi-touch) - when it is multi-touch,
		     * the array of touches will have an item for each finger.
		     */
		    if (e.touches.length == 1) {
		        //Remember that the user has started a touch
		        me.touches.startX = me.touches.currentX = e.touches[0].clientX;
		        me.touches.startY = me.touches.currentY = e.touches[0].clientY;
		    }
		});


		me.element.dom.addEventListener('touchmove', function(e) {
		    //Only track the current position if we know of the start position
		    if (me.touches.startX > 0) {
		        //Remember the current position of the finger
		        me.touches.currentX = e.touches[0].clientX;
		        me.touches.currentY = e.touches[0].clientY;
		    }
		});
		

		me.element.dom.addEventListener('touchend', function(e) {
		    //Only track the current position if we know of the start position
		    if (me.touches.startX > 0) {
		        //Make sure the user hasn't dragged their finger too much
		        if (Math.abs(me.touches.currentX - me.touches.startX) < 4 && Math.abs(me.touches.currentY - me.touches.startY) < 4) {
		            if (e.changedTouches && e.changedTouches.length > 0) {
		                var touch = e.changedTouches[0];

		                //Work out the coordinates on the map
		                var x = (touch.pageX - me.element.dom.offsetParent.offsetLeft),
		                    y = (touch.pageY - me.element.dom.offsetParent.offsetTop);		             

		                var point  = new google.maps.Point(x, y),
		                    latLng = overlay.getProjection().fromContainerPixelToLatLng(point);
		                
		                //console.log(e);
		                google.maps.event.trigger(map, 'tapped', {latLng: latLng});
		            }
		        }
		    }
		    
		    //Reset the touches
		    me.touches.reset();
		});


		//Allow click events also (for testing in desktop browser)
		google.maps.event.addListener(map, 'click', function(e) {
		    google.maps.event.trigger(me, 'tapped', {latLng: e.latLng});
		});

		google.maps.event.addListener(map, 'tapped', function(e) {
		    //Add this point to the list of points
		    //me.routePoints.push({lat: e.latLng.lat(), lng: e.latLng.lng()});
		    
		    //Update the lines on the map
		    //me.displayRoute();
		    
		    //Calculate the distance etc
		    //me.calculateStats();
		    
		    //Save the current trip details (for page reloads)
		    //me.saveTrip();
		    //console.log(me);
		    container.fireEvent('gotPosition', container, e);


		    //console.log( e.latLng.lat() + " " + e.latLng.lng() );
		});
	}
});