Ext.define('Reminder.model.Wifis', {
	extend: 'Ext.data.Model',

	config: {

		idProperty: 'id',
		identifier: 'sequential',

		fields: [
			{ name: 'id', type: 'int' },
			{ name: 'ssid', type: 'string' },
			{ name: 'mac', type: 'string' }
		]
	}
});