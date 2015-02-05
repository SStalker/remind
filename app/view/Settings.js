Ext.define('Reminder.view.Settings', {
	extend: 'Ext.Container',
	xtype: 'settings',

    requires: [
        'Ext.form.Panel'
    ],

	config: {
		layout: {
            type: 'fit'
        }
	},

	initialize: function() {
        console.log('View - Settings - initialize');
        this.callParent(arguments);


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
            title: 'Settings',
            items: [
                menuButton
            ]
        };

        var settingsPanel = {
            xtype: 'settingspanel'
        }

        this.add( [topToolbar, settingsPanel] );
	},

	launch: function() {
        this.callParent(arguments);
	},

	onRemindMenuButtonTap: function() {
        console.log('tappedMenuButtonCommand');
        this.fireEvent('tappedMenuButtonCommand', this);
    }
});