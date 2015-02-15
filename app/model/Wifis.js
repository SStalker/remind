Ext.define('Reminder.model.Wifis', {
	extend: 'Ext.data.Model',

	config: {

		idProperty: 'id',
		identifier: 'sequential',

		fields: [
			{ name: 'id', type: 'int' },
			{ name: 'ssid', type: 'string' },
			{ name: 'mac', type: 'string' }
		],

		validations: [
			{ type: 'presence', field: 'id' },
			{ type: 'presence', field: 'ssid', message: 'SSID is missing. Please try again.' },
			{ type: 'presence', field: 'mac', message: 'MAC is missing. Please try again.' }
		]
	}
});