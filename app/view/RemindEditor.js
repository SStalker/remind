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
			text: 'Back',
			ui: 'back',
			handler: this.onBackButtonTap,
			scope: this
		};

		var saveButton = {
			xtype: 'button',
			text: 'Save Remind',
			ui: 'confirm-round',
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
			text: 'Delete',
			ui: 'decline-round',
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

			xtype: 'fieldset',
			items: {
				xtype: 'selectfield',
				name: 'type',
				label: 'Type',
				labelAlign: 'top',
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
			}			
		};

		var remindMessageEditor = {
			xtype: 'fieldset',
			items: {
				xtype: 'textareafield',
				maxRows: 4,
				name: 'message',
				label: 'Message',
				labelAlign: 'top',
				required: true
			}			
		};

		var remindDateTimeEditor = {
			xtype: 'fieldset',
			hiddem: 'false',
			itemId: 'remindDateTime',
			items: {
				xtype: 'datetimepickerfield',
				label: 'Remind me at',
				labelAlign: 'top',
				name: 'remindDateTime',
				dateTimeFormat: 'd.m.Y H:i',
				required: true,
				minuteInterval: 1,
				value: Ext.util.Format.date(new Date(), 'd.m.Y H:i')
			}
		};

		var remindTypeNotificationEditor = {
			xtype: 'fieldset',
			itemId: 'notification',
			items: {
				xtype: 'selectfield',
				label: 'Type of Notification',
				labelAlign: 'top',
				name: 'notification',
				store: Ext.getStore('Notifications'),
				displayField: 'name',
				valueField: 'name'
			}
		};

		var remindPlaceEditor = {
			xtype: 'fieldset',
			itemId: 'place',
			hidden: true,
			items: {
				xtype: 'selectfield',
				label: 'Place',
				labelAlign: 'top',
				name: 'place',
				store: Ext.getStore('Places'),
				displayField: 'place',
				valueField: 'place',
				placeHolder: '-- select --'
			}
		};

		var remindSsidMacEditor = {
			xtype: 'fieldset',
			itemId: 'ssid_mac',
			hidden: true,
			items: {
				xtype: 'selectfield',
				label: 'SSID/MAC',
				labelAlign: 'top',
				name: 'ssid_mac',
				store: Ext.getStore('Wifis'),
				displayField: 'ssid',
				valueField: 'ssid'	
			}
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