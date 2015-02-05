Ext.define('Reminder.view.AboutUs', {
	extend: 'Ext.Container',
	xtype: 'aboutus',

    requires: [
        'Ext.form.Panel'
    ],

	config: {
		layout: {
            type: 'hbox',
                pack: 'center'
        }
	},

	initialize: function() {
        console.log('View - AboutUs - initialize');
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
            title: 'About Us',
            items: [
                menuButton
            ]
        };

        var textPanel = {
            xtype: 'panel',
            styleHtmlContent: true,
            html: 'This app was made from: <p><h2>Raphael Grewe</h2></p><p><h2>Lukas Hannigbrinck</h2></p>'
        };

        this.add( [topToolbar, textPanel] );
	},

	launch: function() {
        console.log('View - AboutUs - launch');
        this.callParent(arguments);
	},

	onRemindMenuButtonTap: function() {
        console.log('tappedMenuButtonCommand');
        this.fireEvent('tappedMenuButtonCommand', this);
    }
});