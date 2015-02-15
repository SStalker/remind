Ext.define('Reminder.view.place.PlaceListContainer', {
	extend: 'Ext.Container',
	xtype: 'placelistcontainer',

	config: {
		layout: {
            type: 'fit'
        }
	},

	initialize: function() {

        this.callParent(arguments);

        var newButton = {
            xtype: 'button',
            text: 'New',
            ui: 'action',
            handler: this.onNewPlaceButtonTap,
            scope: this
        };

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
            title: 'Places',
            items: [
                menuButton,
                {
                    xtype: 'spacer'
                },
                newButton
            ]
        };

        var placeList = {
            xtype: 'placelist',
            store: Ext.getStore('Places'),
            listeners: {
                disclose: {
                    fn: this.onPlaceListDisclose,
                    scope: this
                }
            }
        };

        this.add( [topToolbar, placeList] );
    },

    onPlaceListDisclose: function(list, record, target, index, evt, options) {
        // console.log('View - PlaceListContainer - onPlaceListDisclose');
        this.fireEvent('editPlaceCommand', this, record);
    },

    onMenuButtonTap: function() {
        // console.log('View - PlaceListContainer - onRemindMenuButtonTap');
        this.fireEvent('tappedMenuButtonCommand', this);
    },

    onNewPlaceButtonTap: function() {
    	// console.log('View - PlaceListContainer - onNewPlaceButtonTap');
    	this.fireEvent('newPlaceCommand', this);
    }
});
