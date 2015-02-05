Ext.define('Reminder.view.RemindMainMenu', {
	extend: 'Ext.Menu',
	xtype: 'remindmainmenu',

	config: {
		width: 250,
        scrollable: 'vertical',
	},

	initialize: function() {

		var me = this;
		me.callParent(arguments);
		
		var remindsListButton = {
			xtype: 'button',
			text: 'Remindlist',
			iconCls: 'compose',
			handler: me.onRemindListButtonTap,
			scope: me
		};

		var settingsButton = {
			xtype: 'button',
			text: 'Settings',
			iconCls: 'settings',
			handler: me.onSettingsButtonTap,
			scope: me
		};

		var placesListButton = {
			xtype: 'button',
			text: 'Placelist',
			iconCls: 'compose',
			handler: me.onPlacesListButtonTap,
			scope: me
		};

		var wifiListButton = {
			xtype: 'button',
			text: 'Wifilist',
			iconCls: 'compose',
			handler: me.onWifiListButtonTap,
			scope: me	
		};

		var aboutUsButton = {
			xtype: 'button',
			text: 'About us',
			iconCls: 'star',
			handler: me.onAboutUsButtonTap,
			scope: me	
		};

		me.add(
			[
				remindsListButton,
				placesListButton,
				wifiListButton,
				settingsButton,
				aboutUsButton
			]
		)


	},

	onRemindListButtonTap: function() {
		console.log('tappedRemindListButtonCommand');
		this.fireEvent('tappedRemindListButtonCommand', this);
	},

	onSettingsButtonTap: function() {
		console.log('tappedSettingsButtonCommand');
		this.fireEvent('tappedSettingsButtonCommand', this);
	},

	onPlacesListButtonTap: function() {
		console.log('tappedPlacesListButtonCommand');
		this.fireEvent('tappedPlacesListButtonCommand', this);
	},

	onWifiListButtonTap: function() {
		console.log('tappedWifiListButtonCommand');
		this.fireEvent('tappedWifiListButtonCommand', this);	
	},

	onAboutUsButtonTap: function() {
		console.log('tappedAboutUsButtonCommand');
		this.fireEvent('tappedAboutUsButtonCommand', this);
	}
});