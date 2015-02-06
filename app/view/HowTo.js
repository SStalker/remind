Ext.define('Reminder.view.HowTo', {
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

		var howToCarousel = {
			xtype: 'carousel',
			fullscreen: true,
			
			style: 'margin: 50px',

			defaults: {
				styleHtmlContent: true
			},

			items: [
				{ html: 'Remindlist' },
				{ html: 'Placelist' },
				{ html: 'Wifilist' }
			]
		};

		this.add( [topToolbar, howToCarousel] );

	},
	
	onRemindMenuButtonTap: function() {
        console.log('tappedMenuButtonCommand');
        this.fireEvent('tappedMenuButtonCommand', this);
    }
});