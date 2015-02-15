Ext.define('Reminder.view.setting.Settings', {
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
        // console.log('View - Settings - initialize');
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

	onMenuButtonTap: function() {
        // console.log('tappedMenuButtonCommand');
        this.fireEvent('tappedMenuButtonCommand', this);
    }
});