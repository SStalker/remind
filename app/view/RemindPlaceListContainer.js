Ext.define('Reminder.view.RemindPlaceListContainer', {
	extend: 'Ext.Container',
	xtype: 'remindplacelistcontainer',

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
            handler: this.onRemindMenuButtonTap,
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
        console.log('View - RemindPlaceListContainer - onPlaceListDisclose');
        this.fireEvent('editPlaceCommand', this, record);
    },

    onRemindMenuButtonTap: function() {
        console.log('View - RemindPlaceListContainer - onRemindMenuButtonTap');
        this.fireEvent('tappedMenuButtonCommand', this);
    },

    onNewPlaceButtonTap: function() {
    	console.log('View - RemindPlaceListContainer - onNewPlaceButtonTap');
    	this.fireEvent('newPlaceCommand', this);
    }
});