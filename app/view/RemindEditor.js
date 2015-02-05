Ext.define('Reminder.view.RemindEditor', {
	extend: 'Ext.form.Panel',
	xtype: 'remindeditor',

	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Select',
		'Ext.ux.field.DateTimePicker'
	],

	config: {
		scrollable: 'vertical'
	},

	initialize: function() {
		this.callParent(arguments);

		var me = this;

		var backButton = {
			xtype: 'button',
			ui: 'back',
			text: 'Back to List',
			handler: this.onBackButtonTap,
			scope: this
		};

		var saveButton = {
			xtype: 'button',
			ui: 'action',
			text: 'Save Remind',
			handler: this.onSaveRemindButtonTap,
			scope: this
		};

		var topToolbar = {
			xtype: 'toolbar',
			docked: 'top',
			title: 'Edit Remind',

			items: [
				backButton,
				{ xtype: 'spacer' },
				saveButton
			]
		};

		var deleteButton = {
			xtype: 'button',
			iconCls: 'trash',
			iconMask: true,
			handler: this.onDeleteRemindButtonTap,
			scope: this
		};

		var bottomToolbar = {
			xtype: 'toolbar',
			docked: 'bottom',
			items: [
				deleteButton
			]
		};

		var remindTypeEditor = {
			xtype: 'selectfield',
			name: 'type',
			label: 'Type',
			required: true,
			listeners: {
				change: function( select, newVal, oldVal ) {
					me.onChangeRemindType(newVal);	
				}
				
			},
			options: [
				{ text: 'Normal', value: 'Normal' },
				{ text: 'Geo Remind', value: 'Geo Remind' },
				{ text: 'Wifi Remind', value: 'Wifi Remind' }
			]
		};

		var remindMessageEditor = {
			xtype: 'textareafield',
			maxRows: 4,
			name: 'message',
			label: 'Message',
			required: true
		};

		var remindDateTimeEditor = {
			xtype: 'datetimepickerfield',
			label: 'Remind me at',
			name: 'remindDateTime',
			hiddem: 'false',
			itemId: 'remindDateTime',
			dateTimeFormat: 'd.m.Y H:i',
			required: true,
			minuteInterval: 1,
			value: Ext.util.Format.date(new Date(), 'd.m.Y H:i')
		};

		var remindTypeNotificationEditor = {
			xtype: 'selectfield',
			label: 'Type of Notification',
			name: 'notification',
			itemId: 'notification',
			store: Ext.getStore('Notifications'),
			displayField: 'name',
			valueField: 'name'
		};

		var remindPlaceEditor = {
			xtype: 'selectfield',
			label: 'Place',
			name: 'place',
			hidden: true,
			itemId: 'place',
			store: Ext.getStore('Places'),
			displayField: 'place',
			valueField: 'place',
			placeHolder: '-- select --'
		};

		var remindSsidMacEditor = {
			xtype: 'selectfield',
			label: 'SSID/MAC',
			name: 'ssid_mac',
			hidden: true,
			itemId: 'ssid_mac',
			store: Ext.getStore('Wifis'),
			displayField: 'ssid',
			valueField: 'ssid'	
		};

		this.add(
			[
				topToolbar,
				{
					xtype: 'fieldset', 
					itemId: 'remindFieldset',
					items: [
						remindTypeEditor,
						remindDateTimeEditor,
						remindTypeNotificationEditor,
						remindPlaceEditor,
						remindSsidMacEditor,
						remindMessageEditor,
					]
				},
				bottomToolbar
			]
		)
	},

	onSaveRemindButtonTap: function() {
		console.log('saveRemindCommand');
		this.fireEvent('saveRemindCommand', this);
	},

	onDeleteRemindButtonTap: function() {
		console.log('deleteRemindCommand');
		this.fireEvent('deleteRemindCommand', this);
	},

	onBackButtonTap: function() {
		console.log('backCommand');
		this.fireEvent('backCommand', this);
	},

	onChangeRemindType: function(newVal) {
		console.log('changeRemindTypeCommand');
		this.fireEvent('changeRemindTypeCommand', this, newVal);
	}
});