Ext.define('Reminder.view.WifiEditor', {
	extend: 'Ext.form.Panel',
	xtype: 'wifieditor',

	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Select',
	],

	config: {
		scrollable: 'vertical'
	},

	initialize: function() {

		var me = this;
		this.callParent(arguments);

		var backButton = {
			xtype: 'button',
			text: 'Back to List',
			ui: 'back',
			handler: this.onBackButtonTap,
			scope: this
		};

		var saveButton = {
			xtype: 'button',			
			text: 'Save Wifi',
			ui: 'confirm-round',
			handler: this.onSaveWifiButtonTap,
			scope: this
		};

		var topToolbar = {
			xtype: 'toolbar',
			docked: 'top',
			title: 'Edit Wifi',

			items: [
				backButton,
				{ xtype: 'spacer' },
				saveButton
			]
		};

		var deleteButton = {
			xtype: 'button',
			text: 'Delete',
			ui: 'decline-round',
			iconCls: 'trash',
			iconMask: true,
			handler: this.onDeleteWifiButtonTap,
			scope: this
		};

		var bottomToolbar = {
			xtype: 'toolbar',
			docked: 'bottom',
			items: [
				deleteButton
			]
		};


		var wifiSsidEditor = {
			xtype: 'fieldset',
			items: {
				xtype: 'selectfield',
				label: 'SSID',
				name: 'ssid',
				itemId: 'ssid',
				displayField: 'ssid',
				valueField: 'ssid',
				options: [],
				listeners: {
					change: function( select, newVal, oldVal ) {
						me.onChangeWifiSsid(newVal);	
					}					
				}
			}			
		};

		var wifiMacEditor = {
			xtype: 'fieldset',
			items: {
				xtype: 'selectfield',
				label: 'MAC',
				name: 'mac',
				itemId: 'mac',
				displayField: 'mac',
				valueField: 'mac',
				options: [],
				listeners: {
					change: function( select, newVal, oldVal ) {
						me.onChangeWifiMac(newVal);	
					}					
				}
			}			
		};

		this.add(
			[
				topToolbar,
				{
					xtype: 'fieldset', 
					itemId: 'wifiFieldset',
					items: [
						wifiSsidEditor,
						wifiMacEditor
					]
				},
				bottomToolbar
			]
		)
	},

	onSaveWifiButtonTap: function() {
		console.log('saveWifiCommand');
		this.fireEvent('saveWifiCommand', this);
	},

	onDeleteWifiButtonTap: function() {
		console.log('deleteWifiCommand');
		this.fireEvent('deleteWifiCommand', this);
	},

	onBackButtonTap: function() {
		console.log('backCommand');
		this.fireEvent('backCommand', this);
	},

	onChangeWifiSsid: function(newVal) {
		console.log('changeWifiSsidCommand');
		this.fireEvent('changeWifiSsidCommand', this, newVal);
	},

	onChangeWifiMac: function(newVal) {
		console.log('changeWifiMacCommand');
		this.fireEvent('changeWifiMacCommand', this, newVal);
	}
});