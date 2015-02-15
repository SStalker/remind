Ext.define('Reminder.view.howto.HowTo', {
	extend: 'Ext.Container',
	requires: [
        'Ext.carousel.Carousel'
    ],
	xtype: 'howto',
	config: {
		layout: {
			type: 'fit'
		}
	},

	initialize: function() {
		console.log('View - HowTo - initialize');
		this.callParent(arguments);

		var menuButton = {
            xtype: 'button',
            text: 'Menu',
            ui: 'action',
            iconCls: 'list',
            handler: this.onMenuButtonTap,
            scope: this    
        };

        var topToolbar = {
            xtype: 'toolbar',
            docked: 'top',
            title: 'How To',
            items: [
                menuButton
            ]
        };

		var howToCarousel = {
			xtype: 'carousel',
			fullscreen: true,

			style: 'margin: 50px',

			defaults: {
				styleHtmlContent: true
			},

			items: [
				{ html: '<h3>Remindlist</h3> \
						<p>While creating an new remind you need to choose between three types of reminder. If you choose the "normal" type the remind will take place with a specific date and time. Differently is the Geo Remind type, for this type you have to choose a place/coordinate which is stored in your "Places-List". When you reach a defined radius around this place the remind will take place. The third type is the "Wifi Remind" where you will be remind to your stored topic if your reach a Wireless LAN from your "Wifi-List". After choosing your type there will be different mandatory fields. </p>\
						<h5>Buttons: </h5> \
							<div><div class="howTo-New-icon howTo-icon" ></div> <p> Create new reminder.</p></div>\
							<div><div class="howTo-Menu-icon howTo-icon" ></div> <p> Open side menu.</p></div>\
							<div><div class="howTo-Edit-icon howTo-icon" ></div> <p> Open the edit menu for this remind.</p></div>\
							<div><div class="howTo-Save-icon howTo-icon" ></div> <p>Saves a new remind if all required fields are filled.</p></div>\
							<div><div class="howTo-Back-icon howTo-icon" ></div> <p> Back to Remind-List.</p></div>\
							<div><div class="howTo-Delete-icon howTo-icon" ></div> <p> Deletes the open remind.</p></div>\
							<div><span class="bold-inline">Fields: </span><ul> \
								<li><span class="bold-inline">Type: </span>Choose the type on which event the reminder should take action.</li>\
								<li><span class="bold-inline">Type of Notification: </span>Choose how you will be notified.</li>\
								<li><span class="bold-inline">Message: </span>Enter your remind message.</li>\
								<li><span class="bold-inline">Remind me at: </span>(Only normal type) Choose date and time of the remind.</li>\
								<li><span class="bold-inline">Place: </span>(Only Geo-Remind type) Choose a place from your "Places-List" for your remind.</li>\
								<li><span class="bold-inline">SSID/MAC: </span>(Only Wifi-Remind type) Choose a wifi from your "Wifi-List" for your remind.</li>\
							</ul></div> \
						', 
				  scrollable:{
					direction: 'vertical',
					directionLock: true 
				  } 
				},
				{ html: '<h3>Placelist</h3> \
						<p>The "Places-List" is where your geo locations where stored. While choosing "Geo Remind" as remind type be sure there is a place in this list. To store a new place it is necessary to be connected to the internet in order to load the map else there is nothing to choose from. If the map is loaded in order to choose a place you have to tip on a position on the map. The coordinates will automatically be insertet into their fields.</p> \
						<h5>Buttons: </h5> \
							<div><div class="howTo-Choose-Geo-icon howTo-icon"></div><p> Choose a place from a map.</p></div> \
				', 
				  scrollable:{
					direction: 'vertical',
					directionLock: true 
				  } 
				},
				{ html: '<h3>Wifilist</h3> \
						<p>In your "Wifi-List" you store SSIDs and MAC of wireless LAN accesspoints. You can choose between all accesspoints within the detection radius of your device and press save to save it to your "Wifi-List".</p> \
						<div><span class="bold-inline">Fields: </span><ul> \
							<li><span class="bold-inline">SSID: </span>Choose the SSID of the wireless LAN you want to store in your "Wifi-List".</li>\
						</ul></div> \
				',
				  scrollable:{
					direction: 'vertical',
					directionLock: true 
				  }  
				},
				{ html: '<h3>Settings</h3> \
						<p>Set intervall for scanning for conditions of your reminder and radius for the "Geo Remind". </p> \
						<div><span class="bold-inline">Fields: </span><ul> \
							<li><span class="bold-inline">Refresh Intervall: </span>Set the intervall for scanning of the conditions of your reminder.</li>\
							<li><span class="bold-inline">Geo Radius: </span>Set the radius of which Geo Reminder should trigger.</li>\
						</ul></div> \
				', 
				  scrollable:{
					direction: 'vertical',
					directionLock: true 
				  } 
				}
			]
		};

		this.add( [topToolbar, howToCarousel] );

	},
	
	onMenuButtonTap: function() {
        console.log('tappedMenuButtonCommand');
        this.fireEvent('tappedMenuButtonCommand', this);
    }
});