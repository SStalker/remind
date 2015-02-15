Ext.define('Reminder.view.geomap.GeoMapContainer', {
	extend: 'Ext.Container',
	xtype: 'geomapcontainer',
	requires: [
		'Reminder.view.geomap.GeoMap'
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
            iconCls: 'list',
            handler: this.onGeoMapBackButtonTap,
            scope: this    
        };

		var customZoomInButton = {
            xtype: 'button',
            text: '+',
            ui: 'action',
            iconCls: 'list',
            handler: this.geoMapZoomIn,
            scope: this    
        };


        var customZoomOutButton = {
            xtype: 'button',
            text: '-',
            ui: 'action',
            iconCls: 'list',
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

        var geoMap = {
        	xype: 'geomap'
        };



        this.add( [topToolbar, geoMap] );



	},

	launch: function() {
        this.callParent(arguments);
        console.log('View - GeoMap - launch');
	},

	onGeoMapBackButtonTap: function() {
		console.log('View - GeoMap - onGeoMapBackButtonTap');	
		this.fireEvent('tappedMenuButtonCommand', this);
	}
});