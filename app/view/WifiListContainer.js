Ext.define('Reminder.view.WifiListContainer', {
	extend: 'Ext.Container',
	xtype: 'wifilistcontainer',

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
            handler: this.onNewWifiButtonTap,
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
            title: 'Wifis',
            items: [
                menuButton,
                {
                    xtype: 'spacer'
                },
                newButton
            ]
        };

        var wifiList = {
            xtype: 'wifilist',
            store: Ext.getStore('Wifis'),
            listeners: {
                disclose: {
                    fn: this.onWifiListDisclose,
                    scope: this
                }
            }
        };

        this.add( [topToolbar, wifiList] );
    },

    onWifiListDisclose: function(list, record, target, index, evt, options) {
        console.log('View - WifiListContainer - onWifiListDisclose');
        this.fireEvent('editWifiCommand', this, record);
    },

    onRemindMenuButtonTap: function() {
        console.log('View - RemindWifiListContainer - onRemindMenuButtonTap');
        this.fireEvent('tappedMenuButtonCommand', this);
    },

    onNewWifiButtonTap: function() {
    	console.log('View - WifiListContainer - onNewWifiButtonTap');
    	this.fireEvent('newWifiCommand', this);
    }
});