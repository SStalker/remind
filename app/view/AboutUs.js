Ext.define('Reminder.view.AboutUs', {
	extend: 'Ext.Container',
	xtype: 'aboutus',

    requires: [
        'Ext.form.Panel'
    ],

	config: {
        scrollable: 'vertical',
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
            html: '<p><h3>Do you often forget about something important in your live?</h3></p> \
                    \
                    <p>For example the birthday of your husband or the weddingday of your wife? \
                    Do you want to get informed instantly in various forms of notifications, \
                    days before the major event?</p> \
                    \
                    <b>Then we\'ve got a solution for you all!</b> \
                    \
                    <p>The new Reminder App from <a href="#">Lukas Hannigbrinck</a> and <a href="#">Raphael Grewe</a> \
                    can remind you in a stunning way. With simple effort, \
                    you will <b>never</b> forget anything anymore.</p> \
                    <br><br> \
                    <p>This app was made from: \
                    <h4>Raphael Grewe</h4></p><p><h4>Lukas Hannigbrinck</h4></p>'
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